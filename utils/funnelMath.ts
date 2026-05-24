/**
 * funnelMath.ts
 * Pure utility functions for calculating payment funnel drop-off metrics.
 * No dependencies on React, Next.js, or any UI library.
 * Fully testable and reusable across any platform.
 */

// ============================================================================
// TYPES
// ============================================================================

export interface FunnelInput {
  totalMonthlyTraffic: number;
  averageOrderValue: number;
  checkoutLand: number; // 0–100 (percentage)
  selectPaymentMethod: number; // 0–100
  otpVerification: number; // 0–100
  paymentSuccess: number; // 0–100
}

export interface FunnelStep {
  id: string;
  label: string;
  usersIn: number;
  usersOut: number;
  dropOff: number;
  dropOffPercent: number;
  revenueLeaked: number;
}

export interface FunnelResult {
  steps: FunnelStep[];
  totalLostRevenue: number;
  actualRevenue: number;
  potentialRevenue: number;
  overallConversionRate: number;
  biggestDropStep: FunnelStep;
}

// ============================================================================
// CALCULATION ENGINE
// ============================================================================

/**
 * calculateFunnel
 * Given input metrics (traffic, AOV, conversion rates), compute the complete
 * funnel breakdown: users at each step, drop-off, revenue leaked, overall KPIs.
 *
 * @param input - FunnelInput with traffic, AOV, and 4 conversion rate percentages
 * @returns FunnelResult with steps array and aggregated KPIs
 */
export function calculateFunnel(input: FunnelInput): FunnelResult {
  const {
    totalMonthlyTraffic,
    averageOrderValue,
    checkoutLand,
    selectPaymentMethod,
    otpVerification,
    paymentSuccess,
  } = input;

  const steps: FunnelStep[] = [];

  // Step 0: Land on Checkout
  const usersCheckout = totalMonthlyTraffic * (checkoutLand / 100);
  const dropOffCheckout = totalMonthlyTraffic - usersCheckout;
  steps.push({
    id: 'checkout',
    label: 'Land on Checkout Page',
    usersIn: totalMonthlyTraffic,
    usersOut: usersCheckout,
    dropOff: dropOffCheckout,
    dropOffPercent: 100 - checkoutLand,
    revenueLeaked: dropOffCheckout * averageOrderValue,
  });

  // Step 1: Select Payment Method
  const usersPayment = usersCheckout * (selectPaymentMethod / 100);
  const dropOffPayment = usersCheckout - usersPayment;
  steps.push({
    id: 'payment',
    label: 'Select Payment Method',
    usersIn: usersCheckout,
    usersOut: usersPayment,
    dropOff: dropOffPayment,
    dropOffPercent: 100 - selectPaymentMethod,
    revenueLeaked: dropOffPayment * averageOrderValue,
  });

  // Step 2: OTP / Biometric Verification
  const usersOTP = usersPayment * (otpVerification / 100);
  const dropOffOTP = usersPayment - usersOTP;
  steps.push({
    id: 'otp',
    label: 'OTP / Biometric Verification',
    usersIn: usersPayment,
    usersOut: usersOTP,
    dropOff: dropOffOTP,
    dropOffPercent: 100 - otpVerification,
    revenueLeaked: dropOffOTP * averageOrderValue,
  });

  // Step 3: Payment Success
  const usersSuccess = usersOTP * (paymentSuccess / 100);
  const dropOffSuccess = usersOTP - usersSuccess;
  steps.push({
    id: 'success',
    label: 'Payment Success',
    usersIn: usersOTP,
    usersOut: usersSuccess,
    dropOff: dropOffSuccess,
    dropOffPercent: 100 - paymentSuccess,
    revenueLeaked: dropOffSuccess * averageOrderValue,
  });

  // Calculate KPIs
  const totalLostRevenue = steps.reduce((sum, step) => sum + step.revenueLeaked, 0);
  const actualRevenue = usersSuccess * averageOrderValue;
  const potentialRevenue = totalMonthlyTraffic * averageOrderValue;
  const overallConversionRate = (usersSuccess / totalMonthlyTraffic) * 100;

  // Find biggest drop-off step
  const biggestDropStep = steps.reduce((max, step) => 
    step.dropOff > max.dropOff ? step : max
  );

  return {
    steps,
    totalLostRevenue,
    actualRevenue,
    potentialRevenue,
    overallConversionRate,
    biggestDropStep,
  };
}

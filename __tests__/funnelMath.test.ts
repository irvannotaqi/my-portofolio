/**
 * funnelMath.test.ts
 * Unit tests for the payment funnel calculation engine.
 *
 * Test groups:
 * 1. Happy path: Default metrics (100k traffic, $25 AOV, 60/75/80/85 conversion rates)
 * 2. Perfect funnel: All rates at 100% (zero leakage)
 */

import { describe, it, expect } from 'vitest';
import { calculateFunnel, type FunnelInput } from '../utils/funnelMath';

// ============================================================================
// TEST SUITE
// ============================================================================

describe('calculateFunnel', () => {
  // ──────────────────────────────────────────────────────────────────────
  // HAPPY PATH TESTS
  // ──────────────────────────────────────────────────────────────────────

  describe('Happy path: default metrics', () => {
    const defaultInput: FunnelInput = {
      totalMonthlyTraffic: 100_000,
      averageOrderValue: 25,
      checkoutLand: 60,
      selectPaymentMethod: 75,
      otpVerification: 80,
      paymentSuccess: 85,
    };

    it('should calculate correct usersOut at each step', () => {
      const result = calculateFunnel(defaultInput);
      const steps = result.steps;

      // Step 0: Checkout = 100k * 60% = 60k
      expect(steps[0].usersOut).toBe(60_000);

      // Step 1: Payment = 60k * 75% = 45k
      expect(steps[1].usersOut).toBe(45_000);

      // Step 2: OTP = 45k * 80% = 36k
      expect(steps[2].usersOut).toBe(36_000);

      // Step 3: Success = 36k * 85% = 30.6k
      expect(steps[3].usersOut).toBe(30_600);
    });

    it('should calculate correct revenueLeaked per step', () => {
      const result = calculateFunnel(defaultInput);
      const steps = result.steps;
      const aov = 25;

      // Checkout: (100k - 60k) * $25 = 40k * $25 = $1M
      expect(steps[0].revenueLeaked).toBe(1_000_000);

      // Payment: (60k - 45k) * $25 = 15k * $25 = $375k
      expect(steps[1].revenueLeaked).toBe(375_000);

      // OTP: (45k - 36k) * $25 = 9k * $25 = $225k
      expect(steps[2].revenueLeaked).toBe(225_000);

      // Success: (36k - 30.6k) * $25 = 5.4k * $25 = $135k
      expect(steps[3].revenueLeaked).toBe(135_000);
    });

    it('should calculate correct totalLostRevenue (sum across all steps)', () => {
      const result = calculateFunnel(defaultInput);

      // $1M + $375k + $225k + $135k = $1.735M
      expect(result.totalLostRevenue).toBe(1_735_000);
    });

    it('should calculate correct overallConversionRate', () => {
      const result = calculateFunnel(defaultInput);

      // 30.6k successful / 100k traffic = 30.6%
      expect(result.overallConversionRate).toBeCloseTo(30.6, 1);
    });

    it('should calculate correct actualRevenue', () => {
      const result = calculateFunnel(defaultInput);

      // 30.6k users * $25 = $765k
      expect(result.actualRevenue).toBe(765_000);
    });

    it('should identify the correct biggestDropStep', () => {
      const result = calculateFunnel(defaultInput);

      // Checkout has the biggest drop: 40k users
      // (Payment: 15k, OTP: 9k, Success: 5.4k)
      expect(result.biggestDropStep.id).toBe('checkout');
      expect(result.biggestDropStep.dropOff).toBe(40_000);
      expect(result.biggestDropStep.dropOffPercent).toBe(40);
    });
  });

  // ──────────────────────────────────────────────────────────────────────
  // PERFECT FUNNEL TESTS (Edge case: zero leakage)
  // ──────────────────────────────────────────────────────────────────────

  describe('Perfect funnel: all conversion rates at 100%', () => {
    const perfectInput: FunnelInput = {
      totalMonthlyTraffic: 100_000,
      averageOrderValue: 25,
      checkoutLand: 100,
      selectPaymentMethod: 100,
      otpVerification: 100,
      paymentSuccess: 100,
    };

    it('should have zero totalLostRevenue and all dropOff values at 0', () => {
      const result = calculateFunnel(perfectInput);

      expect(result.totalLostRevenue).toBe(0);

      // All steps should have dropOff = 0 and dropOffPercent = 0
      result.steps.forEach((step) => {
        expect(step.dropOff).toBe(0);
        expect(step.dropOffPercent).toBe(0);
        expect(step.revenueLeaked).toBe(0);
      });
    });

    it('should have actualRevenue equal to potentialRevenue', () => {
      const result = calculateFunnel(perfectInput);

      // 100k * $25 = $2.5M (all traffic converts)
      expect(result.actualRevenue).toBe(2_500_000);
      expect(result.potentialRevenue).toBe(2_500_000);
      expect(result.actualRevenue).toBe(result.potentialRevenue);
    });

    it('should have overallConversionRate at 100%', () => {
      const result = calculateFunnel(perfectInput);

      expect(result.overallConversionRate).toBe(100);
    });

    it('should flag the "No Leakage! 🎉" UI condition', () => {
      const result = calculateFunnel(perfectInput);

      // This test validates the condition used in app/tools/funnel-simulator/page.tsx
      // In the KPI card: if totalLostRevenue === 0 → "No Leakage! 🎉"
      const shouldShowPerfectFunnel = result.totalLostRevenue === 0;
      expect(shouldShowPerfectFunnel).toBe(true);
    });
  });
});

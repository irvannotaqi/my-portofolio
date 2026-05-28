'use client';

import { useState } from 'react';
import { Navbar } from './Navbar';

export function NavbarWrapper() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />;
}

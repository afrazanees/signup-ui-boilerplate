'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * SignupPage Component
 * Strict adherence to UI_Prompt.md specifications:
 * - Color Palette: #F7F7F5 background, #111 black CTAs, #8E8E93 muted gray, #E8472A accent.
 * - Typography: Oversized hero numbers, ALL CAPS section labels, tight letter-spacing.
 * - Layout: Generous whitespace, no nested cards, top-to-bottom linear flow.
 */
export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};
    
    // Basic validation
    if (!email) {
      newErrors.email = 'required field';
    } else if (!email.includes('@')) {
      newErrors.email = 'missing "@" symbol';
    } else if (!email.split('@')[1]?.includes('.')) {
      newErrors.email = 'invalid domain';
    }

    if (!password) {
      newErrors.password = 'required field';
    } else if (password.length < 8) {
      newErrors.password = 'min 8 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    // Frontend only implementation
  };

  return (
    <main className="h-screen overflow-hidden flex flex-col items-center justify-center px-6 pt-12 bg-[#F7F7F5] selection:bg-[#E8472A]/20">
      <div className="w-full max-w-[340px] flex flex-col gap-10 md:gap-12 translate-y-12">
        
        {/* HERO ELEMENT: LARGE OVERSIZED NUMBERS */}
        <section className="flex flex-col">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#8E8E93] uppercase mb-2">
            Registration / 03
          </span>
          <div className="flex items-baseline">
            <h1 className="text-[100px] md:text-[120px] font-bold leading-[0.7] tracking-[-0.08em] text-[#111] select-none">
              03
            </h1>
            {/* Minimalist Muted Accent Usage */}
            <div className="w-3 h-3 md:w-3.5 md:h-3.5 bg-[#E8472A] ml-2" />
          </div>
          <p className="text-[#8E8E93] text-[12px] leading-relaxed mt-6 max-w-[260px]">
            Join the collective. Please provide your credentials to create a new account.
          </p>
        </section>

        {/* Form Container */}
        <div className="relative min-h-[360px]">
          {/* INITIAL FORM STATE */}
          <div className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] absolute inset-0 w-full
            ${submitted ? 'opacity-0 -translate-y-4 pointer-events-none invisible' : 'opacity-100 translate-y-0 visible delay-300'}
          `}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="flex flex-col gap-8">
                {/* Form Section Label */}
                <div className="border-b border-[#111]/5 pb-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#8E8E93] uppercase">
                    Account Registration
                  </span>
                </div>

                {/* EMAIL FIELD */}
                <div className={`flex flex-col group relative border-b h-[44px] transition-all
                  ${errors.email ? 'border-[#E8472A]' : 'border-[#111]/5 focus-within:border-[#111]/20'}
                `}>
                  <label 
                    htmlFor="email" 
                    className={`text-[11px] font-bold tracking-widest uppercase transition-all duration-300 pointer-events-none absolute
                      ${email ? 'bottom-8 scale-[0.8] origin-left text-[#111]' : 'bottom-1 scale-100 group-focus-within:bottom-8 group-focus-within:scale-[0.8] group-focus-within:origin-left group-focus-within:text-[#111]'}
                      ${errors.email ? 'text-[#E8472A]' : 'text-[#8E8E93]'}
                    `}
                  >
                    Email
                    {errors.email && (
                      <span className="ml-2 font-bold uppercase tracking-widest opacity-90 text-[12px] animate-in fade-in slide-in-from-left-1">
                        — {errors.email}
                      </span>
                    )}
                  </label>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    autoComplete="email"
                    className="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#111] font-medium transition-all pt-3"
                    placeholder=""
                  />
                </div>

                {/* PASSWORD FIELD */}
                <div className={`flex flex-col group relative border-b h-[44px] transition-all
                  ${errors.password ? 'border-[#E8472A]' : 'border-[#111]/5 focus-within:border-[#111]/20'}
                `}>
                  <label 
                    htmlFor="password" 
                    className={`text-[11px] font-bold tracking-widest uppercase transition-all duration-300 pointer-events-none absolute
                      ${password ? 'bottom-8 scale-[0.8] origin-left text-[#111]' : 'bottom-1 scale-100 group-focus-within:bottom-8 group-focus-within:scale-[0.8] group-focus-within:origin-left group-focus-within:text-[#111]'}
                      ${errors.password ? 'text-[#E8472A]' : 'text-[#8E8E93]'}
                    `}
                  >
                    Password
                    {errors.password && (
                      <span className="ml-2 font-bold uppercase tracking-widest opacity-90 text-[12px] animate-in fade-in slide-in-from-left-1">
                        — {errors.password}
                      </span>
                    )}
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    autoComplete="new-password"
                    className="w-full h-full bg-transparent border-none outline-none text-[14px] text-[#111] font-medium transition-all pt-3"
                    placeholder=""
                  />
                </div>
              </div>

              {/* PRIMARY CTA */}
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  className="w-full h-[50px] bg-[#111] text-white text-[11px] font-bold uppercase tracking-[0.25em] rounded-[4px] transition-all hover:bg-black active:scale-[0.99] cursor-pointer"
                >
                  Create Account
                </button>
                <Link 
                  href="/login"
                  className="text-[10px] font-bold tracking-[0.15em] text-[#8E8E93] uppercase hover:text-[#111] transition-colors self-center cursor-pointer"
                >
                  Already have an account? Login
                </Link>
              </div>
            </form>
          </div>

          {/* SUCCESS STATE */}
          <div className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] absolute inset-0 w-full
            ${submitted ? 'opacity-100 translate-y-0 visible delay-300' : 'opacity-0 translate-y-4 pointer-events-none invisible'}
          `}>
            <div className="flex flex-col gap-10">
              <div className="border-b border-[#111]/5 pb-4">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#8E8E93] uppercase block mb-1">
                  Registration Successful
                </span>
                <p className="text-[12px] text-[#111] font-medium leading-relaxed">
                  Welcome to the platform. An activation link has been dispatched to <span className="text-[#E8472A] break-all">{email}</span>
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <Link
                  href="/login"
                  className="w-full h-[50px] flex items-center justify-center bg-[#111] text-white text-[11px] font-bold uppercase tracking-[0.25em] rounded-[4px] transition-all hover:bg-black active:scale-[0.99] cursor-pointer"
                >
                  Proceed to Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <footer className="mt-2 flex flex-col items-center gap-4">
          <div className="w-16 h-[1px] bg-[#111]/10" />
          <span className="text-[9px] font-bold tracking-[0.3em] text-[#8E8E93]/40 uppercase">
            SIGNUP Module v1.0
          </span>
        </footer>
      </div>
    </main>
  );
}




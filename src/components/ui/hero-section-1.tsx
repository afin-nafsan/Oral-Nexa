import React from 'react';
import { ArrowRight, ChevronRight, Menu, X, Heart, Calendar, Users, Shield, Star, Check, FileText, TrendingUp, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { cn } from '@/lib/utils';
import { BrandLogo } from '@/components/ui/brand-logo';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <div aria-hidden className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
          <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section>
          <div className="relative pt-24 md:pt-36">
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 1,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: 'spring',
                      bounce: 0.3,
                      duration: 2,
                    },
                  },
                },
              }}
              className="absolute inset-0 -z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop"
                alt="background"
                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block"
                width={3276}
                height={4095}
              />
            </AnimatedGroup>
            <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <a
                    href="#features"
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      New: AI-Powered Scheduling Available
                    </span>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700" />

                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </a>

                  <h1 className="mt-6 max-w-4xl mx-auto text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl lg:mt-16 xl:text-[5.25rem] font-bold text-gray-900 leading-tight">
                    Modern Dental Practice
                    <span className="text-blue-600"> Management</span>
                    <br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>Made Simple
                  </h1>
                  <p className="mx-auto mt-6 sm:mt-8 max-w-2xl text-balance text-base sm:text-lg text-gray-600 px-4 sm:px-0">
                    Streamline your dental practice with Oral Nexa's comprehensive management system. 
                    From patient records to appointment scheduling, we've got everything your practice needs to thrive.
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-8 sm:mt-12 flex flex-col items-center justify-center gap-3 sm:gap-2 sm:flex-row px-4 sm:px-0"
                >
                  <div key={1} className="bg-foreground/10 rounded-[14px] border p-0.5">
                    <Button asChild size="lg" className="rounded-xl px-5 text-base">
                      <a href="#pricing">
                        <span className="text-nowrap">Start Free Trial</span>
                      </a>
                    </Button>
                  </div>
                  <Button key={2} asChild size="lg" variant="ghost" className="h-10.5 rounded-xl px-5">
                    <a href="#demo">
                      <span className="text-nowrap">Watch Demo</span>
                    </a>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative mt-8 overflow-hidden px-2 sm:mt-12 md:mt-20 sm:-mr-56 sm:mr-0">
                <div aria-hidden className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%" />
                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                  <img
                    className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop"
                    alt="Oral Nexa Dashboard - Dark Mode"
                    width={2700}
                    height={1440}
                  />
                  <img
                    className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden"
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                    alt="Oral Nexa Dashboard - Light Mode"
                    width={2700}
                    height={1440}
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
        {/* Stats Section */}
        <section className="bg-blue-600 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">10,000+</div>
                <div className="text-blue-100 text-sm sm:text-base">Happy Dentists</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">2M+</div>
                <div className="text-blue-100 text-sm sm:text-base">Patients Managed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">99.9%</div>
                <div className="text-blue-100 text-sm sm:text-base">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">24/7</div>
                <div className="text-blue-100 text-sm sm:text-base">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Everything Your Practice Needs
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                Comprehensive tools designed specifically for dental practices to improve efficiency, 
                patient care, and business growth.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Patient Management</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">Comprehensive patient records with medical history, allergies, and insurance information all in one place.</p>
              </div>

              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Smart Scheduling</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">AI-powered appointment booking with automated reminders and conflict prevention.</p>
              </div>

              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Digital Prescriptions</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">Electronic prescription management with drug interaction checking and dosage tracking.</p>
              </div>

              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">HIPAA Compliant</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">Bank-level security ensuring patient data privacy and regulatory compliance.</p>
              </div>

              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Analytics & Reports</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">Detailed insights into practice performance, patient trends, and financial metrics.</p>
              </div>

              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">24/7 Support</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">Round-the-clock technical support to keep your practice running smoothly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Trusted by Dental Professionals
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 px-4 sm:px-0">
                See what dentists are saying about Oral Nexa
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-gray-50 rounded-xl p-6 sm:p-8 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-4 sm:mb-6 italic text-sm sm:text-base">"Oral Nexa transformed our practice efficiency. Patient management is now seamless, and our staff loves the intuitive interface."</p>
                
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&h=150&auto=format&fit=crop&crop=face" 
                    alt="Dr. Sarah Johnson"
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover mr-3 sm:mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">Dr. Sarah Johnson</div>
                    <div className="text-xs sm:text-sm text-gray-600">General Dentist</div>
                    <div className="text-xs sm:text-sm text-gray-500">Smile Care Dental</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 sm:p-8 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-4 sm:mb-6 italic text-sm sm:text-base">"The scheduling system eliminated double bookings completely. Our appointment management has never been more organized."</p>
                
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&h=150&auto=format&fit=crop&crop=face" 
                    alt="Dr. Michael Chen"
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover mr-3 sm:mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">Dr. Michael Chen</div>
                    <div className="text-xs sm:text-sm text-gray-600">Orthodontist</div>
                    <div className="text-xs sm:text-sm text-gray-500">Perfect Smile Orthodontics</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 sm:p-8 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-4 sm:mb-6 italic text-sm sm:text-base">"The financial tracking features helped us increase revenue by 30%. The analytics provide insights we never had before."</p>
                
                <div className="flex items-center">
                  <img 
                    src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" 
                    alt="Dr. Emily Rodriguez"
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover mr-3 sm:mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">Dr. Emily Rodriguez</div>
                    <div className="text-xs sm:text-sm text-gray-600">Oral Surgeon</div>
                    <div className="text-xs sm:text-sm text-gray-500">Advanced Dental Surgery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 px-4 sm:px-0">
                Choose the plan that fits your practice size and needs
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">Perfect for small practices</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">$49</span>
                    <span className="text-gray-600 ml-2 text-sm sm:text-base">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Up to 500 patients</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Basic scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Patient records</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Email support</span>
                  </li>
                </ul>

                <Button className="w-full text-sm sm:text-base" variant="outline">
                  Get Started
                </Button>
              </div>

              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ring-2 ring-blue-600 relative sm:col-span-2 lg:col-span-1">
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
                
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Professional</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">Most popular for growing practices</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">$99</span>
                    <span className="text-gray-600 ml-2 text-sm sm:text-base">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Unlimited patients</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Advanced scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Prescription management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Financial tracking</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Priority support</span>
                  </li>
                </ul>

                <Button className="w-full text-sm sm:text-base">
                  Get Started
                </Button>
              </div>

              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">For large practices and clinics</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">$199</span>
                    <span className="text-gray-600 ml-2 text-sm sm:text-base">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Everything in Professional</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Multi-location support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Dedicated support</span>
                  </li>
                </ul>

                <Button className="w-full text-sm sm:text-base" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl text-center px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 px-4 sm:px-0">
              Join thousands of dental professionals who trust Oral Nexa to manage their practice efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="px-6 sm:px-8 py-3 sm:py-4 border-white bg-white text-black hover:bg-white/90 text-sm sm:text-base">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div>
                <div className="flex items-center mb-6">
                  <BrandLogo height={60} className="scale-125 origin-left" />
                </div>
                <p className="text-gray-400 mb-6">
                  Modern dental practice management software designed for efficiency and growth.
                </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                    <span className="text-sm">f</span>
                  </div>
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                    <span className="text-sm">t</span>
                  </div>
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                    <span className="text-sm">in</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6">Product</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6">Company</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6">Support</h4>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 Oral Nexa. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

const menuItems = [
  { name: 'Features', href: '#features' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'Support', href: '#support' },
];

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header>
      <nav data-state={menuState && 'active'} className="fixed z-20 w-full px-2 group">
        <div className={cn('mx-auto mt-2 max-w-6xl px-4 sm:px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
          <div className="relative flex flex-wrap items-center justify-between gap-4 sm:gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <a href="/" aria-label="home" className="flex items-center space-x-2">
                <BrandLogo height={60} className="scale-125 origin-left" />
              </a>

              <button onClick={() => setMenuState(!menuState)} aria-label={menuState == true ? 'Close Menu' : 'Open Menu'} className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="text-muted-foreground hover:text-accent-foreground block duration-150">
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-4 sm:mb-6 hidden w-full flex-wrap items-center justify-end space-y-6 sm:space-y-8 rounded-3xl border p-4 sm:p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a href={item.href} className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button asChild variant="outline" size="sm" className={cn(isScrolled && 'lg:hidden', 'text-xs sm:text-sm')}>
                  <a href="/login">
                    <span>Login</span>
                  </a>
                </Button>
                <Button asChild size="sm" className={cn(isScrolled && 'lg:hidden', 'text-xs sm:text-sm')}>
                  <a href="#pricing">
                    <span>Start Free Trial</span>
                  </a>
                </Button>
                <Button asChild size="sm" className={cn(isScrolled ? 'lg:inline-flex' : 'hidden', 'text-xs sm:text-sm')}>
                  <a href="#pricing">
                    <span>Get Started</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

// The inline fallback logo component has been moved to BrandLogo.

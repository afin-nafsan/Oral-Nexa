import React from 'react';
import { ArrowRight, ChevronRight, Menu, X, Heart, Calendar, Users, Shield, Star, Check, FileText, TrendingUp, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { cn } from '@/lib/utils';
import { BrandLogo } from '@/components/ui/brand-logo';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { useScroll, motion } from 'framer-motion';
import { SharedNavigation } from '@/components/ui/shared-navigation';

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
  const handleFooterClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <>
      <SharedNavigation />
      <main className="overflow-x-hidden">
                                   <section className="relative min-h-screen flex items-center">
                       <div className="py-4 sm:py-6 md:pb-8 lg:pb-12 lg:pt-8 w-full">
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                             <div className="mx-auto max-w-4xl text-center">
                                   <h1 className="mt-8 text-balance text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight">
                   <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
                     Transform Your Dental Practice
                   </span>
                   <br />
                   <span className="text-foreground font-black drop-shadow-lg">with Oral Nexa</span>
                 </h1>
              </div>
            </div>
                         <div className="absolute inset-0 overflow-hidden z-0">
              <video
                autoPlay
                loop
                muted
                className="size-full object-cover opacity-60 invert dark:opacity-40 dark:invert dark:lg:opacity-60"
                src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"></video>
                         </div>
           </div>
                                       </section>

           {/* Dashboard Preview Section */}
           <section className="py-12 sm:py-16 bg-muted/30">
             <div className="mx-auto max-w-7xl px-4 sm:px-6">
               <div className="text-center mb-8 sm:mb-12">
                 <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                   See Oral Nexa in Action
                 </h2>
                 <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                   Experience the intuitive interface that dental professionals love
                 </p>
               </div>
               
               <div className="relative mx-auto max-w-5xl">
                 <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl border border-border">
                   <img 
                     src="/dashboard-preview.png" 
                     alt="Oral Nexa Dashboard Interface" 
                     className="w-full h-auto object-cover"
                   />
                   
                   {/* Live Demo Badge */}
                   <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                     Live Demo
                   </div>
                 </div>
               </div>
             </div>
           </section>

                                            {/* Stats Section */}
          <section className="bg-blue-600 py-12 sm:py-16 relative z-10">
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
        <section id="features" className="bg-muted py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Everything Your Practice Needs
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">
                Comprehensive tools designed specifically for dental practices to improve efficiency, 
                patient care, and business growth.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Patient Management</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">Comprehensive patient records with medical history, allergies, and insurance information all in one place.</p>
              </div>

              <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Smart Scheduling</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">AI-powered appointment booking with automated reminders and conflict prevention.</p>
              </div>

              <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Digital Prescriptions</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">Electronic prescription management with drug interaction checking and dosage tracking.</p>
              </div>

              <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">HIPAA Compliant</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">Bank-level security ensuring patient data privacy and regulatory compliance.</p>
              </div>

              <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Analytics & Reports</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">Detailed insights into practice performance, patient trends, and financial metrics.</p>
              </div>

              <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">24/7 Support</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">Round-the-clock technical support to keep your practice running smoothly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Trusted by Dental Professionals
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground px-4 sm:px-0">
                See what dentists are saying about Oral Nexa
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-muted rounded-xl p-6 sm:p-8 hover:bg-muted/80 transition-colors border border-border">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-4 sm:mb-6 italic text-sm sm:text-base">"Oral Nexa transformed our practice efficiency. Patient management is now seamless, and our staff loves the intuitive interface."</p>
                
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&h=150&auto=format&fit=crop&crop=face" 
                    alt="Dr. Sarah Johnson"
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover mr-3 sm:mr-4"
                  />
                  <div>
                    <div className="font-semibold text-foreground text-sm sm:text-base">Dr. Sarah Johnson</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">General Dentist</div>
                    <div className="text-xs sm:text-sm text-muted-foreground/70">Smile Care Dental</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 sm:p-8 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-4 sm:mb-6 italic text-sm sm:text-base">"The scheduling system eliminated double bookings completely. Our appointment management has never been more organized."</p>
                
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&h=150&auto=format&fit=crop&crop=face" 
                    alt="Dr. Michael Chen"
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover mr-3 sm:mr-4"
                  />
                  <div>
                    <div className="font-semibold text-foreground text-sm sm:text-base">Dr. Michael Chen</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Orthodontist</div>
                    <div className="text-xs sm:text-sm text-muted-foreground/70">Perfect Smile Orthodontics</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 sm:p-8 hover:bg-gray-100 transition-colors">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-4 sm:mb-6 italic text-sm sm:text-base">"The financial tracking features helped us increase revenue by 30%. The analytics provide insights we never had before."</p>
                
                <div className="flex items-center">
                  <img 
                    src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" 
                    alt="Dr. Emily Rodriguez"
                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover mr-3 sm:mr-4"
                  />
                  <div>
                    <div className="font-semibold text-foreground text-sm sm:text-base">Dr. Emily Rodriguez</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Oral Surgeon</div>
                    <div className="text-xs sm:text-sm text-muted-foreground/70">Advanced Dental Surgery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-muted py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground px-4 sm:px-0">
                Choose the plan that fits your practice size and needs
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1 border border-border">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Starter</h3>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">Perfect for small practices</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">₹4,099</span>
                    <span className="text-muted-foreground ml-2 text-sm sm:text-base">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm sm:text-base">Up to 500 patients</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm sm:text-base">Basic scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm sm:text-base">Patient records</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm sm:text-base">Email support</span>
                  </li>
                </ul>

                <Button className="w-full text-sm sm:text-base" variant="outline">
                  Get Started
                </Button>
              </div>

              <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ring-2 ring-primary relative sm:col-span-2 lg:col-span-1 border border-border">
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
                
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Professional</h3>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">Most popular for growing practices</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">₹8,299</span>
                    <span className="text-muted-foreground ml-2 text-sm sm:text-base">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm sm:text-base">Unlimited patients</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm sm:text-base">Advanced scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm sm:text-base">Prescription management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm sm:text-base">Financial tracking</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 sm:h-5 w-4 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm sm:text-base">Priority support</span>
                  </li>
                </ul>

                <Button className="w-full text-sm sm:text-base">
                  Get Started
                </Button>
              </div>

              <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1 border border-border">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Enterprise</h3>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">For large practices and clinics</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">₹16,499</span>
                    <span className="text-muted-foreground ml-2 text-sm sm:text-base">/month</span>
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

         {/* Careers Section */}
         <section id="careers" className="bg-background py-16 sm:py-20">
           <div className="mx-auto max-w-7xl px-4 sm:px-6">
             <div className="text-center mb-12 sm:mb-16">
               <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                 Join Our Team
               </h2>
               <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">
                 Be part of a team that's revolutionizing dental practice management. We're looking for passionate individuals to help us grow.
               </p>
             </div>

             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
               <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border">
                 <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Frontend Developer</h3>
                 <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4">Join our frontend team to build beautiful, responsive user interfaces that dental professionals love.</p>
                 <div className="flex flex-wrap gap-2">
                   <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">React</span>
                   <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">TypeScript</span>
                   <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Tailwind</span>
                 </div>
               </div>

               <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border">
                 <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Backend Developer</h3>
                 <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4">Build robust APIs and scalable systems that power our dental practice management platform.</p>
                 <div className="flex flex-wrap gap-2">
                   <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Node.js</span>
                   <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Python</span>
                   <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">PostgreSQL</span>
                 </div>
               </div>

               <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border">
                 <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Product Manager</h3>
                 <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4">Lead product strategy and work closely with dental professionals to understand their needs.</p>
                 <div className="flex flex-wrap gap-2">
                   <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Strategy</span>
                   <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">UX Research</span>
                   <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Analytics</span>
                 </div>
               </div>
             </div>

             <div className="text-center mt-12">
               <Button size="lg" className="px-8 py-3">
                 View All Openings
               </Button>
             </div>
           </div>
         </section>

         {/* Contact Section */}
         <section id="contact" className="bg-muted py-16 sm:py-20">
           <div className="mx-auto max-w-7xl px-4 sm:px-6">
             <div className="text-center mb-12 sm:mb-16">
               <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                 Get in Touch
               </h2>
               <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">
                 Have questions about Oral Nexa? Our team is here to help you get started.
               </p>
             </div>

             <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
               <div>
                 <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">Contact Information</h3>
                 <div className="space-y-6">
                   <div className="flex items-start space-x-4">
                     <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                       <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                       </svg>
                     </div>
                     <div>
                       <h4 className="font-semibold text-foreground">Address</h4>
                       <p className="text-muted-foreground">123 Dental Tech Street<br />Bangalore, Karnataka 560001</p>
                     </div>
                   </div>

                   <div className="flex items-start space-x-4">
                     <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                       <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                       </svg>
                     </div>
                     <div>
                       <h4 className="font-semibold text-foreground">Phone</h4>
                       <p className="text-muted-foreground">+91 98765 43210</p>
                     </div>
                   </div>

                   <div className="flex items-start space-x-4">
                     <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                       <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                       </svg>
                     </div>
                     <div>
                       <h4 className="font-semibold text-foreground">Email</h4>
                       <p className="text-muted-foreground">hello@oralnexa.com</p>
                     </div>
                   </div>
                 </div>
               </div>

               <div className="bg-card rounded-xl p-6 sm:p-8 shadow-lg border border-border">
                 <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">Send us a Message</h3>
                 <form className="space-y-4">
                   <div className="grid sm:grid-cols-2 gap-4">
                     <input
                       type="text"
                       placeholder="First Name"
                       className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     />
                     <input
                       type="text"
                       placeholder="Last Name"
                       className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                     />
                   </div>
                   <input
                     type="email"
                     placeholder="Email Address"
                     className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   />
                   <textarea
                     placeholder="Your Message"
                     rows={4}
                     className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                   ></textarea>
                   <Button type="submit" className="w-full">
                     Send Message
                   </Button>
                 </form>
               </div>
             </div>
           </div>
         </section>



        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
              {/* Company Info */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center mb-6">
                  <BrandLogo height={60} className="scale-125 origin-left" />
                </div>
                <p className="text-gray-400 mb-6 text-sm sm:text-base leading-relaxed">
                  Modern dental practice management software designed for efficiency and growth. Streamline your practice operations with our comprehensive solution.
                </p>
                <div className="flex space-x-3 sm:space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:scale-105 cursor-pointer transition-all duration-300 group">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 hover:scale-105 cursor-pointer transition-all duration-300 group">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 hover:scale-105 cursor-pointer transition-all duration-300 group">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 hover:scale-105 cursor-pointer transition-all duration-300 group">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Product Links */}
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-6 text-white">Product</h4>
                <ul className="space-y-3 text-gray-400">
                                     <li>
                     <a href="#features" onClick={(e) => handleFooterClick('#features', e)} className="hover:text-white transition-colors duration-300 flex items-center group">
                       <span className="group-hover:translate-x-1 transition-transform duration-300">Features</span>
                     </a>
                   </li>
                   <li>
                     <a href="#pricing" onClick={(e) => handleFooterClick('#pricing', e)} className="hover:text-white transition-colors duration-300 flex items-center group">
                       <span className="group-hover:translate-x-1 transition-transform duration-300">Pricing</span>
                     </a>
                   </li>
                   <li>
                     <a href="#testimonials" onClick={(e) => handleFooterClick('#testimonials', e)} className="hover:text-white transition-colors duration-300 flex items-center group">
                       <span className="group-hover:translate-x-1 transition-transform duration-300">Testimonials</span>
                     </a>
                   </li>
                  <li>
                    <a href="/blog" className="hover:text-white transition-colors duration-300 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">Blog</span>
                    </a>
                  </li>
                  <li>
                    <a href="#support" className="hover:text-white transition-colors duration-300 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">Security</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company Links */}
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
                <ul className="space-y-3 text-gray-400">
                                                         <li>
                      <a href="/about" className="hover:text-white transition-colors duration-300 flex items-center group">
                        <span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span>
                      </a>
                    </li>
                    <li>
                      <a href="/blog" className="hover:text-white transition-colors duration-300 flex items-center group">
                        <span className="group-hover:translate-x-1 transition-transform duration-300">Blog</span>
                      </a>
                    </li>
                    <li>
                      <a href="#careers" onClick={(e) => handleFooterClick('#careers', e)} className="hover:text-white transition-colors duration-300 flex items-center group">
                        <span className="group-hover:translate-x-1 transition-transform duration-300">Careers</span>
                      </a>
                    </li>
                    <li>
                      <a href="#contact" onClick={(e) => handleFooterClick('#contact', e)} className="hover:text-white transition-colors duration-300 flex items-center group">
                        <span className="group-hover:translate-x-1 transition-transform duration-300">Contact</span>
                      </a>
                    </li>
                    
                </ul>
              </div>

              {/* Support Links */}
              <div className="col-span-1">
                <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
                <ul className="space-y-3 text-gray-400">
                                     <li>
                     <a href="#help" onClick={(e) => handleFooterClick('#help', e)} className="hover:text-white transition-colors duration-300 flex items-center group">
                       <span className="group-hover:translate-x-1 transition-transform duration-300">Help Center</span>
                     </a>
                   </li>
                   <li>
                     <a href="#docs" onClick={(e) => handleFooterClick('#docs', e)} className="hover:text-white transition-colors duration-300 flex items-center group">
                       <span className="group-hover:translate-x-1 transition-transform duration-300">Documentation</span>
                     </a>
                   </li>
                   <li>
                     <a href="#training" onClick={(e) => handleFooterClick('#training', e)} className="hover:text-white transition-colors duration-300 flex items-center group">
                       <span className="group-hover:translate-x-1 transition-transform duration-300">Training</span>
                     </a>
                   </li>
                   <li>
                     <a href="#status" onClick={(e) => handleFooterClick('#status', e)} className="hover:text-white transition-colors duration-300 flex items-center group">
                       <span className="group-hover:translate-x-1 transition-transform duration-300">System Status</span>
                     </a>
                   </li>
                   <li>
                     <a href="#contact" onClick={(e) => handleFooterClick('#contact', e)} className="hover:text-white transition-colors duration-300 flex items-center group">
                       <span className="group-hover:translate-x-1 transition-transform duration-300">Contact Support</span>
                     </a>
                   </li>
                </ul>
              </div>
            </div>



            {/* Bottom Footer */}
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="text-center lg:text-left">
                <p className="text-gray-400 text-sm">
                  © 2025 Oral Nexa. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Built by <a href="https://heliumpromotion.online/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors duration-300">Helium Promotion</a> • SaaS product owned by Helium Promotion
                </p>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-end gap-4 lg:gap-6 text-sm">
                <a href="#privacy" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
                <a href="#terms" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
                <a href="#cookies" className="text-gray-400 hover:text-white transition-colors duration-300">Cookie Policy</a>
                <a href="#sitemap" className="text-gray-400 hover:text-white transition-colors duration-300">Sitemap</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}



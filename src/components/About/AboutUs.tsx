import React from 'react';
import { Users, Target, Award, Heart, Shield, Zap } from 'lucide-react';
import { BrandLogo } from '@/components/ui/brand-logo';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2">
              <BrandLogo height={60} className="scale-125 origin-left" />
            </a>
            <a 
              href="/" 
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            About Oral Nexa
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
            Revolutionizing dental practice management with innovative technology and unwavering commitment to healthcare excellence.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To empower dental professionals with cutting-edge technology that streamlines operations, 
                enhances patient care, and drives practice growth. We believe every dental practice deserves 
                access to world-class management tools.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                By combining advanced software solutions with deep industry expertise, we're helping 
                thousands of dental practices focus on what matters most: delivering exceptional patient care.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <Target className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become the global standard for dental practice management, creating a future where 
                every dental professional can operate efficiently, profitably, and with complete peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape the solutions we create for dental professionals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Patient-Centric</h3>
              <p className="text-gray-600">
                Every feature we build prioritizes patient care and experience, ensuring dental professionals 
                can deliver the best possible outcomes.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Security First</h3>
              <p className="text-gray-600">
                We maintain the highest standards of data security and HIPAA compliance to protect 
                sensitive patient information.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate and evolve our platform to meet the changing needs of 
                modern dental practices.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Collaboration</h3>
              <p className="text-gray-600">
                We work closely with dental professionals to understand their challenges and 
                develop solutions that truly make a difference.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our product, from user experience 
                to customer support and beyond.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Results-Driven</h3>
              <p className="text-gray-600">
                Our success is measured by the success of our customers - their growth, 
                efficiency, and patient satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

             {/* Story */}
       <section className="bg-gray-50 py-16 sm:py-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="max-w-4xl mx-auto">
             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
               Our Story
             </h2>
             <p className="text-lg text-gray-600 mb-6 leading-relaxed">
               Oral Nexa was founded in 2024 by a team of dental professionals and technology experts 
               who recognized the need for better practice management solutions. After experiencing 
               firsthand the challenges of running dental practices with outdated systems, we set out 
               to create something better.
             </p>
             <p className="text-lg text-gray-600 mb-6 leading-relaxed">
               What started as a small startup has grown into a trusted partner for thousands of 
               dental practices across the country. Our journey has been driven by one simple belief: 
               dental professionals deserve technology that works as hard as they do.
             </p>
             <p className="text-lg text-gray-600 leading-relaxed">
               Today, we continue to innovate and expand our platform, always keeping the needs of 
               dental professionals and their patients at the heart of everything we do.
             </p>
           </div>
         </div>
       </section>



      {/* CTA */}
      <section className="bg-blue-600 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Join the Oral Nexa Family
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Ready to transform your dental practice? Start your journey with Oral Nexa today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/#pricing" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

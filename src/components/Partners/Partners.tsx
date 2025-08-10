import React from 'react';
import { Handshake, Users, Award, TrendingUp, Shield, Zap, Star, Check } from 'lucide-react';
import { BrandLogo } from '@/components/ui/brand-logo';

export default function Partners() {
  const partnerTypes = [
    {
      title: 'Technology Partners',
      description: 'Integrate your software with Oral Nexa to provide comprehensive solutions.',
      benefits: [
        'API access and documentation',
        'Joint marketing opportunities',
        'Technical support and training',
        'Revenue sharing programs'
      ],
      icon: Zap
    },
    {
      title: 'Dental Equipment Partners',
      description: 'Connect your dental equipment with our practice management software.',
      benefits: [
        'Hardware integration support',
        'Certified partner status',
        'Training and certification',
        'Joint customer support'
      ],
      icon: Shield
    },
    {
      title: 'Consulting Partners',
      description: 'Help dental practices implement and optimize Oral Nexa solutions.',
      benefits: [
        'Certified consultant program',
        'Exclusive training materials',
        'Lead generation support',
        'Commission structure'
      ],
      icon: Users
    },
    {
      title: 'Reseller Partners',
      description: 'Sell Oral Nexa solutions to dental practices in your region.',
      benefits: [
        'Competitive pricing',
        'Marketing materials and support',
        'Sales training and enablement',
        'Territory protection'
      ],
      icon: TrendingUp
    }
  ];

  const currentPartners = [
    {
      name: 'DentalTech Solutions',
      logo: 'DT',
      category: 'Technology Partner',
      description: 'Leading provider of dental imaging software'
    },
    {
      name: 'SmileCare Equipment',
      logo: 'SC',
      category: 'Equipment Partner',
      description: 'Premium dental equipment manufacturer'
    },
    {
      name: 'Practice Growth Advisors',
      logo: 'PGA',
      category: 'Consulting Partner',
      description: 'Dental practice management consultants'
    },
    {
      name: 'Digital Dental Systems',
      logo: 'DDS',
      category: 'Technology Partner',
      description: 'Digital workflow solutions for dental practices'
    }
  ];

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
            Partner with Oral Nexa
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
            Join our ecosystem of partners and help shape the future of dental practice management.
          </p>
        </div>
      </div>

      {/* Partnership Benefits */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Why Partner with Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join a growing network of partners who are helping dental practices succeed with innovative technology.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Handshake className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mutual Growth</h3>
              <p className="text-gray-600">
                Grow your business alongside ours with shared success and revenue opportunities.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expanded Reach</h3>
              <p className="text-gray-600">
                Access our network of 10,000+ dental practices and expand your market presence.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                Collaborate on cutting-edge solutions and shape the future of dental technology.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Support</h3>
              <p className="text-gray-600">
                Receive comprehensive support, training, and resources to ensure your success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Partnership Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the partnership model that best fits your business and goals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {partnerTypes.map((partner, index) => {
              const IconComponent = partner.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{partner.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{partner.description}</p>
                  <h4 className="font-semibold text-gray-900 mb-4">Key Benefits:</h4>
                  <ul className="space-y-3">
                    {partner.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Current Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet some of the trusted partners who are already working with us to serve dental practices.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentPartners.map((partner, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-lg">{partner.logo}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{partner.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-3">{partner.category}</p>
                <p className="text-gray-600 text-sm">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              How to Become a Partner
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting started is easy. Follow these simple steps to join our partner network.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Initial Contact</h3>
              <p className="text-gray-600">
                Reach out to our partnership team to discuss your business and partnership goals.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Evaluation</h3>
              <p className="text-gray-600">
                We'll evaluate the partnership opportunity and determine the best fit for both parties.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Agreement</h3>
              <p className="text-gray-600">
                Sign the partnership agreement and begin the onboarding and training process.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Launch</h3>
              <p className="text-gray-600">
                Start working together to serve dental practices and grow your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Partner with Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss how we can work together to serve dental practices and grow our businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Partnership Team
            </a>
            <a 
              href="/about" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

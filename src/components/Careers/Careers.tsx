import React from 'react';
import { MapPin, Clock, DollarSign, Users, Heart, Zap, Shield, Award } from 'lucide-react';
import { BrandLogo } from '@/components/ui/brand-logo';

export default function Careers() {
  const jobListings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote / San Francisco',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      description: 'Join our engineering team to build intuitive and responsive user interfaces for dental practice management software.',
      requirements: [
        '5+ years of experience with React/TypeScript',
        'Strong understanding of modern web technologies',
        'Experience with healthcare software (preferred)',
        'Excellent problem-solving skills'
      ]
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$130,000 - $160,000',
      description: 'Lead product strategy and development for our dental practice management platform.',
      requirements: [
        '3+ years of product management experience',
        'Background in healthcare or SaaS (preferred)',
        'Strong analytical and communication skills',
        'Experience with user research and data analysis'
      ]
    },
    {
      id: 3,
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80,000 - $100,000',
      description: 'Help dental practices maximize the value of Oral Nexa and ensure their success.',
      requirements: [
        '2+ years in customer success or account management',
        'Healthcare industry experience (preferred)',
        'Excellent communication and problem-solving skills',
        'Ability to work with technical and non-technical users'
      ]
    },
    {
      id: 4,
      title: 'Sales Development Representative',
      department: 'Sales',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$60,000 - $80,000 + Commission',
      description: 'Generate new business opportunities and help grow our customer base.',
      requirements: [
        '1+ years of sales experience',
        'Strong communication and interpersonal skills',
        'Healthcare or SaaS experience (preferred)',
        'Self-motivated and results-driven'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2">
              <BrandLogo height={40} />
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
            Join Our Team
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
            Help us revolutionize dental practice management and make a real impact in healthcare technology.
          </p>
        </div>
      </div>

      {/* Culture Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Why Work at Oral Nexa?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're building a team of passionate individuals who want to make a difference in healthcare technology.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Meaningful Impact</h3>
              <p className="text-gray-600">
                Help thousands of dental practices provide better care to millions of patients.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                Work with cutting-edge technology and help shape the future of healthcare software.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Great Team</h3>
              <p className="text-gray-600">
                Collaborate with talented, passionate individuals who care about making a difference.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Growth</h3>
              <p className="text-gray-600">
                Rapidly growing company with opportunities for career advancement and skill development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Benefits & Perks
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe in taking care of our team with comprehensive benefits and a great work environment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Health & Wellness</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Comprehensive health insurance</li>
                <li>• Dental and vision coverage</li>
                <li>• Mental health support</li>
                <li>• Gym membership reimbursement</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Work-Life Balance</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Flexible work arrangements</li>
                <li>• Unlimited PTO</li>
                <li>• Remote work options</li>
                <li>• Paid parental leave</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Growth</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Learning and development budget</li>
                <li>• Conference attendance</li>
                <li>• Mentorship programs</li>
                <li>• Career advancement opportunities</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Financial Benefits</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Competitive salary</li>
                <li>• Equity options</li>
                <li>• 401(k) matching</li>
                <li>• Performance bonuses</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Team & Culture</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Regular team events</li>
                <li>• Collaborative environment</li>
                <li>• Recognition programs</li>
                <li>• Inclusive workplace</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Office Perks</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Modern office space</li>
                <li>• Free snacks and drinks</li>
                <li>• Standing desks</li>
                <li>• Relaxation areas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Open Positions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to join our mission? Check out our current openings and find your perfect role.
            </p>
          </div>

          <div className="space-y-8">
            {jobListings.map((job) => (
              <div key={job.id} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-blue-600 font-medium mb-2">{job.department}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4 lg:mt-0">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{job.type}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span className="text-sm">{job.salary}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{job.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Don't see a position that fits? We're always looking for talented individuals to join our team.
            </p>
            <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Send General Application
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join us in revolutionizing dental practice management and helping healthcare professionals provide better care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
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

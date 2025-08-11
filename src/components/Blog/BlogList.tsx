import React from 'react';
import { blogPosts } from './blogData';
import { ImageWithFallback } from './ImageWithFallback';
import { Link } from 'react-router-dom';
import { BrandLogo } from '@/components/ui/brand-logo';

export default function BlogList() {
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
            Dental Practice Blog
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
            Insights, guides, and actionable content for growing, secure dental practices.
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1">
                <ImageWithFallback src={post.cover} alt={post.title} className="w-full h-48 sm:h-56 object-cover" />
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-sm text-blue-600 font-semibold mb-2">{new Date(post.date).toLocaleDateString()}</p>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">{post.title}</h2>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm flex-wrap gap-3 mt-auto">
                    <span className="text-gray-500 font-medium">By {post.author}</span>
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="text-blue-600 hover:text-blue-700 font-semibold transition-colors flex items-center group"
                    >
                      Read more 
                      <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Stay Updated with Dental Insights
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Get the latest tips, trends, and best practices delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}



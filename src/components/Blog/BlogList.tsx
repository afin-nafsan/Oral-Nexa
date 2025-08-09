import React from 'react';
import { blogPosts } from './blogData';
import { ImageWithFallback } from './ImageWithFallback';
import { Link } from 'react-router-dom';

export default function BlogList() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <header className="mb-8 sm:mb-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Blogs</h1>
          <a href="/" className="inline-flex items-center px-4 py-2 rounded-lg border text-sm hover:bg-gray-50">← Back to Home</a>
        </div>
        <div className="mt-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Insights & Guides</h2>
          <p className="text-gray-600">Actionable content for growing, secure dental practices.</p>
        </div>
      </header>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.slug} className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            <ImageWithFallback src={post.cover} alt={post.title} className="w-full h-40 sm:h-48 md:h-56 object-cover" />
            <div className="p-4">
              <p className="text-xs text-blue-600 font-medium">{new Date(post.date).toLocaleDateString()}</p>
              <h2 className="mt-1 text-lg sm:text-xl font-semibold text-gray-900 break-words">{post.title}</h2>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-sm flex-wrap gap-3">
                <span className="text-gray-500">By {post.author}</span>
                <Link to={`/blog/${post.slug}`} className="text-blue-600 hover:underline">Read more →</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}



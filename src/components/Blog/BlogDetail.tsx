import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from './blogData';
import { ImageWithFallback } from './ImageWithFallback';
import { SharedNavigation } from '@/components/ui/shared-navigation';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SharedNavigation />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center mt-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors" 
            to="/blog"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    );
  }

      return (
      <div className="min-h-screen bg-gray-50">
        <SharedNavigation />

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 mt-16">
        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6">
            <p className="text-sm text-blue-600 font-semibold mb-2">
              {new Date(post.date).toLocaleDateString()} • By {post.author}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <ImageWithFallback 
            src={post.cover} 
            alt={post.title} 
            className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl border border-gray-200 shadow-lg" 
          />
        </header>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          {post.sections.map((s, idx) => (
            <section key={idx} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                {s.heading}
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                {s.body.split('\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-base sm:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
              {s.image && (
                <div className="my-8">
                  <ImageWithFallback 
                    src={s.image} 
                    alt={s.heading} 
                    className="w-full rounded-xl border border-gray-200 shadow-lg" 
                  />
                </div>
              )}
              {s.linkUrl && (
                <div className="mt-6">
                  <a 
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors" 
                    href={s.linkUrl} 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    {s.linkText || 'Learn more'} →
                  </a>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              Published on {new Date(post.date).toLocaleDateString()} by {post.author}
            </div>
            <Link 
              to="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              ← Back to all posts
            </Link>
          </div>
        </footer>
      </article>

      {/* Related Posts CTA */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Explore More Insights
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Discover more articles to help grow your dental practice.
          </p>
          <Link 
            to="/blog" 
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors text-lg"
          >
            Browse All Articles
          </Link>
        </div>
      </section>
    </div>
  );
}



import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from './blogData';
import { ImageWithFallback } from './ImageWithFallback';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto">
        <p className="text-gray-600">Post not found.</p>
        <Link className="text-blue-600 hover:underline" to="/blog">Back to all posts</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <header className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <h1 className="w-full text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">Blogs</h1>
        <ImageWithFallback src={post.cover} alt={post.title} className="h-56 sm:h-64 w-full object-cover rounded-xl border" />
        <p className="mt-4 text-xs text-blue-600 font-medium">{new Date(post.date).toLocaleDateString()} • {post.author}</p>
        <h2 className="mt-1 text-3xl font-bold text-gray-900">{post.title}</h2>
        <p className="mt-2 text-gray-600">{post.excerpt}</p>
        <a href="/" className="mt-3 inline-flex items-center px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50">← Back to Home</a>
      </header>

      <div className="space-y-8">
        {post.sections.map((s, idx) => (
          <section key={idx}>
            <h2 className="text-2xl font-semibold text-gray-900">{s.heading}</h2>
            <p className="mt-2 text-gray-700 leading-relaxed">{s.body}</p>
            {s.image && (
              <ImageWithFallback src={s.image} alt={s.heading} className="mt-3 rounded-lg border w-full object-cover" />
            )}
            {s.linkUrl && (
              <a className="mt-3 inline-block text-blue-600 hover:underline" href={s.linkUrl} target="_blank" rel="noreferrer">
                {s.linkText || 'Learn more'} →
              </a>
            )}
          </section>
        ))}
      </div>

      <footer className="mt-10 flex items-center justify-between">
        <Link className="text-blue-600 hover:underline" to="/blog">← Back to all posts</Link>
        <a className="text-sm text-gray-500 hover:text-gray-700" href="/">Return home</a>
      </footer>
    </article>
  );
}



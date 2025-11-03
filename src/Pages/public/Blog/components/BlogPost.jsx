// src/components/Blog/BlogPost.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Clock, User, Calendar, Share2, MessageCircle, ArrowLeft } from 'lucide-react';
import BlogCard from './BlogCard';

const BlogPost = () => {
  const { slug } = useParams();
  const [showShareOptions, setShowShareOptions] = useState(false);

  const { data: post, isLoading } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog-posts/${slug}`);
      return response.json();
    }
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ['relatedPosts', slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog-posts/related/${slug}`);
      return response.json();
    },
    enabled: !!post
  });

  const sharePost = (platform) => {
    const url = window.location.href;
    const title = post.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog" className="btn btn-primary">
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-base-100">
      {/* Back to Blog */}
      <div className="container mx-auto px-4 pt-8">
        <Link to="/blog" className="btn btn-ghost btn-sm mb-4">
          <ArrowLeft size={16} />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge badge-primary badge-lg mb-4">
            {post.category}
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-base-content/70 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-base-content/70 mb-8">
            <div className="flex items-center gap-2">
              <User size={20} />
              <span className="font-semibold">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-xl mb-8"
          />

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {post.tags.map(tag => (
              <span key={tag} className="badge badge-outline badge-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {/* This would be your actual article content */}
            <div className="bg-base-200 rounded-lg p-8 mb-8">
              <p className="text-lg leading-relaxed">
                This is where your full blog post content would be displayed. 
                In a real implementation, this would come from your CMS or database 
                and could include rich text, images, videos, and other embedded content.
              </p>
            </div>
          </div>

          {/* Share Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-8 border-t border-b border-base-300">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Share this article:</span>
            </div>
            <div className="flex gap-2">
              {['twitter', 'facebook', 'linkedin'].map(platform => (
                <button
                  key={platform}
                  className="btn btn-ghost btn-sm capitalize"
                  onClick={() => sharePost(platform)}
                >
                  {platform}
                </button>
              ))}
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setShowShareOptions(!showShareOptions)}
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <section className="py-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle size={24} />
              Discussion
            </h2>
            <div className="bg-base-200 rounded-lg p-8 text-center">
              <p className="text-base-content/70 mb-4">
                Join the conversation about roommate living
              </p>
              <button className="btn btn-primary">
                Add Comment
              </button>
            </div>
          </section>

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <section className="py-8">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.slice(0, 2).map(relatedPost => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </section>
          )}

          {/* Call to Action */}
          <section className="py-8 text-center">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title justify-center text-2xl mb-4">
                  Ready to Find Your Perfect Roommate?
                </h2>
                <p className="text-lg mb-6">
                  Put these tips into practice and create your profile today!
                </p>
                <div className="card-actions justify-center gap-4">
                  <Link to="/listings" className="btn btn-primary btn-lg">
                    Browse Listings
                  </Link>
                  <Link to="/create-listing" className="btn btn-secondary btn-lg">
                    Create Listing
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
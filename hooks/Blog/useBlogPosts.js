// src/hooks/useBlogPosts.js
import { useQuery } from '@tanstack/react-query';

// Mock data - replace with actual API calls
const mockBlogPosts = [
  {
    id: 1,
    slug: '10-questions-must-ask-roommate-viewing',
    title: '10 Questions You MUST Ask on a Roommate Viewing',
    excerpt: 'Don\'t forget these crucial questions when meeting potential roommates to ensure a perfect match.',
    content: 'Full article content here...',
    image: '/api/placeholder/800/400',
    author: 'The Roommate Team',
    publishedAt: '2024-01-15',
    readTime: '5 min read',
    category: 'Tips for Seekers',
    tags: ['viewing', 'questions', 'interview', 'screening']
  },
  {
    id: 2,
    slug: 'write-listing-attracts-great-roommates',
    title: 'How to Write a Listing That Attracts Great Roommates',
    excerpt: 'Learn the secrets to creating a compelling listing that stands out and attracts quality roommates.',
    image: '/api/placeholder/800/400',
    author: 'The Roommate Team',
    publishedAt: '2024-01-12',
    readTime: '7 min read',
    category: 'Advice for Providers',
    tags: ['listing', 'attraction', 'quality', 'screening']
  }
];

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        posts: mockBlogPosts,
        categories: ['Tips for Seekers', 'Advice for Providers', 'City Guides', 'Safety & Trust', 'Decorating on a Budget'],
        popularPosts: mockBlogPosts.slice(0, 3)
      };
    }
  });
};
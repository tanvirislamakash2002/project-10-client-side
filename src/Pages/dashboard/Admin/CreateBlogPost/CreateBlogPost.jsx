// src/components/Admin/CreateBlogPost.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, Upload, X } from 'lucide-react';

const CreateBlogPost = () => {
  const [imagePreview, setImagePreview] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Mutation for creating blog post
  const createPostMutation = useMutation({
    mutationFn: async (postData) => {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['blogPosts']);
      reset();
      setTags([]);
      setImagePreview('');
      alert('Blog post created successfully!');
    },
    onError: (error) => {
      alert('Error creating post: ' + error.message);
    }
  });

  const onSubmit = (data) => {
    const postData = {
      ...data,
      tags: tags,
      readTime: data.readTime || '5 min read',
      status: data.status || 'published'
    };
    
    createPostMutation.mutate(postData);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const categories = [
    'Tips for Seekers',
    'Advice for Providers', 
    'For Both',
    'City Guides',
    'Safety & Trust',
    'Decorating on a Budget'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-base-100 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Title *</span>
            </label>
            <input
              type="text"
              placeholder="Enter blog post title..."
              className="input input-bordered w-full"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && (
              <span className="text-error text-sm mt-1">{errors.title.message}</span>
            )}
          </div>

          {/* Excerpt */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Excerpt *</span>
            </label>
            <textarea
              placeholder="Brief description of the blog post..."
              className="textarea textarea-bordered h-24"
              {...register('excerpt', { required: 'Excerpt is required' })}
            />
            {errors.excerpt && (
              <span className="text-error text-sm mt-1">{errors.excerpt.message}</span>
            )}
          </div>

          {/* Content */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Content *</span>
            </label>
            <textarea
              placeholder="Write your blog post content here..."
              className="textarea textarea-bordered h-64"
              {...register('content', { required: 'Content is required' })}
            />
            {errors.content && (
              <span className="text-error text-sm mt-1">{errors.content.message}</span>
            )}
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Featured Image URL</span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full"
              {...register('image')}
              onChange={(e) => setImagePreview(e.target.value)}
            />
            {imagePreview && (
              <div className="mt-2">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Category *</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register('category', { required: 'Category is required' })}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && (
              <span className="text-error text-sm mt-1">{errors.category.message}</span>
            )}
          </div>

          {/* Tags */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Tags</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add a tag..."
                className="input input-bordered flex-1"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
              />
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={addTag}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span key={tag} className="badge badge-primary gap-1">
                  {tag}
                  <button 
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-error"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Read Time */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Read Time</span>
            </label>
            <input
              type="text"
              placeholder="5 min read"
              className="input input-bordered w-full"
              {...register('readTime')}
            />
          </div>

          {/* Author */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Author</span>
            </label>
            <input
              type="text"
              placeholder="The Roommate Team"
              className="input input-bordered w-full"
              {...register('author')}
            />
          </div>

          {/* Status */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Status</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register('status')}
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="form-control pt-4">
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              disabled={createPostMutation.isLoading}
            >
              {createPostMutation.isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Creating...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Create Blog Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPost;
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Save, 
  Eye, 
  Calendar, 
  Image as ImageIcon, 
  Tag, 
  Settings, 
  Search, 
  X,
  Clock,
  FileText,
  Upload,
  Link as LinkIcon,
  Star,
  MessageSquare,
  Share2,
  Bold,
  Italic,
  List,
  AlignLeft
} from 'lucide-react';

 const CreateBlogPost = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [imagePreview, setImagePreview] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [seoKeywords, setSeoKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [readTime, setReadTime] = useState(0);
  const [lastSaved, setLastSaved] = useState(null);
  const [schedulePublish, setSchedulePublish] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
      status: 'draft',
      featured: false,
      commentsEnabled: true,
      author: {
        name: 'Admin User',
        avatar: ''
      }
    }
  });

  const title = watch('title');
  const content = watch('content');
  const metaDescription = watch('meta.description');

  // Auto-generate slug from title
  useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setValue('slug', slug);
    }
  }, [title, setValue]);

  // Calculate word count and reading time
  useEffect(() => {
    if (content) {
      const words = content.trim().split(/\s+/).length;
      setWordCount(words);
      setReadTime(Math.ceil(words / 200)); // Average reading speed: 200 words/min
    }
  }, [content]);

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
      setLastSaved(new Date());
      alert('Blog post created successfully!');
    },
    onError: (error) => {
      alert('Error creating post: ' + error.message);
    }
  });
  const onSubmit = (data) => {
    const postData = {
      ...data,
      tags,
      categories,
      meta: {
        ...data.meta,
        keywords: seoKeywords
      },
      stats: {
        views: 0,
        likes: 0,
        shares: 0
      }
    };
    console.log("last obj",postData);
    createPostMutation.mutate(postData);
  };

  const saveDraft = () => {
    const formData = watch();
    const draftData = {
      ...formData,
      status: 'draft',
      tags,
      categories,
      meta: {
        ...formData.meta,
        keywords: seoKeywords
      }
    };
    createPostMutation.mutate(draftData);
  };

  // Tag management
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Category management
  const addCategory = () => {
    if (categoryInput.trim() && !categories.includes(categoryInput.trim())) {
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput('');
    }
  };

  const removeCategory = (catToRemove) => {
    setCategories(categories.filter(cat => cat !== catToRemove));
  };

  // SEO Keywords management
  const addKeyword = () => {
    if (keywordInput.trim() && !seoKeywords.includes(keywordInput.trim())) {
      setSeoKeywords([...seoKeywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setSeoKeywords(seoKeywords.filter(kw => kw !== keywordToRemove));
  };

  const predefinedCategories = [
    'Tips for Seekers',
    'Advice for Providers', 
    'For Both',
    'City Guides',
    'Safety & Trust',
    'Decorating on a Budget',
    'Legal Advice',
    'Moving Tips'
  ];

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FileText },
    { id: 'content', label: 'Content', icon: AlignLeft },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'seo', label: 'SEO & Meta', icon: Search },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-base-200 dark:bg-base-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-base-100 dark:bg-base-200 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-base-content dark:text-base-content">
                Create New Blog Post
              </h1>
              <p className="text-text-muted dark:text-text-muted mt-1">
                Craft engaging content for your community
              </p>
            </div>
            <div className="flex items-center gap-3">
              {lastSaved && (
                <span className="text-sm text-text-muted dark:text-text-muted">
                  <Clock size={14} className="inline mr-1" />
                  Saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
              <button 
                type="button"
                onClick={saveDraft}
                className="btn btn-outline btn-sm"
                disabled={createPostMutation.isLoading}
              >
                <Save size={16} />
                Save Draft
              </button>
              <button 
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="btn btn-outline btn-sm"
              >
                <Eye size={16} />
                Preview
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-base-100 dark:bg-base-200 rounded-lg shadow-lg">
              {/* Tab Navigation */}
              <div className="border-b border-section-border dark:border-section-border">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-primary dark:text-primary border-b-2 border-primary'
                          : 'text-text-muted dark:text-text-muted hover:text-base-content dark:hover:text-base-content'
                      }`}
                    >
                      <tab.icon size={18} />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                {/* Basic Info Tab */}
                {activeTab === 'basic' && (
                  <div className="space-y-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content dark:text-base-content">
                          Title *
                        </span>
                        <span className="label-text-alt text-text-muted dark:text-text-muted">
                          {title?.length || 0}/100
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter an engaging title..."
                        className="input input-bordered input-lg w-full bg-base-100 dark:bg-base-300 text-base-content dark:text-base-content"
                        {...register('title', { 
                          required: 'Title is required',
                          maxLength: { value: 100, message: 'Title must be less than 100 characters' }
                        })}
                      />
                      {errors.title && (
                        <span className="text-error text-sm mt-1">{errors.title.message}</span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content dark:text-base-content">
                          URL Slug *
                        </span>
                      </label>
                      <div className="join w-full">
                        <span className="join-item btn btn-disabled bg-base-200 dark:bg-base-300">
                          /blog/
                        </span>
                        <input
                          type="text"
                          placeholder="url-friendly-slug"
                          className="input input-bordered join-item flex-1 bg-base-100 dark:bg-base-300 text-base-content dark:text-base-content"
                          {...register('slug', { required: 'Slug is required' })}
                        />
                      </div>
                      {errors.slug && (
                        <span className="text-error text-sm mt-1">{errors.slug.message}</span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content dark:text-base-content">
                          Excerpt/Summary *
                        </span>
                        <span className="label-text-alt text-text-muted dark:text-text-muted">
                          {watch('excerpt')?.length || 0}/200
                        </span>
                      </label>
                      <textarea
                        placeholder="Brief description for preview cards and social sharing..."
                        className="textarea textarea-bordered h-24 bg-base-100 dark:bg-base-300 text-base-content dark:text-base-content"
                        {...register('excerpt', { 
                          required: 'Excerpt is required',
                          maxLength: { value: 200, message: 'Excerpt must be less than 200 characters' }
                        })}
                      />
                      {errors.excerpt && (
                        <span className="text-error text-sm mt-1">{errors.excerpt.message}</span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content dark:text-base-content">
                          Author Name
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="The Roommate Team"
                        className="input input-bordered w-full bg-base-100 dark:bg-base-300 text-base-content dark:text-base-content"
                        {...register('author.name')}
                      />
                    </div>
                  </div>
                )}

                {/* Content Tab */}
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <button type="button" className="btn btn-sm btn-outline">
                        <Bold size={16} /> Bold
                      </button>
                      <button type="button" className="btn btn-sm btn-outline">
                        <Italic size={16} /> Italic
                      </button>
                      <button type="button" className="btn btn-sm btn-outline">
                        <List size={16} /> List
                      </button>
                      <button type="button" className="btn btn-sm btn-outline">
                        <LinkIcon size={16} /> Link
                      </button>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content dark:text-base-content">
                          Content *
                        </span>
                      </label>
                      <textarea
                        placeholder="Write your blog post content here... You can use Markdown formatting."
                        className="textarea textarea-bordered h-96 font-mono bg-base-100 dark:bg-base-300 text-base-content dark:text-base-content"
                        {...register('content', { required: 'Content is required' })}
                      />
                      {errors.content && (
                        <span className="text-error text-sm mt-1">{errors.content.message}</span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content dark:text-base-content">
                          Categories
                        </span>
                      </label>
                      <div className="flex gap-2 mb-3">
                        <select
                          className="select select-bordered flex-1 bg-base-100 dark:bg-base-300 text-base-content dark:text-base-content"
                          value={categoryInput}
                          onChange={(e) => setCategoryInput(e.target.value)}
                        >
                          <option value="">Select a category</option>
                          {predefinedCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        <button 
                          type="button" 
                          className="btn btn-primary"
                          onClick={addCategory}
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                          <span key={cat} className="badge badge-lg badge-secondary gap-2">
                            {cat}
                            <button 
                              type="button"
                              onClick={() => removeCategory(cat)}
                              className="hover:text-error"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content dark:text-base-content">
                          Tags
                        </span>
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          placeholder="Add a tag..."
                          className="input input-bordered flex-1 bg-base-100 dark:bg-base-300 text-base-content dark:text-base-content"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <button 
                          type="button" 
                          className="btn btn-primary"
                          onClick={addTag}
                        >
                          <Tag size={16} /> Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                          <span key={tag} className="badge badge-primary gap-2">
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
                  </div>
                )}

                {/* Media Tab */}
                {activeTab === 'media' && (
                  <div className="space-y-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content dark:text-base-content">
                          Cover Image URL
                        </span>
                      </label>
                      <div className="join w-full">
                        <input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          className="input input-bordered join-item flex-1 bg-base-100 dark:bg-base-300 text-base-content dark:text-base-content"
                          {...register('coverImage')}
                          onChange={(e) => setImagePreview(e.target.value)}
                        />
                        <button type="button" className="btn btn-primary join-item">
                          <Upload size={16} /> Upload
                        </button>
                      </div>
                    </div>

                    {imagePreview && (
                      <div className="card bg-base-200 dark:bg-base-300 shadow-md">
                        <div className="card-body">
                          <h3 className="card-title text-base-content dark:text-base-content">Image Preview</h3>
                          <img 
                            src={imagePreview} 
                            alt="Cover preview" 
                            className="w-full max-h-96 object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    )}

                    <div className="alert alert-info">
                      <ImageIcon size={20} />
                      <span className="text-sm">
                        Recommended image size: 1200x630px for optimal social media sharing
                      </span>
                    </div>
                  </div>
                )}

                {/* SEO Tab */}
                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content dark:text-base-content">
                          Meta Title
                        </span>
                        <span className="label-text-alt text-text-muted dark:text-text-muted">
                          {watch('meta.title')?.length || 0}/60
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="SEO-optimized title (different from main title)"
                        className="input input-bordered w-full bg-base-100 dark:bg-base-300 text-base-content dark:text-base-content"
                        {...register('meta.title', {
                          maxLength: { value: 60, message: 'Meta title should be under 60 characters' }
                        })}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content dark:text-base-content">
                          Meta Description
                        </span>
                        <span className="label-text-alt text-text-muted dark:text-text-muted">
                          {metaDescription?.length || 0}/160
                        </span>
                      </label>
                      <textarea
                        placeholder="Brief description for search engines..."
                        className="textarea textarea-bordered h-24 bg-base-100 dark:bg-base-300 text-base-content dark:text-base-content"
                        {...register('meta.description', {
                          maxLength: { value: 160, message: 'Meta description should be under 160 characters' }
                        })}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content dark:text-base-content">
                          SEO Keywords
                        </span>
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          placeholder="Add keyword..."
                          className="input input-bordered flex-1 bg-base-100 dark:bg-base-300 text-base-content dark:text-base-content"
                          value={keywordInput}
                          onChange={(e) => setKeywordInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                        />
                        <button 
                          type="button" 
                          className="btn btn-outline"
                          onClick={addKeyword}
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {seoKeywords.map(kw => (
                          <span key={kw} className="badge badge-outline gap-2">
                            {kw}
                            <button 
                              type="button"
                              onClick={() => removeKeyword(kw)}
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="card bg-base-200 dark:bg-base-300">
                      <div className="card-body">
                        <h3 className="card-title text-base-content dark:text-base-content">
                          <Search size={20} /> SEO Preview
                        </h3>
                        <div className="space-y-2">
                          <div className="text-primary dark:text-primary text-lg font-medium">
                            {watch('meta.title') || title || 'Your Blog Post Title'}
                          </div>
                          <div className="text-success dark:text-success text-sm">
                            yoursite.com/blog/{watch('slug') || 'your-post-slug'}
                          </div>
                          <div className="text-text-muted dark:text-text-muted text-sm">
                            {metaDescription || watch('excerpt') || 'Your meta description will appear here...'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content dark:text-base-content">
                          Canonical URL
                        </span>
                      </label>
                      <input
                        type="url"
                        placeholder="https://yoursite.com/blog/post-slug"
                        className="input input-bordered w-full bg-base-100 dark:bg-base-300 text-base-content dark:text-base-content"
                        {...register('seo.canonicalUrl')}
                      />
                      <label className="label">
                        <span className="label-text-alt text-text-muted dark:text-text-muted">
                          For preventing duplicate content issues
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-4">
                        <input
                          type="checkbox"
                          className="toggle toggle-primary"
                          {...register('featured')}
                        />
                        <div>
                          <span className="label-text font-semibold text-base-content dark:text-base-content">
                            <Star size={16} className="inline mr-1" />
                            Featured Post
                          </span>
                          <p className="text-sm text-text-muted dark:text-text-muted">
                            Pin this post to the top of the blog
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className="divider"></div>

                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-4">
                        <input
                          type="checkbox"
                          className="toggle toggle-primary"
                          {...register('commentsEnabled')}
                        />
                        <div>
                          <span className="label-text font-semibold text-base-content dark:text-base-content">
                            <MessageSquare size={16} className="inline mr-1" />
                            Enable Comments
                          </span>
                          <p className="text-sm text-text-muted dark:text-text-muted">
                            Allow users to comment on this post
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className="divider"></div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content dark:text-base-content">
                          Publication Status
                        </span>
                      </label>
                      <select
                        className="select select-bordered w-full bg-base-100 dark:bg-base-300 text-base-content dark:text-base-content"
                        {...register('status')}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-4">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          checked={schedulePublish}
                          onChange={(e) => setSchedulePublish(e.target.checked)}
                        />
                        <span className="label-text font-semibold text-base-content dark:text-base-content">
                          <Calendar size={16} className="inline mr-1" />
                          Schedule Publishing
                        </span>
                      </label>
                    </div>

                    {schedulePublish && (
                      <div className="form-control ml-8">
                        <label className="label">
                          <span className="label-text text-base-content dark:text-base-content">
                            Publish Date & Time
                          </span>
                        </label>
                        <input
                          type="datetime-local"
                          className="input input-bordered w-full bg-base-100 dark:bg-base-300 text-base-content dark:text-base-content"
                          {...register('publishedAt')}
                        />
                      </div>
                    )}

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-base-content dark:text-base-content">
                          <Share2 size={16} className="inline mr-1" />
                          Open Graph Image
                        </span>
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com/og-image.jpg"
                        className="input input-bordered w-full bg-base-100 dark:bg-base-300 text-base-content dark:text-base-content"
                        {...register('seo.ogImage')}
                      />
                      <label className="label">
                        <span className="label-text-alt text-text-muted dark:text-text-muted">
                          Custom image for social media sharing
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-section-border dark:border-section-border">
                  <button 
                    type="submit" 
                    className="btn btn-primary flex-1"
                    disabled={createPostMutation.isLoading}
                  >
                    {createPostMutation.isLoading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        {watch('status') === 'published' ? 'Publish Post' : 'Save Post'}
                      </>
                    )}
                  </button>
                  <button 
                    type="button"
                    onClick={saveDraft}
                    className="btn btn-outline"
                    disabled={createPostMutation.isLoading}
                  >
                    Save as Draft
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Statistics Card */}
            <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-base-content dark:text-base-content text-lg">
                  Post Statistics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted dark:text-text-muted text-sm">Reading Time</span>
                    <span className="font-semibold text-base-content dark:text-base-content">{readTime} min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted dark:text-text-muted text-sm">Characters</span>
                    <span className="font-semibold text-base-content dark:text-base-content">
                      {content?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted dark:text-text-muted text-sm">Categories</span>
                    <span className="font-semibold text-base-content dark:text-base-content">{categories.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted dark:text-text-muted text-sm">Tags</span>
                    <span className="font-semibold text-base-content dark:text-base-content">{tags.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips Card */}
            <div className="card bg-info/10 dark:bg-info/20 shadow-lg border border-info/20 dark:border-info/30">
              <div className="card-body">
                <h3 className="card-title text-info dark:text-info text-sm">
                  <FileText size={16} />
                  Writing Tips
                </h3>
                <ul className="text-xs space-y-2 text-base-content dark:text-base-content">
                  <li>• Keep titles under 60 characters for SEO</li>
                  <li>• Use 2-3 relevant categories</li>
                  <li>• Add 5-10 tags for discoverability</li>
                  <li>• Aim for 300+ words for better engagement</li>
                  <li>• Include a compelling cover image</li>
                </ul>
              </div>
            </div>

            {/* Status Indicator Card */}
            <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-base-content dark:text-base-content text-lg">
                  Current Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`badge ${
                      watch('status') === 'published' 
                        ? 'badge-success' 
                        : watch('status') === 'draft'
                        ? 'badge-warning'
                        : 'badge-neutral'
                    }`}>
                      {watch('status') || 'draft'}
                    </div>
                  </div>
                  
                  {watch('featured') && (
                    <div className="flex items-center gap-2 text-warning dark:text-warning">
                      <Star size={16} />
                      <span className="text-sm">Featured Post</span>
                    </div>
                  )}

                  {watch('commentsEnabled') && (
                    <div className="flex items-center gap-2 text-success dark:text-success">
                      <MessageSquare size={16} />
                      <span className="text-sm">Comments Enabled</span>
                    </div>
                  )}

                  {schedulePublish && watch('publishedAt') && (
                    <div className="flex items-center gap-2 text-info dark:text-info">
                      <Calendar size={16} />
                      <span className="text-sm">Scheduled</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SEO Score Card */}
            <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-base-content dark:text-base-content text-lg">
                  <Search size={18} />
                  SEO Checklist
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-sm checkbox-success" 
                      checked={!!title}
                      readOnly
                    />
                    <span className="text-sm text-base-content dark:text-base-content">Title added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-sm checkbox-success" 
                      checked={!!watch('excerpt')}
                      readOnly
                    />
                    <span className="text-sm text-base-content dark:text-base-content">Excerpt added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-sm checkbox-success" 
                      checked={!!watch('coverImage')}
                      readOnly
                    />
                    <span className="text-sm text-base-content dark:text-base-content">Cover image added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-sm checkbox-success" 
                      checked={categories.length > 0}
                      readOnly
                    />
                    <span className="text-sm text-base-content dark:text-base-content">Categories added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-sm checkbox-success" 
                      checked={tags.length >= 3}
                      readOnly
                    />
                    <span className="text-sm text-base-content dark:text-base-content">3+ tags added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-sm checkbox-success" 
                      checked={!!watch('meta.description')}
                      readOnly
                    />
                    <span className="text-sm text-base-content dark:text-base-content">Meta description added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-sm checkbox-success" 
                      checked={wordCount >= 300}
                      readOnly
                    />
                    <span className="text-sm text-base-content dark:text-base-content">300+ words written</span>
                  </div>
                </div>
                <div className="divider my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-base-content dark:text-base-content">SEO Score</span>
                  <div className="radial-progress text-primary dark:text-primary" 
                    style={{
                      "--value": Math.round(
                        ([
                          !!title,
                          !!watch('excerpt'),
                          !!watch('coverImage'),
                          categories.length > 0,
                          tags.length >= 3,
                          !!watch('meta.description'),
                          wordCount >= 300
                        ].filter(Boolean).length / 7) * 100
                      )
                    }} 
                    role="progressbar"
                  >
                    {Math.round(
                      ([
                        !!title,
                        !!watch('excerpt'),
                        !!watch('coverImage'),
                        categories.length > 0,
                        tags.length >= 3,
                        !!watch('meta.description'),
                        wordCount >= 300
                      ].filter(Boolean).length / 7) * 100
                    )}%
                  </div>
                </div>
              </div>
            </div>

            {/* Author Info Card */}
            <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 shadow-lg border border-primary/20 dark:border-primary/30">
              <div className="card-body">
                <h3 className="card-title text-base-content dark:text-base-content text-sm">
                  Author Information
                </h3>
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-12">
                      <span className="text-xl">
                        {watch('author.name')?.charAt(0) || 'A'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-base-content dark:text-base-content">
                      {watch('author.name') || 'Admin User'}
                    </div>
                    <div className="text-xs text-text-muted dark:text-text-muted">
                      Content Creator
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div className="modal modal-open">
            <div className="modal-box max-w-4xl bg-base-100 dark:bg-base-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl text-base-content dark:text-base-content">
                  Preview
                </h3>
                <button 
                  className="btn btn-sm btn-circle btn-ghost"
                  onClick={() => setShowPreview(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="prose max-w-none">
                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="Cover" 
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                )}
                
                <h1 className="text-3xl font-bold mb-2 text-base-content dark:text-base-content">
                  {title || 'Your Blog Post Title'}
                </h1>
                
                <div className="flex items-center gap-4 text-sm text-text-muted dark:text-text-muted mb-6">
                  <span>By {watch('author.name') || 'Admin User'}</span>
                  <span>•</span>
                  <span>{readTime} min read</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>

                {categories.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {categories.map(cat => (
                      <span key={cat} className="badge badge-secondary">
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
                
                <p className="text-lg text-text-muted dark:text-text-muted mb-6">
                  {watch('excerpt') || 'Your excerpt will appear here...'}
                </p>
                
                <div className="whitespace-pre-wrap text-base-content dark:text-base-content">
                  {content || 'Your content will appear here...'}
                </div>

                {tags.length > 0 && (
                  <div className="flex gap-2 mt-8 pt-6 border-t border-section-border dark:border-section-border">
                    {tags.map(tag => (
                      <span key={tag} className="badge badge-outline">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="modal-action">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowPreview(false)}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBlogPost;
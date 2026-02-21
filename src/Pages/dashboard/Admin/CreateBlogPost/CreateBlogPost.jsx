import * as React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Save, Eye, Calendar, Image as ImageIcon, Tag, Settings,
  Search, X, Clock, FileText, Star, MessageSquare, Share2,
  Bold, Italic, List, Link as LinkIcon, ChevronRight,
  ChevronLeft, CheckCircle, Circle, AlertCircle, Users,
  Zap, BookOpen, Hash, Globe, BarChart2, Sparkles
} from 'lucide-react';
import Swal from 'sweetalert2';
import { FaStar, FaTimes, FaUpload, FaImages } from 'react-icons/fa';
// import useUser from '../../../../../hooks/useUser';
// import useAxios from '../../../../../hooks/useAxios';
// import { useImageUpload } from '../../../../../hooks/useImageUpload';

// ─── Mock hooks for demo (replace with real ones) ───────────────────────────
const useUser = () => ({ name: 'Alex Johnson', email: 'alex@roomhive.com', photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' });
const useAxios = () => ({ post: async (url, data) => ({ data }) });
const useImageUpload = () => ({ uploadImagesToImgBB: async (imgs) => imgs.map(i => i.url) });
// ────────────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 'essentials', label: 'Essentials', icon: FileText, desc: 'Title, excerpt & category' },
  { id: 'content', label: 'Content', icon: BookOpen, desc: 'Write your post' },
  { id: 'media', label: 'Media', icon: ImageIcon, desc: 'Cover image & gallery' },
  { id: 'publish', label: 'Publish', icon: Globe, desc: 'SEO & publish settings' },
];

const CATEGORIES = [
  'Tips for Seekers', 'Advice for Providers', 'For Both',
  'City Guides', 'Safety & Trust', 'Decorating on a Budget',
  'Legal Advice', 'Moving Tips'
];

const AUDIENCE_LEVELS = [
  { value: 'beginner', label: 'Beginner', icon: '🌱', desc: 'Easy to follow, no prior knowledge needed' },
  { value: 'intermediate', label: 'Intermediate', icon: '🚀', desc: 'Some background knowledge helpful' },
  { value: 'advanced', label: 'Advanced', icon: '⚡', desc: 'In-depth, expert-level content' },
];

const CTA_OPTIONS = [
  { value: '', label: 'None' },
  { value: 'browse-listings', label: 'Browse Listings' },
  { value: 'post-your-room', label: 'Post Your Room' },
  { value: 'find-a-roommate', label: 'Find a Roommate' },
  { value: 'contact-us', label: 'Contact Us' },
];

// ─── Step Progress Bar ───────────────────────────────────────────────────────
const StepBar = React.memo(({ currentStep, steps, completedSteps, onStepClick }) => (
  <div className="bg-base-100 dark:bg-base-200 rounded-2xl shadow-lg p-6 mb-6">
    <div className="flex items-center justify-between relative">
      {/* Connecting line */}
      <div className="absolute left-0 right-0 top-5 h-0.5 bg-base-300 dark:bg-base-300 mx-10 z-0" />
      <div
        className="absolute left-0 top-5 h-0.5 bg-primary z-0 transition-all duration-500 mx-10"
        style={{ width: `${(currentStep / (steps.length - 1)) * (100 - (20 / steps.length))}%` }}
      />

      {steps.map((step, idx) => {
        const Icon = step.icon;
        const isCompleted = completedSteps.includes(step.id);
        const isCurrent = currentStep === idx;
        const isAccessible = idx <= currentStep || isCompleted;

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => isAccessible && onStepClick(idx)}
            className={`flex flex-col items-center gap-2 z-10 transition-all ${isAccessible ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 font-bold text-sm
              ${isCurrent
                ? 'bg-primary text-primary-content shadow-lg shadow-primary/30 scale-110'
                : isCompleted
                  ? 'bg-success text-success-content'
                  : 'bg-base-200 dark:bg-base-300 text-base-content/40'
              }`}>
              {isCompleted && !isCurrent ? <CheckCircle size={20} /> : <Icon size={18} />}
            </div>
            <div className="hidden sm:block text-center">
              <div className={`text-xs font-semibold ${isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-base-content/40'}`}>
                {step.label}
              </div>
              <div className="text-xs text-base-content/30">{step.desc}</div>
            </div>
          </button>
        );
      })}
    </div>
  </div>
));

// ─── Field wrapper with consistent styling ───────────────────────────────────
const Field = ({ label, hint, error, counter, children }) => (
  <div className="form-control">
    <div className="flex justify-between items-baseline mb-1.5">
      <label className="text-sm font-semibold text-base-content">{label}</label>
      <div className="flex gap-3 items-center">
        {counter && <span className="text-xs text-base-content/40">{counter}</span>}
        {hint && <span className="text-xs text-base-content/40">{hint}</span>}
      </div>
    </div>
    {children}
    {error && (
      <div className="flex items-center gap-1 mt-1.5">
        <AlertCircle size={13} className="text-error" />
        <span className="text-error text-xs">{error}</span>
      </div>
    )}
  </div>
);

// ─── Tag Input ───────────────────────────────────────────────────────────────
const TagInput = ({ tags, onAdd, onRemove, placeholder, badgeClass = 'badge-primary', max = 10 }) => {
  const [input, setInput] = useState('');
  const handleAdd = () => {
    if (input.trim() && !tags.includes(input.trim()) && tags.length < max) {
      onAdd(input.trim()); setInput('');
    }
  };
  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text" value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
          placeholder={placeholder}
          className="input input-bordered flex-1 input-sm bg-base-100 dark:bg-base-300 text-base-content"
        />
        <button type="button" onClick={handleAdd} className="btn btn-primary btn-sm">Add</button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map(t => (
            <span key={t} className={`badge gap-1.5 ${badgeClass}`}>
              {t}
              <button type="button" onClick={() => onRemove(t)}><X size={12} /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── SEO Score Ring ──────────────────────────────────────────────────────────
const SeoRing = React.memo(({ score }) => {
  const color = score >= 80 ? 'text-success' : score >= 50 ? 'text-warning' : 'text-error';
  return (
    <div className={`radial-progress ${color} font-bold text-sm`}
      style={{ '--value': score, '--size': '5rem', '--thickness': '6px' }}
      role="progressbar">
      {score}%
    </div>
  );
});

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const CreateBlogPost = () => {
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [seoKeywords, setSeoKeywords] = useState([]);
  const [images, setImages] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [schedulePublish, setSchedulePublish] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [readTime, setReadTime] = useState(0);
  const [lastSaved, setLastSaved] = useState(null);

  const queryClient = useQueryClient();
  const user = useUser();
  const axiosInstance = useAxios();
  const { uploadImagesToImgBB } = useImageUpload();


  const { register, handleSubmit, watch, setValue, trigger, formState: { errors }, reset, control } = useForm({
    defaultValues: { status: 'draft', featured: false, commentsEnabled: true, audienceLevel: 'beginner', ctaLink: '', tocEnabled: false }
  });

  const title = useWatch({ name: 'title', control });
  const content = useWatch({ name: 'content', control });
  const excerpt = watch('excerpt');
  const metaDesc = watch('meta.description');

  const debouncedContent = useDebounce(content, 500); // Wait 500ms after typing stops

  const debouncedTitle = useDebounce(title, 500);
  useEffect(() => {
    if (user) reset(prev => ({ ...prev, author: { name: user.name, avatar: user.photoURL } }));
  }, [user, reset]);

  useEffect(() => {
    if (debouncedTitle) {
      setValue('slug', debouncedTitle.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''));
    }
  }, [debouncedTitle, setValue]);

  useEffect(() => {
    if (debouncedContent) {
      const w = debouncedContent.trim().split(/\s+/).filter(Boolean).length;
      React.unstable_batchedUpdates(() => {
        setWordCount(w);
        setReadTime(Math.ceil(w / 200));
      });
    }
  }, [debouncedContent]);



  // SEO score calculation
  const seoScore = useMemo(() => {
    return Math.round([
      !!title, !!excerpt, images.length > 0, categories.length > 0,
      tags.length >= 3, !!metaDesc, wordCount >= 300,
      seoKeywords.length > 0, !!watch('meta.title'), !!watch('slug')
    ].filter(Boolean).length / 10 * 100);
  }, [title, excerpt, images.length, categories.length, tags.length, metaDesc, wordCount, seoKeywords.length]);

  // ─── Mutations ─────────────────────────────────────────────────────────────
  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async (postData) => axiosInstance.post('/api/v1/blog/posts', postData),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogPosts']);
      setLastSaved(new Date());
      Swal.fire({ title: 'Published!', text: 'Your blog post is live.', icon: 'success', confirmButtonColor: 'var(--color-primary)' });
    },
    onError: (err) => Swal.fire({ title: 'Error', text: err.message, icon: 'error', confirmButtonColor: 'var(--color-error)' })
  });

  // ─── Image upload ──────────────────────────────────────────────────────────
  const handleImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      Swal.fire({ title: 'Too many images!', text: 'Maximum 5 images allowed.', icon: 'warning', confirmButtonColor: 'var(--color-warning)' });
      return;
    }
    files.filter(f => f.size <= 5 * 1024 * 1024).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => setImages(prev => [...prev, { id: Date.now() + Math.random(), file, url: e.target.result, name: file.name }]);
      reader.readAsDataURL(file);
    });
  }, [images.length]);

  // ─── Step validation & navigation ─────────────────────────────────────────
  const STEP_FIELDS = [
    ['title', 'slug', 'excerpt'],
    ['content'],
    [],
    []
  ];

  const goNext = useCallback(async () => {
    const fields = STEP_FIELDS[step];
    const valid = fields.length === 0 || await trigger(fields);
    if (!valid) return;
    if (step === 2 && images.length === 0) {
      Swal.fire({ title: 'Image Required', text: 'Please upload at least one cover image.', icon: 'warning', confirmButtonColor: 'var(--color-warning)' });
      return;
    }
    setCompletedSteps(prev => [...new Set([...prev, STEPS[step].id])]);
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  }, [step, trigger, images.length]);

  const goPrev = () => setStep(s => Math.max(s - 1, 0));

  const saveDraft = async () => {
    const data = watch();
    createPost({ ...data, status: 'draft', tags, categories, meta: { ...data.meta, keywords: seoKeywords } });
    setLastSaved(new Date());
  };

  const onSubmit = async (data) => {
    const uploadedUrls = await uploadImagesToImgBB(images);
    createPost({
      ...data, coverImage: uploadedUrls, tags, categories,
      meta: { ...data.meta, keywords: seoKeywords },
      stats: { views: 0, likes: 0, shares: 0 }
    });
  };

  // ─── RENDER STEPS ──────────────────────────────────────────────────────────
  const renderEssentials = () => (
    <div className="space-y-5">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-base-content">Post Essentials</h2>
        <p className="text-sm text-base-content/50 mt-0.5">The core info readers and search engines will see first.</p>
      </div>

      <Field label="Post Title *" counter={`${title?.length || 0}/100`} error={errors.title?.message}>
        <input type="text" placeholder="Write a title that grabs attention…"
          className="input input-bordered w-full text-lg font-medium bg-base-100 dark:bg-base-300 text-base-content"
          {...register('title', { required: 'Title is required', maxLength: { value: 100, message: 'Max 100 characters' } })} />
      </Field>

      <Field label="URL Slug *" hint="Auto-generated from title" error={errors.slug?.message}>
        <div className="join w-full">
          <span className="join-item btn btn-disabled text-xs bg-base-200 dark:bg-base-300 text-base-content/40">/blog/</span>
          <input type="text" className="input input-bordered join-item flex-1 font-mono text-sm bg-base-100 dark:bg-base-300 text-base-content"
            {...register('slug', { required: 'Slug is required' })} />
        </div>
      </Field>

      <Field label="Excerpt / Summary *" counter={`${excerpt?.length || 0}/200`} error={errors.excerpt?.message}>
        <textarea placeholder="A compelling 1–2 sentence summary shown in listing cards and social shares…"
          className="textarea textarea-bordered w-full h-24 resize-none bg-base-100 dark:bg-base-300 text-base-content"
          {...register('excerpt', { required: 'Excerpt is required', maxLength: { value: 200, message: 'Max 200 characters' } })} />
      </Field>

      {/* Audience & Category row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Category" hint="Pick one or more">
          <div className="flex gap-2">
            <select className="select select-bordered flex-1 bg-base-100 dark:bg-base-300 text-base-content"
              onChange={e => { if (e.target.value && !categories.includes(e.target.value)) setCategories([...categories, e.target.value]); }}>
              <option value="">Select category…</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {categories.map(c => (
                <span key={c} className="badge badge-secondary gap-1">{c}
                  <button type="button" onClick={() => setCategories(cats => cats.filter(x => x !== c))}><X size={11} /></button>
                </span>
              ))}
            </div>
          )}
        </Field>

        <Field label="Target Audience">
          <select className="select select-bordered w-full bg-base-100 dark:bg-base-300 text-base-content"
            {...register('audienceTarget')}>
            <option value="">All readers</option>
            <option value="seekers">Seekers only</option>
            <option value="providers">Providers only</option>
            <option value="both">Seekers & Providers</option>
          </select>
        </Field>
      </div>

      {/* Difficulty Level */}
      <Field label="Difficulty Level">
        <div className="grid grid-cols-3 gap-3">
          {AUDIENCE_LEVELS.map(lvl => {
            const checked = watch('audienceLevel') === lvl.value;
            return (
              <label key={lvl.value} className={`cursor-pointer rounded-xl border-2 p-3 transition-all ${checked ? 'border-primary bg-primary/5' : 'border-base-300 hover:border-primary/40'}`}>
                <input type="radio" className="hidden" value={lvl.value} {...register('audienceLevel')} />
                <div className="text-xl mb-1">{lvl.icon}</div>
                <div className={`text-sm font-semibold ${checked ? 'text-primary' : 'text-base-content'}`}>{lvl.label}</div>
                <div className="text-xs text-base-content/40 mt-0.5">{lvl.desc}</div>
              </label>
            );
          })}
        </div>
      </Field>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-5">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-base-content">Write Your Content</h2>
        <p className="text-sm text-base-content/50 mt-0.5">Use Markdown for formatting. Aim for 300+ words for better engagement.</p>
      </div>

      {/* Mini toolbar */}
      <div className="flex gap-1.5 flex-wrap p-2 bg-base-200 dark:bg-base-300 rounded-lg">
        {[
          { icon: Bold, label: 'Bold', md: '**text**' },
          { icon: Italic, label: 'Italic', md: '_text_' },
          { icon: List, label: 'List', md: '- item' },
          { icon: LinkIcon, label: 'Link', md: '[text](url)' },
          { icon: Hash, label: 'Heading', md: '## Heading' },
        ].map(({ icon: Icon, label, md }) => (
          <button key={label} type="button" title={`${label}: ${md}`}
            className="btn btn-ghost btn-xs gap-1 text-xs"
            onClick={() => {
              const ta = document.getElementById('content-area');
              if (!ta) return;
              const start = ta.selectionStart, end = ta.selectionEnd;
              const val = ta.value;
              const newVal = val.substring(0, start) + md + val.substring(end);
              setValue('content', newVal);
            }}>
            <Icon size={14} /> {label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-3 text-xs text-base-content/40">
          <span>{wordCount} words</span>
          <span>~{readTime} min read</span>
        </div>
      </div>

      <Field label="Content *" error={errors.content?.message}>
        <textarea id="content-area"
          placeholder={"# Start with a great heading\n\nYour content here… Use **bold**, _italic_, and - lists for structure.\n\nTip: Include personal stories or real examples to boost engagement."}
          className="textarea textarea-bordered w-full h-80 font-mono text-sm resize-y bg-base-100 dark:bg-base-300 text-base-content leading-relaxed"
          {...register('content', { required: 'Content is required', minLength: { value: 50, message: 'Content is too short' } })} />
      </Field>

      {/* Tags */}
      <Field label="Tags" hint={`${tags.length}/10 added`}>
        <TagInput tags={tags} onAdd={t => setTags(prev => [...prev, t])} onRemove={t => setTags(prev => prev.filter(x => x !== t))}
          placeholder="Type a tag and press Enter…" badgeClass="badge-primary" max={10} />
      </Field>

      {/* ToC Toggle */}
      <label className="flex items-center gap-4 cursor-pointer p-4 rounded-xl border border-base-300 dark:border-base-300 hover:border-primary/40 transition-colors">
        <input type="checkbox" className="toggle toggle-primary" {...register('tocEnabled')} />
        <div>
          <div className="font-semibold text-sm text-base-content">Auto-generate Table of Contents</div>
          <div className="text-xs text-base-content/40">For posts with multiple ## headings — great for long-form content</div>
        </div>
      </label>
    </div>
  );

  const renderMedia = () => (
    <div className="space-y-5">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-base-content">Media & Visuals</h2>
        <p className="text-sm text-base-content/50 mt-0.5">Upload 1–5 images. The first becomes the cover image shown in listings.</p>
      </div>

      {/* Upload zone */}
      <div className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer group
        ${images.length >= 5 ? 'border-base-300 opacity-50 cursor-not-allowed' : 'border-primary/30 hover:border-primary hover:bg-primary/5'}`}>
        <input type="file" multiple accept="image/*" onChange={handleImageUpload}
          className="hidden" id="imgUpload" disabled={images.length >= 5} />
        <label htmlFor="imgUpload" className={images.length >= 5 ? 'cursor-not-allowed' : 'cursor-pointer block'}>
          <FaUpload className="mx-auto text-4xl text-primary/30 group-hover:text-primary mb-4 transition-colors" />
          <p className="font-semibold text-base-content">
            {images.length >= 5 ? 'Maximum images reached' : images.length > 0 ? 'Add more images' : 'Drop images here or click to browse'}
          </p>
          <p className="text-sm text-base-content/40 mt-1">PNG, JPG, WEBP · max 5MB each · {5 - images.length} slot{5 - images.length !== 1 ? 's' : ''} remaining</p>
        </label>
      </div>

      {images.length > 0 && (
        <div className="space-y-4">
          {/* Cover image */}
          <div className="rounded-2xl overflow-hidden border-2 border-primary/30 relative group">
            <img src={images[0].url} alt="Cover" className="w-full h-64 object-cover" />
            <div className="absolute top-3 left-3 badge badge-primary badge-lg gap-1.5 shadow-lg">
              <FaStar size={11} /> Cover Image
            </div>
            <button type="button" onClick={() => setImages(prev => prev.slice(1))}
              className="absolute top-3 right-3 btn btn-error btn-sm btn-circle opacity-0 group-hover:opacity-100 transition-opacity">
              <FaTimes />
            </button>
          </div>

          {/* Additional images grid */}
          {images.length > 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.slice(1).map((img, i) => (
                <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden border border-base-300">
                  <img src={img.url} alt={`img-${i}`} className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setImages(prev => prev.filter(x => x.id !== img.id))}
                    className="absolute inset-0 flex items-center justify-center bg-error/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaTimes size={18} />
                  </button>
                  <span className="absolute bottom-1.5 left-1.5 badge badge-xs badge-neutral">#{i + 2}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderPublish = () => (
    <div className="space-y-5">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-base-content">SEO & Publish Settings</h2>
        <p className="text-sm text-base-content/50 mt-0.5">Optimize for search and configure how your post goes live.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-5">
          <Field label="Meta Title" counter={`${watch('meta.title')?.length || 0}/60`}>
            <input type="text" placeholder="SEO title (leave blank to use post title)"
              className="input input-bordered w-full bg-base-100 dark:bg-base-300 text-base-content"
              {...register('meta.title', { maxLength: { value: 60, message: 'Max 60 chars' } })} />
          </Field>

          <Field label="Meta Description" counter={`${metaDesc?.length || 0}/160`}>
            <textarea placeholder="Brief description for search engines…"
              className="textarea textarea-bordered w-full h-24 resize-none bg-base-100 dark:bg-base-300 text-base-content"
              {...register('meta.description', { maxLength: { value: 160, message: 'Max 160 chars' } })} />
          </Field>

          <Field label="SEO Keywords">
            <TagInput tags={seoKeywords} onAdd={k => setSeoKeywords(prev => [...prev, k])}
              onRemove={k => setSeoKeywords(prev => prev.filter(x => x !== k))}
              placeholder="Add keyword…" badgeClass="badge-outline" />
          </Field>

          <Field label="Canonical URL" hint="Prevents duplicate content">
            <input type="url" placeholder="https://yoursite.com/blog/post-slug"
              className="input input-bordered w-full bg-base-100 dark:bg-base-300 text-base-content"
              {...register('seo.canonicalUrl')} />
          </Field>
        </div>

        <div className="space-y-5">
          {/* Live SEO preview */}
          <div className="rounded-xl border border-base-300 p-4 bg-base-200/50 dark:bg-base-300/30">
            <p className="text-xs font-semibold text-base-content/40 uppercase tracking-wide mb-3">Google Preview</p>
            <div className="text-primary text-base font-medium line-clamp-1">
              {watch('meta.title') || title || 'Your post title here'}
            </div>
            <div className="text-success text-xs mt-0.5">yoursite.com/blog/{watch('slug') || 'your-post-slug'}</div>
            <div className="text-base-content/60 text-xs mt-1 line-clamp-2">
              {metaDesc || excerpt || 'Your meta description will appear here. Make it compelling to boost click-through rates.'}
            </div>
          </div>

          {/* Publication Status */}
          <Field label="Publication Status">
            <select className="select select-bordered w-full bg-base-100 dark:bg-base-300 text-base-content" {...register('status')}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </Field>

          {/* CTA */}
          <Field label="End-of-post Call to Action">
            <select className="select select-bordered w-full bg-base-100 dark:bg-base-300 text-base-content" {...register('ctaLink')}>
              {CTA_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </Field>

          {/* OG Image */}
          <Field label="Social Share Image (OG)" hint="Optional">
            <input type="url" placeholder="https://example.com/og-image.jpg"
              className="input input-bordered w-full bg-base-100 dark:bg-base-300 text-base-content"
              {...register('seo.ogImage')} />
          </Field>

          {/* Toggles */}
          <div className="space-y-3">
            {[
              { name: 'featured', icon: Star, label: 'Featured Post', desc: 'Pinned to top of blog listing', color: 'toggle-warning' },
              { name: 'commentsEnabled', icon: MessageSquare, label: 'Enable Comments', desc: 'Allow readers to comment', color: 'toggle-success' },
            ].map(({ name, icon: Icon, label, desc, color }) => (
              <label key={name} className="flex items-center gap-4 cursor-pointer p-3 rounded-xl border border-base-300 hover:border-primary/40 transition-colors">
                <input type="checkbox" className={`toggle ${color}`} {...register(name)} />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-base-content flex items-center gap-1.5">
                    <Icon size={14} /> {label}
                  </div>
                  <div className="text-xs text-base-content/40">{desc}</div>
                </div>
              </label>
            ))}

            <label className="flex items-center gap-4 cursor-pointer p-3 rounded-xl border border-base-300 hover:border-primary/40 transition-colors">
              <input type="checkbox" className="toggle toggle-primary" checked={schedulePublish} onChange={e => setSchedulePublish(e.target.checked)} />
              <div className="flex-1">
                <div className="text-sm font-semibold text-base-content flex items-center gap-1.5">
                  <Calendar size={14} /> Schedule Publishing
                </div>
                <div className="text-xs text-base-content/40">Set a future date to auto-publish</div>
              </div>
            </label>

            {schedulePublish && (
              <div className="ml-4">
                <input type="datetime-local" className="input input-bordered w-full bg-base-100 dark:bg-base-300 text-base-content"
                  {...register('publishedAt')} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const stepContent = [renderEssentials, renderContent, renderMedia, renderPublish];

  // ─── SEO Checklist ────────────────────────────────────────────────────────
  const seoItems = [
    { label: 'Title added', done: !!title },
    { label: 'Excerpt written', done: !!excerpt },
    { label: 'Cover image uploaded', done: images.length > 0 },
    { label: 'Category selected', done: categories.length > 0 },
    { label: '3+ tags added', done: tags.length >= 3 },
    { label: 'Meta description', done: !!metaDesc },
    { label: '300+ words written', done: wordCount >= 300 },
    { label: 'SEO keywords added', done: seoKeywords.length > 0 },
    { label: 'Meta title set', done: !!watch('meta.title') },
    { label: 'Slug customized', done: !!watch('slug') },
  ];

  return (
    <div className="min-h-screen bg-base-200 dark:bg-base-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Page Header ─────────────────────────────────────────────── */}
        <div className="bg-base-100 dark:bg-base-200 rounded-2xl shadow-lg p-5 mb-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles size={22} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-base-content">New Blog Post</h1>
                <p className="text-sm text-base-content/40">
                  {lastSaved ? (
                    <span className="flex items-center gap-1"><Clock size={12} /> Saved {lastSaved.toLocaleTimeString()}</span>
                  ) : 'Draft not yet saved'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={saveDraft} disabled={isPending}
                className="btn btn-outline btn-sm gap-2">
                <Save size={15} /> Save Draft
              </button>
              <button type="button" onClick={() => setShowPreview(true)}
                className="btn btn-outline btn-sm gap-2">
                <Eye size={15} /> Preview
              </button>
              {/* Author chip */}
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-base-300">
                <img src={user?.photoURL} alt="" className="w-8 h-8 rounded-full object-cover" />
                <span className="text-sm font-medium text-base-content hidden md:block">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Step Progress Bar ────────────────────────────────────────── */}
        <StepBar currentStep={step} steps={STEPS} completedSteps={completedSteps} onStepClick={setStep} />

        {/* ── Main Layout ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

          {/* Step Form */}
          <div className="lg:col-span-3">
            <div className="bg-base-100 dark:bg-base-200 rounded-2xl shadow-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6 md:p-8">
                  {/* Animated step content */}
                  <div key={step} style={{ animation: 'fadeSlideIn 0.25s ease' }}>
                    {stepContent[step]()}
                  </div>
                </div>

                {/* ── Navigation Footer ─────────────────────────────── */}
                <div className="flex items-center justify-between gap-3 px-6 md:px-8 py-5 border-t border-base-300 dark:border-base-300 bg-base-200/40 dark:bg-base-300/20 rounded-b-2xl">
                  <button type="button" onClick={goPrev} disabled={step === 0}
                    className="btn btn-ghost gap-2 disabled:opacity-30">
                    <ChevronLeft size={18} /> Back
                  </button>

                  <div className="flex items-center gap-1.5">
                    {STEPS.map((_, i) => (
                      <div key={i} className={`rounded-full transition-all duration-300
                        ${i === step ? 'w-6 h-2 bg-primary' : completedSteps.includes(STEPS[i].id) ? 'w-2 h-2 bg-success' : 'w-2 h-2 bg-base-300'}`} />
                    ))}
                  </div>

                  {step < STEPS.length - 1 ? (
                    <button type="button" onClick={goNext} className="btn btn-primary gap-2">
                      Continue <ChevronRight size={18} />
                    </button>
                  ) : (
                    <button type="submit" disabled={isPending} className="btn btn-primary gap-2 min-w-32">
                      {isPending ? <><span className="loading loading-spinner loading-sm" /> Publishing…</> : <><Save size={16} /> {watch('status') === 'published' ? 'Publish Now' : 'Save Post'}</>}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* ── Sidebar ──────────────────────────────────────────────── */}
          <div className="lg:col-span-1 space-y-4">

            {/* Live Stats */}
            <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
              <div className="card-body gap-3">
                <h3 className="font-bold text-base-content text-sm uppercase tracking-wide">Post Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Words', value: wordCount, icon: '📝' },
                    { label: 'Read time', value: `${readTime}m`, icon: '⏱' },
                    { label: 'Tags', value: tags.length, icon: '🏷' },
                    { label: 'Images', value: images.length, icon: '🖼' },
                  ].map(({ label, value, icon }) => (
                    <div key={label} className="bg-base-200 dark:bg-base-300 rounded-xl p-3 text-center">
                      <div className="text-xl mb-0.5">{icon}</div>
                      <div className="text-lg font-bold text-base-content">{value}</div>
                      <div className="text-xs text-base-content/40">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SEO Score */}
            <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
              <div className="card-body gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base-content text-sm uppercase tracking-wide">SEO Score</h3>
                  <SeoRing score={seoScore} />
                </div>
                <div className="space-y-1.5">
                  {seoItems.map(({ label, done }) => (
                    <div key={label} className="flex items-center gap-2">
                      {done
                        ? <CheckCircle size={14} className="text-success flex-shrink-0" />
                        : <Circle size={14} className="text-base-content/20 flex-shrink-0" />}
                      <span className={`text-xs ${done ? 'text-base-content' : 'text-base-content/40'}`}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Status */}
            <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
              <div className="card-body gap-3">
                <h3 className="font-bold text-base-content text-sm uppercase tracking-wide">Status</h3>
                <div className={`badge badge-lg ${watch('status') === 'published' ? 'badge-success' : watch('status') === 'archived' ? 'badge-neutral' : 'badge-warning'}`}>
                  {watch('status') || 'draft'}
                </div>
                <div className="space-y-2">
                  {watch('featured') && <div className="flex items-center gap-2 text-warning text-xs"><Star size={13} /> Featured</div>}
                  {watch('commentsEnabled') && <div className="flex items-center gap-2 text-success text-xs"><MessageSquare size={13} /> Comments on</div>}
                  {watch('tocEnabled') && <div className="flex items-center gap-2 text-info text-xs"><List size={13} /> Auto-TOC enabled</div>}
                  {schedulePublish && watch('publishedAt') && <div className="flex items-center gap-2 text-info text-xs"><Calendar size={13} /> Scheduled</div>}
                  {watch('ctaLink') && <div className="flex items-center gap-2 text-primary text-xs"><Zap size={13} /> CTA: {watch('ctaLink')}</div>}
                </div>
              </div>
            </div>

            {/* Writing Tips */}
            <div className="card bg-info/10 dark:bg-info/20 border border-info/20 shadow">
              <div className="card-body gap-2">
                <h3 className="text-info text-xs font-bold uppercase tracking-wide flex items-center gap-1.5">
                  <BarChart2 size={13} /> Step {step + 1} Tips
                </h3>
                <ul className="text-xs space-y-1.5 text-base-content/70">
                  {[
                    ['Keep titles under 60 chars for SEO', 'Match slug to title keywords', 'Write excerpts as a hook — not a summary', 'Pick 1–2 specific categories'],
                    ['Use headings (##) to structure long posts', 'Bold key points for skimmers', 'Aim for 300+ words minimum', 'Add 5–10 relevant tags'],
                    ['First image = cover card in listings', 'Use 16:9 ratio for best results', 'Under 5MB per image', 'Alt text improves accessibility'],
                    ['Meta description = your search ad copy', 'Include target keyword in slug', 'OG image improves social shares', 'Schedule posts for peak hours'],
                  ][step].map((tip, i) => <li key={i} className="flex gap-1.5"><span className="text-info">•</span>{tip}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Preview Modal ─────────────────────────────────────────────── */}
      {showPreview && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl bg-base-100 dark:bg-base-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5 sticky top-0 bg-base-100 dark:bg-base-200 pb-4 border-b border-base-300">
              <h3 className="font-bold text-lg text-base-content">Post Preview</h3>
              <button className="btn btn-ghost btn-sm btn-circle" onClick={() => setShowPreview(false)}><X size={18} /></button>
            </div>
            {images[0] && <img src={images[0].url} alt="Cover" className="w-full h-56 object-cover rounded-xl mb-6" />}
            <div className="flex gap-2 mb-3 flex-wrap">
              {categories.map(c => <span key={c} className="badge badge-secondary">{c}</span>)}
              {watch('audienceLevel') && <span className="badge badge-outline">{watch('audienceLevel')}</span>}
            </div>
            <h1 className="text-3xl font-bold text-base-content mb-3">{title || 'Your Post Title'}</h1>
            <div className="flex items-center gap-3 text-sm text-base-content/40 mb-5">
              <img src={user?.photoURL} alt="" className="w-6 h-6 rounded-full" />
              <span>{user?.name}</span>
              <span>·</span><span>{readTime} min read</span>
              <span>·</span><span>{new Date().toLocaleDateString()}</span>
              <span>·</span><span>{wordCount} words</span>
            </div>
            <p className="text-base-content/60 text-lg mb-6 italic">{excerpt || 'Your excerpt will appear here…'}</p>
            <div className="whitespace-pre-wrap text-base-content leading-relaxed font-mono text-sm">
              {content || 'Your content will appear here…'}
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-5 border-t border-base-300">
                {tags.map(t => <span key={t} className="badge badge-outline">#{t}</span>)}
              </div>
            )}
            <div className="modal-action">
              <button className="btn btn-primary" onClick={() => setShowPreview(false)}>Close Preview</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowPreview(false)} />
        </div>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CreateBlogPost;
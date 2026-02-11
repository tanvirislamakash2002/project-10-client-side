import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Calendar,
  Clock,
  Home,
  DollarSign,
  CheckCircle2,
  XCircle,
  Download,
  FileText,
  Share2,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap,
  Award,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  MapPin,
  Lightbulb,
  AlertTriangle,
  ThumbsUp,
  Settings,
  Mail,
  ChevronDown,
  ExternalLink,
  Star,
  Percent,
  Timer,
  UserCheck,
  Building2,
  Sparkles
} from 'lucide-react';

const Analytics = () => {
  // State Management
  const [timePeriod, setTimePeriod] = useState('30days');
  const [compareMode, setCompareMode] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });
  const [selectedMetric, setSelectedMetric] = useState('views');
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Fetch Analytics Data
  // const { data: analyticsData, isLoading } = useQuery({
  //   queryKey: ['providerAnalytics', timePeriod, customDateRange, compareMode],
  //   queryFn: async () => {
  //     const params = new URLSearchParams({
  //       period: timePeriod,
  //       compare: compareMode,
  //       startDate: customDateRange.start || undefined,
  //       endDate: customDateRange.end || undefined
  //     });
  //     const { data } = await axios.get(`/api/provider/analytics?${params}`);
  //     return data;
  //   }
  // });

  // Mock data for demonstration (replace with actual API data)
  const mockData = {
    kpis: {
      totalListings: 12,
      activeListings: 8,
      totalViews: 3847,
      avgViewsPerListing: 481,
      listingCompletionRate: 87,
      totalApplications: 156,
      applicationConversionRate: 4.1,
      avgApplicationsPerListing: 19.5,
      qualifiedApplicants: 89,
      totalViewingRequests: 234,
      viewingRequestRate: 6.1,
      confirmedViewings: 187,
      noShowRate: 8.6,
      avgResponseTime: 2.3,
      avgDaysOnMarket: 18,
      avgTimeToFirstApp: 3.2,
      avgTimeToRent: 21.5,
      previousPeriod: {
        totalViews: 3124,
        totalApplications: 142,
        viewingRequests: 201,
        avgResponseTime: 3.1
      }
    },
    performanceOverTime: [
      { date: 'Jan 1', views: 245, applications: 12, viewings: 18 },
      { date: 'Jan 8', views: 312, applications: 15, viewings: 22 },
      { date: 'Jan 15', views: 428, applications: 21, viewings: 28 },
      { date: 'Jan 22', views: 389, applications: 18, viewings: 24 },
      { date: 'Jan 29', views: 456, applications: 24, viewings: 31 },
      { date: 'Feb 5', views: 521, applications: 28, viewings: 35 },
      { date: 'Feb 12', views: 498, applications: 26, viewings: 33 }
    ],
    listingPerformance: [
      {
        id: '1',
        title: 'Modern Studio in Downtown',
        address: '123 Main St, Apt 4B',
        daysActive: 12,
        views: 892,
        requests: 45,
        applications: 23,
        conversionRate: 2.6,
        status: 'active',
        performance: 'above'
      },
      {
        id: '2',
        title: 'Cozy 2BR near University',
        address: '456 College Ave',
        daysActive: 8,
        views: 734,
        requests: 38,
        applications: 19,
        conversionRate: 2.6,
        status: 'active',
        performance: 'above'
      },
      {
        id: '3',
        title: 'Spacious 1BR with Balcony',
        address: '789 Park Blvd',
        daysActive: 21,
        views: 523,
        requests: 24,
        applications: 14,
        conversionRate: 2.7,
        status: 'active',
        performance: 'average'
      },
      {
        id: '4',
        title: 'Luxury Penthouse Suite',
        address: '321 Skyline Dr',
        daysActive: 35,
        views: 412,
        requests: 18,
        applications: 8,
        conversionRate: 1.9,
        status: 'active',
        performance: 'below'
      },
      {
        id: '5',
        title: 'Budget-Friendly Room Share',
        address: '654 Oak Street',
        daysActive: 15,
        views: 698,
        requests: 32,
        applications: 21,
        conversionRate: 3.0,
        status: 'active',
        performance: 'above'
      }
    ],
    statusDistribution: [
      { name: 'Active', value: 8, color: '#10B981' },
      { name: 'Pending', value: 2, color: '#F59E0B' },
      { name: 'Rented', value: 15, color: '#0EA5E9' },
      { name: 'Expired', value: 1, color: '#EF4444' }
    ],
    viewingHeatmap: [
      { day: 'Monday', '9-12': 8, '12-15': 12, '15-18': 22, '18-21': 15 },
      { day: 'Tuesday', '9-12': 6, '12-15': 10, '15-18': 18, '18-21': 20 },
      { day: 'Wednesday', '9-12': 9, '12-15': 14, '15-18': 25, '18-21': 18 },
      { day: 'Thursday', '9-12': 7, '12-15': 11, '15-18': 19, '18-21': 21 },
      { day: 'Friday', '9-12': 10, '12-15': 16, '15-18': 28, '18-21': 24 },
      { day: 'Saturday', '9-12': 18, '12-15': 24, '15-18': 32, '18-21': 12 },
      { day: 'Sunday', '9-12': 15, '12-15': 20, '15-18': 26, '18-21': 8 }
    ],
    conversionFunnel: [
      { stage: 'Impressions', value: 12500, percentage: 100 },
      { stage: 'Detail Views', value: 3847, percentage: 30.8 },
      { stage: 'Viewing Requests', value: 234, percentage: 6.1 },
      { stage: 'Applications', value: 156, percentage: 4.1 },
      { stage: 'Leases Signed', value: 12, percentage: 0.3 }
    ],
    demographics: {
      ageRange: [
        { range: '18-24', count: 42 },
        { range: '25-34', count: 68 },
        { range: '35-44', count: 31 },
        { range: '45+', count: 15 }
      ],
      occupation: [
        { type: 'Student', count: 45 },
        { type: 'Professional', count: 72 },
        { type: 'Self-Employed', count: 23 },
        { type: 'Other', count: 16 }
      ],
      moveInTimeline: [
        { timeline: 'Immediate', count: 34 },
        { timeline: '1-2 weeks', count: 56 },
        { timeline: '3-4 weeks', count: 48 },
        { timeline: '1-2 months', count: 18 }
      ],
      budgetRange: [
        { range: '<$800', count: 28 },
        { range: '$800-$1200', count: 62 },
        { range: '$1200-$1600', count: 45 },
        { range: '$1600+', count: 21 }
      ]
    },
    insights: [
      {
        id: 1,
        type: 'warning',
        title: 'Slow Response Time',
        message: 'Your response time is slower than 70% of providers. Faster responses could increase viewings by 25%.',
        action: 'Enable instant notifications',
        priority: 'high'
      },
      {
        id: 2,
        type: 'success',
        title: 'High Photo Impact',
        message: 'Listings with 5+ photos receive 3x more applications. You have 2 listings with fewer than 3 photos.',
        action: 'Add more photos',
        priority: 'medium'
      },
      {
        id: 3,
        type: 'info',
        title: 'Weekend Advantage',
        message: 'Weekend viewings have 40% higher confirmation rate. Consider adding Saturday availability.',
        action: 'Update availability',
        priority: 'medium'
      },
      {
        id: 4,
        type: 'success',
        title: 'Location Performance',
        message: 'Your downtown listings perform 2x better than suburban listings. Consider adjusting pricing strategy.',
        action: 'Review pricing',
        priority: 'low'
      }
    ],
    benchmarks: {
      yourAvg: {
        responseTime: 2.3,
        conversionRate: 4.1,
        daysOnMarket: 18,
        viewingShowRate: 91.4
      },
      platformAvg: {
        responseTime: 3.5,
        conversionRate: 3.2,
        daysOnMarket: 24,
        viewingShowRate: 85.2
      },
      topPerformers: {
        responseTime: 1.2,
        conversionRate: 6.8,
        daysOnMarket: 12,
        viewingShowRate: 96.5
      }
    }
  };

  // const data = analyticsData || mockData;
  const data = mockData;

  // Calculate percentage changes
  const calculateChange = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const viewsChange = calculateChange(data?.kpis?.totalViews, data?.kpis?.previousPeriod?.totalViews);
  const appsChange = calculateChange(data?.kpis?.totalApplications, data?.kpis?.previousPeriod?.totalApplications);
  const viewingsChange = calculateChange(data?.kpis?.totalViewingRequests, data?.kpis?.previousPeriod?.viewingRequests);
  const responseChange = calculateChange(data?.kpis?.avgResponseTime, data?.kpis?.previousPeriod?.avgResponseTime);

  // Export Functions
  const handleExportPDF = () => {
    toast.success('Generating PDF report...');
    // PDF export logic
  };

  const handleExportCSV = () => {
    toast.success('Exporting data to CSV...');
    // CSV export logic
  };

  const handleScheduleReport = () => {
    toast.success('Report scheduling settings opened');
    // Open modal for scheduling
  };

  const getPerformanceColor = (performance) => {
    const colors = {
      above: 'text-success',
      average: 'text-warning',
      below: 'text-error'
    };
    return colors[performance] || 'text-text-muted';
  };

  const getPerformanceIcon = (performance) => {
    if (performance === 'above') return '🟢';
    if (performance === 'average') return '🟡';
    return '🔴';
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-base-200">
  //       <div className="loading loading-spinner loading-lg text-primary"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-section-border backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                Performance Analytics
              </h1>
              <p className="text-text-muted mt-1 font-medium">
                Track your listing performance and rental activity
              </p>
            </div>

            {/* Time Period Selector & Export */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                className="select select-bordered select-sm"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="12months">Last 12 months</option>
                <option value="custom">Custom Range</option>
              </select>

              <label className="label cursor-pointer gap-2 bg-base-100 px-3 py-2 rounded-lg border border-section-border">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                  checked={compareMode}
                  onChange={(e) => setCompareMode(e.target.checked)}
                />
                <span className="label-text text-sm font-medium">Compare</span>
              </label>

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-primary btn-sm gap-2">
                  <Download className="w-4 h-4" />
                  Export
                  <ChevronDown className="w-4 h-4" />
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52 border border-section-border mt-2">
                  <li onClick={handleExportPDF}>
                    <a className="gap-2">
                      <FileText className="w-4 h-4" />
                      Generate PDF Report
                    </a>
                  </li>
                  <li onClick={handleExportCSV}>
                    <a className="gap-2">
                      <Download className="w-4 h-4" />
                      Export to CSV/Excel
                    </a>
                  </li>
                  <li onClick={handleScheduleReport}>
                    <a className="gap-2">
                      <Mail className="w-4 h-4" />
                      Schedule Email Reports
                    </a>
                  </li>
                  <div className="divider my-0"></div>
                  <li>
                    <a className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Share with Team
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Custom Date Range */}
          {timePeriod === 'custom' && (
            <div className="flex gap-3 mt-4">
              <input
                type="date"
                className="input input-bordered input-sm"
                value={customDateRange.start}
                onChange={(e) => setCustomDateRange({ ...customDateRange, start: e.target.value })}
              />
              <span className="flex items-center text-text-muted">to</span>
              <input
                type="date"
                className="input input-bordered input-sm"
                value={customDateRange.end}
                onChange={(e) => setCustomDateRange({ ...customDateRange, end: e.target.value })}
              />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Views */}
          <div className="card bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="card-body p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                {viewsChange !== 0 && (
                  <div className={`flex items-center gap-1 text-xs font-bold ${viewsChange > 0 ? 'text-success' : 'text-error'}`}>
                    {viewsChange > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(viewsChange).toFixed(1)}%
                  </div>
                )}
              </div>
              <h3 className="text-3xl font-bold text-primary">{data?.kpis?.totalViews?.toLocaleString()}</h3>
              <p className="text-sm font-semibold text-primary/70 mt-1">Total Views</p>
              <p className="text-xs text-text-muted mt-2">
                {data?.kpis?.avgViewsPerListing} avg per listing
              </p>
            </div>
          </div>

          {/* Total Applications */}
          <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="card-body p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                {appsChange !== 0 && (
                  <div className={`flex items-center gap-1 text-xs font-bold ${appsChange > 0 ? 'text-success' : 'text-error'}`}>
                    {appsChange > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(appsChange).toFixed(1)}%
                  </div>
                )}
              </div>
              <h3 className="text-3xl font-bold text-secondary">{data?.kpis?.totalApplications}</h3>
              <p className="text-sm font-semibold text-secondary/70 mt-1">Applications</p>
              <p className="text-xs text-text-muted mt-2">
                {data?.kpis?.applicationConversionRate}% conversion rate
              </p>
            </div>
          </div>

          {/* Viewing Requests */}
          <div className="card bg-gradient-to-br from-info/10 to-info/5 border-2 border-info/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="card-body p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-info/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-info" />
                </div>
                {viewingsChange !== 0 && (
                  <div className={`flex items-center gap-1 text-xs font-bold ${viewingsChange > 0 ? 'text-success' : 'text-error'}`}>
                    {viewingsChange > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(viewingsChange).toFixed(1)}%
                  </div>
                )}
              </div>
              <h3 className="text-3xl font-bold text-info">{data?.kpis?.totalViewingRequests}</h3>
              <p className="text-sm font-semibold text-info/70 mt-1">Viewing Requests</p>
              <p className="text-xs text-text-muted mt-2">
                {data?.kpis?.confirmedViewings} confirmed ({(data?.kpis?.confirmedViewings / data?.kpis?.totalViewingRequests * 100).toFixed(1)}%)
              </p>
            </div>
          </div>

          {/* Response Time */}
          <div className="card bg-gradient-to-br from-warning/10 to-warning/5 border-2 border-warning/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="card-body p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center">
                  <Timer className="w-6 h-6 text-warning" />
                </div>
                {responseChange !== 0 && (
                  <div className={`flex items-center gap-1 text-xs font-bold ${responseChange < 0 ? 'text-success' : 'text-error'}`}>
                    {responseChange < 0 ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                    {Math.abs(responseChange).toFixed(1)}%
                  </div>
                )}
              </div>
              <h3 className="text-3xl font-bold text-warning">{data?.kpis?.avgResponseTime}h</h3>
              <p className="text-sm font-semibold text-warning/70 mt-1">Avg Response Time</p>
              <p className="text-xs text-text-muted mt-2">
                {data?.kpis?.noShowRate}% no-show rate
              </p>
            </div>
          </div>

          {/* Active Listings */}
          <div className="card bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="card-body p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-accent-content" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-accent-content">{data?.kpis?.activeListings}</h3>
              <p className="text-sm font-semibold text-accent-content/70 mt-1">Active Listings</p>
              <p className="text-xs text-text-muted mt-2">
                {data?.kpis?.listingCompletionRate}% completion rate
              </p>
            </div>
          </div>

          {/* Qualified Applicants */}
          <div className="card bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="card-body p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-success" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-success">{data?.kpis?.qualifiedApplicants}</h3>
              <p className="text-sm font-semibold text-success/70 mt-1">Qualified Applicants</p>
              <p className="text-xs text-text-muted mt-2">
                {((data?.kpis?.qualifiedApplicants / data?.kpis?.totalApplications) * 100).toFixed(1)}% of total applications
              </p>
            </div>
          </div>

          {/* Days on Market */}
          <div className="card bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-2 border-purple-500/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="card-body p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-500" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-purple-500">{data?.kpis?.avgDaysOnMarket}</h3>
              <p className="text-sm font-semibold text-purple-500/70 mt-1">Avg Days on Market</p>
              <p className="text-xs text-text-muted mt-2">
                {data?.kpis?.avgTimeToRent} days to rent
              </p>
            </div>
          </div>

          {/* Time to First App */}
          <div className="card bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-2 border-cyan-500/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="card-body p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-cyan-500" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-cyan-500">{data?.kpis?.avgTimeToFirstApp}</h3>
              <p className="text-sm font-semibold text-cyan-500/70 mt-1">Days to First App</p>
              <p className="text-xs text-text-muted mt-2">
                Average time to receive first application
              </p>
            </div>
          </div>
        </div>

        {/* Performance Over Time Chart */}
        <div className="card bg-base-100 shadow-xl border border-section-border mb-8">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <h2 className="card-title text-2xl flex items-center gap-2">
                <Activity className="w-6 h-6 text-primary" />
                Performance Over Time
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMetric('views')}
                  className={`btn btn-sm ${selectedMetric === 'views' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Views
                </button>
                <button
                  onClick={() => setSelectedMetric('applications')}
                  className={`btn btn-sm ${selectedMetric === 'applications' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Applications
                </button>
                <button
                  onClick={() => setSelectedMetric('viewings')}
                  className={`btn btn-sm ${selectedMetric === 'viewings' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  Viewings
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={data.performanceOverTime}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0E7490" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0E7490" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorViewings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="date" stroke="#64748B" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748B" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '12px'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#0E7490"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                  name="Views"
                />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stroke="#059669"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorApps)"
                  name="Applications"
                />
                <Area
                  type="monotone"
                  dataKey="viewings"
                  stroke="#0EA5E9"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorViewings)"
                  name="Viewings"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Status Distribution Pie Chart */}
          <div className="card bg-base-100 shadow-xl border border-section-border">
            <div className="card-body">
              <h2 className="card-title text-xl flex items-center gap-2 mb-4">
                <PieChartIcon className="w-5 h-5 text-primary" />
                Listing Status Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data?.statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data?.statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="card bg-base-100 shadow-xl border border-section-border">
            <div className="card-body">
              <h2 className="card-title text-xl flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-primary" />
                Conversion Funnel
              </h2>
              <div className="space-y-4">
                {data.conversionFunnel.map((stage, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">{stage?.stage}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold">{stage?.value?.toLocaleString()}</span>
                        <span className="badge badge-primary badge-sm">{stage?.percentage}%</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-base-300 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                          style={{ width: `${stage?.percentage * 3.33}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Best Performing Listings */}
        <div className="card bg-base-100 shadow-xl border border-section-border mb-8">
          <div className="card-body">
            <h2 className="card-title text-2xl flex items-center gap-2 mb-6">
              <Award className="w-6 h-6 text-primary" />
              Top Performing Listings
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.listingPerformance.slice(0, 5)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" stroke="#64748B" style={{ fontSize: '12px' }} />
                <YAxis dataKey="title" type="category" width={200} stroke="#64748B" style={{ fontSize: '11px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="views" fill="#0E7490" name="Views" radius={[0, 8, 8, 0]} />
                <Bar dataKey="applications" fill="#059669" name="Applications" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Listing Performance Table */}
        <div className="card bg-base-100 shadow-xl border border-section-border mb-8">
          <div className="card-body">
            <h2 className="card-title text-2xl flex items-center gap-2 mb-6">
              <BarChart3 className="w-6 h-6 text-primary" />
              Detailed Listing Performance
            </h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-base-200">
                    <th></th>
                    <th>Listing</th>
                    <th>Days Active</th>
                    <th>Views</th>
                    <th>Requests</th>
                    <th>Applications</th>
                    <th>Conversion %</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.listingPerformance.map((listing, idx) => (
                    <tr key={listing.id} className="hover">
                      <td>
                        <span className="text-lg">{getPerformanceIcon(listing.performance)}</span>
                      </td>
                      <td>
                        <div>
                          <div className="font-semibold">{listing.title}</div>
                          <div className="text-xs text-text-muted">{listing.address}</div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost">{listing.daysActive} days</span>
                      </td>
                      <td>
                        <span className="font-bold text-primary">{listing.views.toLocaleString()}</span>
                      </td>
                      <td>
                        <span className="font-bold text-info">{listing.requests}</span>
                      </td>
                      <td>
                        <span className="font-bold text-secondary">{listing.applications}</span>
                      </td>
                      <td>
                        <span className={`font-bold ${getPerformanceColor(listing.performance)}`}>
                          {listing.conversionRate}%
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-success badge-sm">{listing.status}</span>
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-xs gap-1">
                          View
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Demographics & Viewing Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Demographics */}
          <div className="card bg-base-100 shadow-xl border border-section-border">
            <div className="card-body">
              <h2 className="card-title text-xl flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-primary" />
                Applicant Demographics
              </h2>
              <div className="space-y-6">
                {/* Age Range */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Age Range</h3>
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={data.demographics.ageRange}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="range" stroke="#64748B" style={{ fontSize: '11px' }} />
                      <YAxis stroke="#64748B" style={{ fontSize: '11px' }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#0E7490" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Budget Range */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Budget Range</h3>
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={data.demographics.budgetRange}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="range" stroke="#64748B" style={{ fontSize: '11px' }} />
                      <YAxis stroke="#64748B" style={{ fontSize: '11px' }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#059669" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Viewing Time Preferences */}
          <div className="card bg-base-100 shadow-xl border border-section-border">
            <div className="card-body">
              <h2 className="card-title text-xl flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                Peak Viewing Times
              </h2>
              <div className="overflow-x-auto">
                <table className="table table-xs">
                  <thead>
                    <tr className="bg-base-200">
                      <th>Day</th>
                      <th>9-12</th>
                      <th>12-15</th>
                      <th>15-18</th>
                      <th>18-21</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.viewingHeatmap.map((day, idx) => (
                      <tr key={idx}>
                        <td className="font-semibold">{day.day}</td>
                        <td>
                          <div className={`badge ${day['9-12'] > 15 ? 'badge-success' : day['9-12'] > 10 ? 'badge-warning' : 'badge-ghost'}`}>
                            {day['9-12']}
                          </div>
                        </td>
                        <td>
                          <div className={`badge ${day['12-15'] > 15 ? 'badge-success' : day['12-15'] > 10 ? 'badge-warning' : 'badge-ghost'}`}>
                            {day['12-15']}
                          </div>
                        </td>
                        <td>
                          <div className={`badge ${day['15-18'] > 20 ? 'badge-success' : day['15-18'] > 15 ? 'badge-warning' : 'badge-ghost'}`}>
                            {day['15-18']}
                          </div>
                        </td>
                        <td>
                          <div className={`badge ${day['18-21'] > 15 ? 'badge-success' : day['18-21'] > 10 ? 'badge-warning' : 'badge-ghost'}`}>
                            {day['18-21']}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="badge badge-success badge-sm"></div>
                  <span>High demand</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="badge badge-warning badge-sm"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="badge badge-ghost badge-sm"></div>
                  <span>Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benchmarking */}
        <div className="card bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-2xl flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
              Performance Benchmarking
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Response Time */}
              <div>
                <p className="text-sm text-text-muted mb-3 font-semibold">Response Time (hours)</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">You</span>
                      <span className="font-bold text-primary">{data.benchmarks.yourAvg.responseTime}h</span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(data.benchmarks.yourAvg.responseTime / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">Platform Avg</span>
                      <span className="font-bold text-text-muted">{data.benchmarks.platformAvg.responseTime}h</span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-text-muted h-2 rounded-full"
                        style={{ width: `${(data.benchmarks.platformAvg.responseTime / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">Top Performers</span>
                      <span className="font-bold text-success">{data.benchmarks.topPerformers.responseTime}h</span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-success h-2 rounded-full"
                        style={{ width: `${(data.benchmarks.topPerformers.responseTime / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion Rate */}
              <div>
                <p className="text-sm text-text-muted mb-3 font-semibold">Conversion Rate (%)</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">You</span>
                      <span className="font-bold text-primary">{data.benchmarks.yourAvg.conversionRate}%</span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(data.benchmarks.yourAvg.conversionRate / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">Platform Avg</span>
                      <span className="font-bold text-text-muted">{data.benchmarks.platformAvg.conversionRate}%</span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-text-muted h-2 rounded-full"
                        style={{ width: `${(data.benchmarks.platformAvg.conversionRate / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">Top Performers</span>
                      <span className="font-bold text-success">{data.benchmarks.topPerformers.conversionRate}%</span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-success h-2 rounded-full"
                        style={{ width: `${(data.benchmarks.topPerformers.conversionRate / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Days on Market */}
              <div>
                <p className="text-sm text-text-muted mb-3 font-semibold">Days on Market</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">You</span>
                      <span className="font-bold text-primary">{data.benchmarks.yourAvg.daysOnMarket}</span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(data.benchmarks.yourAvg.daysOnMarket / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">Platform Avg</span>
                      <span className="font-bold text-text-muted">{data.benchmarks.platformAvg.daysOnMarket}</span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-text-muted h-2 rounded-full"
                        style={{ width: `${(data.benchmarks.platformAvg.daysOnMarket / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">Top Performers</span>
                      <span className="font-bold text-success">{data.benchmarks.topPerformers.daysOnMarket}</span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-success h-2 rounded-full"
                        style={{ width: `${(data.benchmarks.topPerformers.daysOnMarket / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Viewing Show Rate */}
              <div>
                <p className="text-sm text-text-muted mb-3 font-semibold">Viewing Show Rate (%)</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">You</span>
                      <span className="font-bold text-primary">{data.benchmarks.yourAvg.viewingShowRate}%</span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${data.benchmarks.yourAvg.viewingShowRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">Platform Avg</span>
                      <span className="font-bold text-text-muted">{data.benchmarks.platformAvg.viewingShowRate}%</span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-text-muted h-2 rounded-full"
                        style={{ width: `${data.benchmarks.platformAvg.viewingShowRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">Top Performers</span>
                      <span className="font-bold text-success">{data.benchmarks.topPerformers.viewingShowRate}%</span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div
                        className="bg-success h-2 rounded-full"
                        style={{ width: `${data.benchmarks.topPerformers.viewingShowRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="card bg-base-100 shadow-xl border border-section-border">
          <div className="card-body">
            <h2 className="card-title text-2xl flex items-center gap-2 mb-6">
              <Lightbulb className="w-6 h-6 text-warning" />
              Insights & Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.insights.map((insight) => (
                <div
                  key={insight.id}
                  className={`alert ${insight.type === 'warning'
                      ? 'alert-warning'
                      : insight.type === 'success'
                        ? 'alert-success'
                        : 'alert-info'
                    } shadow-md`}
                >
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      {insight.type === 'warning' && <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
                      {insight.type === 'success' && <ThumbsUp className="w-5 h-5 flex-shrink-0" />}
                      {insight.type === 'info' && <Lightbulb className="w-5 h-5 flex-shrink-0" />}
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">{insight.title}</h3>
                        <p className="text-xs opacity-90">{insight.message}</p>
                        <button className="btn btn-sm btn-ghost mt-3 gap-2">
                          {insight.action}
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

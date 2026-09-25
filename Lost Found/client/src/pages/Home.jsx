import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Compass, 
  ArrowRight, 
  HelpCircle, 
  Shield, 
  Clock, 
  TrendingUp,
  Sparkles,
  Layers,
  Check
} from 'lucide-react';
import { fetchItems, fetchItemStats } from '../services/api';
import ItemCard from '../components/ItemCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalLost: 0,
    totalFound: 0,
    itemsRecovered: 0,
    totalItems: 0,
  });
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemTypeFilter, setItemTypeFilter] = useState('All');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Fetch stats
      const statsRes = await fetchItemStats();
      if (statsRes.data?.data) {
        setStats(statsRes.data.data);
      }

      // Fetch recent 6 items
      const itemsRes = await fetchItems({ limit: 6 });
      if (itemsRes.data?.data) {
        setRecentItems(itemsRes.data.data);
      }
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/lost-items?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const filteredRecentItems = recentItems.filter((item) => {
    if (itemTypeFilter === 'All') return true;
    return item.type === itemTypeFilter;
  });

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-b-3xl sm:rounded-b-[2.5rem] shadow-2xl">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-indigo-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Official Campus Lost & Found Community Hub</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none text-white mb-6">
            Lost Something? <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-300 via-blue-200 to-indigo-100 bg-clip-text text-transparent">
              Found Something?
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-indigo-100/80 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            The quickest and most reliable way for college students and faculty to report, search, and reclaim missing items across all campus blocks, labs, and libraries.
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
            <Link
              to="/report-lost"
              className="w-full sm:w-1/2 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <AlertCircle className="w-5 h-5" />
              <span>Report Lost Item</span>
            </Link>

            <Link
              to="/report-found"
              className="w-full sm:w-1/2 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-lg shadow-black/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
              <span>Report Found Item</span>
            </Link>
          </div>

          {/* Live Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1.5 shadow-2xl focus-within:border-indigo-400 transition-colors">
              <Search className="w-5 h-5 text-indigo-200 ml-3.5 shrink-0" />
              <input
                type="text"
                placeholder="Search by keyword (e.g. calculator, ID card, keys, laptop)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-3.5 py-2 text-white placeholder-indigo-200/60 focus:outline-hidden text-sm sm:text-base font-medium"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors shrink-0"
              >
                Search
              </button>
            </div>
          </form>

        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          
          {/* Stat 1: Total Lost Items */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg shadow-slate-200/50 flex items-center gap-5 hover:border-rose-300 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Lost Items</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats.totalLost}</p>
              <p className="text-xs text-slate-400 mt-0.5">Reported by campus students</p>
            </div>
          </div>

          {/* Stat 2: Total Found Items */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg shadow-slate-200/50 flex items-center gap-5 hover:border-indigo-300 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Found Items</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats.totalFound}</p>
              <p className="text-xs text-slate-400 mt-0.5">Awaiting safe reclamation</p>
            </div>
          </div>

          {/* Stat 3: Items Recovered */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg shadow-slate-200/50 flex items-center gap-5 hover:border-emerald-300 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Items Recovered</p>
              <p className="text-3xl font-extrabold text-emerald-600 mt-1">{stats.itemsRecovered}</p>
              <p className="text-xs text-slate-400 mt-0.5">Successfully reunited owners</p>
            </div>
          </div>

        </div>
      </section>

      {/* Recently Reported Items Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4" />
              <span>Real-time Feed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Recently Reported Items
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Browse recently submitted reports from across the college campus.
            </p>
          </div>

          {/* Type Filter Buttons (All / Lost / Found) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl self-start sm:self-auto">
            {['All', 'Lost', 'Found'].map((filter) => (
              <button
                key={filter}
                onClick={() => setItemTypeFilter(filter)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  itemTypeFilter === filter
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {filter === 'All' ? 'All Items' : `${filter} Only`}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : filteredRecentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecentItems.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
            No recent items match the selected filter.
          </div>
        )}

        {/* View More Links */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/lost-items"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors"
          >
            <span>Browse All Lost Items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/found-items"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors"
          >
            <span>Browse All Found Items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* How It Works Section */}
      <section className="bg-slate-100/80 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-indigo-600 text-xs font-bold uppercase tracking-wider">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              How Campus Lost & Found Works
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Designed to connect finders and seekers safely and swiftly on campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-base flex items-center justify-center mb-4 shadow-md shadow-indigo-600/20">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Report the Item</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Fill out a quick report with details, category, location on campus, and your contact info.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-base flex items-center justify-center mb-4 shadow-md shadow-indigo-600/20">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Search & Match</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Filter by department, category, or search keywords to identify matching belongings instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-base flex items-center justify-center mb-4 shadow-md shadow-emerald-600/20">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Verify & Recover</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Contact the finder or owner, verify ownership at a campus helpdesk, and mark the item as recovered!
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;

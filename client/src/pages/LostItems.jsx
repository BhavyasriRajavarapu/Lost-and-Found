import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  AlertCircle, 
  MapPin, 
  Tag, 
  RefreshCw, 
  X,
  SlidersHorizontal,
  PlusCircle
} from 'lucide-react';
import { fetchItems } from '../services/api';
import ItemCard from '../components/ItemCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

const CATEGORIES = [
  'All',
  'Electronics',
  'ID & Cards',
  'Books & Stationery',
  'Keys',
  'Clothing & Accessories',
  'Bags & Wallets',
  'Bottles & Containers',
  'Other',
];

const LostItems = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('All');
  const [status, setStatus] = useState('All');

  useEffect(() => {
    // Sync search parameter from URL if present
    const urlSearch = searchParams.get('search');
    if (urlSearch !== null) {
      setSearch(urlSearch);
    }
    loadLostItems();
  }, [category, location, status]);

  const loadLostItems = async (customSearch = search) => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        type: 'Lost',
      };

      if (customSearch && customSearch.trim()) {
        params.search = customSearch.trim();
      }
      if (category !== 'All') {
        params.category = category;
      }
      if (location !== 'All') {
        params.location = location;
      }
      if (status !== 'All') {
        params.status = status;
      }

      const res = await fetchItems(params);
      if (res.data?.data) {
        setItems(res.data.data);
      }
    } catch (err) {
      console.error('Error loading lost items:', err);
      setError('Unable to load lost items from server. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(search ? { search } : {});
    loadLostItems(search);
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('All');
    setLocation('All');
    setStatus('All');
    setSearchParams({});
    loadLostItems('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-1">
            <AlertCircle className="w-4 h-4" />
            <span>Missing Belongings Catalog</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Lost Items on Campus
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Search and browse items reported lost by students and faculty across campus.
          </p>
        </div>

        <Link
          to="/report-lost"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-all self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report a Lost Item</span>
        </Link>
      </div>

      {/* Filter & Search Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        
        {/* Search Input Row */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, description, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  loadLostItems('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs"
          >
            Search
          </button>
        </form>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs sm:text-sm">
          
          {/* Category Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Campus Zone / Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Campus Locations</option>
              <option value="Library">Library & Reading Halls</option>
              <option value="Canteen">Canteen & Cafeteria</option>
              <option value="Lab">Computer & Science Labs</option>
              <option value="Auditorium">Auditorium & Seminar Halls</option>
              <option value="Sports">Sports Complex & Grounds</option>
              <option value="Workshop">Workshop & Engineering Blocks</option>
              <option value="Hostel">Hostels & Residential</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active (Still Missing)</option>
              <option value="Recovered">Recovered (Resolved)</option>
            </select>
          </div>

        </div>

        {/* Active Filters summary & Reset */}
        {(search || category !== 'All' || location !== 'All' || status !== 'All') && (
          <div className="flex items-center justify-between text-xs pt-2 text-slate-500">
            <span>Showing filtered results</span>
            <button
              onClick={handleResetFilters}
              className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
          {error}
        </div>
      )}

      {/* Items Grid / State */}
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : items.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-4 text-xs font-medium text-slate-500">
            <span>Total: <strong>{items.length}</strong> lost {items.length === 1 ? 'item' : 'items'} found</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          title="No Lost Items Found"
          description="We couldn't find any lost items matching your search criteria. Try removing filters or submit a new report."
          actionType="lost"
        />
      )}

    </div>
  );
};

export default LostItems;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  AlertCircle, 
  Send, 
  MapPin, 
  Calendar, 
  Tag, 
  Phone, 
  FileText, 
  ArrowLeft,
  Info,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { createItem } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = [
  'Electronics',
  'ID & Cards',
  'Books & Stationery',
  'Keys',
  'Clothing & Accessories',
  'Bags & Wallets',
  'Bottles & Containers',
  'Other',
];

const CAMPUS_PRESET_LOCATIONS = [
  'Central Library - 2nd Floor',
  'Canteen Block B Juice Counter',
  'Computer Science Lab 3',
  'Auditorium Quadrangle',
  'Mechanical Workshop',
  'Sports Complex Ground',
  'Lecture Hall Complex Room 204',
];

const ReportLost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Electronics',
    location: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    contact: user ? `${user.name} (${user.email}${user.phone ? ` / ${user.phone}` : ''})` : '',
  });

  React.useEffect(() => {
    if (user && !formData.contact) {
      setFormData(prev => ({
        ...prev,
        contact: `${user.name} (${user.email}${user.phone ? ` / ${user.phone}` : ''})`
      }));
    }
  }, [user]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationPreset = (preset) => {
    setFormData((prev) => ({ ...prev, location: preset }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!formData.title.trim() || !formData.location.trim() || !formData.description.trim() || !formData.contact.trim()) {
      setError('Please fill in all required fields marked with *');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        type: 'Lost',
        status: 'Active',
      };

      const response = await createItem(payload);
      if (response.data?.success) {
        setSuccessMsg('Lost item report filed successfully! Redirecting...');
        setTimeout(() => {
          navigate('/lost-items');
        }, 1200);
      }
    } catch (err) {
      console.error('Error reporting lost item:', err);
      setError(err.response?.data?.message || 'Failed to submit report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Link */}
      <Link
        to="/lost-items"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Lost Items</span>
      </Link>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-rose-600/10">
        <div className="flex items-center gap-2.5 text-rose-200 text-xs font-bold uppercase tracking-wider mb-2">
          <AlertCircle className="w-4 h-4 text-rose-300" />
          <span>Report Form</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Report a Lost Item
        </h1>
        <p className="text-sm text-rose-100/90 mt-1 max-w-xl">
          Provide as much accurate detail as possible so campus members who find your item can recognize and return it.
        </p>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Item Title / Name */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1.5">
            Item Name / Title <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="title"
              placeholder="e.g. Casio Scientific Calculator, Blue Water Bottle, College ID Card"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">Keep it short and descriptive</p>
        </div>

        {/* Category & Date Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1.5">
              Category <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Lost */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1.5">
              Date Lost <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                max={new Date().toISOString().split('T')[0]}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>
          </div>

        </div>

        {/* Location with Quick Presets */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1.5">
            Campus Location Where Lost <span className="text-rose-500">*</span>
          </label>
          <div className="relative mb-2">
            <input
              type="text"
              name="location"
              placeholder="e.g. Central Library 2nd Floor, CS Lab 3, Canteen Block B"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>

          {/* Quick Preset Tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">Quick suggestions:</span>
            {CAMPUS_PRESET_LOCATIONS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleLocationPreset(preset)}
                className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg border border-slate-200/80 transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1.5">
            Item Description & Distinguishing Features <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="description"
            rows="4"
            placeholder="Include color, brand, stickers, scratches, cover details, serial digits or exact time when misplaced..."
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-colors leading-relaxed"
          ></textarea>
        </div>

        {/* Contact Information */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1.5">
            Your Contact Information <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="contact"
              placeholder="e.g. yourname@campus.edu or +91 98765 43210 (Roll No. optional)"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-colors"
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">This will be shown on the details page so finders can reach you directly.</p>
        </div>

        {/* Submit Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <Link
            to="/lost-items"
            className="w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-center transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 disabled:opacity-50 transition-all shadow-md shadow-rose-600/20"
          >
            {submitting ? (
              <span>Submitting Report...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Lost Report</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};

export default ReportLost;

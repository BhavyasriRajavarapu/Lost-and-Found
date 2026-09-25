import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Share2, 
  Trash2, 
  Copy, 
  Check, 
  Phone, 
  Mail, 
  MessageSquare,
  ShieldCheck,
  Tag,
  Laptop,
  CreditCard,
  BookOpen,
  Key,
  Shirt,
  Briefcase,
  CupSoda,
  Box
} from 'lucide-react';
import { fetchItemById, updateItem, deleteItem } from '../services/api';

const categoryIcons = {
  'Electronics': Laptop,
  'ID & Cards': CreditCard,
  'Books & Stationery': BookOpen,
  'Keys': Key,
  'Clothing & Accessories': Shirt,
  'Bags & Wallets': Briefcase,
  'Bottles & Containers': CupSoda,
  'Other': Box,
};

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchItemById(id);
      if (res.data?.data) {
        setItem(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching item details:', err);
      setError('Item not found or an error occurred while loading details.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRecovered = async () => {
    if (!item) return;
    try {
      setActionLoading(true);
      const newStatus = item.status === 'Recovered' ? 'Active' : 'Recovered';
      const res = await updateItem(item._id, { status: newStatus });
      if (res.data?.data) {
        setItem(res.data.data);
      }
    } catch (err) {
      console.error('Error updating item status:', err);
      alert('Failed to update status. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    try {
      setActionLoading(true);
      await deleteItem(item._id);
      navigate(item.type === 'Lost' ? '/lost-items' : '/found-items');
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('Failed to delete item. Please try again.');
      setActionLoading(false);
    }
  };

  const handleCopyContact = () => {
    if (!item?.contact) return;
    navigator.clipboard.writeText(item.contact);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 animate-pulse space-y-6">
          <div className="h-8 w-1/3 bg-slate-200 rounded"></div>
          <div className="h-10 w-2/3 bg-slate-200 rounded"></div>
          <div className="h-32 bg-slate-100 rounded-2xl"></div>
          <div className="h-20 bg-slate-100 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Item Not Found</h2>
          <p className="text-slate-500 text-sm mb-6">{error || 'This item may have been removed or does not exist.'}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isLost = item.type === 'Lost';
  const isRecovered = item.status === 'Recovered';
  const IconComponent = categoryIcons[item.category] || Box;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Navigation & Actions Top Bar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to={isLost ? '/lost-items' : '/found-items'}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {isLost ? 'Lost Items' : 'Found Items'}</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Delete Button */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete this listing"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Item Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Banner with status and category */}
        <div className="p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            
            <div className="flex items-center gap-2.5">
              {/* Type Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase ${
                  isLost
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isLost ? 'bg-rose-500' : 'bg-indigo-600'}`}></span>
                {item.type} Item
              </span>

              {/* Status Badge */}
              {isRecovered ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Marked as Recovered</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Active Listing</span>
                </span>
              )}
            </div>

            {/* Category Tag */}
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
              <IconComponent className="w-4 h-4 text-indigo-600" />
              <span>{item.category}</span>
            </span>

          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {item.title}
          </h1>

          {/* Quick Details Chips */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-4 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Location: <strong className="text-slate-900">{item.location}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Date: <strong className="text-slate-900">{item.date}</strong></span>
            </div>
            {item.createdAt && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <span>Reported: {new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>

        </div>

        {/* Description Section */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Detailed Description
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/70 p-5 rounded-2xl border border-slate-200/70">
              {item.description}
            </p>
          </div>

          {/* Contact Section */}
          <div className="p-5 sm:p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-4">
            <div className="flex items-center gap-2.5 text-indigo-900 font-bold text-sm">
              <Phone className="w-4 h-4 text-indigo-600" />
              <span>Contact Information for this Item</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-indigo-200/80 shadow-xs">
              <div className="font-semibold text-slate-800 text-sm break-all">
                {item.contact}
              </div>

              <button
                onClick={handleCopyContact}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200 transition-colors shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Contact</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mark as Recovered Button */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="text-xs text-slate-500 text-center sm:text-left">
              {isRecovered
                ? 'Item was marked as recovered. You can reactivate it if needed.'
                : 'Have you found or recovered this item? Update its status to notify others.'}
            </div>

            <button
              onClick={handleToggleRecovered}
              disabled={actionLoading}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-xs ${
                isRecovered
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isRecovered ? 'Re-open Listing (Mark Active)' : 'Mark as Recovered'}</span>
            </button>

          </div>

        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">Delete Listing?</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Are you sure you want to remove this item permanently from the campus directory?
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="w-1/2 py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteItem}
                disabled={actionLoading}
                className="w-1/2 py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors"
              >
                {actionLoading ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ItemDetails;

import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX, PlusCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

const EmptyState = ({
  title = 'No items found',
  description = 'Try adjusting your search terms or filters to find what you are looking for.',
  actionType = 'all', // 'lost', 'found', or 'all'
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xs">
      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-100 shadow-inner">
        <SearchX className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">{description}</p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {(actionType === 'all' || actionType === 'lost') && (
          <Link
            to="/report-lost"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors"
          >
            <AlertCircle className="w-4 h-4" />
            <span>Report Lost Item</span>
          </Link>
        )}

        {(actionType === 'all' || actionType === 'found') && (
          <Link
            to="/report-found"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Report Found Item</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmptyState;

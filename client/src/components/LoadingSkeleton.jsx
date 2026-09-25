import React from 'react';

export const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 animate-pulse"
        >
          <div className="flex justify-between items-center">
            <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
            <div className="h-5 w-16 bg-slate-100 rounded-full"></div>
          </div>
          <div className="h-5 w-24 bg-slate-100 rounded"></div>
          <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-100 rounded"></div>
            <div className="h-4 w-4/5 bg-slate-100 rounded"></div>
          </div>
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
            <div className="h-4 w-1/3 bg-slate-100 rounded"></div>
            <div className="h-10 w-full bg-slate-200 rounded-xl mt-3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;

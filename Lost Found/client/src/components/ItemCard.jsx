import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Tag, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Laptop, 
  CreditCard, 
  BookOpen, 
  Key, 
  Shirt, 
  Briefcase, 
  CupSoda, 
  Box
} from 'lucide-react';

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

const categoryColors = {
  'Electronics': 'bg-blue-50 text-blue-700 border-blue-200',
  'ID & Cards': 'bg-purple-50 text-purple-700 border-purple-200',
  'Books & Stationery': 'bg-amber-50 text-amber-700 border-amber-200',
  'Keys': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Clothing & Accessories': 'bg-pink-50 text-pink-700 border-pink-200',
  'Bags & Wallets': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Bottles & Containers': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Other': 'bg-slate-50 text-slate-700 border-slate-200',
};

const ItemCard = ({ item }) => {
  const IconComponent = categoryIcons[item.category] || Box;
  const categoryColorClass = categoryColors[item.category] || categoryColors['Other'];
  const isLost = item.type === 'Lost';
  const isRecovered = item.status === 'Recovered';

  return (
    <div className={`group relative bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
      isRecovered 
        ? 'border-emerald-200/80 bg-emerald-50/10 hover:border-emerald-300' 
        : 'border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1'
    }`}>
      
      {/* Top Banner / Badges */}
      <div className="p-5 pb-0">
        <div className="flex items-center justify-between gap-2 mb-3">
          
          {/* Type Badge (Lost vs Found) */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
              isLost
                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isLost ? 'bg-rose-500' : 'bg-indigo-600'}`}></span>
            {item.type}
          </span>

          {/* Status Badge (Active vs Recovered) */}
          {isRecovered ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Recovered</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium text-slate-500 bg-slate-100 border border-slate-200">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Active</span>
            </span>
          )}
        </div>

        {/* Category Pill */}
        <div className="mb-2">
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border ${categoryColorClass}`}>
            <IconComponent className="w-3.5 h-3.5" />
            <span>{item.category}</span>
          </span>
        </div>

        {/* Item Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {item.title}
        </h3>

        {/* Description Snippet */}
        <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Meta Details & Footer CTA */}
      <div className="p-5 pt-4 mt-4 border-t border-slate-100/80 bg-slate-50/50 space-y-3">
        
        <div className="space-y-1.5 text-xs text-slate-500">
          {/* Location */}
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate font-medium text-slate-700">{item.location}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{item.date}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/items/${item._id}`}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-indigo-600 text-slate-700 hover:text-white border border-slate-200 hover:border-indigo-600 shadow-xs transition-all duration-200 group-hover:shadow-md"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>

      </div>
    </div>
  );
};

export default ItemCard;

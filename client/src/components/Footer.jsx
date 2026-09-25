import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, ShieldCheck, Mail, MapPin, ExternalLink, HelpCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & About */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Campus <span className="text-indigo-400">Lost & Found</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              An intelligent, transparent portal designed for college students, staff, and faculty to reconnect with lost belongings on campus.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-800/50 px-3 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Official Campus Service</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore Portal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/lost-items" className="text-slate-400 hover:text-white transition-colors">
                  Browse Lost Items
                </Link>
              </li>
              <li>
                <Link to="/found-items" className="text-slate-400 hover:text-white transition-colors">
                  Browse Found Items
                </Link>
              </li>
              <li>
                <Link to="/report-lost" className="text-slate-400 hover:text-white transition-colors">
                  File a Lost Report
                </Link>
              </li>
              <li>
                <Link to="/report-found" className="text-slate-400 hover:text-white transition-colors">
                  File a Found Report
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Safe Return Tips */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Campus Handover Hubs
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Central Library Helpdesk (Ground Floor)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Security Main Gate Control Room</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Student Affairs & Dean Office</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Project Info / College Review */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>College FSD Project</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Built with modern Full Stack Architecture: React.js, Tailwind CSS, Node.js, Express.js & MongoDB.
            </p>
            <div className="text-[11px] text-slate-400 border-t border-slate-700 pt-2 flex justify-between">
              <span>Status: <strong className="text-emerald-400">Production Ready</strong></span>
              <span>Semester Project</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Campus Lost & Found System. Developed for Academic Review.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Campus Community</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

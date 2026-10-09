import React, { useState } from 'react';
import { useSwap } from '../context/SwapContext';
import { Clock, Users, Plus, ArrowRightLeft, Sparkles, ChevronDown } from 'lucide-react';

interface NavbarProps {
  activeTab: 'explore' | 'requests' | 'how-it-works';
  setActiveTab: (tab: 'explore' | 'requests' | 'how-it-works') => void;
  onOpenOfferModal: () => void;
  onOpenLedgerModal: () => void;
  onOpenSwapsModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenOfferModal,
  onOpenLedgerModal,
  onOpenSwapsModal
}) => {
  const { currentUser, users, switchUser, swaps } = useSwap();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const activeSwapsCount = swaps.filter(
    s => (s.requesterId === currentUser.id || s.recipientId === currentUser.id) && s.status !== 'completed'
  ).length;

  return (
    <header className="sticky top-0 z-30 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => setActiveTab('explore')}
            className="text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap hover:text-amber-800 transition-colors flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-stone-900 text-amber-300 flex items-center justify-center font-bold text-sm shadow-sm">
              H
            </span>
            HourShare
          </button>
        </div>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('explore')}
            className={`whitespace-nowrap transition-colors pb-0.5 ${
              activeTab === 'explore'
                ? 'text-stone-950 font-semibold border-b-2 border-stone-950'
                : 'hover:text-stone-950'
            }`}
          >
            Explore Skills
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`whitespace-nowrap transition-colors pb-0.5 ${
              activeTab === 'requests'
                ? 'text-stone-950 font-semibold border-b-2 border-stone-950'
                : 'hover:text-stone-950'
            }`}
          >
            Community Requests
          </button>

          <button
            onClick={onOpenSwapsModal}
            className="whitespace-nowrap hover:text-stone-950 transition-colors flex items-center gap-1.5"
          >
            <span>Active Swaps</span>
            {activeSwapsCount > 0 && (
              <span className="text-xs font-semibold tabular-nums px-1.5 py-0.2 bg-amber-100 text-amber-900 rounded">
                {activeSwapsCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenLedgerModal}
            className="whitespace-nowrap hover:text-stone-950 transition-colors flex items-center gap-1.5"
          >
            <span>Time Ledger</span>
            <span className="text-xs font-semibold tabular-nums text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
              {currentUser.hoursBalance.toFixed(1)} hrs
            </span>
          </button>

          <button
            onClick={() => setActiveTab('how-it-works')}
            className={`whitespace-nowrap transition-colors pb-0.5 ${
              activeTab === 'how-it-works'
                ? 'text-stone-950 font-semibold border-b-2 border-stone-950'
                : 'hover:text-stone-950'
            }`}
          >
            How It Works
          </button>
        </nav>

        {/* Zone 3: 1 primary action + Persona quick switch */}
        <div className="flex items-center gap-3 shrink-0">
          {/* User Persona Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 transition-colors text-xs font-medium text-stone-700"
              title="Switch demo neighbor persona"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-6 h-6 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="hidden sm:inline whitespace-nowrap">{currentUser.name.split(' ')[0]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-stone-200 py-2 z-50">
                <div className="px-3 py-1.5 text-xs text-stone-400 font-medium border-b border-stone-100">
                  Switch Neighbor Perspective
                </div>
                {users.map(u => (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchUser(u.id);
                      setShowUserDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-stone-50 transition-colors text-xs ${
                      u.id === currentUser.id ? 'bg-amber-50/60 text-amber-950 font-medium' : 'text-stone-700'
                    }`}
                  >
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="truncate">
                      <div className="font-medium text-stone-900 truncate">{u.name}</div>
                      <div className="text-[11px] text-stone-500 truncate">
                        {u.neighborhood} · {u.hoursBalance.toFixed(1)} hrs
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onOpenOfferModal}
            className="px-3.5 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Offer a Skill</span>
          </button>
        </div>

      </div>

      {/* Mobile subnav */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200/60 px-2 py-2 text-xs font-medium text-stone-600 bg-stone-50/80">
        <button
          onClick={() => setActiveTab('explore')}
          className={`px-2 py-1 ${activeTab === 'explore' ? 'text-stone-900 font-semibold' : ''}`}
        >
          Explore
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-2 py-1 ${activeTab === 'requests' ? 'text-stone-900 font-semibold' : ''}`}
        >
          Requests
        </button>
        <button
          onClick={onOpenSwapsModal}
          className="px-2 py-1 flex items-center gap-1"
        >
          Swaps
          {activeSwapsCount > 0 && (
            <span className="text-[10px] font-bold px-1 bg-amber-200 text-stone-900 rounded">
              {activeSwapsCount}
            </span>
          )}
        </button>
        <button
          onClick={onOpenLedgerModal}
          className="px-2 py-1 text-emerald-800 font-medium"
        >
          Ledger ({currentUser.hoursBalance.toFixed(1)}h)
        </button>
      </div>
    </header>
  );
};

import React from 'react';
import { heroImg } from '../data/mockData';
import { Clock, ShieldCheck, ArrowRightLeft, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onRequestClick: () => void;
  onOpenLedger: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onRequestClick, onOpenLedger }) => {
  return (
    <section className="border-b border-stone-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Mission, Value Proposition & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Community TimeBank · Local Skill Exchange
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.15] text-balance">
              Trade an hour of your skill for an hour of mine.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              From vintage bicycle repairs and acoustic guitar chords to resume reviews and sourdough baking.
              Zero money exchanged—every neighbor's hour carries the same human dignity.
            </p>

            {/* Value pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-stone-600 border-t border-stone-100">
              <div className="space-y-1">
                <span className="font-semibold text-stone-900 block text-sm">1 Hour = 1 Credit</span>
                <span>An hour of coding equals an hour of garden weeding. True egalitarian exchange.</span>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-stone-900 block text-sm">Zero Money Friction</span>
                <span>No hourly rates, no payment processor fees, and no awkward invoice chasing.</span>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-stone-900 block text-sm">Hyper-Local Trust</span>
                <span>Connect with verified neighbors in Maplewood, Eastside, River North & beyond.</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-5 py-2.5 text-sm font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
              >
                Find a Skill to Learn
              </button>
              <button
                onClick={onRequestClick}
                className="px-5 py-2.5 text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                Post What You Need
              </button>
              <button
                onClick={onOpenLedger}
                className="px-4 py-2 text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors"
              >
                View Community Ledger →
              </button>
            </div>

            {/* Social proof metric row */}
            <div className="pt-2 flex items-center gap-6 text-xs text-stone-500">
              <div>
                <span className="font-bold text-stone-900 tabular-nums text-sm">52</span> hours traded this month
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div>
                <span className="font-bold text-stone-900 tabular-nums text-sm">100%</span> non-monetary
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div>
                <span className="font-bold text-stone-900 tabular-nums text-sm">18</span> neighborhood crafts
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[5/4]">
              <img
                src={heroImg}
                alt="Two neighbors in a community workshop porch exchanging bicycle repair and acoustic guitar lessons"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                  Live Neighbor Exchange
                </div>
                <div className="text-sm font-medium mt-0.5">
                  Marcus (Bike Mechanic) & Maya (Guitarist) trading an afternoon on the Eastside Porch
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

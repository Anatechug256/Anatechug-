import React from 'react';

interface FooterProps {
  onExplore: () => void;
  onRequests: () => void;
  onHowItWorks: () => void;
  onOpenLedger: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onExplore,
  onRequests,
  onHowItWorks,
  onOpenLedger
}) => {
  return (
    <footer className="border-t border-stone-200/80 bg-white py-12 text-xs text-stone-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-stone-900 text-amber-300 flex items-center justify-center font-bold text-xs">
                H
              </span>
              HourShare
            </div>
            <p className="text-stone-500 max-w-sm">
              Local non-monetary skill exchange network. An hour of your skill for an hour of someone else’s.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-medium text-stone-600">
            <button onClick={onExplore} className="hover:text-stone-900 transition-colors">
              Explore Skills
            </button>
            <button onClick={onRequests} className="hover:text-stone-900 transition-colors">
              Wanted Board
            </button>
            <button onClick={onOpenLedger} className="hover:text-stone-900 transition-colors">
              Time Ledger
            </button>
            <button onClick={onHowItWorks} className="hover:text-stone-900 transition-colors">
              How It Works
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-400 text-[11px]">
          <div>
            Equal time banking. Non-commercial community commons.
          </div>
          <div>
            Built with care for local neighborhoods.
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { SkillListing } from '../types';
import { X, Clock, MapPin, Wrench, ShieldCheck, HeartHandshake, CheckCircle2, Search } from 'lucide-react';

interface ListingDetailModalProps {
  listing: SkillListing | null;
  onClose: () => void;
  onProposeSwap: (listing: SkillListing) => void;
  onSearchSimilar?: (listing: SkillListing) => void;
  isCurrentUser: boolean;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
  listing,
  onClose,
  onProposeSwap,
  onSearchSimilar,
  isCurrentUser
}) => {
  if (!listing) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-stone-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-600 flex items-center justify-center shadow-sm transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Media Banner */}
        <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden">
          {listing.image ? (
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
              {listing.category}
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-stone-950/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded">
            {listing.durationHours.toFixed(1)} Hour Time Credit
          </div>

          {onSearchSimilar && (
            <button
              onClick={() => {
                onClose();
                onSearchSimilar(listing);
              }}
              className="absolute top-4 left-4 bg-white/95 hover:bg-white text-stone-800 text-xs font-medium px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-xs flex items-center gap-1.5 transition-all border border-stone-200/80"
              title="Search similar skills"
            >
              <Search className="w-3.5 h-3.5 text-amber-700" />
              <span className="text-[11px] font-semibold">Search similar skills</span>
            </button>
          )}
        </div>

        <div className="p-6 space-y-6">
          {/* Header & Category */}
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
              <span>{listing.category}</span>
              <span aria-hidden="true">·</span>
              <span>{listing.format}</span>
              <span aria-hidden="true">·</span>
              <span>{listing.experienceLevel}</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 leading-snug">
              {listing.title}
            </h2>
          </div>

          {/* Teacher Profile Strip */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <div className="flex items-center gap-3">
              <img
                src={listing.author.avatar}
                alt={listing.author.name}
                className="w-12 h-12 rounded-full object-cover border border-stone-200"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="font-semibold text-stone-900 text-sm">{listing.author.name}</div>
                <div className="text-xs text-stone-500">{listing.author.neighborhood}</div>
                <div className="text-xs text-stone-600 mt-1 line-clamp-1">{listing.author.bio}</div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs font-semibold text-stone-900 tabular-nums">
                {listing.author.swapsCompleted} swaps
              </div>
              <div className="text-[11px] text-emerald-800 font-medium">
                {listing.author.vouchesCount} vouches
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              About This Skill Session
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* What Teacher Hopes To Learn In Return */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 space-y-1">
            <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-amber-700" />
              What {listing.author.name.split(' ')[0]} is hoping to learn or receive:
            </div>
            <div className="text-sm text-amber-950 font-medium pl-5">
              {listing.lookingForSkill}
            </div>
            <div className="text-[11px] text-amber-800/80 pl-5">
              (You can also spend 1 Time Credit from your balance if you don't have this exact skill)
            </div>
          </div>

          {/* Session Logistics & Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-lg border border-stone-200 space-y-1.5">
              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                Session Location
              </div>
              <div className="text-stone-600">{listing.location}</div>
            </div>

            <div className="p-3 rounded-lg border border-stone-200 space-y-1.5">
              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-stone-500" />
                Tools / Materials Provided
              </div>
              <ul className="text-stone-600 list-disc list-inside space-y-0.5">
                {listing.toolsProvided.map((tool, i) => (
                  <li key={i}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Neighbor Vouches & Reviews */}
          {listing.vouches.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Neighbor Vouches ({listing.vouches.length})
              </h4>
              <div className="space-y-2.5">
                {listing.vouches.map(vouch => (
                  <div key={vouch.id} className="p-3 rounded-lg bg-stone-50 text-xs space-y-1">
                    <div className="flex items-center justify-between font-medium text-stone-800">
                      <span>{vouch.authorName}</span>
                      <span className="text-stone-400 text-[11px]">{vouch.date}</span>
                    </div>
                    <p className="text-stone-600 italic">"{vouch.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
              >
                Close
              </button>
              {onSearchSimilar && (
                <button
                  onClick={() => {
                    onClose();
                    onSearchSimilar(listing);
                  }}
                  className="px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5 text-stone-500" />
                  <span>Search similar skills</span>
                </button>
              )}
            </div>
            <button
              onClick={() => {
                onClose();
                onProposeSwap(listing);
              }}
              className="px-5 py-2.5 text-sm font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
            >
              {isCurrentUser ? 'Edit My Offering' : `Propose a Swap with ${listing.author.name.split(' ')[0]}`}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

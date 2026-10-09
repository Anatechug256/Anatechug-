import React from 'react';
import { SkillListing, User } from '../types';
import { Clock, MapPin, ArrowRightLeft, CheckCircle2, Search } from 'lucide-react';

interface ListingCardProps {
  listing: SkillListing;
  onSelect: (listing: SkillListing) => void;
  onProposeSwap: (listing: SkillListing) => void;
  onSearchSimilar: (listing: SkillListing) => void;
  onSelectUser?: (user: User) => void;
  isCurrentUser: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onSelect,
  onProposeSwap,
  onSearchSimilar,
  onSelectUser,
  isCurrentUser
}) => {
  return (
    <div
      onClick={() => onSelect(listing)}
      className="group bg-white rounded-xl border border-stone-200/80 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Card Image Slot with Fallback */}
        <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
          {listing.image ? (
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400 font-medium text-sm">
              {listing.category}
            </div>
          )}

          {/* Quick-action button: Search similar skills */}
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              onSearchSimilar(listing);
            }}
            title={`Search similar skills in ${listing.category}`}
            className="absolute top-2.5 right-2.5 bg-white/95 hover:bg-white text-stone-800 text-xs font-medium px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-xs flex items-center gap-1.5 transition-all border border-stone-200/80 hover:border-stone-400 z-10"
          >
            <Search className="w-3.5 h-3.5 text-amber-700" />
            <span className="text-[11px] font-semibold">Search similar skills</span>
          </button>

          {/* Currency indicator overlay */}
          <div className="absolute bottom-2.5 left-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
            {listing.durationHours.toFixed(1)} hr session
          </div>
        </div>

        {/* Content Box */}
        <div className="p-4 space-y-2.5">
          {/* Unboxed Metadata (Anti-slop zero pill rule) */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <span>{listing.category}</span>
            <span aria-hidden="true">·</span>
            <span>{listing.format}</span>
            <span aria-hidden="true">·</span>
            <span>{listing.experienceLevel}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-stone-900 leading-snug group-hover:text-amber-800 transition-colors">
            {listing.title}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>

          {/* What they want in return */}
          <div className="pt-1 text-xs text-stone-600 border-t border-stone-100">
            <span className="font-medium text-stone-800">Trade Wish: </span>
            <span className="text-stone-600">{listing.lookingForSkill}</span>
          </div>
        </div>
      </div>

      {/* Footer: Author Info & CTAs */}
      <div className="p-4 pt-0">
        <div className="flex items-center justify-between border-t border-stone-100 pt-3">
          <button
            type="button"
            onClick={e => {
              if (onSelectUser) {
                e.stopPropagation();
                onSelectUser(listing.author);
              }
            }}
            className="flex items-center gap-2 min-w-0 text-left hover:opacity-80 transition-opacity"
            title={`View ${listing.author.name}'s profile`}
          >
            <img
              src={listing.author.avatar}
              alt={listing.author.name}
              className="w-7 h-7 rounded-full object-cover shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 truncate">
              <div className="text-xs font-semibold text-stone-900 hover:text-amber-800 transition-colors truncate">
                {listing.author.name}
              </div>
              <div className="text-[11px] text-stone-400 truncate">
                {listing.author.neighborhood}
              </div>
            </div>
          </button>

          <div className="flex items-center gap-1.5">
            {/* Quick action button in footer as well */}
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                onSearchSimilar(listing);
              }}
              title="Search similar skills"
              className="p-1.5 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1"
            >
              <Search className="w-3.5 h-3.5 text-stone-500" />
              <span className="text-[11px] hidden xl:inline">Similar</span>
            </button>

            {/* Propose Swap Button */}
            <button
              onClick={e => {
                e.stopPropagation();
                onProposeSwap(listing);
              }}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 bg-stone-900 text-white hover:bg-stone-800"
            >
              {isCurrentUser ? 'Edit Offer' : 'Propose Swap'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


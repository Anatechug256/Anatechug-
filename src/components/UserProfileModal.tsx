import React from 'react';
import { User, SkillListing } from '../types';
import { useSwap } from '../context/SwapContext';
import { X, Clock, MapPin, Award, CheckCircle2, HeartHandshake, ArrowRightLeft } from 'lucide-react';

interface UserProfileModalProps {
  user: User | null;
  onClose: () => void;
  onSelectSkill: (listing: SkillListing) => void;
  onProposeSwap: (listing: SkillListing) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  user,
  onClose,
  onSelectSkill,
  onProposeSwap
}) => {
  const { listings, currentUser } = useSwap();

  if (!user) return null;

  const userListings = listings.filter(l => l.userId === user.id);
  const isMe = user.id === currentUser.id;

  // Gather all vouches across user's listings
  const allVouches = userListings.flatMap(l => l.vouches);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full shadow-xl border border-stone-200 overflow-hidden">
        
        {/* Header with Cover */}
        <div className="h-24 bg-gradient-to-r from-stone-900 to-stone-800 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Info Strip */}
        <div className="px-6 pb-6 pt-0 space-y-6">
          <div className="flex items-end justify-between -mt-12 mb-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
              referrerPolicy="no-referrer"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-900 rounded-lg border border-amber-200/80 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{user.hoursBalance.toFixed(1)} hrs in Wallet</span>
              </span>
            </div>
          </div>

          {/* Name & Bio */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-stone-900">{user.name}</h2>
              {isMe && (
                <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                  You
                </span>
              )}
            </div>
            <div className="text-xs text-stone-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>{user.neighborhood}</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-700 font-medium">{user.swapsCompleted} swaps completed</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-800 font-medium">{user.vouchesCount} community vouches</span>
            </div>
            <p className="text-xs text-stone-700 pt-1 leading-relaxed">
              {user.bio}
            </p>
          </div>

          {/* Skills Offered & Looking For Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                Skills Offered
              </div>
              <ul className="text-xs text-stone-600 space-y-1">
                {user.skillsOffered.map((sk, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>{sk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60 space-y-1.5">
              <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
                Hopes to Learn / Receive
              </div>
              <ul className="text-xs text-amber-900/80 space-y-1">
                {user.skillsWanted.map((sk, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                    <span>{sk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Active Listings by this user */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Active Skill Offerings ({userListings.length})
            </h3>
            {userListings.length === 0 ? (
              <div className="p-4 text-center text-xs text-stone-400 border border-dashed border-stone-200 rounded-xl">
                No active listings published yet.
              </div>
            ) : (
              <div className="space-y-2">
                {userListings.map(listing => (
                  <div
                    key={listing.id}
                    className="p-3 rounded-xl border border-stone-200 flex items-center justify-between gap-3 hover:bg-stone-50 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-stone-900 truncate">
                        {listing.title}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {listing.durationHours.toFixed(1)} hr session · {listing.format} · {listing.experienceLevel}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectSkill(listing);
                        }}
                        className="px-2.5 py-1 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                      >
                        Details
                      </button>
                      {!isMe && (
                        <button
                          onClick={() => {
                            onClose();
                            onProposeSwap(listing);
                          }}
                          className="px-3 py-1 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                        >
                          Propose Swap
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Vouches Received */}
          {allVouches.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Neighbor Appreciation & Vouches ({allVouches.length})
              </h3>
              <div className="space-y-2 max-h-36 overflow-y-auto">
                {allVouches.map((v, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-stone-50 text-xs text-stone-600 italic">
                    <span className="font-semibold text-stone-800 not-italic mr-1.5">{v.authorName}:</span>
                    "{v.text}"
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Done button */}
          <div className="pt-2 flex justify-end border-t border-stone-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

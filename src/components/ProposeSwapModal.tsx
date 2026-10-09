import React, { useState } from 'react';
import { SkillListing, User } from '../types';
import { useSwap } from '../context/SwapContext';
import { X, Clock, ArrowRightLeft, Sparkles, MapPin, Check } from 'lucide-react';

interface ProposeSwapModalProps {
  listing: SkillListing | null;
  onClose: () => void;
  onSwapProposed: () => void;
}

export const ProposeSwapModal: React.FC<ProposeSwapModalProps> = ({
  listing,
  onClose,
  onSwapProposed
}) => {
  const { currentUser, proposeSwap } = useSwap();

  const [tradeType, setTradeType] = useState<'time_credit' | 'direct_swap'>('time_credit');
  const [selectedMySkill, setSelectedMySkill] = useState<string>(
    currentUser.skillsOffered[0] || 'Acoustic Guitar Lessons'
  );
  const [customSkill, setCustomSkill] = useState<string>('');
  const [hours, setHours] = useState<number>(listing ? listing.durationHours : 1.0);
  const [proposedDate, setProposedDate] = useState<string>('This Saturday, 10:30 AM');
  const [locationType, setLocationType] = useState<string>('community_spot');
  const [note, setNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  if (!listing) return null;

  const handlePropose = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const locationText =
      locationType === 'community_spot'
        ? `Local Community Spot / Park (${currentUser.neighborhood})`
        : locationType === 'author_spot'
        ? listing.location
        : 'Virtual Video Call';

    const offeredSkill =
      tradeType === 'direct_swap'
        ? (customSkill.trim() || selectedMySkill)
        : undefined;

    proposeSwap({
      listingId: listing.id,
      recipientId: listing.userId,
      offeredType: tradeType,
      offeredSkillTitle: offeredSkill,
      requestedSkillTitle: listing.title,
      hours: hours,
      proposedDate: proposedDate.split(',')[0] || proposedDate,
      proposedTime: proposedDate.split(',')[1] || 'Flexible Time',
      location: locationText,
      format: listing.format,
      note: note.trim() || `Hi ${listing.author.name}! I would love to trade ${hours} hour(s) for your ${listing.title}.`
    });

    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => {
      onSwapProposed();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full shadow-xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Community Skill Swap Proposal
            </div>
            <h3 className="text-lg font-bold text-stone-900 mt-0.5">
              Propose an Exchange with {listing.author.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-100 text-stone-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-stone-900">Proposal Sent to {listing.author.name.split(' ')[0]}!</h4>
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              They have received your proposal in their active coordination queue. No money is exchanged—only verified community time.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePropose} className="p-5 space-y-4">
            
            {/* Target Skill Summary Box */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center gap-3">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-12 h-12 rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <div className="text-xs text-stone-500">Skill you are requesting:</div>
                <div className="text-sm font-semibold text-stone-900 truncate">{listing.title}</div>
                <div className="text-[11px] text-stone-600">Offered by {listing.author.name} ({listing.author.neighborhood})</div>
              </div>
            </div>

            {/* How do you want to pay / exchange? */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-800">
                How would you like to exchange for this session?
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setTradeType('time_credit')}
                  className={`p-3 rounded-xl text-left border transition-all text-xs ${
                    tradeType === 'time_credit'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white text-stone-800'
                  }`}
                >
                  <div className="font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Pay with Time Credit</span>
                  </div>
                  <div className={`text-[11px] mt-1 ${tradeType === 'time_credit' ? 'text-stone-300' : 'text-stone-500'}`}>
                    Use {hours.toFixed(1)} of your {currentUser.hoursBalance.toFixed(1)} credits
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTradeType('direct_swap')}
                  className={`p-3 rounded-xl text-left border transition-all text-xs ${
                    tradeType === 'direct_swap'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white text-stone-800'
                  }`}
                >
                  <div className="font-semibold flex items-center gap-1.5">
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    <span>Direct Skill Barter</span>
                  </div>
                  <div className={`text-[11px] mt-1 ${tradeType === 'direct_swap' ? 'text-stone-300' : 'text-stone-500'}`}>
                    Teach a skill back in exchange
                  </div>
                </button>
              </div>
            </div>

            {/* If direct barter, pick skill */}
            {tradeType === 'direct_swap' && (
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 space-y-2 text-xs">
                <div className="font-semibold text-amber-950">
                  Select a skill you will teach {listing.author.name.split(' ')[0]}:
                </div>
                {currentUser.skillsOffered.length > 0 && (
                  <select
                    value={selectedMySkill}
                    onChange={e => setSelectedMySkill(e.target.value)}
                    className="w-full p-2 bg-white border border-stone-200 rounded-lg text-stone-800 font-medium"
                  >
                    {currentUser.skillsOffered.map((sk, idx) => (
                      <option key={idx} value={sk}>
                        {sk}
                      </option>
                    ))}
                    <option value="custom">Other custom skill...</option>
                  </select>
                )}
                {selectedMySkill === 'custom' && (
                  <input
                    type="text"
                    value={customSkill}
                    onChange={e => setCustomSkill(e.target.value)}
                    placeholder="Describe skill (e.g. Italian cooking, carpentry)..."
                    className="w-full p-2 bg-white border border-stone-200 rounded-lg text-stone-800"
                  />
                )}
              </div>
            )}

            {/* Duration Selector */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Session Duration
                </label>
                <select
                  value={hours}
                  onChange={e => setHours(parseFloat(e.target.value))}
                  className="w-full p-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-800 font-medium"
                >
                  <option value={1.0}>1.0 Hour (1 Credit)</option>
                  <option value={1.5}>1.5 Hours (1.5 Credits)</option>
                  <option value={2.0}>2.0 Hours (2 Credits)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Location Preference
                </label>
                <select
                  value={locationType}
                  onChange={e => setLocationType(e.target.value)}
                  className="w-full p-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-800 font-medium"
                >
                  <option value="community_spot">Local Park / Gazebo</option>
                  <option value="author_spot">Neighbor's Studio / Workshop</option>
                  <option value="virtual">Virtual Call (Zoom/Meet)</option>
                </select>
              </div>
            </div>

            {/* Proposed Timing */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Proposed Date & Time
              </label>
              <input
                type="text"
                value={proposedDate}
                onChange={e => setProposedDate(e.target.value)}
                placeholder="e.g. This Saturday, 10:30 AM or Weekday after 5 PM"
                className="w-full p-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-800 placeholder:text-stone-400"
              />
            </div>

            {/* Message to Neighbor */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Personal Note / What You'd Like to Focus On
              </label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                rows={3}
                placeholder={`Introduce yourself and mention what you'd like to learn or any tools you have...`}
                className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-lg text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
              >
                {isSubmitting ? 'Sending Proposal...' : 'Send Swap Proposal'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

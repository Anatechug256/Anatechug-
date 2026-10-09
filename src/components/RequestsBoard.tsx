import React, { useState, useMemo } from 'react';
import { useSwap } from '../context/SwapContext';
import { SkillRequest, Category, User } from '../types';
import { Plus, Clock, MessageSquare, Check, Handshake, AlertCircle, Search, Filter } from 'lucide-react';

interface RequestsBoardProps {
  onOpenCreateRequest: () => void;
  onOpenSwaps: () => void;
  onSelectUser: (user: User) => void;
}

const CATEGORIES: Category[] = [
  'All',
  'Repair & Making',
  'Music & Arts',
  'Career & Digital',
  'Food & Cooking',
  'Language & Learning',
  'Home & Garden'
];

export const RequestsBoard: React.FC<RequestsBoardProps> = ({
  onOpenCreateRequest,
  onOpenSwaps,
  onSelectUser
}) => {
  const { requests, currentUser, respondToRequest } = useSwap();

  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('All');
  const [respondingTo, setRespondingTo] = useState<SkillRequest | null>(null);
  const [offerNote, setOfferNote] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      if (selectedCategory !== 'All' && req.category !== selectedCategory) return false;
      if (selectedUrgency !== 'All' && req.urgency !== selectedUrgency) return false;
      return true;
    });
  }, [requests, selectedCategory, selectedUrgency]);

  const handleSendHelp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!respondingTo) return;

    respondToRequest(respondingTo.id, offerNote);
    setSuccessMsg(`Offered help to ${respondingTo.author.name}! A proposal was created in your Active Swaps.`);
    setOfferNote('');
    setTimeout(() => {
      setRespondingTo(null);
      setSuccessMsg('');
    }, 1500);
  };

  return (
    <div className="space-y-6 pt-4 pb-12">
      {/* Header & Post CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
            Community Wanted Board
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mt-0.5">
            Skills Neighbors Are Seeking Right Now
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Have a skill someone is asking for? Lend a hand for an hour, earn Time Credits, or trade directly!
          </p>
        </div>

        <button
          onClick={onOpenCreateRequest}
          className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post a Request</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Category tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Urgency selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium whitespace-nowrap">Urgency:</span>
            <select
              value={selectedUrgency}
              onChange={e => setSelectedUrgency(e.target.value)}
              className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-lg hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
            >
              <option value="All">All Urgencies</option>
              <option value="Urgent">Urgent (Within 48h)</option>
              <option value="This Week">This Week</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-stone-500 flex items-center justify-between">
          <span>
            Showing <strong className="text-stone-900 tabular-nums">{filteredRequests.length}</strong> community requests
          </span>
          {(selectedCategory !== 'All' || selectedUrgency !== 'All') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedUrgency('All');
              }}
              className="text-amber-800 hover:underline font-medium"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Requests Grid */}
      {filteredRequests.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-stone-200/80 p-8 space-y-4 my-6">
          <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">No requests in this view</h3>
          <p className="text-xs text-stone-600 max-w-sm mx-auto">
            No active requests match the selected filters. Post what you need to get help from a neighbor!
          </p>
          <button
            onClick={onOpenCreateRequest}
            className="px-4 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-colors"
          >
            Post a New Request
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.map(req => {
            const isMine = req.userId === currentUser.id;

            return (
              <div
                key={req.id}
                className="bg-white rounded-xl border border-stone-200/80 p-5 flex flex-col justify-between hover:shadow-xs transition-shadow"
              >
                <div className="space-y-3">
                  {/* Meta row */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-stone-500">
                      <span>{req.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{req.format}</span>
                      <span aria-hidden="true">·</span>
                      <span className={`font-medium ${
                        req.urgency === 'Urgent'
                          ? 'text-rose-700 font-semibold'
                          : req.urgency === 'This Week'
                          ? 'text-amber-700'
                          : 'text-stone-500'
                      }`}>
                        {req.urgency}
                      </span>
                    </div>

                    <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-xs font-bold tabular-nums border border-emerald-200/60">
                      Offers {req.creditsOffered.toFixed(1)} Credit
                    </span>
                  </div>

                  {/* Request title */}
                  <h3 className="text-base font-semibold text-stone-900 leading-snug">
                    {req.title}
                  </h3>

                  {/* Skill looking for */}
                  <div className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                    <span className="font-medium text-stone-900">Seeking: </span>
                    {req.lookingFor}
                  </div>
                </div>

                {/* Author & Action */}
                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectUser(req.author)}
                    className="flex items-center gap-2.5 min-w-0 text-left group hover:opacity-80 transition-opacity"
                    title={`View ${req.author.name}'s profile`}
                  >
                    <img
                      src={req.author.avatar}
                      alt={req.author.name}
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 truncate">
                      <div className="text-xs font-semibold text-stone-900 group-hover:text-amber-800 transition-colors truncate">
                        {req.author.name}
                      </div>
                      <div className="text-[11px] text-stone-400 truncate">
                        {req.author.neighborhood}
                      </div>
                    </div>
                  </button>

                  {isMine ? (
                    <span className="text-xs text-stone-400 font-medium">Your request</span>
                  ) : (
                    <button
                      onClick={() => setRespondingTo(req)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors"
                    >
                      I Can Help with This
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Response Modal */}
      {respondingTo && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl max-w-md w-full shadow-xl border border-stone-200 p-5 space-y-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Offer Assistance
              </div>
              <h3 className="text-base font-bold text-stone-900 mt-0.5">
                Respond to {respondingTo.author.name}'s Request
              </h3>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl text-xs space-y-1">
              <div className="font-semibold text-stone-900">{respondingTo.title}</div>
              <div className="text-stone-500">Reward: {respondingTo.creditsOffered} Time Credit</div>
            </div>

            {successMsg ? (
              <div className="p-4 bg-emerald-50 text-emerald-900 text-xs rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{successMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleSendHelp} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-stone-800 mb-1">
                    Message to {respondingTo.author.name.split(' ')[0]}:
                  </label>
                  <textarea
                    value={offerNote}
                    onChange={e => setOfferNote(e.target.value)}
                    rows={3}
                    placeholder="Tell them about your experience and when you're available..."
                    className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRespondingTo(null)}
                    className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors"
                  >
                    Send Offer of Help
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

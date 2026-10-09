import React, { useState } from 'react';
import { useSwap } from '../context/SwapContext';
import { SwapProposal } from '../types';
import { SwapLogisticsChat } from './SwapLogisticsChat';
import { X, Clock, CheckCircle2, MessageSquare, ArrowRightLeft } from 'lucide-react';

interface ActiveSwapsModalProps {
  onClose: () => void;
}

export const ActiveSwapsModal: React.FC<ActiveSwapsModalProps> = ({ onClose }) => {
  const { currentUser, swaps, acceptSwap, declineSwap, completeSwap } = useSwap();

  // Filter swaps where currentUser is requester or recipient
  const userSwaps = swaps.filter(
    s => s.requesterId === currentUser.id || s.recipientId === currentUser.id
  );

  const [selectedSwapId, setSelectedSwapId] = useState<string>(
    userSwaps[0]?.id || ''
  );
  const [showCompleteDialog, setShowCompleteDialog] = useState<boolean>(false);
  const [reviewNote, setReviewNote] = useState<string>('');

  const activeSwap = userSwaps.find(s => s.id === selectedSwapId) || userSwaps[0];

  const handleFinishSession = () => {
    if (!activeSwap) return;
    completeSwap(activeSwap.id, reviewNote.trim());
    setShowCompleteDialog(false);
    setReviewNote('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full h-[85vh] shadow-xl border border-stone-200 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Exchange Coordination Hub
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-0.5">
              Active Skill Swaps & Logistics Discussion
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-100 text-stone-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body: Left Column List, Right Column Logistics Messaging Component */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          
          {/* Swaps List Column */}
          <div className="w-full md:w-80 border-r border-stone-200/80 overflow-y-auto bg-stone-50/30 p-3 space-y-2">
            <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider px-2">
              Your Swaps ({userSwaps.length})
            </div>

            {userSwaps.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-500 space-y-1">
                <ArrowRightLeft className="w-6 h-6 mx-auto text-stone-400 mb-2" />
                <p>No swaps yet.</p>
                <p className="text-[11px] text-stone-400">Propose a swap from the marketplace to get started!</p>
              </div>
            ) : (
              userSwaps.map(swap => {
                const isRequester = swap.requesterId === currentUser.id;
                const otherUser = isRequester ? swap.recipient : swap.requester;
                const isSelected = swap.id === activeSwap?.id;

                return (
                  <button
                    key={swap.id}
                    onClick={() => {
                      setSelectedSwapId(swap.id);
                      setShowCompleteDialog(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                      isSelected
                        ? 'border-stone-900 bg-white shadow-xs'
                        : 'border-stone-200/80 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={otherUser.avatar}
                          alt={otherUser.name}
                          className="w-6 h-6 rounded-full object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-semibold text-stone-900 truncate">
                          {otherUser.name}
                        </span>
                      </div>
                      
                      {/* Status indicator unboxed text */}
                      <span className={`text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        swap.status === 'accepted'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                          : swap.status === 'completed'
                          ? 'bg-stone-100 text-stone-600'
                          : 'bg-amber-50 text-amber-800 border border-amber-200/60'
                      }`}>
                        {swap.status}
                      </span>
                    </div>

                    <div className="font-medium text-stone-800 truncate mb-1">
                      {swap.requestedSkillTitle}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-stone-400">
                      <span>{swap.hours} hr · {swap.offeredType === 'time_credit' ? 'Credit' : 'Barter'}</span>
                      <span>{swap.proposedDate}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Active Swap Logistics Messaging Interface */}
          {activeSwap ? (
            <div className="flex-1 flex flex-col min-h-0 bg-white overflow-hidden relative">
              
              {/* Complete Dialog Overlay (when triggered) */}
              {showCompleteDialog && (
                <div className="p-4 bg-emerald-50/90 border-b border-emerald-200/80 space-y-3 z-20">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">
                        Confirm Session & Exchange {activeSwap.hours} Time Credit(s)
                      </h4>
                      <p className="text-xs text-emerald-800 mt-0.5">
                        Confirming will officially log this swap to both neighbors' Time Ledgers and update balances.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowCompleteDialog(false)}
                      className="text-emerald-700 hover:text-emerald-900 text-xs font-medium"
                    >
                      Cancel
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-emerald-950 mb-1">
                      Leave a warm neighbor vouch / review (optional):
                    </label>
                    <input
                      type="text"
                      value={reviewNote}
                      onChange={e => setReviewNote(e.target.value)}
                      placeholder="e.g. Great session, super patient and clear explanations!"
                      className="w-full p-2 text-xs bg-white border border-emerald-300 rounded-lg text-stone-900 placeholder:text-stone-400"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleFinishSession}
                      className="px-4 py-2 text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition-colors"
                    >
                      Confirm Exchange & Transfer Credits
                    </button>
                  </div>
                </div>
              )}

              {/* Dedicated Logistics Messaging Component */}
              <SwapLogisticsChat
                swap={activeSwap}
                currentUser={currentUser}
                onAccept={acceptSwap}
                onDecline={declineSwap}
                onOpenCompleteDialog={() => setShowCompleteDialog(true)}
                isCompleteDialogOpen={showCompleteDialog}
              />

            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-stone-400 text-xs">
              Select a swap to discuss logistics and trade details.
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

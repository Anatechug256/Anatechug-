import React, { useState, useRef, useEffect } from 'react';
import { SwapProposal, User, SwapMessage } from '../types';
import { useSwap } from '../context/SwapContext';
import { 
  Send, 
  MapPin, 
  Clock, 
  Wrench, 
  CheckCircle2, 
  Check, 
  Sparkles,
  MessageSquare,
  AlertCircle,
  ArrowRightLeft
} from 'lucide-react';

interface SwapLogisticsChatProps {
  swap: SwapProposal;
  currentUser: User;
  onAccept: (swapId: string) => void;
  onDecline: (swapId: string) => void;
  onOpenCompleteDialog: () => void;
  isCompleteDialogOpen: boolean;
}

export const SwapLogisticsChat: React.FC<SwapLogisticsChatProps> = ({
  swap,
  currentUser,
  onAccept,
  onDecline,
  onOpenCompleteDialog,
  isCompleteDialogOpen
}) => {
  const { sendSwapMessage, users } = useSwap();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isRequester = swap.requesterId === currentUser.id;
  const counterpart = isRequester ? swap.recipient : swap.requester;

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [swap.messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    sendSwapMessage(swap.id, inputText.trim());
    setInputText('');
  };

  const handleQuickPrompt = (promptText: string) => {
    sendSwapMessage(swap.id, promptText);
  };

  // Helper to find avatar of sender
  const getSenderAvatar = (senderId: string) => {
    const sender = users.find(u => u.id === senderId);
    return sender?.avatar || (senderId === currentUser.id ? currentUser.avatar : counterpart.avatar);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white overflow-hidden">
      
      {/* 1. Swap Logistics Summary Header */}
      <div className="p-4 border-b border-stone-200/80 bg-stone-50/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-0.5">
              <span className="font-semibold text-stone-900">{swap.requestedSkillTitle}</span>
              <span aria-hidden="true">·</span>
              <span>{swap.hours} hr session</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{swap.offeredType === 'time_credit' ? '1 Credit' : 'Direct Barter'}</span>
            </div>

            {/* Logistics details row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <strong className="text-stone-800">Spot:</strong> {swap.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <strong className="text-stone-800">Time:</strong> {swap.proposedDate} at {swap.proposedTime}
              </span>
            </div>
          </div>

          {/* Action Bar before trade confirmation */}
          <div className="flex items-center gap-2 shrink-0">
            {swap.status === 'pending' && swap.recipientId === currentUser.id && (
              <>
                <button
                  onClick={() => onAccept(swap.id)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-colors"
                >
                  Accept & Confirm Trade
                </button>
                <button
                  onClick={() => onDecline(swap.id)}
                  className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 rounded-lg transition-colors"
                >
                  Decline
                </button>
              </>
            )}

            {swap.status === 'pending' && swap.requesterId === currentUser.id && (
              <span className="text-xs text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded font-medium">
                Waiting for {swap.recipient.name.split(' ')[0]} to accept
              </span>
            )}

            {swap.status === 'accepted' && (
              <button
                onClick={onOpenCompleteDialog}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Session Completed</span>
              </button>
            )}

            {swap.status === 'completed' && (
              <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200/80 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Credits Transferred
              </span>
            )}
          </div>
        </div>

        {/* Trade Notice Banner */}
        {swap.status === 'pending' && (
          <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center gap-2 text-[11px] text-stone-500">
            <MessageSquare className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Use this chat to iron out location, time, and tools before confirming the trade.</span>
          </div>
        )}
      </div>

      {/* 2. Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF9F7]">
        {swap.messages.length === 0 ? (
          <div className="text-center py-8 text-xs text-stone-400 space-y-1">
            <MessageSquare className="w-6 h-6 mx-auto text-stone-300 mb-1" />
            <p>No messages yet.</p>
            <p className="text-[11px]">Send a message to coordinate session logistics.</p>
          </div>
        ) : (
          swap.messages.map(msg => {
            const isMine = msg.senderId === currentUser.id;
            const senderAvatar = getSenderAvatar(msg.senderId);

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <img
                  src={senderAvatar}
                  alt={msg.senderName}
                  className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 border border-stone-200"
                  referrerPolicy="no-referrer"
                />

                <div className={`max-w-md ${isMine ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className="text-[11px] text-stone-400 mb-1 px-1 flex items-center gap-1.5">
                    <span className="font-medium text-stone-700">{msg.senderName}</span>
                    <span>·</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      isMine
                        ? 'bg-stone-900 text-white rounded-tr-xs'
                        : 'bg-white border border-stone-200 text-stone-800 shadow-2xs rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 3. Logistics Quick-Action Chips */}
      <div className="px-4 py-2 bg-stone-50 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
        <span className="text-stone-400 font-medium shrink-0 mr-1">Logistics prompts:</span>
        <button
          type="button"
          onClick={() => handleQuickPrompt(`📍 Can we meet at ${swap.location}? Let me know if another spot is easier.`)}
          className="px-2.5 py-1 bg-white hover:bg-stone-100 text-stone-700 rounded-md border border-stone-200 transition-colors whitespace-nowrap shrink-0"
        >
          📍 Confirm meeting spot
        </button>
        <button
          type="button"
          onClick={() => handleQuickPrompt("🔧 Should I bring any specific tools, supplies, or materials?")}
          className="px-2.5 py-1 bg-white hover:bg-stone-100 text-stone-700 rounded-md border border-stone-200 transition-colors whitespace-nowrap shrink-0"
        >
          🔧 Tools needed?
        </button>
        <button
          type="button"
          onClick={() => handleQuickPrompt(`⏰ Does ${swap.proposedDate} at ${swap.proposedTime} still work for you?`)}
          className="px-2.5 py-1 bg-white hover:bg-stone-100 text-stone-700 rounded-md border border-stone-200 transition-colors whitespace-nowrap shrink-0"
        >
          ⏰ Confirm time
        </button>
        <button
          type="button"
          onClick={() => handleQuickPrompt("✅ Everything sounds great, ready to confirm our trade session!")}
          className="px-2.5 py-1 bg-white hover:bg-stone-100 text-stone-700 rounded-md border border-stone-200 transition-colors whitespace-nowrap shrink-0"
        >
          ✅ Ready to trade
        </button>
      </div>

      {/* 4. Chat Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-stone-200 bg-white flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder={`Message ${counterpart.name.split(' ')[0]} to discuss address, supplies, or time...`}
          className="flex-1 px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white placeholder:text-stone-400"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="px-3.5 py-2 text-xs font-semibold bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </form>

    </div>
  );
};

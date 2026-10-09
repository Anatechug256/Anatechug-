import React, { useState } from 'react';
import { useSwap } from '../context/SwapContext';
import { Category, SessionFormat } from '../types';
import { X } from 'lucide-react';

interface PostRequestModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const PostRequestModal: React.FC<PostRequestModalProps> = ({ onClose, onSuccess }) => {
  const { currentUser, createRequest } = useSwap();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Repair & Making');
  const [lookingFor, setLookingFor] = useState('');
  const [urgency, setUrgency] = useState<'Flexible' | 'This Week' | 'Urgent'>('This Week');
  const [format, setFormat] = useState<SessionFormat>('In-person');
  const [creditsOffered, setCreditsOffered] = useState(1.0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createRequest({
      userId: currentUser.id,
      title: title.trim(),
      category: category,
      urgency: urgency,
      creditsOffered: creditsOffered,
      lookingFor: lookingFor.trim() || 'Any neighbor with relevant experience',
      format: format
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-lg w-full shadow-xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Community Request Board
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-0.5">
              Request a Skill from Neighbors
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-100 text-stone-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1">
              What do you need help with? *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Need someone to help replace leaky bathroom faucet cartridge..."
              className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as Category)}
                className="w-full p-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-800 font-medium"
              >
                <option value="Repair & Making">Repair & Making</option>
                <option value="Music & Arts">Music & Arts</option>
                <option value="Career & Digital">Career & Digital</option>
                <option value="Food & Cooking">Food & Cooking</option>
                <option value="Language & Learning">Language & Learning</option>
                <option value="Home & Garden">Home & Garden</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Urgency
              </label>
              <select
                value={urgency}
                onChange={e => setUrgency(e.target.value as any)}
                className="w-full p-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-800 font-medium"
              >
                <option value="Flexible">Flexible / Anytime</option>
                <option value="This Week">This Week</option>
                <option value="Urgent">Urgent (Within 48h)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1">
              Specific Knowledge or Tools Needed
            </label>
            <input
              type="text"
              value={lookingFor}
              onChange={e => setLookingFor(e.target.value)}
              placeholder="e.g. Someone who has plumbing wrenches or knows Delta cartridges"
              className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Format
              </label>
              <select
                value={format}
                onChange={e => setFormat(e.target.value as SessionFormat)}
                className="w-full p-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-800 font-medium"
              >
                <option value="In-person">In-person</option>
                <option value="Virtual">Virtual</option>
                <option value="Both">Both</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Time Credits Offered
              </label>
              <select
                value={creditsOffered}
                onChange={e => setCreditsOffered(parseFloat(e.target.value))}
                className="w-full p-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-800 font-medium"
              >
                <option value={1.0}>1.0 Credit (1 Hour)</option>
                <option value={1.5}>1.5 Credits (1.5 Hours)</option>
                <option value={2.0}>2.0 Credits (2 Hours)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
            >
              Post to Wanted Board
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

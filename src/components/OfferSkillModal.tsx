import React, { useState } from 'react';
import { useSwap } from '../context/SwapContext';
import { Category, SessionFormat, SwapPreference } from '../types';
import { X, Plus, Wrench } from 'lucide-react';

interface OfferSkillModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const OfferSkillModal: React.FC<OfferSkillModalProps> = ({ onClose, onSuccess }) => {
  const { currentUser, createListing } = useSwap();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Repair & Making');
  const [durationHours, setDurationHours] = useState(1.0);
  const [swapPreference, setSwapPreference] = useState<SwapPreference>('any');
  const [lookingForSkill, setLookingForSkill] = useState('');
  const [format, setFormat] = useState<SessionFormat>('In-person');
  const [location, setLocation] = useState(`${currentUser.neighborhood} or Community Center`);
  const [description, setDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<'Beginner Friendly' | 'Intermediate' | 'All Levels'>('Beginner Friendly');
  const [toolsInput, setToolsInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const tools = toolsInput
      ? toolsInput.split(',').map(t => t.trim()).filter(Boolean)
      : ['Basic supplies provided by teacher'];

    createListing({
      userId: currentUser.id,
      title: title.trim(),
      category: category,
      durationHours: durationHours,
      swapPreference: swapPreference,
      lookingForSkill: lookingForSkill.trim() || 'Open to any skill barter or 1 time credit',
      format: format,
      location: location.trim(),
      description: description.trim(),
      image: '',
      experienceLevel: experienceLevel,
      toolsProvided: tools
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full shadow-xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Share Your Knowledge
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-0.5">
              Offer a Skill to the Community
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-100 text-stone-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Skill Title */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1">
              Skill or Craft Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Basic Sourdough Starter & Proofing, Acoustic Guitar Travis Picking..."
              className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Category & Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={e => setExperienceLevel(e.target.value as any)}
                className="w-full p-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-800 font-medium"
              >
                <option value="Beginner Friendly">Beginner Friendly</option>
                <option value="Intermediate">Intermediate</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>
          </div>

          {/* Duration & Format */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-800 mb-1">
                Session Length
              </label>
              <select
                value={durationHours}
                onChange={e => setDurationHours(parseFloat(e.target.value))}
                className="w-full p-2 text-xs bg-white border border-stone-200 rounded-lg text-stone-800 font-medium"
              >
                <option value={1.0}>1.0 Hour (1 Credit)</option>
                <option value={1.5}>1.5 Hours (1.5 Credits)</option>
                <option value={2.0}>2.0 Hours (2 Credits)</option>
              </select>
            </div>

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
                <option value="Virtual">Virtual / Remote</option>
                <option value="Both">Both In-person & Virtual</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1">
              Description / What You Will Cover *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Explain how the session works, what the neighbor will learn or create, and what makes it approachable..."
              className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* What do you want in return? */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1">
              What Skill(s) Would You Love to Learn in Return?
            </label>
            <input
              type="text"
              value={lookingForSkill}
              onChange={e => setLookingForSkill(e.target.value)}
              placeholder="e.g. Seeking bicycle gear alignment or conversational Spanish..."
              className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <p className="text-[11px] text-stone-400 mt-1">
              Neighbors can either barter these skills directly with you, or spend an earned Time Credit!
            </p>
          </div>

          {/* Tools / Materials */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1">
              Tools or Materials Provided (comma separated)
            </label>
            <input
              type="text"
              value={toolsInput}
              onChange={e => setToolsInput(e.target.value)}
              placeholder="e.g. Truing stand, Hex keys, Starter dough, Chord charts"
              className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Meeting spot */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1">
              Suggested Location / Meeting Place
            </label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. My porch in Maplewood, or Local Public Library"
              className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Submit buttons */}
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
              Publish Skill Offering
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

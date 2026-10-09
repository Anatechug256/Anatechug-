import React from 'react';
import { Clock, ShieldCheck, HeartHandshake, CheckCircle2, ArrowRightLeft, Sparkles, MapPin } from 'lucide-react';

interface HowItWorksProps {
  onStartOffering?: () => void;
  onBrowseSkills?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartOffering, onBrowseSkills }) => {
  return (
    <div className="space-y-8 pt-4 pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
          The TimeBanking Philosophy
        </div>
        <h2 className="text-3xl font-bold text-stone-900 mt-1">
          How Local Skill Swapping Works
        </h2>
        <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
          HourShare is built on a timeless premise: every human has valuable knowledge, and an hour of your time is worth exactly one hour of anyone else’s.
        </p>
      </div>

      {/* 4 Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 rounded-xl bg-white border border-stone-200/80 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-sm">
            01
          </div>
          <h3 className="font-bold text-stone-900 text-base">Offer Your Craft</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Whether you know how to adjust bike brakes, write clean resumes, fingerpick folk songs, or bake crusty sourdough, list 1 hour of your craft.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-stone-200/80 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-sm">
            02
          </div>
          <h3 className="font-bold text-stone-900 text-base">Two Ways to Trade</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            <strong>Direct Barter:</strong> I teach you guitar if you tune my bike.<br/>
            <strong>TimeBank Credit:</strong> Teach anyone in town, earn 1 credit, spend it later on ceramics or Spanish.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-stone-200/80 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-stone-100 text-stone-900 font-bold flex items-center justify-center text-sm">
            03
          </div>
          <h3 className="font-bold text-stone-900 text-base">Meet in the Neighborhood</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Coordinate via in-app chat. Meet at a local porch workshop, community park gazebo, coffee shop, or video call.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-stone-200/80 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-sm">
            04
          </div>
          <h3 className="font-bold text-stone-900 text-base">Settle & Vouch</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Once your session wraps up, 1 tap confirms completion. Credits transfer instantly, and you leave a warm neighbor appreciation vouch.
          </p>
        </div>
      </div>

      {/* Philosophy Card */}
      <div className="p-6 rounded-2xl bg-stone-900 text-stone-200 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-amber-300" />
          Why No Money Ever Changes Hands
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed text-stone-300">
          <div>
            <span className="font-semibold text-white block text-sm mb-1">Equal Human Worth</span>
            One hour of teaching acoustic guitar is fundamentally equal to one hour of bicycle repair or gardening. No arbitrary market distortion.
          </div>
          <div>
            <span className="font-semibold text-white block text-sm mb-1">Zero Financial Friction</span>
            No payment gateways, no credit card transaction cuts, no awkward price bargaining. Sharing knowledge should be as easy as saying hello.
          </div>
          <div>
            <span className="font-semibold text-white block text-sm mb-1">Local Social Fabric</span>
            Money turns interactions into commercial transactions. Swapping turns neighbors into trusted friends and lifelong collaborators.
          </div>
        </div>
      </div>

      {/* Code of Honor */}
      <div className="bg-white rounded-xl border border-stone-200/80 p-6 space-y-3">
        <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
          Neighbor Code of Honor
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span><strong>Be on time:</strong> Respect your neighbor's scheduled hour just like you'd expect them to respect yours.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span><strong>No commercial upselling:</strong> This space is strictly mutual aid and education, never sales leads.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span><strong>Patience & Generosity:</strong> Beginners are welcome. Cultivate an encouraging, non-judgmental atmosphere.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span><strong>Vouch honestly:</strong> Genuine words of encouragement help our community flourish with trust.</span>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-3 pt-2">
        {onBrowseSkills && (
          <button
            onClick={onBrowseSkills}
            className="px-5 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors"
          >
            Explore Skills in Your Area
          </button>
        )}
        {onStartOffering && (
          <button
            onClick={onStartOffering}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm transition-colors"
          >
            Offer Your First Skill
          </button>
        )}
      </div>
    </div>
  );
};

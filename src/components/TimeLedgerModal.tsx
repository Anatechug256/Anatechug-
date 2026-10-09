import React from 'react';
import { useSwap } from '../context/SwapContext';
import { X, Clock, ArrowDownLeft, ArrowUpRight, Gift, ShieldCheck } from 'lucide-react';

interface TimeLedgerModalProps {
  onClose: () => void;
}

export const TimeLedgerModal: React.FC<TimeLedgerModalProps> = ({ onClose }) => {
  const { currentUser, transactions } = useSwap();

  const userTransactions = transactions.filter(t => t.userId === currentUser.id);

  const earnedTotal = userTransactions
    .filter(t => t.type === 'credit_earned')
    .reduce((sum, t) => sum + t.hours, 0);

  const spentTotal = userTransactions
    .filter(t => t.type === 'credit_spent')
    .reduce((sum, t) => sum + t.hours, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Community TimeBank Ledger
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-0.5">
              {currentUser.name}'s Hour Wallet
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-100 text-stone-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60">
              <div className="text-xs font-semibold text-amber-900">Current Balance</div>
              <div className="text-3xl font-bold text-stone-900 tabular-nums mt-1">
                {currentUser.hoursBalance.toFixed(1)} <span className="text-sm font-medium text-stone-600">hrs</span>
              </div>
              <div className="text-[11px] text-amber-800/80 mt-1">Ready to redeem with neighbors</div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
              <div className="text-xs font-semibold text-emerald-900">Hours Taught & Given</div>
              <div className="text-2xl font-bold text-stone-900 tabular-nums mt-1">
                +{earnedTotal.toFixed(1)} <span className="text-xs font-medium text-stone-600">hrs</span>
              </div>
              <div className="text-[11px] text-emerald-800/80 mt-1">Earned via skill sessions</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
              <div className="text-xs font-semibold text-stone-600">Hours Received</div>
              <div className="text-2xl font-bold text-stone-900 tabular-nums mt-1">
                {spentTotal.toFixed(1)} <span className="text-xs font-medium text-stone-600">hrs</span>
              </div>
              <div className="text-[11px] text-stone-500 mt-1">Spent learning skills</div>
            </div>
          </div>

          {/* TimeBanking Core Philosophy Banner */}
          <div className="p-4 rounded-xl bg-stone-900 text-stone-200 text-xs space-y-1.5 leading-relaxed">
            <div className="font-semibold text-amber-300 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              The Equal Value Standard
            </div>
            <p>
              In our local network, <strong>1 hour of time always equals 1 credit</strong>, regardless of whether you're teaching acoustic guitar, troubleshooting a bicycle chain, reviewing a portfolio, or tending an urban vegetable patch.
            </p>
            <p className="text-stone-400 text-[11px]">
              No inflated market rates, no financial speculation. Just neighbors sharing their gifts and enriching our local commons.
            </p>
          </div>

          {/* Transaction Ledger Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Transaction History
              </h4>
              <span className="text-xs text-stone-400">
                Verified exchanges ({userTransactions.length})
              </span>
            </div>

            {userTransactions.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-400 border border-dashed border-stone-200 rounded-xl">
                No transactions yet. Complete your first swap to see credits move!
              </div>
            ) : (
              <div className="divide-y divide-stone-100 border border-stone-200/80 rounded-xl overflow-hidden bg-white">
                {userTransactions.map(tx => {
                  const isEarned = tx.type === 'credit_earned';
                  const isGrant = tx.type === 'welcome_grant';

                  return (
                    <div key={tx.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-stone-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          isGrant
                            ? 'bg-amber-100 text-amber-800'
                            : isEarned
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-100 text-stone-600'
                        }`}>
                          {isGrant ? (
                            <Gift className="w-4 h-4" />
                          ) : isEarned ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownLeft className="w-4 h-4" />
                          )}
                        </div>

                        <div>
                          <div className="font-semibold text-stone-900">
                            {tx.description}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {tx.counterpartName} · {tx.timestamp}
                          </div>
                        </div>
                      </div>

                      <div className={`font-bold tabular-nums text-sm ${
                        isEarned || isGrant ? 'text-emerald-700' : 'text-stone-900'
                      }`}>
                        {isEarned || isGrant ? `+${tx.hours.toFixed(1)}` : `-${tx.hours.toFixed(1)}`} hrs
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

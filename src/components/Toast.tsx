import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-stone-900 text-white rounded-xl shadow-lg border border-stone-800 p-3.5 flex items-start gap-3 transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white">{toast.title}</div>
            {toast.message && (
              <div className="text-[11px] text-stone-300 mt-0.5 leading-relaxed">
                {toast.message}
              </div>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

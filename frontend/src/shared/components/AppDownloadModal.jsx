import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Smartphone, ShieldCheck, QrCode, Sparkles, CheckCircle2 } from "lucide-react";

export default function AppDownloadModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-150 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg clay-card bg-(--bg) p-6 sm:p-8 rounded-3xl z-10 text-(--text) border border-teal-200/30 shadow-2xl overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-(--text-light) hover:text-(--text-dark) hover:bg-teal-500/10 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl clay-badge bg-teal-500/10 text-(--primary)">
              <Smartphone size={28} />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-(--primary)">
                <Sparkles size={12} /> Android App Release
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-(--text-dark) tracking-tight">
                Get Maatriva AI App
              </h3>
            </div>
          </div>

          <p className="text-sm font-semibold text-(--text-light) mb-6 leading-relaxed">
            Monitor your baby’s vitals, receive real-time cry translation alerts, and control soothing cradle features right from your smartphone.
          </p>

          {/* Direct Download Action */}
          <div className="space-y-4">
            <a
              href="/maatriva-app.apk"
              download="Maatriva-App-v1.0.apk"
              className="w-full py-4 px-6 rounded-2xl clay-btn clay-btn-primary font-bold text-base sm:text-lg text-white flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-teal-500/25"
            >
              <Download size={22} />
              <span>Download Direct Android APK</span>
            </a>

            <div className="flex items-center justify-between text-xs font-bold text-(--text-light) px-2">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck size={14} /> Safe & Verified Build
              </span>
              <span>v1.0.0 • ~18 MB</span>
            </div>
          </div>

          {/* QR Code Section for phone scanning */}
          <div className="mt-6 pt-6 border-t border-teal-200/20 flex flex-col sm:flex-row items-center gap-4 bg-teal-500/5 p-4 rounded-2xl border border-teal-500/10">
            <div className="w-24 h-24 p-2 bg-white rounded-xl shadow-md flex items-center justify-center shrink-0 relative group">
              {/* Styled mock QR Code SVG */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                <rect x="0" y="0" width="30" height="30" rx="4" />
                <rect x="5" y="5" width="20" height="20" rx="2" fill="white" />
                <rect x="9" y="9" width="12" height="12" rx="1" />
                
                <rect x="70" y="0" width="30" height="30" rx="4" />
                <rect x="75" y="5" width="20" height="20" rx="2" fill="white" />
                <rect x="79" y="9" width="12" height="12" rx="1" />
                
                <rect x="0" y="70" width="30" height="30" rx="4" />
                <rect x="5" y="75" width="20" height="20" rx="2" fill="white" />
                <rect x="9" y="79" width="12" height="12" rx="1" />

                <rect x="40" y="10" width="20" height="10" />
                <rect x="40" y="30" width="10" height="20" />
                <rect x="60" y="40" width="30" height="10" />
                <rect x="40" y="60" width="20" height="10" />
                <rect x="70" y="70" width="20" height="20" />
                <rect x="40" y="80" width="10" height="20" />
              </svg>
            </div>
            <div className="text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 font-bold text-xs text-(--text-dark)">
                <QrCode size={14} className="text-(--primary)" />
                <span>Scan with your phone camera</span>
              </div>
              <p className="text-xs text-(--text-light) font-medium">
                Point your phone camera at this QR code to download the APK directly on your phone.
              </p>
            </div>
          </div>

          {/* Quick Install Guide */}
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-800 dark:text-amber-300 font-medium">
            <span className="font-bold">Installation Note:</span> When installing the APK, tap <i>"Allow from this source"</i> if prompted by Android security.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

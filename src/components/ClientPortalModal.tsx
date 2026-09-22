import React, { useState, useEffect } from 'react';
import { X, LogIn, LogOut, ShieldCheck, Clock, FileText, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { QuoteRecord, fetchUserQuotes, fetchAllQuotesAdmin, updateQuoteStatus } from '../services/quotesService';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNewQuote: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenNewQuote,
}) => {
  if (!isOpen) return null;

  const { user, loading, isAdmin, signIn, logOut } = useAuth();
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadQuotes = async () => {
    if (!user) return;
    setIsLoadingQuotes(true);
    try {
      if (isAdmin) {
        const records = await fetchAllQuotesAdmin();
        setQuotes(records);
      } else {
        const records = await fetchUserQuotes(user.uid);
        setQuotes(records);
      }
    } catch (err) {
      console.error('Error loading quotes:', err);
    } finally {
      setIsLoadingQuotes(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadQuotes();
    } else {
      setQuotes([]);
    }
  }, [user, isAdmin]);

  const handleStatusChange = async (quoteId: string, status: QuoteRecord['status']) => {
    setUpdatingId(quoteId);
    try {
      await updateQuoteStatus(quoteId, status);
      setQuotes(prev =>
        prev.map(q => (q.id === quoteId ? { ...q, status } : q))
      );
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: QuoteRecord['status']) => {
    switch (status) {
      case 'pending':
        return <span className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/30">Pending Review</span>;
      case 'reviewed':
        return <span className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/30">Prepress Approved</span>;
      case 'in_production':
        return <span className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/30">On Heidelberg Press</span>;
      case 'completed':
        return <span className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">Delivered</span>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#071A3D] via-[#102B66] to-[#2457FF] text-white p-6 sm:p-8 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#6EDBFF] text-xs font-mono font-medium mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6EDBFF]" />
              <span>Firebase Cloud Portal {isAdmin && '· Admin View'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isAdmin ? 'Somolu Production Dashboard' : 'Client Project Portal'}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-300">
              {isAdmin
                ? 'Review live print specifications, manage job statuses, and monitor client orders.'
                : 'Track the real-time production status of your print and packaging orders.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          {!user ? (
            <div className="py-12 px-4 text-center max-w-md mx-auto space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#F5F9FF] border border-[#2457FF]/20 flex items-center justify-center mx-auto text-[#2457FF]">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#071A3D]">Sign In with Google</h4>
                <p className="mt-2 text-xs sm:text-sm text-neutral-600">
                  Authenticate securely to view your saved quote specifications, track Somolu production runs, or access staff dashboard controls.
                </p>
              </div>

              <button
                onClick={signIn}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 text-xs font-bold text-white bg-gradient-to-r from-[#071A3D] to-[#2457FF] hover:from-[#2457FF] hover:to-[#6EDBFF] rounded-xl transition-all cursor-pointer shadow-lg"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign in with Google</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Account Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#F5F9FF] border border-[#2457FF]/15">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full border border-[#2457FF]/40" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#2457FF] text-white flex items-center justify-center font-bold text-sm">
                      {user.displayName?.[0] || 'U'}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#071A3D]">{user.displayName || 'Client'}</span>
                      {isAdmin && (
                        <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-100 text-emerald-800 font-bold">
                          Admin
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-500 font-mono">{user.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={loadQuotes}
                    className="p-2 rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:text-[#2457FF] transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                    title="Refresh Quotes"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingQuotes ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>
                  <button
                    onClick={logOut}
                    className="px-3 py-2 rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:text-red-600 transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Quotes Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-[#071A3D] uppercase font-mono tracking-wider">
                    {isAdmin ? `All Production Orders (${quotes.length})` : `Your Specifications (${quotes.length})`}
                  </h4>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenNewQuote();
                    }}
                    className="text-xs font-bold text-[#2457FF] hover:underline cursor-pointer"
                  >
                    + New Specification
                  </button>
                </div>

                {isLoadingQuotes ? (
                  <div className="py-12 text-center text-xs text-neutral-400 font-mono">
                    Loading records from Firestore...
                  </div>
                ) : quotes.length === 0 ? (
                  <div className="py-12 px-4 text-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50">
                    <p className="text-xs text-neutral-500">No project specifications found in your queue.</p>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenNewQuote();
                      }}
                      className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#071A3D] bg-white border border-neutral-300 rounded-lg hover:border-[#2457FF] cursor-pointer"
                    >
                      Configure a Quote
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {quotes.map((q) => (
                      <div
                        key={q.id}
                        className="p-4 rounded-2xl border border-neutral-200 hover:border-[#2457FF]/40 bg-white transition-all shadow-xs"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                          <div>
                            <span className="text-[10px] font-mono text-neutral-400 block">ID: {q.id}</span>
                            <h5 className="text-sm font-bold text-[#071A3D]">{q.category}</h5>
                          </div>
                          <div>{getStatusBadge(q.status)}</div>
                        </div>

                        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                          <div>
                            <span className="text-[10px] text-neutral-400 block font-mono">QUANTITY</span>
                            <span className="font-semibold text-neutral-800">{q.quantity.toLocaleString()} units</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-400 block font-mono">FINISH</span>
                            <span className="font-medium text-neutral-800 truncate block">{q.finish}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-400 block font-mono">SPEED</span>
                            <span className="font-medium text-neutral-800">{q.turnaround}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-400 block font-mono">CLIENT</span>
                            <span className="font-medium text-neutral-800 truncate block">{q.clientName}</span>
                          </div>
                        </div>

                        {q.notes && (
                          <div className="mt-2.5 p-2 bg-neutral-50 rounded-lg text-[11px] text-neutral-600">
                            <span className="font-bold text-neutral-500">Note: </span>
                            {q.notes}
                          </div>
                        )}

                        {/* Admin Status Controls */}
                        {isAdmin && (
                          <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                            <span className="text-[10px] font-mono text-neutral-400">ADMIN ACTIONS:</span>
                            <div className="flex items-center gap-1.5">
                              {(['pending', 'reviewed', 'in_production', 'completed'] as QuoteRecord['status'][]).map(st => (
                                <button
                                  key={st}
                                  disabled={updatingId === q.id || q.status === st}
                                  onClick={() => handleStatusChange(q.id, st)}
                                  className={`px-2 py-1 rounded text-[10px] font-mono uppercase font-bold transition-all cursor-pointer ${
                                    q.status === st
                                      ? 'bg-[#071A3D] text-white'
                                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                                  }`}
                                >
                                  {st.replace('_', ' ')}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Check, ArrowRight, MessageSquare, Sparkles, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { submitQuoteInquiry, QuoteRecord } from '../services/quotesService';
import { useAuth } from '../context/AuthContext';

interface ProjectQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export const ProjectQuoteModal: React.FC<ProjectQuoteModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'Packaging',
}) => {
  if (!isOpen) return null;

  const { user } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'Packaging');
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>(['Hot Foil Stamping']);
  const [quantity, setQuantity] = useState<number>(500);
  const [turnaround, setTurnaround] = useState<'standard' | 'express'>('standard');
  const [clientName, setClientName] = useState<string>(user?.displayName || '');
  const [clientEmail, setClientEmail] = useState<string>(user?.email || '');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedQuote, setSubmittedQuote] = useState<QuoteRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const categories = [
    { id: 'Packaging', label: 'Luxury Packaging & Boxes' },
    { id: 'Stationery', label: 'Business Stationery & Cards' },
    { id: 'Product Labels', label: 'Product & Bottle Labels' },
    { id: 'Large Format', label: 'Large Format Banners & Fabric' },
    { id: 'Event Branding', label: 'Event Branding & Stages' },
    { id: 'Corporate Identity', label: 'Full Brand Identity Suite' },
  ];

  const finishOptions = [
    'Hot Foil Stamping (Gold/Silver/Holographic)',
    'Spot 3D UV High-Gloss Varnish',
    'Tactile Embossing / Letterpress Deboss',
    'Velvet Soft-Touch Lamination',
    'Custom Die-Cut Structural Shape',
    'Edge Foil Gilding (Cobalt/Gold)',
  ];

  const toggleFinish = (finish: string) => {
    if (selectedFinishes.includes(finish)) {
      setSelectedFinishes(selectedFinishes.filter((f) => f !== finish));
    } else {
      setSelectedFinishes([...selectedFinishes, finish]);
    }
  };

  const handleWhatsAppInquiry = () => {
    const summary = `*Iceberg Digital Media Project Inquiry*%0A%0A*Category:* ${selectedCategory}%0A*Finishes:* ${selectedFinishes.join(', ') || 'Standard'}%0A*Estimated Quantity:* ${quantity} units%0A*Turnaround:* ${turnaround === 'express' ? 'Express 48h' : 'Standard 5-7 days'}%0A*Client:* ${clientName || 'Anonymous'}%0A*Email:* ${clientEmail || 'N/A'}%0A*Notes:* ${clientNotes || 'None'}`;
    window.open(`https://wa.me/2348023456789?text=${summary}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail.trim() || !clientName.trim()) {
      setErrorMsg('Please provide your name and email address so we can send specifications.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const record = await submitQuoteInquiry(
        {
          category: selectedCategory,
          quantity,
          finish: selectedFinishes.join(', ') || 'Standard Matte',
          turnaround: turnaround === 'express' ? 'Express (48h)' : 'Standard (5-7 days)',
          clientName: clientName.trim(),
          clientEmail: clientEmail.trim(),
          clientPhone: clientPhone.trim(),
          notes: clientNotes.trim(),
        },
        user?.uid
      );
      setSubmittedQuote(record);
    } catch (err) {
      console.error('Failed to submit quote inquiry:', err);
      setErrorMsg('Could not save your specification. You can still dispatch directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#071A3D] via-[#102B66] to-[#2457FF] text-white p-6 sm:p-8 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#6EDBFF] text-xs font-mono font-medium mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Somolu Production Configurator · Firebase Synced</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Configure Production Specs
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-300">
              Configure parameters for custom print, packaging, and brand production.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedQuote ? (
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-[#071A3D]">
              Specification Logged to Production Queue!
            </h4>
            <div className="inline-block px-3 py-1.5 rounded-lg bg-neutral-100 font-mono text-xs text-neutral-600 border border-neutral-200">
              Reference: <span className="font-bold text-[#071A3D]">{submittedQuote.id}</span>
            </div>
            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              Thank you <span className="font-semibold text-[#071A3D]">{submittedQuote.clientName}</span>! Your specs for <span className="font-semibold">{submittedQuote.quantity.toLocaleString()} units</span> of {submittedQuote.category} are safely recorded in our Somolu production database.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleWhatsAppInquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Notify Somolu Desk via WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-[#071A3D] bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {errorMsg && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Category */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold mb-2.5">
                1. Select Production Discipline
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer text-xs font-medium flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? 'border-[#2457FF] bg-[#F5F9FF] text-[#071A3D] font-bold shadow-xs'
                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.id && (
                      <Check className="w-4 h-4 text-[#2457FF]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Finishes */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold mb-2.5">
                2. Bespoke Tactile Finishes
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {finishOptions.map((finish) => {
                  const isChecked = selectedFinishes.includes(finish);
                  return (
                    <button
                      type="button"
                      key={finish}
                      onClick={() => toggleFinish(finish)}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer flex items-center gap-2 ${
                        isChecked
                          ? 'border-[#2457FF] bg-[#F5F9FF] text-[#071A3D] font-semibold'
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-[#2457FF] border-[#2457FF] text-white' : 'border-neutral-300'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span className="truncate">{finish}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Quantity & Turnaround */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">
                  3. Estimated Quantity: <span className="text-[#2457FF]">{quantity} units</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-[#2457FF] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1">
                  <span>100 units</span>
                  <span>2,500</span>
                  <span>5,000+</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold mb-1.5">
                  Production Speed
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTurnaround('standard')}
                    className={`py-2 px-3 rounded-lg border text-xs text-center cursor-pointer transition-all ${
                      turnaround === 'standard'
                        ? 'border-[#2457FF] bg-[#F5F9FF] text-[#071A3D] font-bold'
                        : 'border-neutral-200 text-neutral-600'
                    }`}
                  >
                    Standard (5-7d)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTurnaround('express')}
                    className={`py-2 px-3 rounded-lg border text-xs text-center cursor-pointer transition-all ${
                      turnaround === 'express'
                        ? 'border-[#2457FF] bg-[#F5F9FF] text-[#071A3D] font-bold'
                        : 'border-neutral-200 text-neutral-600'
                    }`}
                  >
                    Express (48h)
                  </button>
                </div>
              </div>
            </div>

            {/* Step 4: Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Tunde Adeyemi"
                  className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:border-[#2457FF]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="e.g. tunde@company.com"
                  className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:border-[#2457FF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="e.g. +234 801 234 5678"
                  className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:border-[#2457FF]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Delivery Destination
                </label>
                <input
                  type="text"
                  placeholder="e.g. Victoria Island, Lagos"
                  className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:border-[#2457FF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Project Notes & Specific Dimensions
              </label>
              <textarea
                rows={2}
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                placeholder="Mention specific Pantone codes, paper weights, or delivery instructions in Lagos..."
                className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:border-[#2457FF]"
              />
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Instant WhatsApp Dispatch</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#071A3D] hover:bg-[#2457FF] disabled:opacity-50 rounded-xl transition-all cursor-pointer shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving to Firestore...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Specification</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

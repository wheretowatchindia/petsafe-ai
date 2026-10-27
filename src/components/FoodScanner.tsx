import React, { useState, useRef, useEffect } from 'react';
import { usePet } from '../context/PetContext';
import { aiSafetyService } from '../services/aiSafetyService';
import type { AnalysisResult, PetSpecies, SafetyLevel } from '../types';
import { 
  Camera, Upload, Search, AlertTriangle, CheckCircle2, XCircle, 
  HelpCircle, ShieldAlert, Sparkles, Scale, RefreshCw, BookmarkPlus, 
  ExternalLink, Printer, Share2, Info
} from 'lucide-react';

interface FoodScannerProps {
  initialSearchQuery?: string;
  onOpenPricing: () => void;
}

export const FoodScanner: React.FC<FoodScannerProps> = ({ initialSearchQuery = '', onOpenPricing }) => {
  const { 
    selectedSpecies, 
    setSelectedSpecies, 
    activePet, 
    subscription, 
    canPerformScan, 
    incrementScanCount,
    addScanToHistory 
  } = usePet();

  const [query, setQuery] = useState(initialSearchQuery);
  const [weightLbs, setWeightLbs] = useState<number | undefined>(activePet?.weightLbs || undefined);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Sync initial query if passed
  useEffect(() => {
    if (initialSearchQuery) {
      setQuery(initialSearchQuery);
      handleAnalyze(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Sync weight if active pet changes
  useEffect(() => {
    if (activePet?.weightLbs) {
      setWeightLbs(activePet.weightLbs);
    }
  }, [activePet]);

  const handleFileSelect = (file: File) => {
    setFileError(null);
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    if (!validTypes.includes(file.type)) {
      setFileError('Invalid file type. Please upload a JPEG, PNG, or WEBP image.');
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds 5MB limit. Please choose a smaller photo.');
      return;
    }

    setSelectedImage(file);
    const preview = URL.createObjectURL(file);
    setImagePreviewUrl(preview);

    // If query is blank, prefill with filename without extension
    if (!query) {
      const suggested = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setQuery(suggested);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async (searchOverride?: string) => {
    const textQuery = searchOverride || query;
    if (!textQuery && !selectedImage) {
      setFileError('Please enter a substance name or upload a photo to analyze.');
      return;
    }

    if (!canPerformScan) {
      onOpenPricing();
      return;
    }

    setIsAnalyzing(true);
    setFileError(null);

    try {
      const result = await aiSafetyService.analyzeSubstance(
        textQuery,
        selectedSpecies,
        weightLbs,
        selectedImage
      );

      setAnalysisResult(result);
      addScanToHistory(result);
      incrementScanCount();
    } catch {
      setFileError('An unexpected error occurred during scan. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearForm = () => {
    setQuery('');
    setSelectedImage(null);
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImagePreviewUrl(null);
    setAnalysisResult(null);
    setFileError(null);
  };

  // Quick suggestion chips
  const quickPills = [
    { name: 'Chocolate', species: 'both' },
    { name: 'Xylitol', species: 'both' },
    { name: 'Grapes', species: 'both' },
    { name: 'Lilies', species: 'cat' },
    { name: 'Peanut Butter', species: 'dog' },
    { name: 'Onions', species: 'both' },
    { name: 'Blueberries', species: 'both' },
    { name: 'Cooked Bones', species: 'both' },
    { name: 'Sago Palm', species: 'both' },
    { name: 'Acetaminophen', species: 'cat' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>AI Food, Plant & Household Substance Scanner</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Pet Food & Toxin Safety Scanner
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Scan ingredients, snacks, house plants, or human medications to check safety thresholds for your dog or cat.
        </p>

        {/* Free Plan Scan Counter */}
        {!subscription.isPremium && (
          <div className="pt-1">
            <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
              Free Daily Scans: {subscription.scansUsedToday} / {subscription.dailyScanLimit} used
              {subscription.scansUsedToday >= subscription.dailyScanLimit && (
                <button
                  onClick={onOpenPricing}
                  className="ml-2 text-emerald-700 hover:underline font-bold"
                >
                  (Unlock Unlimited)
                </button>
              )}
            </span>
          </div>
        )}
      </div>

      {/* Main Scanner Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Step 1: Species & Pet Context */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Species:</span>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedSpecies('dog')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  selectedSpecies === 'dog'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🐶 Dog</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedSpecies('cat')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  selectedSpecies === 'cat'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🐱 Cat</span>
              </button>
            </div>
          </div>

          {/* Optional Weight Input for Dosage calculation */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Scale className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <label htmlFor="pet-weight" className="text-xs font-medium text-slate-600 whitespace-nowrap">
              Pet Weight (approx):
            </label>
            <div className="relative w-28">
              <input
                id="pet-weight"
                type="number"
                min="1"
                max="250"
                placeholder="lbs"
                value={weightLbs || ''}
                onChange={(e) => setWeightLbs(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
              <span className="absolute right-2.5 top-1.5 text-[10px] font-bold text-slate-400">lbs</span>
            </div>
          </div>
        </div>

        {/* Step 2: Upload Photo or Drag & Drop */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all ${
            imagePreviewUrl
              ? 'border-emerald-300 bg-emerald-50/20'
              : 'border-slate-200 hover:border-emerald-400 bg-slate-50/50'
          }`}
        >
          {imagePreviewUrl ? (
            <div className="space-y-3">
              <div className="relative inline-block">
                <img
                  src={imagePreviewUrl}
                  alt="Scanned item preview"
                  className="w-44 h-44 object-cover rounded-2xl border-2 border-white shadow-md mx-auto"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreviewUrl(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow-md hover:bg-red-700 transition cursor-pointer"
                  title="Remove image"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs font-medium text-slate-700">
                Photo attached: <span className="font-bold text-slate-900">{selectedImage?.name}</span>
              </p>
              
              {/* Honest AI / Recognition Status Pill */}
              <div className="max-w-md mx-auto p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed text-left flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Offline Mode (No Cloud Vision API Connected):</span>
                  <span>Photos provide visual reference. To verify toxicological safety, please ensure the substance, brand, or ingredient name is confirmed in the search box below.</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <Camera className="w-7 h-7" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-800">
                  Upload a photo of food packaging, ingredients, or a plant
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Drag and drop here, or take a quick photo on mobile (PNG, JPG, WEBP up to 5MB)
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Choose Photo</span>
                </button>

                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Use Camera</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                ℹ️ Running offline veterinary toxicology mode. Live image recognition activates when cloud API is configured.
              </p>
            </div>
          )}

          {/* Hidden inputs */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
          />
          <input
            type="file"
            ref={cameraInputRef}
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
          />
        </div>

        {/* Step 3: Text Search / Substance Input */}
        <div className="space-y-2">
          <label htmlFor="substance-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Substance, Ingredient, or Plant Name
          </label>
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              id="substance-input"
              type="text"
              placeholder="e.g. Dark Chocolate, Xylitol gum, Lilies, Peanut Butter, Avocado..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              className="w-full pl-11 pr-24 py-3 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-xs"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-24 top-3 text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            )}
            <button
              type="button"
              disabled={isAnalyzing}
              onClick={() => handleAnalyze()}
              className="absolute right-2 top-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <span>Analyze</span>
              )}
            </button>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Quick Tests:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickPills.map((pill) => (
              <button
                key={pill.name}
                type="button"
                onClick={() => {
                  setQuery(pill.name);
                  handleAnalyze(pill.name);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 text-xs font-medium transition cursor-pointer"
              >
                {pill.name}
              </button>
            ))}
          </div>
        </div>

        {/* Error Notice */}
        {fileError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{fileError}</span>
          </div>
        )}
      </div>

      {/* Analysis Result Display */}
      {analysisResult && (
        <AnalysisResultCard result={analysisResult} onReset={clearForm} />
      )}
    </div>
  );
};

// Component for the comprehensive, verified analysis result
const AnalysisResultCard: React.FC<{ result: AnalysisResult; onReset: () => void }> = ({ result, onReset }) => {
  const getBadgeConfig = (level: SafetyLevel) => {
    switch (level) {
      case 'safe':
        return {
          icon: CheckCircle2,
          bg: 'bg-emerald-500',
          badgeText: 'Generally Safe',
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          borderColor: 'border-emerald-300',
          gradient: 'from-emerald-600 to-teal-700'
        };
      case 'caution':
        return {
          icon: AlertTriangle,
          bg: 'bg-amber-500',
          badgeText: 'Use Caution',
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
          borderColor: 'border-amber-300',
          gradient: 'from-amber-600 to-orange-600'
        };
      case 'toxic':
        return {
          icon: ShieldAlert,
          bg: 'bg-red-600',
          badgeText: 'Potentially Toxic',
          badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
          borderColor: 'border-red-400',
          gradient: 'from-red-600 to-rose-700'
        };
      case 'unknown':
      default:
        return {
          icon: HelpCircle,
          bg: 'bg-slate-700',
          badgeText: 'Unknown — Safety Not Verified',
          badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
          borderColor: 'border-slate-300',
          gradient: 'from-slate-700 to-slate-800'
        };
    }
  };

  const badge = getBadgeConfig(result.safetyLevel);
  const BadgeIcon = badge.icon;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`bg-white rounded-3xl border-2 ${badge.borderColor} shadow-lg overflow-hidden transition-all duration-300`}>
      {/* Result Header Banner */}
      <div className={`bg-gradient-to-r ${badge.gradient} p-6 sm:p-8 text-white relative`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-xs ${badge.badgeBg}`}>
                {badge.badgeText}
              </span>
              <span className="text-xs font-semibold text-white/80">
                Species: {result.species === 'dog' ? 'Dog 🐶' : 'Cat 🐱'}
              </span>
              <span className="text-[11px] font-medium bg-black/20 text-white/90 px-2.5 py-0.5 rounded-full">
                Source: {result.source === 'database' ? 'Verified Database (Name Match)' : result.source === 'ai_vision' ? 'Cloud Vision AI' : 'Pending Verification'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white pt-1">
              {result.query}
            </h2>
            {result.matchedItem?.scientificName && (
              <p className="text-xs text-white/70 italic">
                Scientific name: {result.matchedItem.scientificName}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handlePrint}
              className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition text-xs font-semibold flex items-center gap-1.5"
              title="Print Vet Safety Sheet"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onReset}
              className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition text-xs font-semibold"
              title="Scan Another Item"
            >
              Scan Another
            </button>
          </div>
        </div>
      </div>

      {/* Result Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Main Concerns / Headline */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Safety Assessment
          </h4>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <p className="text-base font-bold text-slate-900 leading-snug">
              {result.headline}
            </p>
            {result.mainConcerns.map((concern, idx) => (
              <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                • {concern}
              </p>
            ))}
          </div>
        </div>

        {/* Toxic Compounds or Identified Ingredients */}
        {result.toxicCompounds.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Toxic Compounds / Critical Substances
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.toxicCompounds.map((compound, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-bold"
                >
                  ⚠️ {compound}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Important Precautions */}
        {result.precautions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Important Precautions
            </h4>
            <ul className="space-y-2">
              {result.precautions.map((precaution, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{precaution}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommended Next Steps */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Recommended Next Steps
          </h4>
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
            {result.recommendedNextSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex-shrink-0 flex items-center justify-center text-[10px] font-bold">
                  {idx + 1}
                </span>
                <span className="leading-relaxed font-medium">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reliable Veterinary References */}
        {result.references.length > 0 && (
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Reliable Veterinary References
            </h4>
            <div className="flex flex-wrap gap-3">
              {result.references.map((ref, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"
                >
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-800">{ref.title}</span>
                  <span className="text-slate-400">({ref.organization})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strict Medical Disclaimer on Every Scan */}
        <div className="p-3.5 rounded-xl bg-slate-100 text-[11px] text-slate-500 leading-relaxed">
          <strong>Veterinary Note:</strong> This assessment is based on toxicology publications from the ASPCA, AVMA, and Merck Veterinary Manual. If your pet has already ingested a suspicious substance, contact a veterinarian immediately. Never induce vomiting at home without veterinary direction.
        </div>
      </div>
    </div>
  );
};

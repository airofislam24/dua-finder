"use client";

import React, { useState, useMemo, useEffect } from 'react';

// Interfaces for our data layer structure
interface DuaItem {
  id: string;
  title: string;
  category: string;
  arabic: string;
  transliteration: string;
  translation: string;
  context: string;
  source: string;
  sourceType?: string; // Sourced automatically from database if optional
  youtube?: string;
  tags?: string[];
}

import { getDuas } from "@/lib/dua";

const DUA_DATABASE: DuaItem[] = getDuas();

// Inline Icons
const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const HeartFilledIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-rose-500 text-rose-500 scale-120 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const HeartEmptyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-400 hover:text-rose-450" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const YoutubeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a2.988 2.988 0 0 0-2.104-2.107C19.755 3.5 12 3.5 12 3.5s-7.755 0-9.394.579A2.988 2.988 0 0 0 .502 6.186 31.374 31.374 0 0 0 0 12a31.374 31.374 0 0 0 .502 5.814 2.988 2.988 0 0 0 2.104 2.107C4.245 20.5 12 20.5 12 20.5s7.755 0 9.394-.579a2.988 2.988 0 0 0 2.104-2.107A31.374 31.374 0 0 0 24 12a31.374 31.374 0 0 0-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4.162 4.162 0 1 1 0-8.324A4.162 4.162 0 0 1 12 16zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const SparklesIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
    <path d="M5 19l1.5-4.5L9 14l-1.5-4.5L5 5l-1.5 4.5L0 14l4.5 1.5L5 19z" />
    <path d="M19 19l1.5-4.5L24 14l-1.5-4.5L19 5l-1.5 4.5L14 14l4.5 1.5L19 19z" />
  </svg>
);

const SearchIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

// Comprehensive Semantic Dictionary
const SYNONYM_DICTIONARY: Record<string, string[]> = {
  anxiety: ["stress", "worried", "panic", "fear", "overthinking", "nervous", "scared", "sadness", "depression", "difficulty", "distress", "hardship", "calm"],
  rizq: ["money", "income", "salary", "business", "job", "wealth", "finance", "sustenance", "poverty", "work", "provision"],
  forgiveness: ["sins", "repentance", "tawbah", "guilt", "mistakes", "wrongdoing", "mercy", "pardon"],
  illness: ["sick", "pain", "disease", "hospital", "health", "recovery", "healing", "cure", "shifa", "fever", "ailment", "mother", "father"],
  marriage: ["spouse", "husband", "wife", "nikah", "relationship", "love", "family", "partner"],
  exams: ["study", "university", "school", "education", "test", "success", "knowledge", "memory", "fail", "passing"],
  travel: ["journey", "flight", "trip", "car", "traveling", "safari", "distance"],
  sadness: ["depression", "lonely", "crying", "hopeless", "grief", "sorrow", "broken", "heartbreak"],
  fear: ["scared", "frightened", "danger", "enemy", "oppression", "safety", "protection"],
  protection: ["evil eye", "hasad", "shaytan", "jinn", "magic", "safety", "harm", "defense"],
  parents: ["mother", "father", "dad", "mom", "parents", "family", "ancestors"],
  morning: ["waking", "day", "sunrise", "athan", "fajr"],
  evening: ["night", "sleep", "sunset", "maghrib", "bed", "dark"]
};

// Autocomplete database vocabulary computed from known keywords and tags
const SUGGESTION_POOL = [
  "Anxiety", "Anger", "Answered prayers", "Rizq", "Richness", "Rain", "Marriage", 
  "Mercy", "Mother", "Father", "Protection", "Patience", "Peace", "Success", 
  "Sustenance", "Sleep", "Study", "Sins", "Tawbah", "Travel", "Tranquility", "Illness"
];

// Helper to remove punctuation and normalize text variations safely
const cleanText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?\u0600-\u06FF]/g, "") // Clear punctuation safely without crushing structure
    .trim();
};

// Levenshtein Distance implementation for high-speed typo tolerance matching
const getLevenshteinDistance = (a: string, b: string): number => {
  const tmp = [];
  for (let i = 0; i <= a.length; i++) {
    tmp[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    tmp[0][j] = j;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
};

// Tokenizes natural language queries and extracts contextual synonyms
const extractQueryKeywords = (query: string): string[] => {
  const normalized = cleanText(query);
  const words = normalized.split(/\s+/).filter(w => w.length > 2);
  const keywordSet = new Set<string>(words);

  // Cross-reference against dictionary mappings to populate semantic targets
  Object.entries(SYNONYM_DICTIONARY).forEach(([category, synonyms]) => {
    const matchesCategory = words.includes(category);
    const matchesSynonyms = synonyms.some(syn => words.includes(syn));
    
    if (matchesCategory || matchesSynonyms) {
      keywordSet.add(category);
      synonyms.forEach(s => keywordSet.add(s));
    }
  });

  return Array.from(keywordSet);
};

// Helper function to safely highlight matching strings using regex boundaries
export function highlightText(text: string, queries: string[]): React.ReactNode {
  if (!text || !queries || queries.length === 0) return text;
  
  const activeQueries = queries.filter(q => q.length > 2);
  if (activeQueries.length === 0) return text;

  // Escape regex sequences
  const escapedQueries = activeQueries.map(q => q.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
  const regex = new RegExp(`(${escapedQueries.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => 
        regex.test(part) ? (
          <mark key={index} className="bg-cyan-500/30 text-cyan-200 rounded-sm px-0.5 font-medium border-b border-cyan-400/40">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function Home() {
  type AdabTabKey = 'heart' | 'physical' | 'structure' | 'times';

  const [savedDuas, setSavedDuas] = useState<string[]>(['dua-1']);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [userCustomQuery, setUserCustomQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeAdabTab, setActiveAdabTab] = useState<AdabTabKey>('heart');
  const adabTabs: AdabTabKey[] = ['heart', 'physical', 'structure', 'times'];

  // All Duas Directory Section States
  const [directorySearch, setDirectorySearch] = useState('');
  const [directoryCategory, setDirectoryCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  // Advanced Search Optimization States
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const activeSuggestions = useMemo(() => {
    const queryClean = cleanText(directorySearch);
    if (!queryClean || queryClean.length < 1) {
      return [];
    }

    return SUGGESTION_POOL
      .filter((item) =>
        cleanText(item).startsWith(queryClean) || cleanText(item).includes(queryClean)
      )
      .slice(0, 5);
  }, [directorySearch]);

  // Handle Debounce Handling to isolate rendering cycles
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(directorySearch);
    }, 300);

    return () => clearTimeout(handler);
  }, [directorySearch]);

  // Compute Search Autocomplete Suggestions instantly on user keyboard input

  // Home Page: Display exactly 4 curated daily featured Duas
  const featuredDuas = useMemo(() => {
    return DUA_DATABASE.slice(0, 4);
  }, []);

  // Upgraded Pipeline: Highly Performant Relevance Scoring and Semantic Query Matching Engine
  const filteredDirectoryDuas = useMemo(() => {
    const targetQueryClean = cleanText(debouncedSearchQuery);

    // Filter by specific navigation categories first
    const baseDataset = DUA_DATABASE.filter((dua) => {
      if (directoryCategory === 'All') return true;
      if (directoryCategory === 'Saved') return savedDuas.includes(dua.id);
      return cleanText(dua.category) === cleanText(directoryCategory);
    });

    if (!targetQueryClean) {
      return baseDataset;
    }

    const queryKeywords = extractQueryKeywords(targetQueryClean);

    // Map each item dynamically to its contextual weighted relevance scores
    return baseDataset
      .map((dua) => {
        let score = 0;
        
        const textTitle = cleanText(dua.title);
        const textCategory = cleanText(dua.category);
        const textTranslation = cleanText(dua.translation);
        const textTransliteration = cleanText(dua.transliteration);
        const textContext = cleanText(dua.context);
        const textSource = cleanText(dua.source);
        const combinedTags = (dua.tags || []).map(t => cleanText(t));

        queryKeywords.forEach((keyword) => {
          // Exact Substring matches
          if (textTitle.includes(keyword)) score += 10;
          if (textCategory.includes(keyword)) score += 8;
          if (combinedTags.some(tag => tag.includes(keyword))) score += 7;
          if (textTranslation.includes(keyword)) score += 5;
          if (textContext.includes(keyword)) score += 3;
          if (textSource.includes(keyword)) score += 2;
          if (textTransliteration.includes(keyword)) score += 1;

          // Fuzzy Match Check via Levenshtein for minor spelling variances
          if (keyword.length > 3) {
            const wordsInTitle = textTitle.split(/\s+/);
            wordsInTitle.forEach(w => {
              if (Math.abs(w.length - keyword.length) <= 2) {
                const dist = getLevenshteinDistance(w, keyword);
                if (dist === 1) score += 6; // Minor typo matched
              }
            });
          }
        });

        return { dua, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.dua);

  }, [directoryCategory, debouncedSearchQuery, savedDuas]);

  // Handle Category Filtering and state resets
  const handleDirectoryCategorySelect = (category: string) => {
    setDirectoryCategory(category);
    setVisibleCount(6); // Reset item loading counts
  };

  const ADAB_SECTIONS: Record<AdabTabKey, { title: string; emoji: string; bullets: string[] }> = {
    heart: {
      title: "State of the Heart",
      emoji: "💖",
      bullets: [
        "Sincerity (Ikhlas): Direct your prayer solely to Allah, without associating partners.",
        "Certainty of Response: Pray with the firm conviction that Allah will answer your call.",
        "Humility and Fear: Feel the extreme need of a servant speaking to his Lord."
      ]
    },
    physical: {
      title: "Physical Actions",
      emoji: "🤲",
      bullets: [
        "State of Wudu: It is highly recommended to be in a state of cleanliness.",
        "Face the Qiblah: Align your body towards the Ka'bah to maximize concentration.",
        "Raise Your Hands: Hold your hands out to your chest level as a sign of complete humility."
      ]
    },
    structure: {
      title: "Structure of Dua",
      emoji: "🗣️",
      bullets: [
        "Begin with Praise: Start by thanking Allah and reciting His Beautiful Names.",
        "Send Blessings: Recite Salawat upon the Prophet Muhammad (ﷺ).",
        "Ask for Others: Duas made secretly for your brethren are blessed with an angel repeating 'Ameen and to you as well'."
      ]
    },
    times: {
      title: "Best Times",
      emoji: "⏰",
      bullets: [
        "The Last Third of the Night: When Allah descends to the lowest heaven asking who is calling Him.",
        "Between Adhan & Iqamah: Supplications made during this period are never rejected.",
        "While in Sujud: You are physically closest to your Creator during prostration."
      ]
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleToggleFavorite = (duaId: string) => {
    if (savedDuas.includes(duaId)) {
      setSavedDuas(savedDuas.filter(id => id !== duaId));
      showToast('Removed from favorites.');
    } else {
      setSavedDuas([...savedDuas, duaId]);
      showToast('Saved to your favorite Duas.');
    }
  };

  const handleAISearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userCustomQuery.trim()) return;
    
    setIsSearching(true);
    setDirectorySearch(userCustomQuery);
    setDirectoryCategory('All');
    setVisibleCount(6);

    setTimeout(() => {
      setIsSearching(false);
      showToast('Search filters applied to our comprehensive directory.');
      const targetElement = document.getElementById('directory-section');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 850);
  };

  const handleQuickFeel = (feelName: string) => {
    setUserCustomQuery(`I am feeling ${feelName.toLowerCase()}`);
    setDirectorySearch(feelName);
    setDirectoryCategory('All');
    setVisibleCount(6);
    showToast(`Showing Duas for feeling "${feelName}" in Catalog.`);
    const targetElement = document.getElementById('directory-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans bg-slate-950 text-slate-100 selection:bg-rose-500/30 selection:text-rose-200">
      
      {/* Decorative Ocean animated background elements */}
      <div className="absolute top-0 left-0 right-0 h-162.5 overflow-hidden pointer-events-none z-0">
        <svg className="absolute w-full opacity-10 -top-12" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,170.7C672,160,768,192,864,213.3C960,235,1056,245,1152,229.3C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" fill="url(#ocean-gradient)" />
          <defs>
            <linearGradient id="ocean-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute top-16 left-8 w-80 h-80 bg-cyan-900/15 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute top-36 right-12 w-72 h-72 bg-emerald-900/10 rounded-full filter blur-2xl animate-bounce" style={{ animationDuration: '9s' }} />
      </div>

      {/* STICKY NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-slate-900/65 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setDirectorySearch(''); setDirectoryCategory('All'); }}>
            <div className="p-2 bg-slate-900 rounded-xl border border-slate-700 shadow-sm">
              <LogoIcon />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-linear-to-r from-sky-400 to-cyan-200 bg-clip-text text-transparent">
                Dua Finder
              </span>
              <span className="ml-1.5 text-[10px] font-semibold bg-sky-900/60 text-sky-300 px-2 py-0.5 rounded-full">
                AI Powered
              </span>
            </div>
          </div>

          {/* Restored Navigation Links including FAQ, Features, Etiquette, How It Works & Creators */}
          <div className="hidden xl:flex items-center space-x-5 text-sm font-medium">
            <a href="#features" className="text-slate-300 hover:text-cyan-400 transition-colors">Features</a>
            <a href="#how-it-works" className="text-slate-300 hover:text-cyan-400 transition-colors">How It Works</a>
            <a href="#featured-duas" className="text-slate-300 hover:text-cyan-400 transition-colors">Daily Curated</a>
            <a href="#directory-section" className="text-cyan-450 hover:text-cyan-300 transition-colors">Explore Catalog</a>
            <a href="#adab-section" className="text-slate-300 hover:text-cyan-400 transition-colors">Etiquette Guide</a>
            <a href="#faq" className="text-slate-300 hover:text-cyan-400 transition-colors">FAQ</a>
            
            {/* Split Media Channel Navigation Badges */}
            <div className="h-4 w-px bg-slate-800" />
            <a href="https://www.youtube.com/@AIROFISLAM1" target="_blank" rel="noopener noreferrer" className="text-rose-450 hover:text-rose-350 font-bold transition-colors flex items-center gap-1">
              <YoutubeIcon className="w-4 h-4" /> YouTube
            </a>
            <a href="https://www.instagram.com/airofislam?igsh=ZWx6anM5a25xdmdi" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 font-bold transition-colors flex items-center gap-1">
              <InstagramIcon className="w-4 h-4" /> Instagram
            </a>
          </div>

          <div className="flex items-center">
            <a
              href="#directory-section"
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-linear-to-r from-cyan-600 to-sky-600 hover:from-sky-500 hover:to-cyan-500 rounded-full shadow-md shadow-sky-600/15 hover:shadow-lg transition-all"
            >
              Browse 500 Duas
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-24">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-6 rounded-full bg-sky-950/60 text-xs font-semibold text-sky-300 border border-sky-800/30">
            <SparklesIcon />
            <span>Discover Supplications Tailored to Your Current Emotions</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-white">
            Find the Right Dua for <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-teal-300">Every Moment</span>
          </h1>
          
          <p className="text-base sm:text-xl text-slate-350 leading-relaxed max-w-2xl mx-auto mb-10">
            A comprehensive, authentic index of Supplications from the Quran and Sunnah. Simple phonetics, pure translations, and clear context references.
          </p>

          {/* AI SEARCH FOR HERO */}
          <div className="max-w-2xl mx-auto px-4">
            <form onSubmit={handleAISearch} className="relative group">
              <div className="absolute -inset-1 rounded-4xl bg-linear-to-r from-sky-500 to-cyan-400 opacity-20 group-hover:opacity-30 blur-md transition-all duration-300" />
              <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-3xl p-2 shadow-xl hover:shadow-2xl transition-all">
                <span className="pl-4 text-slate-500">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  value={userCustomQuery}
                  onChange={(e) => setUserCustomQuery(e.target.value)}
                  placeholder="How are you feeling today? (e.g. lost, anxious, seeking success)"
                  className="w-full bg-transparent border-none outline-none focus:ring-0 text-slate-100 placeholder-slate-500 px-3 text-sm sm:text-base"
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="bg-linear-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-semibold px-6 sm:px-8 py-3 rounded-2xl shadow-md transition-all flex items-center justify-center space-x-1 whitespace-nowrap text-sm sm:text-base min-w-30"
                >
                  {isSearching ? (
                    <span className="flex items-center space-x-1">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Searching...</span>
                    </span>
                  ) : (
                    <span>Find Dua</span>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Emotional Suggestion Tags */}
            <div className="mt-5 flex flex-wrap justify-center gap-2.5 text-xs text-slate-400">
              <span className="self-center font-medium mr-1 text-slate-400">Quick feelings:</span>
              {['Anxious', 'Grateful', 'Patience', 'Success'].map((feel) => (
                <button
                  key={feel}
                  onClick={() => handleQuickFeel(feel)}
                  className="bg-slate-900/60 text-sky-300 hover:bg-slate-800 border border-slate-800 px-3 py-1.5 rounded-full transition-all active:scale-95"
                >
                  {feel === 'Anxious' ? '😟 Anxious' : feel === 'Grateful' ? '🌸 Grateful' : feel === 'Patience' ? '⏳ Patience' : '💼 Seeking Success'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PROMINENT CREATOR HUB SOCIAL BANNER */}
        <section id="youtube-support" className="mb-24 scroll-mt-20">
          <div className="relative overflow-hidden bg-linear-to-tr from-rose-950/20 via-slate-900 to-cyan-950/20 border border-rose-900/40 rounded-[2.5rem] p-6 sm:p-10 shadow-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-rose-950/50 text-rose-450 text-xs font-bold border border-rose-900/40">
                  <SparklesIcon />
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-snug">
                  Keep This Project Free by Supporting our Creators
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-350 leading-relaxed max-w-2xl">
                  We build and run clean, beautiful spiritual utilities for the Global Muslim Community with zero annoying ads or subscription walls. 
                  You can keep our project operational by following our media spaces. We host beautiful HD video reminders, Quran translations, and serene aesthetic designs.
                </p>
                
                <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-medium text-slate-450">
                  <a href="https://www.youtube.com/@AIROFISLAM1" target="_blank" rel="noopener noreferrer" className="text-rose-450 hover:text-rose-350 font-bold transition-colors flex items-center gap-1">
                    <YoutubeIcon className="w-4 h-4" /> YouTube
                  </a>
                  <a href="https://www.instagram.com/airofislam?igsh=ZWx6anM5a25xdmdi" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 font-bold transition-colors flex items-center gap-1">
                    <InstagramIcon className="w-4 h-4" /> Instagram
                  </a>
                </div>
              </div>

              {/* Multi-channel Box Card */}
              <div className="flex flex-col items-center justify-center p-6 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-3xl text-center shadow-lg w-full max-w-xs transition-transform hover:scale-[1.02] duration-300">
                <div className="mb-4">
                  <h3 className="text-white font-bold text-lg">Air Of Islam</h3>
                  <p className="text-xs text-slate-400">Subscribe for regular reminders and spiritual support</p>
                </div>
                <a href="https://www.youtube.com/@AIROFISLAM1?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-4 py-2 rounded-xl">
                  <YoutubeIcon className="w-5 h-5 text-white" /> Subscribe on YouTube
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN FEATURE TILES */}
        <section id="features" className="mb-24 scroll-mt-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-white">
              Sincere Features Built for the Soul
            </h2>
            <p className="text-slate-450 mt-2 max-w-xl mx-auto text-sm sm:text-base">
              Simplifying the pathway to inner peace through curated, beautiful Islamic technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
              {/* CARD 1: Authentic Duas */}
              <div className="p-6 bg-slate-900/50 backdrop-blur-md border border-slate-800/50 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-slate-850 text-sky-400 rounded-2xl flex items-center justify-center mb-5 border border-slate-750 transition-all group-hover:scale-110">
                  <span className="text-2xl">🤲</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Authentic Duas</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Verified sources from the Quran and authentic Hadith literature.
                </p>
              </div>

              {/* CARD 2: Simple Explanations */}
              <div className="p-6 bg-slate-900/50 backdrop-blur-md border border-slate-800/50 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-slate-850 text-sky-400 rounded-2xl flex items-center justify-center mb-5 border border-slate-750 transition-all group-hover:scale-110">
                  <span className="text-2xl">📖</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Simple Explanations</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Easy-to-understand meanings, translations, and spiritual guidance.
                </p>
              </div>

              {/* CARD 3: Video Support */}
              <div className="p-6 bg-slate-900/50 backdrop-blur-md border border-slate-800/50 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-slate-850 text-rose-450 rounded-2xl flex items-center justify-center mb-5 border border-slate-750 transition-all group-hover:scale-110">
                  <YoutubeIcon className="w-6 h-6" />
                </div>
                <div className="w-full flex justify-between items-baseline">
                  <h3 className="text-lg font-bold text-white mb-2">Air Of Islam Media</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Beautiful lessons, spiritual videos, and support on our official channel.
                </p>
              </div>

              {/* CARD 4: Save Favorites */}
              <div className="p-6 bg-slate-900/50 backdrop-blur-md border border-slate-800/50 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-slate-850 text-sky-400 rounded-2xl flex items-center justify-center mb-5 border border-slate-750 transition-all group-hover:scale-110">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Save Favorites</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Bookmark and keep your most-used formulas of remembrance close.
                </p>
              </div>

          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="mb-24 scroll-mt-20 py-12 relative overflow-hidden bg-linear-to-r from-sky-950/15 to-teal-950/15 rounded-[2.5rem] border border-slate-850 px-6 sm:px-12">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-wider uppercase text-cyan-400">Simple 3-Step Process</span>
            <h2 className="text-3xl font-extrabold text-white mt-1.5">
              How Dua Finder Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            
              <div className="text-center">
                <div className="w-14 h-14 bg-sky-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-sky-600/20">
                  1
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Describe Your Situation</h3>
                <p className="text-sm text-slate-400 max-w-xs mx-auto">
                  Type an emotion or general situation (e.g., &ldquo;I&apos;m worried about exams&rdquo; or &ldquo;seeking gratitude&rdquo;).
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-teal-400 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-teal-500/20">
                  2
                </div>
                <h3 className="text-lg font-bold text-white mb-2">AI Sourcing Engine</h3>
                <p className="text-sm text-slate-400 max-w-xs mx-auto">
                  Our light algorithms instantly highlight verified relevant Duas sourced directly from authentic databases.
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-rose-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-rose-600/20">
                  3
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Support & Connect</h3>
                <p className="text-sm text-slate-400 max-w-xs mx-auto">
                  Save your favorites offline and easily connect with the <strong>Air Of Islam</strong> channel for daily videos.
                </p>
              </div>

          </div>
        </section>

        {/* 1. CURATED DAILY FEATURED DUAS (Exactly 4 Cards) */}
        <section id="featured-duas" className="mb-24 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">Daily Reflection Selection</span>
              <h2 className="text-3xl font-bold text-white mt-1">
                Featured Daily Supplications
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Curated essential prayers to kickstart your daily remembrance.
              </p>
            </div>
            <a 
              href="#directory-section" 
              className="mt-4 md:mt-0 text-cyan-400 hover:text-cyan-300 font-black text-sm flex items-center gap-1.5 transition-all group"
            >
              <span>View All Supplications</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredDuas.map((dua) => (
              <div
                key={dua.id}
                className="bg-slate-900/40 backdrop-blur-md border border-slate-850 p-6 rounded-3xl shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-cyan-350 bg-sky-950/80 px-2.5 py-1 rounded-full">
                        {dua.category}
                      </span>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">
                        {dua.sourceType || "Hadith"}
                      </span>
                    </div>
                    <button
                      onClick={() => handleToggleFavorite(dua.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-950/30 transition-colors"
                      title="Favorite"
                    >
                      {savedDuas.includes(dua.id) ? <HeartFilledIcon /> : <HeartEmptyIcon />}
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">
                    {dua.title}
                  </h3>

                  <div className="p-4 bg-slate-950/40 rounded-2xl mb-4 text-right">
                    <p className="text-xl sm:text-2xl font-serif text-slate-100 leading-loose">
                      {dua.arabic}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm italic text-slate-400 mb-3 leading-relaxed">
                    &ldquo;{dua.transliteration}&rdquo;
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed mb-3">
                    {dua.translation}
                  </p>

                  <p className="text-xs text-teal-400 font-medium mb-4 bg-slate-900/40 p-2.5 rounded-xl border border-teal-500/20">
                    <strong>Context:</strong> {dua.context}
                  </p>
                </div>

                {/* Social Support Tray on Cards */}
                <div className="pt-4 border-t border-slate-800/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-amber-450/10 text-amber-300 rounded-xl border border-amber-450/30 font-extrabold tracking-wide self-start shadow-[0_0_12px_rgba(251,191,36,0.15)]">
                    <span>📖 Source:</span>
                    <span className="underline decoration-amber-500/50 underline-offset-2">{dua.source}</span>
                  </div>
                  
                  {/* Split Action Support Badges */}
                  <div className="flex items-center gap-1.5">
                    <a
                      href="https://www.youtube.com/@AIROFISLAM1?sub_confirmation=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-3 py-1.5 rounded-xl transition-all text-[11px]"
                      onClick={() => showToast('Connecting to Air Of Islam YouTube!')}
                    >
                      <YoutubeIcon className="w-3.5 h-3.5" /> Subscribe
                    </a>
                    <a
                      href="https://www.instagram.com/airofislam?igsh=ZWx6anM5a25xdmdi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-linear-to-r from-pink-600 to-amber-500 hover:from-pink-500 hover:to-amber-400 text-white font-extrabold px-3 py-1.5 rounded-xl transition-all text-[11px]"
                      onClick={() => showToast('Opening Air of Islam Instagram!')}
                    >
                      <InstagramIcon className="w-3.5 h-3.5" /> Follow
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. DEDICATED ALL DUAS DIRECTORY SECTION (All Duas with smart controls) */}
        <section id="directory-section" className="mb-24 scroll-mt-20">
          <div className="relative overflow-hidden bg-slate-900/30 border border-slate-800 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-900/5 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-800">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-850/50 text-xs font-bold text-cyan-400">
                  <SparklesIcon />
                  <span>Full Supplication Directory</span>
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3">
                  Comprehensive Supplication Catalog
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Browse through all available supplications, filter by emotional triggers, or use the search index.
                </p>
              </div>
            </div>

            {/* Directory Controls: Search & Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
              
              {/* Directory Filter Input with Typeahead Autocomplete Popover */}
              <div className="lg:col-span-1 relative">
                <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2.5 shadow-inner focus-within:border-cyan-600 transition-colors">
                  <span className="text-slate-500 mr-2">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    value={directorySearch}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 250)}
                    onChange={(e) => { setDirectorySearch(e.target.value); setVisibleCount(6); }}
                    placeholder="Search titles, meaning, or source..."
                    className="w-full bg-transparent border-none outline-none focus:ring-0 text-xs sm:text-sm text-slate-100 placeholder-slate-500"
                  />
                  {directorySearch && (
                    <button 
                      onClick={() => setDirectorySearch('')} 
                      className="text-xs text-slate-500 hover:text-slate-300 font-bold px-1"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Inline Popover Suggestions Layer */}
                {showSuggestions && activeSuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden">
                    {activeSuggestions.map((suggestion, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setDirectorySearch(suggestion);
                          setVisibleCount(6);
                          setShowSuggestions(false);
                        }}
                        className="px-4 py-2.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors border-b border-slate-800/50 last:border-0"
                      >
                        🔍 <span className="font-semibold text-slate-200">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Categorization Selection Tab Tray */}
              <div className="lg:col-span-2 flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-center">
                {[
                  'All', 
                  'Anxiety', 
                  'Rizq', 
                  'Marriage', 
                  'Parents', 
                  'Exams', 
                  'Travel', 
                  'Illness', 
                  'Protection', 
                  'Sleep', 
                  'Morning', 
                  'Evening', 
                  'Forgiveness', 
                  'Gratitude',
                  'Saved'
                ].map((cat) => {
                  const count = cat === 'Saved' 
                    ? savedDuas.length 
                    : cat === 'All' 
                      ? DUA_DATABASE.length 
                      : DUA_DATABASE.filter(d => d.category === cat).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => handleDirectoryCategorySelect(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        directoryCategory === cat
                          ? 'bg-cyan-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      }`}
                    >
                      <span>{cat === 'Saved' ? '❤️' : ''} {cat}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${directoryCategory === cat ? 'bg-cyan-800 text-cyan-200' : 'bg-slate-900 text-slate-500'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Filtered Directory Duas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDirectoryDuas.length > 0 ? (
                filteredDirectoryDuas.slice(0, visibleCount).map((dua) => (
                  <div
                    key={dua.id}
                    className="bg-slate-950/80 border border-slate-850 p-5 rounded-2xl shadow-sm hover:shadow-lg hover:border-slate-800 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="flex space-x-1.5">
                          <span className="text-[9px] font-extrabold tracking-wider uppercase text-cyan-300 bg-sky-950/90 px-2 py-0.5 rounded-full">
                            {dua.category}
                          </span>
                          <span className="text-[9px] font-extrabold tracking-wider uppercase text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                            {dua.sourceType || "Hadith"}
                          </span>
                        </div>
                        <button
                          onClick={() => handleToggleFavorite(dua.id)}
                          className="p-1 rounded-lg hover:bg-rose-950/30 transition-colors"
                          title="Favorite"
                        >
                          {savedDuas.includes(dua.id) ? <HeartFilledIcon /> : <HeartEmptyIcon />}
                        </button>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white mb-2 leading-tight">
                        {highlightText(dua.title, extractQueryKeywords(directorySearch))}
                      </h3>

                      <div className="p-3 bg-slate-900/80 rounded-xl mb-3 text-right">
                        <p className="text-lg sm:text-xl font-serif text-slate-100 leading-loose">
                          {dua.arabic}
                        </p>
                      </div>

                      <p className="text-[11px] sm:text-xs italic text-slate-400 mb-2 leading-relaxed">
                        &ldquo;{highlightText(dua.transliteration, extractQueryKeywords(directorySearch))}&rdquo;
                      </p>

                      <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                        {highlightText(dua.translation, extractQueryKeywords(directorySearch))}
                      </p>

                      <p className="text-[11px] text-teal-400 font-medium mb-3 bg-slate-900/60 p-2 rounded-lg border border-teal-500/10">
                        <strong>Context:</strong> {highlightText(dua.context, extractQueryKeywords(directorySearch))}
                      </p>
                    </div>

                    <div className="pt-3.5 border-t border-slate-850 flex flex-col gap-2.5 text-[10px]">
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-450/10 text-amber-300 rounded-lg border border-amber-450/25 font-bold tracking-wide self-start w-full shadow-[0_0_12px_rgba(251,191,36,0.15)]">
                        <span>📖 Source:</span>
                        <span className="truncate underline decoration-amber-500/50">{dua.source}</span>
                      </div>
                      
                      {/* Interactive Creator Actions */}
                      <div className="grid grid-cols-2 gap-1.5">
                        <a
                          href="https://www.youtube.com/@AIROFISLAM1?sub_confirmation=1"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1 bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-1.5 rounded-lg transition-all"
                        >
                          <YoutubeIcon className="w-3 h-3" /> Subscribe
                        </a>
                        <a
                          href="https://www.instagram.com/airofislam?igsh=ZWx6anM5a25xdmdi"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1 bg-linear-to-r from-pink-600 to-amber-500 hover:from-pink-500 hover:to-amber-450 text-white font-extrabold py-1.5 rounded-lg transition-all"
                        >
                          <InstagramIcon className="w-3 h-3" /> Instagram
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 bg-slate-950/40 rounded-2xl border border-dashed border-slate-800">
                  <span className="text-3xl">🤲</span>
                  <h4 className="text-base font-semibold text-slate-300 mt-3">No matching duas found. Try another emotion or keyword.</h4>
                  <p className="text-xs text-slate-550 mt-1 max-w-sm mx-auto">
                    Try checking spelling or changing the tag categories filter tab above.
                  </p>
                  <button
                    onClick={() => { setDirectorySearch(''); setDirectoryCategory('All'); }}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl transition-colors"
                  >
                    Reset Directory Filters
                  </button>
                </div>
              )}
            </div>

            {/* Load More Pagination Controller */}
            {filteredDirectoryDuas.length > visibleCount && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-cyan-300 font-bold rounded-2xl text-xs sm:text-sm transition-all active:scale-95 shadow-md shadow-black"
                >
                  <SparklesIcon /> Load Next Supplications ({filteredDirectoryDuas.length - visibleCount} Remaining)
                </button>
              </div>
            )}

          </div>
        </section>

        {/* SINCERE GUIDANCE / INTERACTIVE ETIQUETTE ADAB */}
        <section id="adab-section" className="mb-24 scroll-mt-20">
          <div className="relative overflow-hidden bg-linear-to-r from-sky-950/10 to-teal-950/10 border border-slate-850 rounded-[2.5rem] p-6 sm:p-10 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-white">Etiquette of Dua (Adab)</h2>
              <p className="text-slate-450 mt-2">Short guide to structure, physical, and spiritual preparation when invoking Allah.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {adabTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveAdabTab(tab)}
                  className={`p-4 rounded-2xl text-sm font-semibold ${activeAdabTab === tab ? 'bg-cyan-600 text-white' : 'bg-slate-950 text-slate-300'} transition-all`}
                >
                  {ADAB_SECTIONS[tab].emoji} {ADAB_SECTIONS[tab].title}
                </button>
              ))}

            </div>

            <div className="mt-6 p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-bold text-white">{ADAB_SECTIONS[activeAdabTab].title}</h3>
              <ul className="list-disc ml-5 mt-3 text-slate-300">
                {ADAB_SECTIONS[activeAdabTab].bullets.map((b, i) => (
                  <li key={i} className="mb-1">{b}</li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* FAQS */}
        <section id="faq" className="mb-24 scroll-mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-450 mt-2 text-sm sm:text-base">
              Verified details on sources, safety, and functionality.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Where do you source your Duas from?",
                a: "All Duas provided on our platform are sourced meticulously from authentic books of Hadith (such as Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud) and verified verses of the Holy Quran, checked by qualified students of knowledge."
              },
              {
                q: "Is there any cost associated with using Dua Finder?",
                a: "No, Dua Finder is fully open-source and free to use. Our goal is to make authentic and beautiful spiritual tools easily accessible to everyone in the world. We rely strictly on community support through our YouTube Channel and Instagram page!"
              },
              {
                q: "How can I support the mission?",
                a: "Simply subscribe to our official channel 'AIR OF ISLAM' on YouTube and follow us on Instagram. Sharing the platform with your family and friends also helps us spread beneficial spiritual comfort to the global Ummah."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-slate-200 hover:text-cyan-400 transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-cyan-500 text-lg font-bold">
                    {activeFaq === index ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-400 leading-relaxed border-t border-slate-800/55">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM FINAL CALL TO ACTION (CTA) */}
        <section className="relative overflow-hidden bg-linear-to-r from-rose-600 via-rose-650 to-pink-600 text-white rounded-[2.5rem] p-8 sm:p-12 text-center shadow-2xl">
          <h3 className="text-xl font-extrabold mb-2">Support the Project</h3>
          <p className="text-sm text-slate-200 mb-4">If this tool benefited you, consider subscribing to our channel and sharing with friends.</p>
          <a href="https://www.youtube.com/@AIROFISLAM1?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl font-bold hover:bg-white/20">
            <YoutubeIcon className="w-5 h-5 text-rose-600" /> Subscribe on YouTube
          </a>
        </section>

      </main>

      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900/90 px-4 py-3 text-sm text-white shadow-2xl backdrop-blur-md animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950/90 transition-colors duration-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-slate-900 rounded-xl">
                  <LogoIcon />
                </div>
                <span className="text-xl font-extrabold tracking-tight bg-linear-to-r from-sky-400 to-cyan-200 bg-clip-text text-transparent">
                  Dua Finder
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Developing visual and accessible tools for the Muslim community worldwide. Curated from verified Quranic and Sunnah sources. Built in partnership with <strong>Air Of Islam</strong>.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-cyan-400 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a></li>
                <li><a href="#directory-section" className="hover:text-cyan-400 transition-colors">Supplication Directory</a></li>
                <li><a href="#adab-section" className="hover:text-cyan-400 transition-colors">Etiquette Guide</a></li>
                <li><a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Connect & Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="https://www.youtube.com/@AIROFISLAM1" target="_blank" rel="noopener noreferrer" className="hover:text-rose-450 font-bold transition-colors flex items-center gap-1.5"><YoutubeIcon className="w-3.5 h-3.5" /> YouTube Channel</a></li>
                <li><a href="https://www.instagram.com/airofislam?igsh=ZWx6anM5a25xdmdi" target="_blank" rel="noopener noreferrer" className="hover:text-pink-450 font-bold transition-colors flex items-center gap-1.5"><InstagramIcon className="w-3.5 h-3.5" /> Instagram Page</a></li>
                <li><span className="cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => showToast('Privacy Policy: We do not track or save your queries.')}>Privacy Policy</span></li>
                <li><span className="cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => showToast('Terms of Use: Free for everyone.')}>Terms & Use</span></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Dua Finder & Air Of Islam. Designed for inner tranquility and spiritual growth.</p>
            <div className="flex space-x-4">
              <span>Verified Authentic</span>
              <span>•</span>
              <span>No Ads</span>
              <span>•</span>
              <span>Privacy Centric</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
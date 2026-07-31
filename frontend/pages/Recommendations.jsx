import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Calendar, DollarSign, Globe, CheckSquare, Square, ChevronRight, AlertCircle, FileText, Compass, ListTodo, Award, AlertTriangle, PlayCircle } from 'lucide-react'
import RecommendationHeader from '../components/recommendations/RecommendationHeader.jsx'
import EmptyState from '../components/recommendations/EmptyState.jsx'
import { generateDemoMatches } from '../services/demoRecommendationService.js'

export default function Recommendations() {
  const [grants, setGrants] = useState(() => {
    const saved = localStorage.getItem('matches')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      } catch (e) {
        console.error(e)
      }
    }
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}')
    return generateDemoMatches(userProfile)
  })

  const [activeCategory, setActiveCategory] = useState('Top Recommended')
  const [selectedId, setSelectedId] = useState(() => {
    const filtered = grants.filter(g => g.category === 'Top Recommended')
    if (filtered.length > 0) return filtered[0].id
    return grants[0]?.id || null
  })

  // Checked tasks tracker for interactive checklist
  const [checkedTasks, setCheckedTasks] = useState({})

  const toggleTask = (grantId, taskIndex) => {
    const key = `${grantId}-${taskIndex}`
    setCheckedTasks(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Get active lists
  const categoriesList = ['Top Recommended', 'Good Fit', 'Stretch Opportunity', 'Low Priority']

  const categorizedGrants = useMemo(() => {
    const groups = {
      'Top Recommended': [],
      'Good Fit': [],
      'Stretch Opportunity': [],
      'Low Priority': []
    }
    grants.forEach(g => {
      const cat = g.category || 'Good Fit'
      if (groups[cat]) {
        groups[cat].push(g)
      } else {
        groups['Good Fit'].push(g)
      }
    })
    return groups
  }, [grants])

  const currentList = categorizedGrants[activeCategory] || []

  const selectedGrant = useMemo(() => {
    return grants.find(g => g.id === selectedId) || currentList[0] || null
  }, [grants, selectedId, currentList])

  const categoryConfigs = {
    'Top Recommended': { border: 'border-emerald-500/30', text: 'text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
    'Good Fit': { border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20' },
    'Stretch Opportunity': { border: 'border-amber-500/30', text: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
    'Low Priority': { border: 'border-white/10', text: 'text-white/40', badge: 'bg-white/[0.04] text-white/40 border-white/5' }
  }

  return (
    <div className="min-h-screen bg-surface-950 text-white font-sans">
      {/* Background glow blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full bg-brand-600/10 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-600/8 blur-[120px]" />
        <div className="absolute top-1/2 left-1/5 w-[280px] h-[280px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <RecommendationHeader total={grants.length} />

        {grants.length === 0 ? (
          <div className="mt-12">
            <EmptyState query="" filter="All" />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
            
            {/* ── LEFT PANEL: Grants List ── */}
            <div className="flex flex-col gap-4">
              {/* Category tabs selection */}
              <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/5">
                {categoriesList.map(cat => {
                  const count = categorizedGrants[cat].length
                  const isActive = activeCategory === cat
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat)
                        const list = categorizedGrants[cat]
                        if (list.length > 0) setSelectedId(list[0].id)
                      }}
                      className={`flex-1 min-w-[70px] text-center px-2 py-2 rounded-lg text-[10px] font-bold tracking-tight uppercase transition-all duration-200
                        ${isActive 
                          ? 'bg-white/[0.08] text-white shadow-md' 
                          : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'}`}
                    >
                      <div className="truncate">{cat.split(' ')[0]}</div>
                      <div className={`mt-0.5 text-[9px] ${isActive ? 'text-brand-300' : 'text-white/20'}`}>({count})</div>
                    </button>
                  )
                })}
              </div>

              {/* Recommendations list */}
              <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-1">
                {currentList.length === 0 ? (
                  <div className="text-center py-8 text-xs text-white/25 border border-dashed border-white/5 rounded-2xl">
                    No matching grants in this category.
                  </div>
                ) : (
                  currentList.map(g => {
                    const isSelected = selectedId === g.id
                    const cc = categoryConfigs[g.category] || categoryConfigs['Good Fit']
                    return (
                      <motion.div
                        key={g.id}
                        onClick={() => setSelectedId(g.id)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between
                          ${isSelected 
                            ? `bg-white/[0.06] ${cc.border} shadow-lg shadow-brand-500/5` 
                            : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'}`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">{g.agency}</span>
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${cc.badge}`}>
                              {g.matchScore}% Fit
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug mb-3">{g.title}</h4>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-white/30 pt-2 border-t border-white/[0.04]">
                          <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{g.funding}</span>
                          <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{g.country}</span>
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </div>
            </div>

            {/* ── RIGHT PANEL: Advisor Report Details ── */}
            <div>
              <AnimatePresence mode="wait">
                {selectedGrant ? (
                  <motion.div
                    key={selectedGrant.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md overflow-hidden"
                  >
                    {/* Top Accent Strip based on recommendation category */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${
                      selectedGrant.category === 'Top Recommended' ? 'from-emerald-500 to-teal-500' :
                      selectedGrant.category === 'Good Fit' ? 'from-blue-500 to-indigo-500' :
                      selectedGrant.category === 'Stretch Opportunity' ? 'from-amber-500 to-orange-500' :
                      'from-white/10 to-white/20'
                    }`} />

                    <div className="p-6 sm:p-8">
                      {/* Agency + Action header */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 uppercase tracking-widest">
                            {selectedGrant.agency}
                          </span>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider ${
                            categoryConfigs[selectedGrant.category]?.badge || 'bg-white/5 text-white/50 border-white/10'
                          }`}>
                            {selectedGrant.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10">
                          <Sparkles className="h-3.5 w-3.5 text-brand-300 animate-pulse" />
                          <span className="text-xs font-bold text-white tracking-wide">
                            {selectedGrant.matchScore}% Match Score
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight tracking-tight mb-5">
                        {selectedGrant.title}
                      </h2>

                      {/* Info grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-6">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold text-white/20 uppercase">Available Funding</span>
                          <span className="text-sm font-extrabold text-white flex items-center gap-1"><DollarSign className="h-3.5 w-3.5 text-blue-400" />{selectedGrant.funding}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold text-white/20 uppercase">Target Country</span>
                          <span className="text-sm font-extrabold text-white flex items-center gap-1"><Globe className="h-3.5 w-3.5 text-violet-400" />{selectedGrant.country}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold text-white/20 uppercase">Deadline</span>
                          <span className="text-sm font-extrabold text-white flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-amber-400" />{selectedGrant.deadline}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold text-white/20 uppercase">Urgency Rating</span>
                          <span className={`text-sm font-extrabold flex items-center gap-1 ${
                            selectedGrant.urgency === 'Critical' ? 'text-red-400' :
                            selectedGrant.urgency === 'High' ? 'text-orange-400' :
                            selectedGrant.urgency === 'Medium' ? 'text-amber-400' :
                            'text-white/60'
                          }`}><AlertCircle className="h-3.5 w-3.5" />{selectedGrant.urgency}</span>
                        </div>
                      </div>

                      {/* 1. Executive Summary */}
                      <div className="mb-6">
                        <h3 className="text-xs font-bold text-brand-300 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Compass className="h-4 w-4" /> AI Executive Summary</h3>
                        <div className="p-4 rounded-xl bg-brand-500/[0.03] border border-brand-500/10 text-xs sm:text-sm text-white/70 leading-relaxed italic">
                          "{selectedGrant.summary}"
                        </div>
                      </div>

                      {/* 2. Fit and 3. Eligibility Concerns */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Award className="h-4 w-4" /> Why It Fits</h3>
                          <div className="p-4 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/10 text-xs text-white/70 leading-relaxed">
                            {selectedGrant.whyFits}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><AlertTriangle className="h-4 w-4" /> Eligibility Concerns</h3>
                          <div className="p-4 rounded-xl bg-rose-500/[0.03] border border-rose-500/10 text-xs text-white/70 leading-relaxed">
                            {selectedGrant.eligibilityConcerns}
                          </div>
                        </div>
                      </div>

                      {/* Strengths & Weaknesses */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <span className="text-[10px] font-extrabold text-white/30 uppercase tracking-widest mb-2 block">Researcher Strengths</span>
                          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] text-xs text-white/60 leading-relaxed">
                            {selectedGrant.strengths}
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold text-white/30 uppercase tracking-widest mb-2 block">Risks & Gaps</span>
                          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.04] text-xs text-white/60 leading-relaxed">
                            {selectedGrant.weaknesses}
                          </div>
                        </div>
                      </div>

                      {/* 4. Application Strategy */}
                      <div className="mb-6">
                        <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Sparkles className="h-4 w-4" /> Application Strategy</h3>
                        <div className="p-4 rounded-xl bg-indigo-500/[0.03] border border-indigo-500/10 text-xs sm:text-sm text-white/70 leading-relaxed">
                          {selectedGrant.strategy}
                        </div>
                      </div>

                      {/* Required Documents */}
                      {selectedGrant.requiredDocuments && selectedGrant.requiredDocuments.length > 0 && (
                        <div className="mb-6">
                          <span className="text-[10px] font-extrabold text-white/30 uppercase tracking-widest mb-2 block">Required Documents</span>
                          <div className="flex flex-wrap gap-2">
                            {selectedGrant.requiredDocuments.map((doc, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white/80">
                                <FileText className="h-3.5 w-3.5 text-brand-400" />
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 5. Interactive Checklist */}
                      {selectedGrant.checklist && selectedGrant.checklist.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-1.5"><ListTodo className="h-4 w-4" /> Preparation Checklist</h3>
                          <div className="flex flex-col gap-2">
                            {selectedGrant.checklist.map((item, idx) => {
                              const isChecked = !!checkedTasks[`${selectedGrant.id}-${idx}`]
                              return (
                                <div
                                  key={idx}
                                  onClick={() => toggleTask(selectedGrant.id, idx)}
                                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200
                                    ${isChecked 
                                      ? 'bg-emerald-500/5 border-emerald-500/20 text-white/40 line-through' 
                                      : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] text-white/80'}`}
                                >
                                  {isChecked ? (
                                    <CheckSquare className="h-4 w-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                                  ) : (
                                    <Square className="h-4 w-4 mt-0.5 text-white/30 flex-shrink-0" />
                                  )}
                                  <span className="text-xs">{item}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {/* 6. Visual Timeline */}
                      {selectedGrant.timeline && selectedGrant.timeline.length > 0 && (
                        <div className="mb-6">
                          <span className="text-[10px] font-extrabold text-white/30 uppercase tracking-widest mb-3 block">Suggested Timeline</span>
                          <div className="relative pl-6 border-l border-white/10 space-y-4 my-2">
                            {selectedGrant.timeline.map((step, idx) => (
                              <div key={idx} className="relative">
                                {/* Timeline Node */}
                                <div className="absolute -left-[30px] top-0.5 w-4 h-4 rounded-full bg-brand-500 border-4 border-surface-950 flex items-center justify-center" />
                                <div className="text-xs text-white/85 leading-relaxed font-semibold">
                                  {step}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 7. Recommended Action banner */}
                      <div className="mt-8 p-4 rounded-xl border border-brand-500/20 bg-brand-500/5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <PlayCircle className="h-8 w-8 text-brand-400 flex-shrink-0" />
                          <div className="text-left">
                            <span className="text-[10px] font-bold text-brand-400 uppercase tracking-wider block">Recommended Next Step</span>
                            <span className="text-xs sm:text-sm text-white/80 font-medium">{selectedGrant.recommendedAction}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-20 text-white/20 border border-white/5 rounded-2xl bg-white/[0.02]">
                    Select a grant recommendation from the list to view your personalized AI Advisor Report.
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

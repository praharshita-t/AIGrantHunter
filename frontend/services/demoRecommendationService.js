// demoRecommendationService.js — Dynamic mock recommendations and AI advisor reports driven by profile & countryConfig
import { getCountryConfig } from '../config/countryConfig.js'

const DOMAIN_DATA = {
  healthcare: {
    domainName: 'AI & Healthcare',
    summaryText: 'health data science, medical AI analytics, and clinical decision support',
    concerns: '• Requires institutional ethics/IRB approval for clinical patient datasets\n• Co-PI collaboration with clinical domain experts recommended',
    strengths: '• Strong interdisciplinary AI and biomedical research background\n• Emerging healthcare focus with high societal impact\n• High relevance to current digital health funding calls',
    weaknesses: '• Consider strengthening publication portfolio in clinical journals\n• Include preliminary experimental results on real-world medical benchmarks',
    strategy: 'Prioritize grants with strong AI and healthcare components. Tailor your proposal to emphasize clinical impact, machine learning methodology, and interdisciplinary collaboration.',
    recommendedAction: 'Begin preparing your research proposal and supporting documents for the top-matched Digital Health Research Grant before exploring international opportunities.',
    titles: (c) => [
      `${c.agencies[0] || 'ANRF'} Digital Health & Medical AI Initiative`,
      `${c.agencies[1] || 'NSF'} Smart Health & Clinical Intelligence Grant`,
      `${c.agencies[2] || 'NIH'} Healthcare Analytics & Machine Learning Call`,
      `${c.agencies[3] || 'UKRI'} Interdisciplinary Medical Innovation Fellowship`,
    ],
  },

  robotics: {
    domainName: 'Robotics & Automation',
    summaryText: 'autonomous navigation, robotic manipulation, and physical human-robot interaction',
    concerns: '• Hardware testbed access and safety compliance verification required\n• Institutional workshop or physical testing space confirmation needed',
    strengths: '• Solid foundation in robotic control algorithms and sensor fusion\n• Proven technical execution capability in hardware-in-the-loop systems\n• High relevance to industrial and field automation grants',
    weaknesses: '• Demonstrate physical hardware validation rather than pure software simulation\n• Expand industry partner network for practical deployment validation',
    strategy: 'Focus your proposal on hardware-in-the-loop experimentation, real-time control efficiency, safety guarantees, and field application impact.',
    recommendedAction: 'Finalize hardware testing specifications and architecture diagrams for your top-ranked Robotics Grant application.',
    titles: (c) => [
      `${c.agencies[0] || 'NSF'} Autonomous Systems & Robotics Initiative`,
      `${c.agencies[1] || 'ANRF'} Industrial Automation & Control Systems Grant`,
      `${c.agencies[2] || 'UKRI'} Intelligent Robotics & HMI Program`,
      `${c.agencies[3] || 'ERC'} Frontier Robotics & Kinematics Fellowship`,
    ],
  },

  climate: {
    domainName: 'Climate & Sustainability',
    summaryText: 'environmental modeling, carbon mitigation, and climate resilient technology',
    concerns: '• Multi-regional environmental data collection and field station access plans required\n• Environmental impact assessment documentation may apply',
    strengths: '• Cross-disciplinary environmental data modeling background\n• Clear commitment to sustainability and green technology\n• High policy relevance for governmental and international grants',
    weaknesses: '• Secure field station or observational data partner endorsements\n• Include open-source data distribution frameworks in proposal draft',
    strategy: 'Emphasize actionable environmental impact, long-term climate model forecasting accuracy, and public-private stakeholder engagement.',
    recommendedAction: 'Gather historical environmental datasets and establish formal observational partner agency endorsements.',
    titles: (c) => [
      `${c.agencies[0] || 'ANRF'} Climate Resilient Technologies Initiative`,
      `${c.agencies[1] || 'NSF'} Atmospheric & Global Climate Change Call`,
      `${c.agencies[2] || 'UKRI'} Net-Zero Clean Energy & Sustainability Fund`,
      `${c.agencies[3] || 'ERC'} Green Transition & Carbon Mitigation Grant`,
    ],
  },

  quantum: {
    domainName: 'Quantum Computing',
    summaryText: 'quantum algorithms, quantum information processing, and hardware-software co-design',
    concerns: '• Requires access to specialized quantum hardware backends (IBM Quantum, Rigetti, or local QPU)\n• Cryogenic or specialized lab infrastructure verification recommended',
    strengths: '• Deep theoretical grounding in quantum circuits and algorithm complexity\n• Novel qubit state manipulation and error mitigation background\n• High competitive ranking in emerging physics and computing calls',
    weaknesses: '• Benchmark proposed algorithms against classical HPC simulators to demonstrate quantum advantage\n• Outline noise-resilient error correction mitigation strategies',
    strategy: 'Highlight noise-resilient quantum algorithms, fault-tolerant error mitigation strategies, and scalable hardware-software co-design.',
    recommendedAction: 'Draft quantum circuit benchmark results and secure cloud QPU backend allocation before submission.',
    titles: (c) => [
      `${c.agencies[0] || 'ANRF'} National Quantum Mission Advanced Research Grant`,
      `${c.agencies[1] || 'NSF'} Quantum Leap Challenge Institutes Call`,
      `${c.agencies[2] || 'UKRI'} Quantum Technologies & QPU Architecture Flagship`,
      `${c.agencies[3] || 'ERC'} Frontier Quantum Information Processing Grant`,
    ],
  },

  cv: {
    domainName: 'Computer Vision',
    summaryText: 'computer vision architectures, neural perception systems, and visual scene analysis',
    concerns: '• Standard ethics approval for image/video datasets\n• Proof of GPU compute cluster access recommended',
    strengths: '• Deep learning and neural architecture design expertise\n• Strong computer vision benchmark performance\n• High publication relevance in AI venues',
    weaknesses: '• Include edge deployment benchmarks and robust out-of-distribution evaluation\n• Detail privacy-preserving image processing mechanisms',
    strategy: 'Prioritize proposals emphasizing novel vision architectures, computational efficiency, edge deployment, and rigorous benchmark validation.',
    recommendedAction: 'Compile dataset benchmark metrics and GPU compute resource estimates into your proposal summary.',
    titles: (c) => [
      `${c.agencies[0] || 'ANRF'} Advanced Computer Vision & Perception Grant`,
      `${c.agencies[1] || 'NSF'} Computer Vision & Visual Intelligence Call`,
      `${c.agencies[2] || 'UKRI'} Foundation Models & Visual Perception Program`,
      `${c.agencies[3] || 'SERB'} Core Vision AI Research Grant`,
    ],
  },

  default: {
    domainName: 'Interdisciplinary AI & Data Science',
    summaryText: 'interdisciplinary machine learning, data science, and advanced computational research',
    concerns: 'No significant eligibility concerns identified based on your profile.',
    strengths: '• Strong interdisciplinary research background\n• High relevance to current funding agency priorities\n• Competitive academic profile and execution capability',
    weaknesses: '• Consider strengthening publication portfolio in high-impact journals\n• Include preliminary experimental results in proposal draft',
    strategy: 'Prioritize grants with strong domain alignment. Tailor your proposal to emphasize methodology, societal impact, and interdisciplinary collaboration.',
    recommendedAction: 'Begin preparing your research proposal and supporting documents for the top-matched research grant.',
    titles: (c) => [
      `${c.agencies[0] || 'ANRF'} Early Career Research Excellence Grant`,
      `${c.agencies[1] || 'NSF'} Smart Technologies & Computational Innovation Call`,
      `${c.agencies[2] || 'UKRI'} Interdisciplinary Research Programme`,
      `${c.agencies[3] || 'SERB'} Core Science & AI Research Grant`,
    ],
  },
}

export function generateDemoMatches(userProfile = {}) {
  const countryName = userProfile.country || (userProfile.preferred_countries && userProfile.preferred_countries[0]) || 'India'
  const cfg = getCountryConfig(countryName)

  const rawAreas = (userProfile.research_areas || userProfile.interests || []).map((a) => String(a).toLowerCase())

  let key = 'default'
  if (rawAreas.some((a) => a.includes('health') || a.includes('bio') || a.includes('genom') || a.includes('medic'))) {
    key = 'healthcare'
  } else if (rawAreas.some((a) => a.includes('robot') || a.includes('auto'))) {
    key = 'robotics'
  } else if (rawAreas.some((a) => a.includes('climat') || a.includes('environ') || a.includes('energy'))) {
    key = 'climate'
  } else if (rawAreas.some((a) => a.includes('quant'))) {
    key = 'quantum'
  } else if (rawAreas.some((a) => a.includes('vision') || a.includes('cv'))) {
    key = 'cv'
  }

  const domain = DOMAIN_DATA[key] || DOMAIN_DATA.default
  const titles = domain.titles(cfg)

  // Calculate realistic amounts based on country scale
  const amounts = [
    cfg.fmt(Math.round(cfg.max * 0.4)),
    cfg.fmt(Math.round(cfg.max * 0.75)),
    cfg.fmt(Math.round(cfg.max * 0.3)),
    cfg.fmt(Math.round(cfg.max * 0.2)),
  ]

  const categories = ['Top Recommended', 'Top Recommended', 'Good Fit', 'Stretch Opportunity']
  const matchScores = [95, 91, 87, 82]
  const urgencies = ['Critical', 'High', 'Medium', 'Low']

  // Build personalized summary incorporating country & funding agency names
  const dynamicSummary = `Your research profile demonstrates strong alignment with ${domain.summaryText}. Based on your location in ${countryName} and academic profile, the top recommendations prioritize calls from ${cfg.agencyNames}, focusing on domain innovation, funding alignment, and competitive research execution.`

  const whyFits = `• Strong overlap with ${domain.domainName} research priorities\n• Funding calls directly align with ${cfg.agencyNames} strategic agendas in ${countryName}\n• High institutional compatibility for your career stage`

  return titles.map((title, idx) => {
    const agency = cfg.agencies[idx % cfg.agencies.length]
    return {
      id: `demo_${countryName.toLowerCase().replace(/\s+/g, '_')}_${key}_${idx + 1}`,
      title,
      agency,
      funding: amounts[idx],
      amount: amounts[idx],
      matchScore: matchScores[idx],
      category: categories[idx],
      urgency: urgencies[idx],
      deadline: '2026-11-15',
      country: countryName,
      summary: dynamicSummary,
      whyFits: whyFits,
      eligibilityConcerns: domain.concerns,
      strengths: domain.strengths,
      weaknesses: domain.weaknesses,
      strategy: domain.strategy,
      recommendedAction: domain.recommendedAction,
      requiredDocuments: ['Research Proposal', 'Curriculum Vitae (CV)', 'Budget Plan', 'Support Letters'],
      checklist: [
        `Review eligibility criteria for ${agency}`,
        'Draft research methodology and objective statements',
        `Prepare budget justification for ${amounts[idx]}`,
        'Collect collaborator recommendation letters',
        'Final institutional approval submission',
      ],
      timeline: [
        'Month 1: Proposal drafting & preliminary benchmarking',
        'Month 2: Co-PI reviews & budget finalization',
        'Month 3: Submission & institutional signoff',
      ],
    }
  })
}

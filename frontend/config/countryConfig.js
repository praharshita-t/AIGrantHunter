// countryConfig.js — Centralized country-to-currency and funding configuration map

export const EUR_COUNTRIES = [
  'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Austria',
  'Portugal', 'Finland', 'Greece', 'Ireland', 'Luxembourg', 'Malta', 'Cyprus',
  'Slovakia', 'Slovenia', 'Estonia', 'Latvia', 'Lithuania', 'Croatia', 'Switzerland',
]

export const countryConfig = {
  India: {
    currency: '₹',
    symbol: '₹',
    min: 500000,
    max: 20000000,
    minLabel: '₹5 Lakhs',
    maxLabel: '₹2 Crores',
    step: 500000,
    defaultRange: [500000, 5000000],
    ticks: ['₹0', '₹25L', '₹50L', '₹1Cr', '₹1.5Cr', '₹2Cr'],
    agencies: ['ANRF', 'DST-SERB', 'DBT', 'ICMR', 'CSIR'],
    agencyNames: 'ANRF, DST, and SERB',
    fmt: (v) => {
      if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)} Cr`
      if (v >= 100000)   return `₹${(v / 100000).toFixed(0)} L`
      return `₹${v}`
    },
  },

  'United States': {
    currency: '$',
    symbol: '$',
    min: 10000,
    max: 2000000,
    minLabel: '$10K',
    maxLabel: '$2M',
    step: 10000,
    defaultRange: [50000, 500000],
    ticks: ['$0', '$250K', '$500K', '$1M', '$1.5M', '$2M'],
    agencies: ['NSF', 'NIH', 'DOE', 'DARPA', 'USDA'],
    agencyNames: 'NSF, NIH, and DOE',
    fmt: (v) => {
      if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`
      if (v >= 1000)    return `$${(v / 1000).toFixed(0)}K`
      return `$${v}`
    },
  },

  USA: {
    currency: '$',
    symbol: '$',
    min: 10000,
    max: 2000000,
    minLabel: '$10K',
    maxLabel: '$2M',
    step: 10000,
    defaultRange: [50000, 500000],
    ticks: ['$0', '$250K', '$500K', '$1M', '$1.5M', '$2M'],
    agencies: ['NSF', 'NIH', 'DOE', 'DARPA', 'USDA'],
    agencyNames: 'NSF, NIH, and DOE',
    fmt: (v) => {
      if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`
      if (v >= 1000)    return `$${(v / 1000).toFixed(0)}K`
      return `$${v}`
    },
  },

  'United Kingdom': {
    currency: '£',
    symbol: '£',
    min: 10000,
    max: 1500000,
    minLabel: '£10K',
    maxLabel: '£1.5M',
    step: 10000,
    defaultRange: [50000, 500000],
    ticks: ['£0', '£250K', '£500K', '£750K', '£1M', '£1.5M'],
    agencies: ['UKRI', 'Wellcome Trust', 'EPSRC', 'BBSRC', 'Royal Society'],
    agencyNames: 'UKRI, Wellcome Trust, and EPSRC',
    fmt: (v) => {
      if (v >= 1000000) return `£${(v / 1000000).toFixed(1)}M`
      if (v >= 1000)    return `£${(v / 1000).toFixed(0)}K`
      return `£${v}`
    },
  },

  UK: {
    currency: '£',
    symbol: '£',
    min: 10000,
    max: 1500000,
    minLabel: '£10K',
    maxLabel: '£1.5M',
    step: 10000,
    defaultRange: [50000, 500000],
    ticks: ['£0', '£250K', '£500K', '£750K', '£1M', '£1.5M'],
    agencies: ['UKRI', 'Wellcome Trust', 'EPSRC', 'BBSRC', 'Royal Society'],
    agencyNames: 'UKRI, Wellcome Trust, and EPSRC',
    fmt: (v) => {
      if (v >= 1000000) return `£${(v / 1000000).toFixed(1)}M`
      if (v >= 1000)    return `£${(v / 1000).toFixed(0)}K`
      return `£${v}`
    },
  },

  Europe: {
    currency: '€',
    symbol: '€',
    min: 10000,
    max: 2000000,
    minLabel: '€10K',
    maxLabel: '€2M',
    step: 10000,
    defaultRange: [50000, 500000],
    ticks: ['€0', '€250K', '€500K', '€1M', '€1.5M', '€2M'],
    agencies: ['ERC', 'Horizon Europe', 'DFG', 'ANR', 'EIC'],
    agencyNames: 'ERC and Horizon Europe',
    fmt: (v) => {
      if (v >= 1000000) return `€${(v / 1000000).toFixed(1)}M`
      if (v >= 1000)    return `€${(v / 1000).toFixed(0)}K`
      return `€${v}`
    },
  },

  Australia: {
    currency: 'A$',
    symbol: 'A$',
    min: 10000,
    max: 2000000,
    minLabel: 'A$10K',
    maxLabel: 'A$2M',
    step: 10000,
    defaultRange: [50000, 500000],
    ticks: ['A$0', 'A$250K', 'A$500K', 'A$1M', 'A$1.5M', 'A$2M'],
    agencies: ['ARC', 'NHMRC', 'MRFF', 'CSIRO'],
    agencyNames: 'ARC and NHMRC',
    fmt: (v) => {
      if (v >= 1000000) return `A$${(v / 1000000).toFixed(1)}M`
      if (v >= 1000)    return `A$${(v / 1000).toFixed(0)}K`
      return `A$${v}`
    },
  },

  Canada: {
    currency: 'C$',
    symbol: 'C$',
    min: 10000,
    max: 2000000,
    minLabel: 'C$10K',
    maxLabel: 'C$2M',
    step: 10000,
    defaultRange: [50000, 500000],
    ticks: ['C$0', 'C$250K', 'C$500K', 'C$1M', 'C$1.5M', 'C$2M'],
    agencies: ['NSERC', 'CIHR', 'SSHRC', 'CFI'],
    agencyNames: 'NSERC and CIHR',
    fmt: (v) => {
      if (v >= 1000000) return `C$${(v / 1000000).toFixed(1)}M`
      if (v >= 1000)    return `C$${(v / 1000).toFixed(0)}K`
      return `C$${v}`
    },
  },

  Japan: {
    currency: '¥',
    symbol: '¥',
    min: 1000000,
    max: 200000000,
    minLabel: '¥1M',
    maxLabel: '¥200M',
    step: 1000000,
    defaultRange: [5000000, 50000000],
    ticks: ['¥0', '¥25M', '¥50M', '¥100M', '¥150M', '¥200M'],
    agencies: ['JSPS', 'JST', 'AMED', 'NEDO'],
    agencyNames: 'JSPS and JST CREST',
    fmt: (v) => {
      if (v >= 100000000) return `¥${(v / 100000000).toFixed(1)}億`
      if (v >= 1000000)   return `¥${(v / 1000000).toFixed(0)}M`
      return `¥${v}`
    },
  },
}

export function getCountryConfig(country) {
  if (!country) return countryConfig['India']
  if (countryConfig[country]) return countryConfig[country]
  if (EUR_COUNTRIES.includes(country)) return countryConfig.Europe
  // Default to India configuration if country is not explicitly mapped
  return countryConfig['India']
}

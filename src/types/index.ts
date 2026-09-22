export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: 'print' | 'brand' | 'digital';
  shortDesc: string;
  fullDesc: string;
  paperStocks: string[];
  finishes: string[];
  turnaround: string;
  moq: string;
  featuredHighlight: string;
  previewColor: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: 'Packaging' | 'Stationery' | 'Product Labels' | 'Event Branding' | 'Corporate Branding' | 'Promotional';
  tagline: string;
  description: string;
  image: string;
  aspect: 'portrait' | 'landscape' | 'square';
  specs: {
    substrate: string;
    finishes: string[];
    turnaround: string;
    units: string;
  };
}

export interface ProcessStep {
  step: string;
  title: string;
  summary: string;
  deliverables: string[];
  timeframe: string;
}

export interface WhyReason {
  num: string;
  title: string;
  shortDesc: string;
  detail: string;
  metrics: string;
}

export interface LivePhoto {
  id: string;
  title: string;
  location: string;
  station: string;
  description: string;
  image: string;
  aspect: string;
  timestamp: string;
  specs: {
    equipment: string;
    operator: string;
    metric: string;
  };
}


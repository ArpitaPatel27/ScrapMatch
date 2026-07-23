import IndustryPageTemplate from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { IndustryPageData } from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Packaging Waste & Recycling | ScrapMatch',
  description: 'Trade corrugated board, stretch film, BOPP, aluminium foil and EPR-compliant packaging waste. India\'s B2B packaging recycling marketplace.',
};

const data: IndustryPageData = {
  name: 'Packaging',
  slug: 'packaging',
  eyebrow: 'Packaging & Multi-layer Waste',
  heroTitle: 'Packaging that\'s done its job still has value.',
  heroSubtitle: 'Corrugated board, stretch film, BOPP, aluminium foil — EPR-compliant transactions matched to authorised recyclers.',
  overview: 'The rapid growth of e-commerce and FMCG has made packaging the single largest category of plastic and paper waste in India. ScrapMatch helps brand owners, logistics companies, and manufacturers meet their EPR targets by connecting them to MoEF-registered recyclers and PROs. Our platform tracks Extended Producer Responsibility (EPR) credits, generates Form 2 certificates, and provides the documentation needed for annual CPCB submissions — while ensuring the material is sold at market-competitive rates.',
  accentColor: 'hsl(295, 35%, 42%)',
  materials: [
    { name: 'Corrugated Board Waste', grade: 'Clean OCC', qty: '5–100T', price: '₹7–11/kg', trend: 'up' },
    { name: 'LDPE Stretch Film', grade: 'Clear', qty: '500kg–10T', price: '₹14–20/kg' },
    { name: 'BOPP Film Scrap', grade: 'Printed', qty: '200kg–5T', price: '₹16–22/kg' },
    { name: 'Multi-layer Plastic (MLP)', grade: 'Mixed', qty: '500kg–10T', price: '₹2–6/kg' },
    { name: 'Aluminium Foil Laminate', grade: 'Flexible', qty: '200kg–5T', price: '₹25–35/kg', trend: 'up' },
    { name: 'PET Tray / Clamshell Scrap', grade: 'Thermoformed', qty: '200kg–5T', price: '₹22–28/kg' },
    { name: 'EPS (Thermocol) Blocks', grade: 'Clean', qty: '200kg–5T', price: '₹8–14/kg' },
    { name: 'Woven PP Sack Scrap', grade: 'Leno/FIBC', qty: '500kg–10T', price: '₹12–18/kg' },
  ],
  buyers: [
    'EPR-registered plastic recyclers (PROs)',
    'Film and flexible packaging recyclers',
    'Multi-layer plastic co-processors',
    'Corrugated box and paper board mills',
    'Recycled pellet and regrind producers',
    'Road construction (using plastic waste)',
    'Cement kilns (MLP co-processing)',
    'Brand-authorised take-back partners',
  ],
  sellers: [
    'FMCG and consumer goods companies',
    'E-commerce and quick-commerce operators',
    'Pharma blister and foil packaging plants',
    'Cold chain and frozen food distributors',
    'Appliance and electronics packaging plants',
    'Agricultural input packaging companies',
    'Retail chains and supermarket chains',
    'Industrial pallet wrap and strapping users',
  ],
  transactions: [
    { seller: 'FMCG Distributor, Delhi', material: 'Corrugated OCC', buyer: 'Paper Board Mill, Muzaffarnagar', qty: '55T', value: '₹4.7L' },
    { seller: 'E-com Hub, Bengaluru', material: 'LDPE Stretch Film', buyer: 'Film Recycler, Chennai', qty: '3T', value: '₹0.48L' },
    { seller: 'Pharma Blister Plant, Hyderabad', material: 'Aluminium Foil Laminate', buyer: 'Al Foil Recycler, Silvassa', qty: '1.5T', value: '₹0.45L' },
    { seller: 'Appliance Mfg, Pune', material: 'EPS Blocks', buyer: 'EPS Recycler, Vapi', qty: '4T', value: '₹0.44L' },
  ],
  insights: [
    { stat: '5.6MT', label: 'Packaging plastic waste annually' },
    { stat: 'EPR Credit', label: 'Certificates issued per transaction' },
    { stat: '₹2–35/kg', label: 'Price range by packaging type' },
    { stat: 'MoEF registered', label: 'All recycler partners verified' },
    { stat: '30 states', label: 'Pan-India logistics covered' },
    { stat: 'CPCB Form 2', label: 'Annual return documentation' },
  ],
  relatedIndustries: [
    { name: 'Plastics', slug: 'plastics' },
    { name: 'Paper & Packaging', slug: 'paper' },
    { name: 'Chemicals', slug: 'chemicals' },
  ],
};

export default function PackagingIndustryPage() {
  return <IndustryPageTemplate data={data} />;
}

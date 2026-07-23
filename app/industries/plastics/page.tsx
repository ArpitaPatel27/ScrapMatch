import IndustryPageTemplate from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { IndustryPageData } from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plastics Recycling Industry | ScrapMatch',
  description: 'Trade HDPE regrind, PET flake, PP scrap and more. India\'s AI-powered plastics recycling marketplace.',
};

const data: IndustryPageData = {
  name: 'Plastics',
  slug: 'plastics',
  eyebrow: 'Plastics Recycling',
  heroTitle: 'Turn plastic production waste into secondary raw material revenue.',
  heroSubtitle: 'HDPE, PET, PP, ABS and 30+ polymer grades — matched to verified compounders and recyclers across India.',
  overview: 'India generates over 3.4 million tonnes of plastic waste annually. ScrapMatch helps manufacturers and processors convert their plastic offcuts, purges, and regrind into verified secondary raw material transactions. Our AI classifies polymer types, assigns grades and purity scores, and connects sellers directly to compounders, recyclers, and EPR-compliant aggregators — without brokers or price uncertainty.',
  accentColor: 'hsl(260, 38%, 48%)',
  heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=75&auto=format&fit=crop',
  heroImageAlt: 'Plastic recycling facility with sorted polymer materials',
  materials: [
    { name: 'HDPE Regrind', grade: 'Grade A', qty: '1–20T', price: '₹33–38/kg', trend: 'up' },
    { name: 'PET Flake Food Grade', grade: 'Clear', qty: '500kg–5T', price: '₹28–34/kg' },
    { name: 'PP Scrap Natural', grade: 'Homopolymer', qty: '2–15T', price: '₹22–28/kg' },
    { name: 'ABS Purge & Lumps', grade: 'Mixed', qty: '200kg–5T', price: '₹18–24/kg' },
    { name: 'LDPE Film Scrap', grade: 'Clear', qty: '500kg–10T', price: '₹14–20/kg' },
    { name: 'Nylon 6 / PA66 Scrap', grade: 'Mixed', qty: '100kg–3T', price: '₹30–42/kg', trend: 'up' },
    { name: 'PS / HIPS Offcuts', grade: 'Natural', qty: '500kg–5T', price: '₹12–18/kg' },
    { name: 'PC (Polycarbonate) Scrap', grade: 'Transparent', qty: '200kg–3T', price: '₹35–48/kg' },
  ],
  buyers: [
    'Plastic compounders and masterbatch manufacturers',
    'Recycled pellet producers',
    'EPR scheme aggregators',
    'Pipe and profile extruders (rPP, rHDPE)',
    'Injection moulders using recycled resin',
    'Tarpaulin and LDPE film manufacturers',
    'Export houses (rPET flake)',
    'Waste management companies',
  ],
  sellers: [
    'Automotive plastic component manufacturers',
    'Consumer appliance assembly plants',
    'Packaging converters and thermoformers',
    'FMCG primary packaging factories',
    'Electronics housing moulders',
    'PET bottle and preform manufacturers',
    'Medical device component manufacturers',
    'Woven sack and FIBC manufacturers',
  ],
  transactions: [
    { seller: 'Auto Parts Moulder, Pune', material: 'PP Scrap Natural', buyer: 'Compounder, Ahmedabad', qty: '8.5T', value: '₹2.1L' },
    { seller: 'Bottle Mfg, Hyderabad', material: 'PET Flake Clear', buyer: 'rPET Producer, Rajkot', qty: '4T', value: '₹1.2L' },
    { seller: 'Appliance Mfg, Bengaluru', material: 'ABS Purge', buyer: 'Recycled Pellet Co., Chennai', qty: '2T', value: '₹0.45L' },
    { seller: 'Packaging Co., Delhi NCR', material: 'HDPE Regrind', buyer: 'Pipe Extruder, Ludhiana', qty: '12T', value: '₹4.2L' },
  ],
  insights: [
    { stat: '3.4MT', label: 'Annual plastic waste in India' },
    { stat: '30+', label: 'Polymer grades tracked' },
    { stat: '₹18–48', label: 'Price range per kg (commodity polymers)' },
    { stat: '85%', label: 'Diversion from landfill (verified lots)' },
    { stat: '48 hrs', label: 'Average time to buyer match' },
    { stat: 'EPR ready', label: 'Compliance documentation included' },
  ],
  relatedIndustries: [
    { name: 'Packaging', slug: 'packaging' },
    { name: 'Textiles', slug: 'textiles' },
    { name: 'Chemicals', slug: 'chemicals' },
  ],
};

export default function PlasticsIndustryPage() {
  return <IndustryPageTemplate data={data} />;
}

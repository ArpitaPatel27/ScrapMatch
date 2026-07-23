import IndustryPageTemplate from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { IndustryPageData } from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Construction & Building Materials | ScrapMatch',
  description: 'Trade fly ash, GGBFS slag, aggregate waste and steel rebar offcuts. AI-powered matching for India\'s construction sector.',
};

const data: IndustryPageData = {
  name: 'Construction',
  slug: 'construction',
  eyebrow: 'Construction & Infrastructure',
  heroTitle: 'Construction by-products that build the next project.',
  heroSubtitle: 'Fly ash, GGBFS, M-Sand and rebar offcuts — traded in bulk between power plants, steel mills, and infrastructure companies.',
  overview: 'India\'s construction and infrastructure boom generates enormous quantities of valuable industrial by-products — fly ash from thermal power plants, GGBFS from steel mills, and recycled aggregate from demolition. ScrapMatch connects generators with cement producers, ready-mix concrete plants, and infrastructure contractors who are required to use these materials under Green Rating and EPR mandates. We facilitate bulk transactions across 10–500 tonne lots with verified quality certifications.',
  accentColor: 'hsl(15, 45%, 38%)',
  materials: [
    { name: 'Class F Fly Ash', grade: 'IS 3812', qty: '10–500T', price: '₹1.2–1.8/kg', trend: 'up' },
    { name: 'GGBFS Granulated Slag', grade: 'Grade 120', qty: '10–200T', price: '₹1.5–2.2/kg' },
    { name: 'M-Sand Fine Aggregate', grade: 'Zone II', qty: '10–100T', price: '₹2.4–3.0/kg' },
    { name: 'Recycled Aggregate (C&D)', grade: 'Crushed RCA', qty: '20–500T', price: '₹0.8–1.4/kg' },
    { name: 'Steel Rebar Offcuts TMT', grade: 'Fe500D', qty: '1–30T', price: '₹26–33/kg' },
    { name: 'Bottom Ash', grade: 'Class C', qty: '20–200T', price: '₹0.5–0.9/kg' },
    { name: 'Silica Fume', grade: 'Densified', qty: '1–20T', price: '₹14–20/kg', trend: 'up' },
    { name: 'Aluminium Formwork Scrap', grade: 'Mixed', qty: '500kg–10T', price: '₹88–102/kg' },
  ],
  buyers: [
    'Cement and clinker manufacturers',
    'Ready-mix concrete (RMC) plants',
    'Pre-cast concrete component makers',
    'Infrastructure EPC contractors',
    'Road and highway construction companies',
    'Brick and block manufacturers',
    'Geotechnical fill contractors',
    'Green building material suppliers',
  ],
  sellers: [
    'Thermal power plants (coal-based)',
    'Integrated steel mills (SAIL, Tata, JSW)',
    'Quarry and aggregate processors',
    'Demolition contractors (C&D waste)',
    'High-rise residential developers',
    'EPC project sites',
    'Aluminium alloy formwork rental companies',
    'Ferro-alloy manufacturers',
  ],
  transactions: [
    { seller: 'Thermal Power Plant, Nagpur', material: 'Class F Fly Ash', buyer: 'Cement Plant, Nashik', qty: '200T', value: '₹3.2L' },
    { seller: 'Steel Mill, Vijaywada', material: 'GGBFS Grade 120', buyer: 'RMC Plant, Hyderabad', qty: '80T', value: '₹1.5L' },
    { seller: 'Infrastructure Site, Noida', material: 'Steel Rebar Offcuts', buyer: 'Re-roller, Meerut', qty: '22T', value: '₹6.3L' },
    { seller: 'Demolition Co., Bengaluru', material: 'Recycled Aggregate RCA', buyer: 'Road Contractor, KA', qty: '150T', value: '₹1.5L' },
  ],
  insights: [
    { stat: '150MT', label: 'Annual fly ash generation (India)' },
    { stat: '68%', label: 'Fly ash utilisation (target 100%)' },
    { stat: '₹0.5–20/kg', label: 'Price range by material type' },
    { stat: '500T+', label: 'Largest single lot facilitated' },
    { stat: 'GRIHA/IGBC', label: 'Green rating credits available' },
    { stat: 'IS 3812', label: 'Quality certification verified' },
  ],
  relatedIndustries: [
    { name: 'Steel & Metals', slug: 'steel' },
    { name: 'Chemicals', slug: 'chemicals' },
    { name: 'Packaging', slug: 'packaging' },
  ],
};

export default function ConstructionIndustryPage() {
  return <IndustryPageTemplate data={data} />;
}

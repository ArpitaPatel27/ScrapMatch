import IndustryPageTemplate from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { IndustryPageData } from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automotive Scrap & By-products | ScrapMatch',
  description: 'Trade stamping offcuts, coolant waste, rubber trim and battery scrap from automotive plants. OEM-verified marketplace.',
};

const data: IndustryPageData = {
  name: 'Automotive',
  slug: 'automotive',
  eyebrow: 'Automotive & Mobility',
  heroTitle: 'Every press, every assembly line generates value — capture it.',
  heroSubtitle: 'Steel stampings, aluminium die-cast sprue, coolant waste, rubber trim — matched to verified secondary processors across India.',
  overview: 'India\'s automotive sector — producing over 24 million vehicles annually — generates substantial volumes of high-value scrap from stamping operations, die-casting, machining, and assembly. ScrapMatch is integrated into the procurement and plant management workflows of Tier 1 and Tier 2 suppliers, ensuring that monthly scrap offtake is handled at competitive prices with full audit trails for ESG reporting. Our platform also handles ELV (End of Life Vehicle) component recovery for OEM take-back programmes.',
  accentColor: 'hsl(220, 42%, 40%)',
  materials: [
    { name: 'Steel Stamping Offcuts (CRC)', grade: 'IS2062 CRC', qty: '5–100T', price: '₹22–30/kg', trend: 'up' },
    { name: 'Aluminium Die-Cast Sprue', grade: 'ADC-12', qty: '1–20T', price: '₹90–110/kg' },
    { name: 'Cast Iron Machining Chips', grade: 'Grey CI', qty: '2–30T', price: '₹10–16/kg' },
    { name: 'Engine Coolant Waste', grade: 'Ethylene glycol based', qty: '500L–10,000L', price: '₹8–14/L' },
    { name: 'EPDM Rubber Trim Scrap', grade: 'Black', qty: '200kg–5T', price: '₹14–20/kg' },
    { name: 'Plastic Bumper Trim (PP)', grade: 'Natural', qty: '200kg–3T', price: '₹18–25/kg' },
    { name: 'Lead-Acid Battery Scrap', grade: 'Drained', qty: '500kg–10T', price: '₹80–95/kg' },
    { name: 'Lithium-Ion Battery Packs', grade: 'BMS intact', qty: '50–500 units', price: 'Market rate' },
  ],
  buyers: [
    'Secondary steel re-rollers and melters',
    'Aluminium die-casting and foundry companies',
    'Cast iron foundries',
    'Coolant regeneration and recovery companies',
    'Rubber crumb and buffing processors',
    'Plastic compounders (automotive grade)',
    'Lead-acid battery recyclers (BSNL/Exide certified)',
    'Lithium battery recyclers and PROs',
  ],
  sellers: [
    'Tier 1 automotive stamping plants',
    'Die-casting and pressure casting units',
    'Engine and gearbox machining plants',
    'Automotive assembly lines (OEMs)',
    'Two-wheeler and commercial vehicle plants',
    'Tractor and farm equipment manufacturers',
    'EV component manufacturers',
    'Automotive after-market reconditioning shops',
  ],
  transactions: [
    { seller: 'Stamping Plant, Gurugram', material: 'CRC Steel Offcuts', buyer: 'Re-Rolling Mill, Mandi Gobindgarh', qty: '32T', value: '₹8.6L' },
    { seller: 'Die-Casting Co., Pune', material: 'Aluminium ADC-12 Sprue', buyer: 'Aluminium Foundry, Rajkot', qty: '6T', value: '₹5.8L' },
    { seller: 'OEM Assembly, Chennai', material: 'Lead-Acid Battery Scrap', buyer: 'Battery Recycler, Tamil Nadu', qty: '4T', value: '₹3.4L' },
    { seller: 'Machining Plant, Coimbatore', material: 'CI Machining Chips', buyer: 'CI Foundry, Coimbatore', qty: '18T', value: '₹2.3L' },
  ],
  insights: [
    { stat: '24M', label: 'Vehicles produced annually in India' },
    { stat: '15–25%', label: 'Steel utilised as scrap per vehicle' },
    { stat: '₹10–110/kg', label: 'Price range by material category' },
    { stat: 'ESG audit', label: 'Full scrap audit trail for OEMs' },
    { stat: 'ELV ready', label: 'End-of-life vehicle documentation' },
    { stat: 'AIS 129', label: 'ELV compliance tracking' },
  ],
  relatedIndustries: [
    { name: 'Steel & Metals', slug: 'steel' },
    { name: 'Plastics', slug: 'plastics' },
    { name: 'Electronics', slug: 'electronics' },
  ],
};

export default function AutomotiveIndustryPage() {
  return <IndustryPageTemplate data={data} />;
}

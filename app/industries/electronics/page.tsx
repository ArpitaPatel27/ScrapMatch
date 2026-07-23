import IndustryPageTemplate from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { IndustryPageData } from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Electronics & E-Waste | ScrapMatch',
  description: 'Trade PCB scrap, cable waste and component stock. Certified e-waste transactions on India\'s AI-powered marketplace.',
};

const data: IndustryPageData = {
  name: 'Electronics',
  slug: 'electronics',
  eyebrow: 'Electronics & E-Waste',
  heroTitle: 'Extract maximum value from electronics scrap — compliantly.',
  heroSubtitle: 'PCB scrap, copper cable, component stock — matched to certified PROs and precious metal refiners across India.',
  overview: 'India is the world\'s third-largest generator of e-waste, yet formal recycling handles less than 20% of the volume. ScrapMatch helps electronics manufacturers and EPC contractors fulfil their Extended Producer Responsibility (EPR) obligations by connecting them to CPCB-registered PROs and certified e-waste dismantlers. Our platform handles chain-of-custody documentation, material weight certificates, and destruction reports — making compliance straightforward.',
  accentColor: 'hsl(155, 42%, 28%)',
  heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=75&auto=format&fit=crop',
  heroImageAlt: 'Electronic circuit boards and e-waste components',
  materials: [
    { name: 'PCB Scrap Mixed', grade: 'Mixed', qty: '50kg–2T', price: '₹80–120/kg', trend: 'up' },
    { name: 'Bare PCB (FR4)', grade: 'Trimmed', qty: '50kg–1T', price: '₹25–40/kg' },
    { name: 'Copper Cable Scrap', grade: 'Stripped', qty: '100kg–5T', price: '₹380–440/kg', trend: 'up' },
    { name: 'Aluminium Cable Scrap', grade: 'Stripped', qty: '100kg–5T', price: '₹90–110/kg' },
    { name: 'Component Stock (ICs)', grade: 'Tested', qty: '10–500kg', price: 'Negotiable' },
    { name: 'Hard Drives / Storage', grade: 'DoD wiped', qty: '10–500 units', price: '₹150–400/unit' },
    { name: 'Server Rack Hardware', grade: 'De-racked', qty: '1–50 racks', price: '₹8,000–25,000/rack' },
    { name: 'Lithium Battery Packs', grade: 'Discharged', qty: '50–500 units', price: 'Market rate' },
  ],
  buyers: [
    'CPCB-registered e-waste PROs',
    'Precious metal refiners (Au, Ag, Pd)',
    'Copper cathode producers',
    'Certified e-waste dismantlers',
    'Refurbished electronics dealers',
    'Component part harvesting companies',
    'PCB precious metal leachers',
    'Battery recyclers (Li-ion, Lead-acid)',
  ],
  sellers: [
    'Consumer electronics manufacturers',
    'Telecom tower infrastructure companies',
    'Data centre operators and hyperscalers',
    'PCB assembly (EMS) companies',
    'IT hardware distributors',
    'Defence electronics contractors',
    'Industrial automation system integrators',
    'Solar inverter and control panel makers',
  ],
  transactions: [
    { seller: 'EMS Company, Chennai', material: 'PCB Scrap Mixed', buyer: 'PRO Recycler, Shredathon', qty: '1.2T', value: '₹1.1L' },
    { seller: 'Data Centre, Hyderabad', material: 'Copper Cable Scrap', buyer: 'Copper Rod Mill, Bhiwadi', qty: '3T', value: '₹12.6L' },
    { seller: 'Telecom Tower Co.', material: 'Aluminium Cable Scrap', buyer: 'Aluminium Caster, Kolkata', qty: '8T', value: '₹8.4L' },
    { seller: 'IT Distributor, Bengaluru', material: 'Server Rack Hardware', buyer: 'Refurbisher, Pune', qty: '20 racks', value: '₹3.4L' },
  ],
  insights: [
    { stat: '3.2MT', label: 'E-waste generated annually (India)' },
    { stat: '<20%', label: 'Formal recycling rate currently' },
    { stat: '₹380–440/kg', label: 'Copper cable scrap price range' },
    { stat: 'EPR ready', label: 'CPCB-compliant documentation' },
    { stat: '24 hrs', label: 'Certificate issuance turnaround' },
    { stat: '100%', label: 'Chain-of-custody maintained' },
  ],
  relatedIndustries: [
    { name: 'Steel & Metals', slug: 'steel' },
    { name: 'Plastics', slug: 'plastics' },
    { name: 'Automotive', slug: 'automotive' },
  ],
};

export default function ElectronicsIndustryPage() {
  return <IndustryPageTemplate data={data} />;
}

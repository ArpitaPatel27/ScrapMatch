import IndustryPageTemplate from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { IndustryPageData } from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chemical & Solvent Waste | ScrapMatch',
  description: 'Trade spent solvents, catalyst waste and chemical by-products on India\'s PCB-compliant industrial exchange.',
};

const data: IndustryPageData = {
  name: 'Chemicals',
  slug: 'chemicals',
  eyebrow: 'Industrial Chemicals',
  heroTitle: 'Chemical by-products aren\'t waste — they\'re feedstocks for someone else.',
  heroSubtitle: 'Spent solvents, catalyst residues, and acid effluents — matched to certified treatment facilities and secondary processors.',
  overview: 'Industrial chemical by-products represent one of the most regulated and high-value categories in the circular economy. ScrapMatch works with Pollution Control Board (PCB) compliant handlers to ensure every transaction is documented, manifested, and traceable. Our platform connects chemical manufacturers, pharma companies, and paint plants with authorised co-processors, solvent recovery units, and hazardous waste treatment facilities — turning compliance costs into recoverable revenue.',
  accentColor: 'hsl(55, 55%, 38%)',
  materials: [
    { name: 'IPA (Isopropyl Alcohol) Residue', grade: '70–85% purity', qty: '200L–5,000L', price: '₹18–24/L', trend: 'up' },
    { name: 'Spent Toluene / Xylene', grade: 'Mixed aromatic', qty: '500L–10,000L', price: '₹12–18/L' },
    { name: 'Spent Catalyst (Pt/Pd)', grade: 'Verified assay', qty: '10–500kg', price: 'Market rate (precious)' },
    { name: 'Hydrochloric Acid Waste', grade: '5–18%', qty: '500L–20,000L', price: '₹1–4/L' },
    { name: 'Sulphuric Acid (spent)', grade: '50–75%', qty: '1,000L–50,000L', price: '₹0.5–2/L' },
    { name: 'Ethyl Acetate Residue', grade: '60–80% purity', qty: '200L–5,000L', price: '₹14–20/L' },
    { name: 'Paint Sludge', grade: 'Solvent-based', qty: '500kg–10T', price: '₹4–8/kg' },
    { name: 'Chlorinated Solvent Mix', grade: 'Hazardous', qty: '200L–5,000L', price: '₹6–12/L' },
  ],
  buyers: [
    'Solvent recovery and distillation units',
    'Authorised common treatment facilities (CTSF)',
    'Cement kilns (co-processing)',
    'Precious metal refiners (spent catalyst)',
    'Acid regeneration plants',
    'Industrial solvent blenders',
    'Hazardous waste landfills (HW compliant)',
    'Pyrolysis and energy recovery operators',
  ],
  sellers: [
    'Pharmaceutical API manufacturers',
    'Specialty chemical producers',
    'Paint and coating manufacturers',
    'Printing ink producers',
    'Automotive OEM paint shops',
    'Agrochemical formulators',
    'Textile processing and dyeing mills',
    'Laboratories and R&D centres',
  ],
  transactions: [
    { seller: 'Pharma API Plant, Hyderabad', material: 'IPA Residue 80%', buyer: 'Solvent Recovery Unit, Vapi', qty: '3,000L', value: '₹0.63L' },
    { seller: 'Paint Mfg, Ahmedabad', material: 'Spent Toluene', buyer: 'Cement Kiln Co-processor, Rajkot', qty: '5,000L', value: '₹0.70L' },
    { seller: 'Auto Paint Shop, Pune', material: 'Paint Sludge', buyer: 'TSDF Facility, Taloja', qty: '4T', value: '₹0.28L' },
    { seller: 'Specialty Chem, Vadodara', material: 'Spent Catalyst Pt/Pd', buyer: 'Precious Metal Refiner, Mumbai', qty: '80kg', value: '₹12.0L' },
  ],
  insights: [
    { stat: '8.4MT', label: 'Hazardous waste generated annually' },
    { stat: 'PCB compliant', label: 'All transactions manifested' },
    { stat: '₹1–24/L', label: 'Solvent recovery price range' },
    { stat: '72 hrs', label: 'Max. time to compliant handler match' },
    { stat: '100%', label: 'Form 2 manifest documentation' },
    { stat: 'CPCB + SPCB', label: 'Dual regulatory compliance' },
  ],
  relatedIndustries: [
    { name: 'Plastics', slug: 'plastics' },
    { name: 'Textiles', slug: 'textiles' },
    { name: 'Steel & Metals', slug: 'steel' },
  ],
};

export default function ChemicalsIndustryPage() {
  return <IndustryPageTemplate data={data} />;
}

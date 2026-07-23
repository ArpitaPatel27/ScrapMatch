import IndustryPageTemplate from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { IndustryPageData } from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Textile Waste & Recycling | ScrapMatch',
  description: 'Trade cotton waste, polyester offcuts, denim trimmings and yarn ends. Fibre-to-fibre recycling marketplace for Indian textiles.',
};

const data: IndustryPageData = {
  name: 'Textiles',
  slug: 'textiles',
  eyebrow: 'Textiles & Apparel',
  heroTitle: 'Fibre to fibre. Close the loop on textile waste.',
  heroSubtitle: 'Cotton cuttings, polyester offcuts, yarn ends, denim trimmings — matched to wiping cloth makers, recycled yarn spinners, and nonwoven producers.',
  overview: 'India\'s textile industry is the world\'s third-largest exporter, but it also generates millions of tonnes of cutting waste and yarn offcuts every year. ScrapMatch connects garment manufacturers, spinning mills, and weaving factories with recycled yarn spinners, wiping cloth manufacturers, and nonwoven fabric producers. Our AI differentiates between fibre types, gauges blending suitability, and matches lots with buyers who pay a premium for clean, sorted material.',
  accentColor: 'hsl(340, 45%, 45%)',
  materials: [
    { name: 'Cotton Cuttings (Soft Waste)', grade: 'Clean, sorted', qty: '500kg–10T', price: '₹20–28/kg', trend: 'up' },
    { name: 'Cotton Yarn Ends / Cones', grade: 'Ne 20–40', qty: '200kg–5T', price: '₹22–30/kg' },
    { name: 'Polyester Fabric Offcuts', grade: 'Solid colour', qty: '200kg–5T', price: '₹12–18/kg' },
    { name: 'Polyester-Cotton Blend Waste', grade: 'Mixed', qty: '500kg–5T', price: '₹10–15/kg' },
    { name: 'Denim Trimmings', grade: 'Indigo washed', qty: '100kg–3T', price: '₹14–22/kg' },
    { name: 'Viscose Rayon Offcuts', grade: 'Woven cuts', qty: '200kg–3T', price: '₹16–24/kg', trend: 'up' },
    { name: 'Woolen Rags / Shoddy', grade: 'Mixed', qty: '500kg–5T', price: '₹25–40/kg' },
    { name: 'Jute Bag Waste', grade: 'Clean', qty: '1–20T', price: '₹6–10/kg' },
  ],
  buyers: [
    'Recycled yarn spinners (carded/open-end)',
    'Wiping cloth and industrial rag manufacturers',
    'Nonwoven fabric producers',
    'Felt and needle-punch manufacturers',
    'Stuffing and filling material producers',
    'Paper pulp producers (cotton linters)',
    'Insulation material manufacturers',
    'Export houses (textile waste)',
  ],
  sellers: [
    'Garment export units and CMT factories',
    'Denim fabric mills',
    'Spinning mills (combing/carding waste)',
    'Knitting mills and hosiery factories',
    'Weaving factories',
    'Home textile manufacturers',
    'Technical textile manufacturers',
    'Fashion brands with sustainability mandates',
  ],
  transactions: [
    { seller: 'Garment Factory, Tiruppur', material: 'Cotton Cuttings', buyer: 'Recycled Yarn Spinner, Panipat', qty: '6T', value: '₹1.44L' },
    { seller: 'Denim Mill, Ahmedabad', material: 'Denim Trimmings', buyer: 'Wiping Cloth Mfg, Surat', qty: '2.5T', value: '₹0.43L' },
    { seller: 'Polyester Weaver, Surat', material: 'Polyester Offcuts', buyer: 'Nonwoven Producer, Vapi', qty: '4T', value: '₹0.64L' },
    { seller: 'Knitting Mill, Ludhiana', material: 'Woolen Shoddy', buyer: 'Blanket Mfg, Panipat', qty: '3T', value: '₹0.96L' },
  ],
  insights: [
    { stat: '7.5MT', label: 'Annual textile waste in India' },
    { stat: '30%', label: 'Cuttings as % of fabric purchased' },
    { stat: '₹6–40/kg', label: 'Price range by fibre type' },
    { stat: '2 days', label: 'Average time to buyer match' },
    { stat: 'Panipat', label: 'Largest recycled yarn hub served' },
    { stat: 'EPR ready', label: 'Brand compliance documentation' },
  ],
  relatedIndustries: [
    { name: 'Plastics', slug: 'plastics' },
    { name: 'Paper & Packaging', slug: 'paper' },
    { name: 'Chemicals', slug: 'chemicals' },
  ],
};

export default function TextilesIndustryPage() {
  return <IndustryPageTemplate data={data} />;
}

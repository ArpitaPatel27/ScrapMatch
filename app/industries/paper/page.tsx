import IndustryPageTemplate from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { IndustryPageData } from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paper & Packaging Recycling | ScrapMatch',
  description: 'Trade OCC cardboard, kraft paper, newsprint and more. AI-matched paper recycling for Indian manufacturers.',
};

const data: IndustryPageData = {
  name: 'Paper & Packaging',
  slug: 'paper',
  eyebrow: 'Paper & Packaging',
  heroTitle: 'Close the loop on paper — from factory offcuts to fresh fibre.',
  heroSubtitle: 'OCC, kraft, newsprint, tissue grades — matched to paper mills and recycling aggregators at live market rates.',
  overview: 'Paper recycling is one of India\'s most mature circular economy sectors, yet millions of tonnes of paper and packaging waste are still landfilled or exported at low value each year. ScrapMatch connects industrial generators — manufacturing plants, printers, logistics companies — with paper mills and waste aggregators who can pay market-leading prices for clean, segregated fibre. Our AI grades material quality and provides real-time CPCB recycled content benchmarks.',
  accentColor: 'hsl(35, 58%, 42%)',
  materials: [
    { name: 'OCC Old Corrugated Containers', grade: 'Clean', qty: '5–100T', price: '₹7–11/kg', trend: 'up' },
    { name: 'Kraft Paper Waste', grade: 'Unbleached', qty: '1–30T', price: '₹5–9/kg' },
    { name: 'Mixed Office Paper', grade: 'Sorted', qty: '1–10T', price: '₹3–6/kg' },
    { name: 'Newsprint / ONP', grade: 'Mixed', qty: '2–20T', price: '₹2–5/kg' },
    { name: 'Tissue Off-cuts', grade: 'Virgin fibre', qty: '500kg–10T', price: '₹12–18/kg', trend: 'up' },
    { name: 'Liquid Packaging Board', grade: 'LPB', qty: '1–10T', price: '₹4–7/kg' },
    { name: 'Glassine & Silicone Paper', grade: 'Release liner', qty: '200kg–5T', price: '₹8–14/kg' },
    { name: 'Book/Magazine Paper', grade: 'Coated', qty: '1–15T', price: '₹2–4/kg' },
  ],
  buyers: [
    'Paper and board mills',
    'Recycled newsprint manufacturers',
    'Tissue and hygiene product manufacturers',
    'Paper tube and core manufacturers',
    'Corrugated box producers using recycled fibre',
    'Moulded pulp product manufacturers',
    'Pulp exporters',
    'Industrial waste aggregators',
  ],
  sellers: [
    'FMCG and consumer goods factories',
    'Logistics and 3PL warehouses',
    'Printing and publishing houses',
    'E-commerce fulfilment centres',
    'Retail chains and supermarkets',
    'Pharma and medical packaging plants',
    'Corrugated packaging converters',
    'Educational institutions',
  ],
  transactions: [
    { seller: 'E-commerce Hub, Delhi', material: 'OCC Cardboard', buyer: 'Paper Mill, Muzaffarnagar', qty: '45T', value: '₹4.1L' },
    { seller: 'Printing Press, Mumbai', material: 'Mixed Office Paper', buyer: 'Recycler, Navi Mumbai', qty: '8T', value: '₹0.36L' },
    { seller: 'Pharma Plant, Hyderabad', material: 'Kraft Paper Waste', buyer: 'Tube Mfg, Noida', qty: '12T', value: '₹0.84L' },
    { seller: 'Tissue Mfg, Pune', material: 'Tissue Off-cuts', buyer: 'Pulp Mill, Vapi', qty: '6T', value: '₹0.84L' },
  ],
  insights: [
    { stat: '18MT', label: 'Annual paper consumption in India' },
    { stat: '27%', label: 'Average recycling rate (industry)' },
    { stat: '₹2–18/kg', label: 'Price range by grade' },
    { stat: '5–100T', label: 'Typical lot size accepted' },
    { stat: '2 days', label: 'Average matching time for OCC' },
    { stat: 'CPCB aligned', label: 'Compliance documentation' },
  ],
  relatedIndustries: [
    { name: 'Packaging', slug: 'packaging' },
    { name: 'Plastics', slug: 'plastics' },
    { name: 'Textiles', slug: 'textiles' },
  ],
};

export default function PaperIndustryPage() {
  return <IndustryPageTemplate data={data} />;
}

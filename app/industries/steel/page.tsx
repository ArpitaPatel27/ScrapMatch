import IndustryPageTemplate from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { IndustryPageData } from '@/components/sections/IndustryPageTemplate/IndustryPageTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Steel & Metals Industry | ScrapMatch',
  description: 'Buy and sell steel offcuts, copper wire scrap, aluminium extrusions and more. AI-powered matching for India\'s steel and metals industry.',
};

const data: IndustryPageData = {
  name: 'Steel & Metals',
  slug: 'steel',
  eyebrow: 'Steel & Metals',
  heroTitle: "India's most active market for secondary steel and non-ferrous metals.",
  heroSubtitle: 'From IS2062 offcuts to Cat1 copper wire — ScrapMatch connects verified sellers with industrial buyers in real time.',
  overview: 'India produces over 120 million tonnes of steel annually, generating significant volumes of offcuts, turnings, and scrap. ScrapMatch\'s AI matches this material to verified buyers — secondary steel processors, re-rollers, foundries, and fabricators — reducing the time-to-sale from weeks to days. Our platform tracks live MCX-aligned prices for copper, aluminium, and zinc, ensuring both sides trade at fair market rates.',
  accentColor: 'hsl(210, 45%, 42%)',
  materials: [
    { name: 'Steel Offcuts IS2062', grade: 'Grade A', qty: '1–50T', price: '₹28–35/kg', trend: 'up' },
    { name: 'Steel Turnings / Borings', grade: 'Mixed', qty: '500kg–20T', price: '₹15–22/kg' },
    { name: 'Copper Wire Scrap', grade: 'Cat1', qty: '100kg–5T', price: '₹420–460/kg', trend: 'up' },
    { name: 'Copper Wire Scrap', grade: 'Cat2', qty: '100kg–5T', price: '₹380–420/kg' },
    { name: 'Aluminium Extrusions', grade: '6063 Alloy', qty: '500kg–10T', price: '₹105–120/kg' },
    { name: 'Aluminium Sheet Offcuts', grade: '1100 Series', qty: '200kg–5T', price: '₹95–108/kg' },
    { name: 'Stainless Steel Scrap', grade: 'SS304', qty: '200kg–10T', price: '₹70–90/kg', trend: 'up' },
    { name: 'Cast Iron Borings', grade: 'Mixed', qty: '2–30T', price: '₹10–16/kg' },
  ],
  buyers: [
    'Secondary steel re-rolling mills',
    'Induction furnace foundries',
    'Copper rod and wire manufacturers',
    'Aluminium extruders and die casters',
    'Metal recycling aggregators',
    'Government scrap depots (MSTC)',
    'Export-oriented scrap traders',
    'Fabrication yards',
  ],
  sellers: [
    'Automotive OEM stamping plants',
    'Engineering component manufacturers',
    'EPC contractors and construction firms',
    'Steel furniture and shelving manufacturers',
    'Cable and wire manufacturers',
    'Aerospace and defence fabricators',
    'White goods assembly plants',
    'Infrastructure project sites',
  ],
  transactions: [
    { seller: 'Auto Stamping Co., Pune', material: 'Steel Offcuts IS2062', buyer: 'Re-Rolling Mill, Surat', qty: '18T', value: '₹5.4L' },
    { seller: 'Cable Mfg, Vadodara', material: 'Copper Wire Scrap Cat1', buyer: 'Copper Rod Mill, Bhiwadi', qty: '2.4T', value: '₹10.6L' },
    { seller: 'HVAC Mfg, Chennai', material: 'Aluminium Sheet Offcuts', buyer: 'Aluminium Caster, Coimbatore', qty: '3.8T', value: '₹3.8L' },
    { seller: 'Defence Fab, Kanpur', material: 'Stainless Steel SS304', buyer: 'SS Re-Melter, Nagpur', qty: '5T', value: '₹4.0L' },
  ],
  insights: [
    { stat: '₹1,200 Cr', label: 'Secondary steel market size (India)' },
    { stat: '40+', label: 'Metal categories tracked' },
    { stat: '3 days', label: 'Average time to first buyer enquiry' },
    { stat: '92%', label: 'Listings matched within 30 days' },
    { stat: '280+', label: 'Verified metals buyers on platform' },
    { stat: 'MCX-aligned', label: 'Live price benchmarking' },
  ],
  relatedIndustries: [
    { name: 'Automotive', slug: 'automotive' },
    { name: 'Construction', slug: 'construction' },
    { name: 'Electronics', slug: 'electronics' },
  ],
};

export default function SteelIndustryPage() {
  return <IndustryPageTemplate data={data} />;
}

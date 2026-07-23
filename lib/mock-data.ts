// lib/mock-data.ts — ScrapMatch shared mock data

export interface Listing {
  id: string;
  material: string;
  category: string;
  grade: string;
  quantity: number;
  unit: string;
  location: string;
  city: string;
  state: string;
  price: number;
  priceUnit: string;
  status: 'active' | 'pending' | 'matched' | 'sold' | 'paused';
  buyerInterest: number;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MarketplaceListing extends Listing {
  sellerId: string;
  sellerName: string;
  sellerCompany: string;
  sellerVerified: boolean;
  sellerRating: number;
  sellerDeals: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'file';
}

export interface Conversation {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerCompany: string;
  partnerInitials: string;
  partnerVerified: boolean;
  listingId: string;
  listingName: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: Message[];
  negotiationStatus: 'open' | 'negotiating' | 'agreed' | 'closed';
  proposedPrice?: number;
}

export interface Notification {
  id: string;
  type: 'match' | 'message' | 'price' | 'system';
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export const LISTINGS: Listing[] = [
  {
    id: 'lst-001',
    material: 'Steel Offcuts IS2062',
    category: 'Metals',
    grade: 'IS2062 E250',
    quantity: 14,
    unit: 'Tonnes',
    location: 'Pune Industrial Area, Pune, MH',
    city: 'Pune',
    state: 'Maharashtra',
    price: 32000,
    priceUnit: 'per Tonne',
    status: 'matched',
    buyerInterest: 7,
    description: 'High-quality steel offcuts from automotive press shop. Mixed sizes, mostly 50mm–300mm pieces. Consistent IS2062 E250 grade. Suitable for re-rolling or secondary fabrication.',
    images: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=75',
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&q=75',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=75',
    ],
    createdAt: '2025-05-10T09:00:00Z',
    updatedAt: '2025-06-01T11:30:00Z',
  },
  {
    id: 'lst-002',
    material: 'HDPE Regrind Grade A',
    category: 'Plastics',
    grade: 'Grade A Regrind',
    quantity: 8,
    unit: 'Tonnes',
    location: 'Vasai MIDC, Mumbai, MH',
    city: 'Mumbai',
    state: 'Maharashtra',
    price: 45000,
    priceUnit: 'per Tonne',
    status: 'pending',
    buyerInterest: 4,
    description: 'Clean HDPE regrind from blow moulding operations. No contamination. MFI 0.3–0.5. Suitable for pipe manufacturing and industrial containers.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75',
    ],
    createdAt: '2025-05-18T14:00:00Z',
    updatedAt: '2025-06-02T10:00:00Z',
  },
  {
    id: 'lst-003',
    material: 'OCC Cardboard Bales',
    category: 'Paper',
    grade: 'OCC 11',
    quantity: 22,
    unit: 'Tonnes',
    location: 'Bhiwandi Warehouse, Thane, MH',
    city: 'Thane',
    state: 'Maharashtra',
    price: 8500,
    priceUnit: 'per Tonne',
    status: 'active',
    buyerInterest: 12,
    description: 'OCC Grade 11 corrugated cardboard bales from FMCG distribution centre. Well-baled, less than 2% moisture. Available weekly in 22–25T lots.',
    images: [
      'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400&q=75',
      'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400&q=75',
      'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400&q=75',
    ],
    createdAt: '2025-05-25T08:30:00Z',
    updatedAt: '2025-06-03T09:00:00Z',
  },
  {
    id: 'lst-004',
    material: 'Demolition Concrete Rubble',
    category: 'Construction',
    grade: 'M20 Mixed Rubble',
    quantity: 50,
    unit: 'Tonnes',
    location: 'Hinjewadi, Pune, MH',
    city: 'Pune',
    state: 'Maharashtra',
    price: 1200,
    priceUnit: 'per Tonne',
    status: 'active',
    buyerInterest: 3,
    description: 'Demolition rubble from office building teardown. Suitable for fill, sub-base preparation or recycled aggregate production. No asbestos.',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=75',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=75',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=75',
    ],
    createdAt: '2025-06-01T11:00:00Z',
    updatedAt: '2025-06-03T15:00:00Z',
  },
  {
    id: 'lst-005',
    material: 'PCB E-Waste Boards',
    category: 'Electronics',
    grade: 'Mixed PCB',
    quantity: 500,
    unit: 'kg',
    location: 'Pimpri-Chinchwad, Pune, MH',
    city: 'Pune',
    state: 'Maharashtra',
    price: 280,
    priceUnit: 'per kg',
    status: 'sold',
    buyerInterest: 9,
    description: 'Mixed PCB e-waste boards from electronics manufacturer. Contains Au, Cu, Ag. Properly de-soldered and sorted. Requires certified recycler.',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=75',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=75',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=75',
    ],
    createdAt: '2025-04-20T10:00:00Z',
    updatedAt: '2025-05-28T16:00:00Z',
  },
  {
    id: 'lst-006',
    material: 'Spent Caustic Soda Solution',
    category: 'Chemicals',
    grade: '8–10% NaOH',
    quantity: 2000,
    unit: 'Litres',
    location: 'Tarapur MIDC, Palghar, MH',
    city: 'Palghar',
    state: 'Maharashtra',
    price: 12,
    priceUnit: 'per Litre',
    status: 'paused',
    buyerInterest: 2,
    description: 'Spent caustic soda from aluminium anodising line. ~8–10% NaOH residual concentration. Suitable for pH treatment or further processing by authorised handler.',
    images: [
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=75',
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=75',
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=75',
    ],
    createdAt: '2025-05-05T09:00:00Z',
    updatedAt: '2025-05-30T12:00:00Z',
  },
  {
    id: 'lst-007',
    material: 'Cotton Yarn Waste',
    category: 'Textiles',
    grade: 'Combed Cotton Waste',
    quantity: 3,
    unit: 'Tonnes',
    location: 'Surat Textile Zone, Surat, GJ',
    city: 'Surat',
    state: 'Gujarat',
    price: 55000,
    priceUnit: 'per Tonne',
    status: 'active',
    buyerInterest: 6,
    description: 'Combed cotton waste from spinning mill. Predominantly white, low contamination. Suitable for open-end spinning or non-woven applications.',
    images: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=75',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=75',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=75',
    ],
    createdAt: '2025-05-22T07:30:00Z',
    updatedAt: '2025-06-02T08:00:00Z',
  },
  {
    id: 'lst-008',
    material: 'Used Automotive Catalysts',
    category: 'Automotive',
    grade: 'Spent Catalytic Converters',
    quantity: 200,
    unit: 'kg',
    location: 'Chakan Auto Cluster, Pune, MH',
    city: 'Pune',
    state: 'Maharashtra',
    price: 1200,
    priceUnit: 'per kg',
    status: 'pending',
    buyerInterest: 5,
    description: 'Spent catalytic converters from auto service centres. Contains Pt, Pd, Rh. Assay report available. Requires precious metals refiner.',
    images: [
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&q=75',
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&q=75',
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&q=75',
    ],
    createdAt: '2025-05-28T10:00:00Z',
    updatedAt: '2025-06-01T14:00:00Z',
  },
];

export const MARKETPLACE_LISTINGS: MarketplaceListing[] = [
  {
    id: 'mkt-001', material: 'Aluminium Scrap 6061', category: 'Metals', grade: '6061-T6 Scrap',
    quantity: 5, unit: 'Tonnes', location: 'Rajkot, GJ', city: 'Rajkot', state: 'Gujarat',
    price: 95000, priceUnit: 'per Tonne', status: 'active', buyerInterest: 8,
    description: 'Clean aluminium 6061-T6 machining chips and offcuts. No oil contamination. 98% purity.',
    images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=75'],
    createdAt: '2025-05-15T09:00:00Z', updatedAt: '2025-06-01T10:00:00Z',
    sellerId: 'sel-101', sellerName: 'Vijay Patel', sellerCompany: 'Patel Metals Pvt Ltd',
    sellerVerified: true, sellerRating: 4.8, sellerDeals: 47,
  },
  {
    id: 'mkt-002', material: 'PET Bottle Flakes', category: 'Plastics', grade: 'Clear PET Flakes',
    quantity: 12, unit: 'Tonnes', location: 'Ahmedabad, GJ', city: 'Ahmedabad', state: 'Gujarat',
    price: 38000, priceUnit: 'per Tonne', status: 'active', buyerInterest: 15,
    description: 'Washed clear PET flakes from beverage bottles. IV 0.72–0.78. Ready for fibre or sheet extrusion.',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75'],
    createdAt: '2025-05-18T10:00:00Z', updatedAt: '2025-06-02T09:00:00Z',
    sellerId: 'sel-102', sellerName: 'Anita Desai', sellerCompany: 'GreenLoop Recyclers',
    sellerVerified: true, sellerRating: 4.6, sellerDeals: 31,
  },
  {
    id: 'mkt-003', material: 'Mixed Office Paper', category: 'Paper', grade: 'SOP Grade 37',
    quantity: 18, unit: 'Tonnes', location: 'Bangalore, KA', city: 'Bangalore', state: 'Karnataka',
    price: 14500, priceUnit: 'per Tonne', status: 'active', buyerInterest: 9,
    description: 'Sorted office paper from IT campuses. Low ink content. Baled at 600kg. Consistent monthly supply.',
    images: ['https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400&q=75'],
    createdAt: '2025-05-20T08:00:00Z', updatedAt: '2025-06-01T11:00:00Z',
    sellerId: 'sel-103', sellerName: 'Kiran Nair', sellerCompany: 'Nair Paper Traders',
    sellerVerified: false, sellerRating: 4.1, sellerDeals: 12,
  },
  {
    id: 'mkt-004', material: 'Broken Concrete Aggregate', category: 'Construction', grade: 'RCA 20mm',
    quantity: 100, unit: 'Tonnes', location: 'Chennai, TN', city: 'Chennai', state: 'Tamil Nadu',
    price: 800, priceUnit: 'per Tonne', status: 'active', buyerInterest: 5,
    description: 'Recycled concrete aggregate 20mm graded. From highway demolition. Los Angeles abrasion <35%.',
    images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=75'],
    createdAt: '2025-05-22T07:00:00Z', updatedAt: '2025-06-02T08:00:00Z',
    sellerId: 'sel-104', sellerName: 'Suresh Kumar', sellerCompany: 'TN Demolition Works',
    sellerVerified: true, sellerRating: 4.3, sellerDeals: 22,
  },
  {
    id: 'mkt-005', material: 'E-Waste RAM Modules', category: 'Electronics', grade: 'DDR3/DDR4 Mixed',
    quantity: 300, unit: 'kg', location: 'Noida, UP', city: 'Noida', state: 'Uttar Pradesh',
    price: 350, priceUnit: 'per kg', status: 'active', buyerInterest: 11,
    description: 'Decommissioned DDR3/DDR4 RAM from server decommissioning. Tested non-functional. Precious metal recovery.',
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=75'],
    createdAt: '2025-05-25T09:30:00Z', updatedAt: '2025-06-03T10:00:00Z',
    sellerId: 'sel-105', sellerName: 'Rohan Mehta', sellerCompany: 'DataVault Solutions',
    sellerVerified: true, sellerRating: 4.9, sellerDeals: 68,
  },
  {
    id: 'mkt-006', material: 'Solvent Waste IPA', category: 'Chemicals', grade: '60–70% IPA',
    quantity: 5000, unit: 'Litres', location: 'Hyderabad, TS', city: 'Hyderabad', state: 'Telangana',
    price: 18, priceUnit: 'per Litre', status: 'active', buyerInterest: 3,
    description: 'Spent IPA from pharma cleaning operations. ~65% concentration. Suitable for re-distillation.',
    images: ['https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=75'],
    createdAt: '2025-05-28T11:00:00Z', updatedAt: '2025-06-01T12:00:00Z',
    sellerId: 'sel-106', sellerName: 'Priya Reddy', sellerCompany: 'Pharma Waste Solutions',
    sellerVerified: true, sellerRating: 4.7, sellerDeals: 29,
  },
  {
    id: 'mkt-007', material: 'Polyester Fabric Waste', category: 'Textiles', grade: 'Mixed Polyester',
    quantity: 4, unit: 'Tonnes', location: 'Tirupur, TN', city: 'Tirupur', state: 'Tamil Nadu',
    price: 22000, priceUnit: 'per Tonne', status: 'active', buyerInterest: 7,
    description: 'Polyester cutting waste from garment factory. Mixed colors. Suitable for recycled fibre or non-woven production.',
    images: ['https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=75'],
    createdAt: '2025-05-30T08:00:00Z', updatedAt: '2025-06-02T10:00:00Z',
    sellerId: 'sel-107', sellerName: 'Bala Krishnan', sellerCompany: 'TN Garment Exports',
    sellerVerified: false, sellerRating: 3.9, sellerDeals: 8,
  },
  {
    id: 'mkt-008', material: 'Used Gear Boxes', category: 'Automotive', grade: 'Manual Transmission',
    quantity: 50, unit: 'Units', location: 'Ludhiana, PB', city: 'Ludhiana', state: 'Punjab',
    price: 4500, priceUnit: 'per Unit', status: 'active', buyerInterest: 6,
    description: 'Used manual gearboxes from passenger vehicles. Tested and graded. Suitable for refurbishment or parts.',
    images: ['https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&q=75'],
    createdAt: '2025-06-01T09:00:00Z', updatedAt: '2025-06-03T11:00:00Z',
    sellerId: 'sel-108', sellerName: 'Gurpreet Singh', sellerCompany: 'Singh Auto Parts',
    sellerVerified: true, sellerRating: 4.5, sellerDeals: 35,
  },
  {
    id: 'mkt-009', material: 'Copper Wire Scrap', category: 'Metals', grade: 'Bare Bright Copper',
    quantity: 2, unit: 'Tonnes', location: 'Mumbai, MH', city: 'Mumbai', state: 'Maharashtra',
    price: 720000, priceUnit: 'per Tonne', status: 'active', buyerInterest: 14,
    description: 'Bare bright copper wire scrap from electrical contractor. No insulation. 99.9% purity. Immediate availability.',
    images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=75'],
    createdAt: '2025-06-01T10:00:00Z', updatedAt: '2025-06-03T09:00:00Z',
    sellerId: 'sel-109', sellerName: 'Anil Joshi', sellerCompany: 'Mumbai Metals Hub',
    sellerVerified: true, sellerRating: 4.9, sellerDeals: 82,
  },
  {
    id: 'mkt-010', material: 'PP Granules Reprocessed', category: 'Plastics', grade: 'PP Homo Reprocessed',
    quantity: 6, unit: 'Tonnes', location: 'Gurgaon, HR', city: 'Gurgaon', state: 'Haryana',
    price: 52000, priceUnit: 'per Tonne', status: 'active', buyerInterest: 10,
    description: 'Reprocessed PP homopolymer granules. MFI 12–15. Natural colour. Suitable for injection moulding non-critical applications.',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75'],
    createdAt: '2025-05-29T08:00:00Z', updatedAt: '2025-06-02T12:00:00Z',
    sellerId: 'sel-110', sellerName: 'Deepak Sharma', sellerCompany: 'Polytech Granules',
    sellerVerified: true, sellerRating: 4.4, sellerDeals: 56,
  },
  {
    id: 'mkt-011', material: 'Kraft Paper Rolls', category: 'Paper', grade: 'Kraft 80 GSM',
    quantity: 10, unit: 'Tonnes', location: 'Kolkata, WB', city: 'Kolkata', state: 'West Bengal',
    price: 32000, priceUnit: 'per Tonne', status: 'active', buyerInterest: 8,
    description: '80 GSM kraft paper in roll form from printing overruns. Consistent quality. Suitable for packaging.',
    images: ['https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=400&q=75'],
    createdAt: '2025-05-26T09:00:00Z', updatedAt: '2025-06-01T08:00:00Z',
    sellerId: 'sel-111', sellerName: 'Sanjay Das', sellerCompany: 'Bengal Paper Traders',
    sellerVerified: false, sellerRating: 4.0, sellerDeals: 18,
  },
  {
    id: 'mkt-012', material: 'MS Structural Scrap', category: 'Metals', grade: 'Shredded MS',
    quantity: 30, unit: 'Tonnes', location: 'Raipur, CG', city: 'Raipur', state: 'Chhattisgarh',
    price: 28000, priceUnit: 'per Tonne', status: 'active', buyerInterest: 11,
    description: 'Shredded mild steel structural scrap from factory demolition. Mixed sizes. No stainless or alloy contamination.',
    images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=75'],
    createdAt: '2025-05-24T10:00:00Z', updatedAt: '2025-06-02T11:00:00Z',
    sellerId: 'sel-112', sellerName: 'Ramesh Agarwal', sellerCompany: 'Chhattisgarh Metals',
    sellerVerified: true, sellerRating: 4.6, sellerDeals: 43,
  },
  {
    id: 'mkt-013', material: 'LED Lighting Waste', category: 'Electronics', grade: 'Mixed LED Fixtures',
    quantity: 400, unit: 'kg', location: 'Delhi, DL', city: 'Delhi', state: 'Delhi',
    price: 120, priceUnit: 'per kg', status: 'active', buyerInterest: 4,
    description: 'Decommissioned LED light fixtures from office retrofit. Contains aluminium heat sinks, PCBs, and drivers.',
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=75'],
    createdAt: '2025-06-02T09:00:00Z', updatedAt: '2025-06-03T08:00:00Z',
    sellerId: 'sel-113', sellerName: 'Neha Gupta', sellerCompany: 'Delhi Office Solutions',
    sellerVerified: false, sellerRating: 3.8, sellerDeals: 5,
  },
  {
    id: 'mkt-014', material: 'Stainless Steel 304 Scrap', category: 'Metals', grade: 'SS 304 Turnings',
    quantity: 3, unit: 'Tonnes', location: 'Coimbatore, TN', city: 'Coimbatore', state: 'Tamil Nadu',
    price: 120000, priceUnit: 'per Tonne', status: 'active', buyerInterest: 16,
    description: 'Clean SS 304 machining turnings from CNC shop. Dry, no coolant contamination. Spot tested and certified.',
    images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=75'],
    createdAt: '2025-05-31T10:00:00Z', updatedAt: '2025-06-03T12:00:00Z',
    sellerId: 'sel-114', sellerName: 'Murugan Raj', sellerCompany: 'Coimbatore Precision Works',
    sellerVerified: true, sellerRating: 4.8, sellerDeals: 61,
  },
  {
    id: 'mkt-015', material: 'Jute Hessian Waste', category: 'Textiles', grade: 'Jute Cuttings',
    quantity: 2, unit: 'Tonnes', location: 'Kolkata, WB', city: 'Kolkata', state: 'West Bengal',
    price: 18000, priceUnit: 'per Tonne', status: 'active', buyerInterest: 3,
    description: 'Jute hessian cuttings from bag manufacturing. Suitable for geo-textile or composite applications.',
    images: ['https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=75'],
    createdAt: '2025-06-01T07:00:00Z', updatedAt: '2025-06-03T10:00:00Z',
    sellerId: 'sel-115', sellerName: 'Amit Banerjee', sellerCompany: 'Kolkata Jute Industries',
    sellerVerified: true, sellerRating: 4.2, sellerDeals: 27,
  },
  {
    id: 'mkt-016', material: 'Battery Acid Waste', category: 'Chemicals', grade: 'Spent H2SO4',
    quantity: 3000, unit: 'Litres', location: 'Pune, MH', city: 'Pune', state: 'Maharashtra',
    price: 8, priceUnit: 'per Litre', status: 'active', buyerInterest: 2,
    description: 'Spent sulphuric acid from lead-acid battery processing. ~25–30% concentration. Requires PCB authorisation.',
    images: ['https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=75'],
    createdAt: '2025-05-27T11:00:00Z', updatedAt: '2025-06-02T09:00:00Z',
    sellerId: 'sel-116', sellerName: 'Santosh Yadav', sellerCompany: 'Maharashtra Battery Recyclers',
    sellerVerified: true, sellerRating: 4.5, sellerDeals: 33,
  },
  {
    id: 'mkt-017', material: 'Tyre Rubber Crumb', category: 'Automotive', grade: '40 Mesh Crumb',
    quantity: 8, unit: 'Tonnes', location: 'Indore, MP', city: 'Indore', state: 'Madhya Pradesh',
    price: 25000, priceUnit: 'per Tonne', status: 'active', buyerInterest: 9,
    description: '40-mesh tyre rubber crumb from ambient shredding. Wire-free, <0.1% steel contamination. Suitable for sports surfaces and rubber moulding.',
    images: ['https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&q=75'],
    createdAt: '2025-05-23T09:00:00Z', updatedAt: '2025-06-01T13:00:00Z',
    sellerId: 'sel-117', sellerName: 'Praveen Jain', sellerCompany: 'MP Tyre Recyclers',
    sellerVerified: true, sellerRating: 4.3, sellerDeals: 38,
  },
  {
    id: 'mkt-018', material: 'Fly Ash Class F', category: 'Construction', grade: 'Class F Fly Ash',
    quantity: 200, unit: 'Tonnes', location: 'Nagpur, MH', city: 'Nagpur', state: 'Maharashtra',
    price: 600, priceUnit: 'per Tonne', status: 'active', buyerInterest: 7,
    description: 'Class F fly ash from thermal power plant. Low carbon content <1%. Suitable for cement replacement and grouting.',
    images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=75'],
    createdAt: '2025-05-21T08:00:00Z', updatedAt: '2025-06-02T07:00:00Z',
    sellerId: 'sel-118', sellerName: 'Rajeev Deshmukh', sellerCompany: 'Nagpur Power Materials',
    sellerVerified: true, sellerRating: 4.6, sellerDeals: 52,
  },
  {
    id: 'mkt-019', material: 'ABS Plastic Granules', category: 'Plastics', grade: 'Reprocessed ABS',
    quantity: 4, unit: 'Tonnes', location: 'Faridabad, HR', city: 'Faridabad', state: 'Haryana',
    price: 68000, priceUnit: 'per Tonne', status: 'active', buyerInterest: 12,
    description: 'Reprocessed ABS granules from automotive trims. Black colour. MFI 8–12. Suitable for non-visible components.',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75'],
    createdAt: '2025-05-28T10:00:00Z', updatedAt: '2025-06-03T09:00:00Z',
    sellerId: 'sel-119', sellerName: 'Rakesh Verma', sellerCompany: 'Haryana Polymer Works',
    sellerVerified: false, sellerRating: 4.1, sellerDeals: 14,
  },
  {
    id: 'mkt-020', material: 'Zinc Dross', category: 'Metals', grade: 'Hot Dip Zinc Dross',
    quantity: 1.5, unit: 'Tonnes', location: 'Vadodara, GJ', city: 'Vadodara', state: 'Gujarat',
    price: 180000, priceUnit: 'per Tonne', status: 'active', buyerInterest: 8,
    description: 'Bottom dross from hot-dip galvanising. 94–96% Zn content. Suitable for zinc re-smelting or zinc oxide production.',
    images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=75'],
    createdAt: '2025-05-30T09:00:00Z', updatedAt: '2025-06-03T10:00:00Z',
    sellerId: 'sel-120', sellerName: 'Harshal Shah', sellerCompany: 'Gujarat Galvanizers',
    sellerVerified: true, sellerRating: 4.7, sellerDeals: 44,
  },
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-001',
    partnerId: 'sel-201',
    partnerName: 'Amit Verma',
    partnerCompany: 'Verma Metals Pvt Ltd',
    partnerInitials: 'AV',
    partnerVerified: true,
    listingId: 'lst-001',
    listingName: 'Steel Offcuts IS2062',
    lastMessage: 'Can you do ₹30,000/tonne for the full 14T?',
    lastMessageTime: '2025-06-03T14:30:00Z',
    unread: 2,
    negotiationStatus: 'negotiating',
    proposedPrice: 30000,
    messages: [
      { id: 'm001', senderId: 'sel-201', text: 'Hi, I saw your listing for Steel Offcuts IS2062. Very interested.', timestamp: '2025-06-02T10:00:00Z', read: true, type: 'text' },
      { id: 'm002', senderId: 'me', text: 'Hello Amit! Yes, 14 tonnes available immediately. Grade IS2062 E250.', timestamp: '2025-06-02T10:15:00Z', read: true, type: 'text' },
      { id: 'm003', senderId: 'sel-201', text: 'What is the minimum lot size you can offer?', timestamp: '2025-06-02T10:30:00Z', read: true, type: 'text' },
      { id: 'm004', senderId: 'me', text: 'Minimum 5 tonnes. Full 14T available at ₹32,000/tonne.', timestamp: '2025-06-02T10:45:00Z', read: true, type: 'text' },
      { id: 'm005', senderId: 'sel-201', text: 'Can you share a material test certificate?', timestamp: '2025-06-02T11:00:00Z', read: true, type: 'text' },
      { id: 'm006', senderId: 'me', text: 'Attaching the MTC from NABL lab now.', timestamp: '2025-06-02T11:15:00Z', read: true, type: 'file' },
      { id: 'm007', senderId: 'sel-201', text: 'Thank you. Looks good. Can you arrange transport to Bhilai?', timestamp: '2025-06-02T14:00:00Z', read: true, type: 'text' },
      { id: 'm008', senderId: 'me', text: 'We can arrange up to Nagpur. Beyond that would be your logistics.', timestamp: '2025-06-02T14:30:00Z', read: true, type: 'text' },
      { id: 'm009', senderId: 'sel-201', text: 'Understood. What is the payment terms?', timestamp: '2025-06-03T09:00:00Z', read: true, type: 'text' },
      { id: 'm010', senderId: 'me', text: '50% advance, 50% on dispatch. NEFT/RTGS preferred.', timestamp: '2025-06-03T09:30:00Z', read: true, type: 'text' },
      { id: 'm011', senderId: 'sel-201', text: 'Fair enough. Can you do ₹30,000/tonne for the full 14T?', timestamp: '2025-06-03T14:30:00Z', read: false, type: 'text' },
      { id: 'm012', senderId: 'sel-201', text: 'We would take all 14 tonnes immediately at that price.', timestamp: '2025-06-03T14:31:00Z', read: false, type: 'text' },
    ],
  },
  {
    id: 'conv-002',
    partnerId: 'sel-202',
    partnerName: 'Sunita Krishnamurthy',
    partnerCompany: 'EcoPlast Recyclers',
    partnerInitials: 'SK',
    partnerVerified: true,
    listingId: 'lst-002',
    listingName: 'HDPE Regrind Grade A',
    lastMessage: 'We have agreed on ₹44,000/T. Confirming PO.',
    lastMessageTime: '2025-06-03T11:00:00Z',
    unread: 0,
    negotiationStatus: 'agreed',
    proposedPrice: 44000,
    messages: [
      { id: 'm101', senderId: 'sel-202', text: 'Hello, enquiring about your HDPE Regrind Grade A listing.', timestamp: '2025-06-01T09:00:00Z', read: true, type: 'text' },
      { id: 'm102', senderId: 'me', text: 'Hi Sunita! 8T available. MFI 0.3–0.5, clean material.', timestamp: '2025-06-01T09:20:00Z', read: true, type: 'text' },
      { id: 'm103', senderId: 'sel-202', text: 'Can you share the MFI test report?', timestamp: '2025-06-01T09:45:00Z', read: true, type: 'text' },
      { id: 'm104', senderId: 'me', text: 'Sending the recent QC report now.', timestamp: '2025-06-01T10:00:00Z', read: true, type: 'file' },
      { id: 'm105', senderId: 'sel-202', text: 'Excellent quality. Listed price is ₹45,000/T. Can you consider ₹43,000?', timestamp: '2025-06-01T11:00:00Z', read: true, type: 'text' },
      { id: 'm106', senderId: 'me', text: 'Best I can do is ₹44,000. It is a fair price for this grade.', timestamp: '2025-06-01T11:30:00Z', read: true, type: 'text' },
      { id: 'm107', senderId: 'sel-202', text: 'Agreed at ₹44,000/T for all 8 tonnes.', timestamp: '2025-06-02T09:00:00Z', read: true, type: 'text' },
      { id: 'm108', senderId: 'me', text: 'Great! I will prepare the proforma invoice. Payment terms: 50% advance.', timestamp: '2025-06-02T09:30:00Z', read: true, type: 'text' },
      { id: 'm109', senderId: 'sel-202', text: 'Understood. What is the expected dispatch date?', timestamp: '2025-06-02T10:00:00Z', read: true, type: 'text' },
      { id: 'm110', senderId: 'me', text: 'Within 3 working days of advance payment receipt.', timestamp: '2025-06-02T10:15:00Z', read: true, type: 'text' },
      { id: 'm111', senderId: 'sel-202', text: 'We have agreed on ₹44,000/T. Confirming PO.', timestamp: '2025-06-03T11:00:00Z', read: true, type: 'text' },
    ],
  },
  {
    id: 'conv-003',
    partnerId: 'sel-203',
    partnerName: 'Ravi Shankar',
    partnerCompany: 'IndoRecycle Pvt Ltd',
    partnerInitials: 'RS',
    partnerVerified: false,
    listingId: 'lst-003',
    listingName: 'OCC Cardboard Bales',
    lastMessage: 'Can we visit your facility this Thursday?',
    lastMessageTime: '2025-06-03T16:00:00Z',
    unread: 1,
    negotiationStatus: 'open',
    messages: [
      { id: 'm201', senderId: 'sel-203', text: 'Hi, interested in your OCC cardboard bales. How many tonnes per week?', timestamp: '2025-06-02T14:00:00Z', read: true, type: 'text' },
      { id: 'm202', senderId: 'me', text: 'Hello Ravi! Typically 22–25T per week consistently.', timestamp: '2025-06-02T14:20:00Z', read: true, type: 'text' },
      { id: 'm203', senderId: 'sel-203', text: 'Is it possible to get a long-term supply contract?', timestamp: '2025-06-02T15:00:00Z', read: true, type: 'text' },
      { id: 'm204', senderId: 'me', text: 'Yes, we prefer long-term arrangements. Minimum 3-month commitment.', timestamp: '2025-06-02T15:30:00Z', read: true, type: 'text' },
      { id: 'm205', senderId: 'sel-203', text: 'What is the bale weight and dimensions?', timestamp: '2025-06-02T16:00:00Z', read: true, type: 'text' },
      { id: 'm206', senderId: 'me', text: 'Bales are ~600kg each, 1.2×0.8×0.9m. Strapped with steel wire.', timestamp: '2025-06-02T16:20:00Z', read: true, type: 'text' },
      { id: 'm207', senderId: 'sel-203', text: 'Price is ₹8,500/T? Is there scope for negotiation on long-term?', timestamp: '2025-06-02T17:00:00Z', read: true, type: 'text' },
      { id: 'm208', senderId: 'me', text: 'For a 6-month contract, I can offer ₹8,200/T with price revision clause.', timestamp: '2025-06-02T17:30:00Z', read: true, type: 'text' },
      { id: 'm209', senderId: 'sel-203', text: 'Sounds reasonable. Can we visit your facility this Thursday?', timestamp: '2025-06-03T16:00:00Z', read: false, type: 'text' },
    ],
  },
  {
    id: 'conv-004',
    partnerId: 'sel-204',
    partnerName: 'Meera Pillai',
    partnerCompany: 'Green Circuit E-Waste',
    partnerInitials: 'MP',
    partnerVerified: true,
    listingId: 'lst-005',
    listingName: 'PCB E-Waste Boards',
    lastMessage: 'Transaction complete. Thanks for the smooth deal!',
    lastMessageTime: '2025-05-28T15:00:00Z',
    unread: 0,
    negotiationStatus: 'closed',
    messages: [
      { id: 'm301', senderId: 'sel-204', text: 'Hello, we are a certified e-waste recycler. Interested in your PCB boards.', timestamp: '2025-05-20T10:00:00Z', read: true, type: 'text' },
      { id: 'm302', senderId: 'me', text: 'Hi Meera! 500kg available. Mixed PCB with Au, Cu, Ag content.', timestamp: '2025-05-20T10:30:00Z', read: true, type: 'text' },
      { id: 'm303', senderId: 'sel-204', text: 'Can you share the XRF assay report?', timestamp: '2025-05-20T11:00:00Z', read: true, type: 'text' },
      { id: 'm304', senderId: 'me', text: 'Sending the XRF report from our last batch.', timestamp: '2025-05-20T11:30:00Z', read: true, type: 'file' },
      { id: 'm305', senderId: 'sel-204', text: 'Good Au content. We offer ₹275/kg for the full lot.', timestamp: '2025-05-21T09:00:00Z', read: true, type: 'text' },
      { id: 'm306', senderId: 'me', text: 'Listed at ₹280/kg. Can meet at ₹278/kg.', timestamp: '2025-05-21T09:30:00Z', read: true, type: 'text' },
      { id: 'm307', senderId: 'sel-204', text: 'Accepted at ₹278/kg. Will arrange pickup with our certified vehicle.', timestamp: '2025-05-21T10:00:00Z', read: true, type: 'text' },
      { id: 'm308', senderId: 'me', text: 'Perfect. I will send the e-waste manifest form.', timestamp: '2025-05-21T10:30:00Z', read: true, type: 'text' },
      { id: 'm309', senderId: 'sel-204', text: 'Received. Payment transferred. Pickup scheduled for 28th May.', timestamp: '2025-05-22T09:00:00Z', read: true, type: 'text' },
      { id: 'm310', senderId: 'me', text: 'Material ready for pickup. Please bring Form 9 authorisation.', timestamp: '2025-05-22T09:30:00Z', read: true, type: 'text' },
      { id: 'm311', senderId: 'sel-204', text: 'Transaction complete. Thanks for the smooth deal!', timestamp: '2025-05-28T15:00:00Z', read: true, type: 'text' },
    ],
  },
  {
    id: 'conv-005',
    partnerId: 'sel-205',
    partnerName: 'Dhruv Acharya',
    partnerCompany: 'Acharya Fibres Ltd',
    partnerInitials: 'DA',
    partnerVerified: true,
    listingId: 'lst-007',
    listingName: 'Cotton Yarn Waste',
    lastMessage: 'Can you supply 3T monthly on an ongoing basis?',
    lastMessageTime: '2025-06-03T12:00:00Z',
    unread: 3,
    negotiationStatus: 'negotiating',
    proposedPrice: 53000,
    messages: [
      { id: 'm401', senderId: 'sel-205', text: 'Good morning! Interested in your cotton yarn waste.', timestamp: '2025-06-02T08:00:00Z', read: true, type: 'text' },
      { id: 'm402', senderId: 'me', text: 'Good morning Dhruv! 3T available now. Combed cotton waste, white, low contamination.', timestamp: '2025-06-02T08:20:00Z', read: true, type: 'text' },
      { id: 'm403', senderId: 'sel-205', text: 'What is the staple length and trash content?', timestamp: '2025-06-02T08:45:00Z', read: true, type: 'text' },
      { id: 'm404', senderId: 'me', text: 'Staple length ~22–25mm, trash content <1.5%. We have testing done.', timestamp: '2025-06-02T09:00:00Z', read: true, type: 'text' },
      { id: 'm405', senderId: 'sel-205', text: 'Good spec. Price is ₹55,000/T. We need ₹53,000 for it to work.', timestamp: '2025-06-02T09:30:00Z', read: true, type: 'text' },
      { id: 'm406', senderId: 'me', text: 'For a recurring monthly order, I can consider ₹54,000/T.', timestamp: '2025-06-02T10:00:00Z', read: true, type: 'text' },
      { id: 'm407', senderId: 'sel-205', text: 'What is your monthly generation capacity for this waste?', timestamp: '2025-06-02T10:30:00Z', read: true, type: 'text' },
      { id: 'm408', senderId: 'me', text: 'Typically 3–4T per month from our spinning operations.', timestamp: '2025-06-02T11:00:00Z', read: true, type: 'text' },
      { id: 'm409', senderId: 'sel-205', text: 'Can you supply 3T monthly on an ongoing basis?', timestamp: '2025-06-03T12:00:00Z', read: false, type: 'text' },
      { id: 'm410', senderId: 'sel-205', text: 'We would prefer ₹53,500 if it is a committed 12-month supply.', timestamp: '2025-06-03T12:01:00Z', read: false, type: 'text' },
      { id: 'm411', senderId: 'sel-205', text: 'Please let me know your thoughts at the earliest.', timestamp: '2025-06-03T12:05:00Z', read: false, type: 'text' },
    ],
  },
];

export const NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-001',
    type: 'match',
    title: 'New Match Found',
    body: '3 buyers matched for your Steel Offcuts IS2062 listing.',
    time: '2025-06-03T14:00:00Z',
    read: false,
  },
  {
    id: 'notif-002',
    type: 'message',
    title: 'New Message',
    body: 'Amit Verma sent a counter-offer for Steel Offcuts.',
    time: '2025-06-03T14:30:00Z',
    read: false,
  },
  {
    id: 'notif-003',
    type: 'price',
    title: 'Price Alert',
    body: 'HDPE Regrind prices up 3.5% in Maharashtra this week.',
    time: '2025-06-03T09:00:00Z',
    read: false,
  },
  {
    id: 'notif-004',
    type: 'system',
    title: 'Listing Verified',
    body: 'Your OCC Cardboard Bales listing has been verified and is now live.',
    time: '2025-06-02T10:00:00Z',
    read: true,
  },
  {
    id: 'notif-005',
    type: 'match',
    title: 'Deal Completed',
    body: 'PCB E-Waste Boards — Transaction with Green Circuit E-Waste is complete.',
    time: '2025-05-28T15:30:00Z',
    read: true,
  },
  {
    id: 'notif-006',
    type: 'system',
    title: 'ESG Report Ready',
    body: 'Your monthly ESG impact report for May 2025 is ready to download.',
    time: '2025-06-01T08:00:00Z',
    read: true,
  },
];

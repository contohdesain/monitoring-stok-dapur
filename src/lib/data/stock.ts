export type MovementType = 'masuk' | 'keluar' | 'opname'

export interface Movement {
  date: string
  type: MovementType
  qty: number
  note: string
  by: string
}

export interface RawStockItem {
  id: string
  name: string
  category: string
  unit: string
  stock: number
  min: number
  max: number
  price: number
  supplier: string
  restock: string
  expiry: string | null
}

export interface StockItem extends RawStockItem {
  history: Movement[]
  value: number
  pct: number
  daysToExpiry: number | null
  isExpiringSoon: boolean
  isExpired: boolean
  status: 'aman' | 'menipis' | 'habis'
}

export const TODAY = new Date('2026-08-07T09:42:00')

export const CATEGORIES = [
  'Bahan Pokok',
  'Sayur & Buah',
  'Daging & Protein',
  'Bumbu & Rempah',
  'Minuman & Lainnya',
] as const

const RAW: RawStockItem[] = [
  { id: 'BP01', name: 'Beras Premium', category: 'Bahan Pokok', unit: 'kg', stock: 62, min: 20, max: 100, price: 15000, supplier: 'PT Sumber Padi Makmur', restock: '2026-08-03', expiry: null },
  { id: 'BP02', name: 'Tepung Terigu Segitiga Biru', category: 'Bahan Pokok', unit: 'kg', stock: 6, min: 10, max: 50, price: 12000, supplier: 'Toko Bahan Kue Barokah', restock: '2026-07-30', expiry: null },
  { id: 'BP03', name: 'Gula Pasir', category: 'Bahan Pokok', unit: 'kg', stock: 3, min: 8, max: 40, price: 16500, supplier: 'CV Manis Jaya', restock: '2026-07-28', expiry: null },
  { id: 'BP04', name: 'Minyak Goreng', category: 'Bahan Pokok', unit: 'liter', stock: 0, min: 15, max: 60, price: 18000, supplier: 'PT Minyak Nusantara', restock: '2026-07-20', expiry: null },
  { id: 'BP05', name: 'Garam Dapur', category: 'Bahan Pokok', unit: 'kg', stock: 9, min: 3, max: 15, price: 6000, supplier: 'Toko Bahan Kue Barokah', restock: '2026-07-15', expiry: null },
  { id: 'BP06', name: 'Santan Kelapa Instan', category: 'Bahan Pokok', unit: 'pak', stock: 54, min: 20, max: 80, price: 4500, supplier: 'Warung Kelapa Segar', restock: '2026-08-05', expiry: '2026-09-05' },

  { id: 'SB01', name: 'Bawang Merah', category: 'Sayur & Buah', unit: 'kg', stock: 4, min: 5, max: 20, price: 38000, supplier: 'Pasar Induk Kramat Jati', restock: '2026-08-06', expiry: '2026-08-14' },
  { id: 'SB02', name: 'Bawang Putih', category: 'Sayur & Buah', unit: 'kg', stock: 13, min: 5, max: 20, price: 42000, supplier: 'Pasar Induk Kramat Jati', restock: '2026-08-06', expiry: '2026-08-20' },
  { id: 'SB03', name: 'Cabai Merah Keriting', category: 'Sayur & Buah', unit: 'kg', stock: 2, min: 6, max: 25, price: 55000, supplier: 'Pasar Induk Kramat Jati', restock: '2026-08-05', expiry: '2026-08-10' },
  { id: 'SB04', name: 'Cabai Rawit Hijau', category: 'Sayur & Buah', unit: 'kg', stock: 5, min: 4, max: 15, price: 48000, supplier: 'Pasar Induk Kramat Jati', restock: '2026-08-06', expiry: '2026-08-09' },
  { id: 'SB05', name: 'Tomat', category: 'Sayur & Buah', unit: 'kg', stock: 8, min: 6, max: 20, price: 12000, supplier: 'Pasar Induk Kramat Jati', restock: '2026-08-06', expiry: '2026-08-11' },
  { id: 'SB06', name: 'Kentang', category: 'Sayur & Buah', unit: 'kg', stock: 21, min: 8, max: 30, price: 14000, supplier: 'Petani Mitra Lembang', restock: '2026-08-04', expiry: '2026-08-25' },
  { id: 'SB07', name: 'Wortel', category: 'Sayur & Buah', unit: 'kg', stock: 16, min: 5, max: 20, price: 11000, supplier: 'Petani Mitra Lembang', restock: '2026-08-04', expiry: '2026-08-22' },
  { id: 'SB08', name: 'Daun Bawang & Seledri', category: 'Sayur & Buah', unit: 'kg', stock: 0.5, min: 2, max: 8, price: 20000, supplier: 'Pasar Induk Kramat Jati', restock: '2026-08-05', expiry: '2026-08-08' },
  { id: 'SB09', name: 'Jeruk Nipis', category: 'Sayur & Buah', unit: 'kg', stock: 6, min: 3, max: 10, price: 25000, supplier: 'Pasar Induk Kramat Jati', restock: '2026-08-03', expiry: '2026-08-16' },

  { id: 'DP01', name: 'Ayam Fillet', category: 'Daging & Protein', unit: 'kg', stock: 7, min: 10, max: 40, price: 42000, supplier: 'Rumah Potong Ayam Segar', restock: '2026-08-06', expiry: '2026-08-09' },
  { id: 'DP02', name: 'Daging Sapi Has Dalam', category: 'Daging & Protein', unit: 'kg', stock: 15, min: 6, max: 25, price: 135000, supplier: 'Toko Daging Berkah', restock: '2026-08-05', expiry: '2026-08-12' },
  { id: 'DP03', name: 'Udang Vaname', category: 'Daging & Protein', unit: 'kg', stock: 0, min: 5, max: 20, price: 95000, supplier: 'Nelayan Muara Angke', restock: '2026-07-29', expiry: '2026-08-01' },
  { id: 'DP04', name: 'Telur Ayam', category: 'Daging & Protein', unit: 'kg', stock: 24, min: 10, max: 40, price: 29000, supplier: 'Peternakan Ayam Sejahtera', restock: '2026-08-05', expiry: '2026-08-28' },
  { id: 'DP05', name: 'Ikan Kembung', category: 'Daging & Protein', unit: 'kg', stock: 3, min: 5, max: 20, price: 38000, supplier: 'Nelayan Muara Angke', restock: '2026-08-04', expiry: '2026-08-10' },
  { id: 'DP06', name: 'Tahu Putih', category: 'Daging & Protein', unit: 'papan', stock: 22, min: 15, max: 50, price: 3500, supplier: 'Pabrik Tahu Sumedang Jaya', restock: '2026-08-06', expiry: '2026-08-09' },
  { id: 'DP07', name: 'Tempe', category: 'Daging & Protein', unit: 'papan', stock: 10, min: 15, max: 50, price: 4000, supplier: 'Pabrik Tahu Sumedang Jaya', restock: '2026-08-06', expiry: '2026-08-10' },

  { id: 'BR01', name: 'Kecap Manis', category: 'Bumbu & Rempah', unit: 'botol', stock: 19, min: 8, max: 30, price: 21000, supplier: 'Toko Bahan Kue Barokah', restock: '2026-07-25', expiry: null },
  { id: 'BR02', name: 'Saus Tiram', category: 'Bumbu & Rempah', unit: 'botol', stock: 5, min: 6, max: 24, price: 26000, supplier: 'Toko Bahan Kue Barokah', restock: '2026-07-22', expiry: null },
  { id: 'BR03', name: 'Merica Bubuk', category: 'Bumbu & Rempah', unit: 'pak', stock: 12, min: 5, max: 20, price: 9000, supplier: 'Toko Rempah Nusantara', restock: '2026-07-18', expiry: null },
  { id: 'BR04', name: 'Jahe', category: 'Bumbu & Rempah', unit: 'kg', stock: 1.2, min: 2, max: 8, price: 32000, supplier: 'Pasar Induk Kramat Jati', restock: '2026-08-02', expiry: '2026-08-30' },
  { id: 'BR05', name: 'Serai', category: 'Bumbu & Rempah', unit: 'ikat', stock: 28, min: 10, max: 40, price: 1500, supplier: 'Pasar Induk Kramat Jati', restock: '2026-08-05', expiry: '2026-08-19' },

  { id: 'ML01', name: 'Es Batu Kristal', category: 'Minuman & Lainnya', unit: 'kg', stock: 45, min: 20, max: 80, price: 3000, supplier: 'Pabrik Es Cahaya Dingin', restock: '2026-08-07', expiry: null },
  { id: 'ML02', name: 'Teh Celup', category: 'Minuman & Lainnya', unit: 'box', stock: 31, min: 10, max: 40, price: 8500, supplier: 'Distributor Teh Nusantara', restock: '2026-07-20', expiry: null },
  { id: 'ML03', name: 'Kopi Bubuk Robusta', category: 'Minuman & Lainnya', unit: 'kg', stock: 2, min: 3, max: 12, price: 68000, supplier: 'Kedai Kopi Gunung', restock: '2026-07-15', expiry: null },
  { id: 'ML04', name: 'Susu Kental Manis', category: 'Minuman & Lainnya', unit: 'kaleng', stock: 33, min: 12, max: 48, price: 11500, supplier: 'Distributor Teh Nusantara', restock: '2026-08-01', expiry: null },
  { id: 'ML05', name: 'Air Mineral Galon', category: 'Minuman & Lainnya', unit: 'galon', stock: 4, min: 8, max: 30, price: 20000, supplier: 'Depot Air Minum Jernih', restock: '2026-08-06', expiry: null },
]

function seededRand(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const CHEFS = ['Chef Dapur Panas', 'Chef Dapur Dingin', 'Sous Chef', 'Kepala Dapur']

function buildHistory(item: RawStockItem, idx: number): Movement[] {
  const entries: Movement[] = []
  const restockQty = Math.max(1, Math.round(item.max * 0.55))
  entries.push({ date: item.restock, type: 'masuk', qty: restockQty, note: 'Penerimaan dari supplier', by: 'Gudang' })

  let running = restockQty
  const steps = 3 + Math.floor(seededRand(idx * 7 + 1) * 2)
  const restockDate = new Date(item.restock)

  for (let i = 1; i <= steps; i++) {
    const d = new Date(restockDate)
    d.setDate(d.getDate() + Math.round((i / (steps + 1)) * Math.max(1, (TODAY.getTime() - restockDate.getTime()) / 86400000)))
    const remainingSteps = steps - i + 1
    const portion = Math.max(0, (running - item.stock) / remainingSteps)
    const qty = Math.max(0, Math.round(portion * (0.7 + seededRand(idx * 13 + i) * 0.6)))
    if (qty <= 0) continue
    running -= qty
    entries.push({
      date: d.toISOString().slice(0, 10),
      type: 'keluar',
      qty,
      note: 'Pemakaian produksi harian',
      by: CHEFS[Math.floor(seededRand(idx * 17 + i) * 4)],
    })
  }

  const diff = Math.round((running - item.stock) * 10) / 10
  if (Math.abs(diff) > 0.01) {
    entries.push({ date: TODAY.toISOString().slice(0, 10), type: 'opname', qty: -diff, note: 'Penyesuaian stok opname', by: 'Kepala Dapur' })
  }

  entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return entries
}

function enrich(item: RawStockItem, idx: number): StockItem {
  const daysToExpiry = item.expiry ? Math.ceil((new Date(item.expiry).getTime() - TODAY.getTime()) / 86400000) : null
  const status: StockItem['status'] = item.stock <= 0 ? 'habis' : item.stock <= item.min ? 'menipis' : 'aman'

  return {
    ...item,
    history: buildHistory(item, idx),
    value: item.stock * item.price,
    pct: Math.max(0, Math.min(100, Math.round((item.stock / item.max) * 100))),
    daysToExpiry,
    isExpiringSoon: daysToExpiry !== null && daysToExpiry <= 3 && daysToExpiry >= 0,
    isExpired: daysToExpiry !== null && daysToExpiry < 0,
    status,
  }
}

export const STOCK_DATA: StockItem[] = RAW.map(enrich)

export const fmtIDR = (n: number) => 'Rp' + Math.round(n).toLocaleString('id-ID')
export const fmtQty = (n: number, unit: string) => (Number.isInteger(n) ? n : n.toFixed(1)) + ' ' + unit
export const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
export const fmtDateShort = (iso: string) => new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })

<script lang="ts">
  import { STOCK_DATA, CATEGORIES } from '../data/stock'

  const CATEGORY_COLOR: Record<string, { bar: string; dot: string }> = {
    'Bahan Pokok': { bar: '#4F46E5', dot: 'bg-[#4F46E5]' },
    'Sayur & Buah': { bar: '#16A34A', dot: 'bg-[#16A34A]' },
    'Daging & Protein': { bar: '#E11D48', dot: 'bg-[#E11D48]' },
    'Bumbu & Rempah': { bar: '#D97706', dot: 'bg-[#D97706]' },
    'Minuman & Lainnya': { bar: '#0891B2', dot: 'bg-[#0891B2]' },
  }

  const rows = CATEGORIES.map((cat) => {
    const items = STOCK_DATA.filter((i) => i.category === cat)
    const attention = items.filter((i) => i.status !== 'aman').length
    const pct = Math.round((items.length / STOCK_DATA.length) * 100)
    return { cat, count: items.length, attention, pct, color: CATEGORY_COLOR[cat] }
  })
</script>

<div class="rounded-2xl border border-line bg-surface/80 backdrop-blur-sm p-5 sm:p-6 shadow-sm shadow-ink/[0.03]">
  <div class="flex items-baseline justify-between mb-5">
    <h2 class="font-display text-[17px] font-semibold tracking-tight">Stok per Kategori</h2>
    <span class="text-[12px] text-muted">berdasarkan jumlah item</span>
  </div>
  <div class="space-y-4">
    {#each rows as r}
      <div>
        <div class="flex items-center justify-between mb-1.5">
          <span class="flex items-center gap-2 text-[13.5px] font-medium">
            <span class="h-2 w-2 rounded-full flex-none {r.color.dot}"></span>
            {r.cat}
          </span>
          <span class="text-[12px] text-muted font-mono tabular-nums">
            {r.count} item{#if r.attention}&nbsp;&middot; <span class="text-warn">{r.attention} perlu perhatian</span>{/if}
          </span>
        </div>
        <div class="h-2 w-full rounded-full bg-ink/[0.06] overflow-hidden">
          <div class="h-full rounded-full transition-all duration-500" style="width:{r.pct}%; background-color:{r.color.bar}"></div>
        </div>
      </div>
    {/each}
  </div>
</div>

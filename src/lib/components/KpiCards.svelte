<script lang="ts">
  import { STOCK_DATA, CATEGORIES, fmtIDR } from '../data/stock'

  const total = STOCK_DATA.length
  const menipis = STOCK_DATA.filter((i) => i.status === 'menipis').length
  const habis = STOCK_DATA.filter((i) => i.status === 'habis').length
  const totalValue = STOCK_DATA.reduce((s, i) => s + i.value, 0)

  const cards = [
    { label: 'Total Bahan', value: String(total), sub: `${CATEGORIES.length} kategori`, tone: 'accent' as const },
    { label: 'Stok Menipis', value: String(menipis), sub: 'perlu segera dipesan', tone: 'warn' as const },
    { label: 'Stok Habis', value: String(habis), sub: 'tidak tersedia', tone: 'crit' as const },
    { label: 'Nilai Total Stok', value: fmtIDR(totalValue), sub: 'estimasi harga pasar', tone: 'accent2' as const },
  ]

  const toneCls = {
    accent: 'bg-accent-soft text-accent',
    warn: 'bg-warn-soft text-warn',
    crit: 'bg-crit-soft text-crit',
    accent2: 'bg-accent-2/15 text-accent-2',
  }
</script>

<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
  {#each cards as c}
    <div class="kpi-card">
      <div class="flex items-center justify-between">
        <span class="text-[12.5px] text-muted">{c.label}</span>
        <span class="grid h-8 w-8 place-items-center rounded-full {toneCls[c.tone]}">
          {#if c.label === 'Total Bahan'}
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 7l9-4 9 4-9 4-9-4Zm0 0v10l9 4m0-14v14m9-14v10l-9 4" stroke-linecap="round" stroke-linejoin="round" /></svg>
          {:else if c.label === 'Stok Menipis'}
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 7l7 7 4-4 7 7M14 17h7v-7" stroke-linecap="round" stroke-linejoin="round" /></svg>
          {:else if c.label === 'Stok Habis'}
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 9v4m0 4h.01M10.3 3.9 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke-linecap="round" stroke-linejoin="round" /></svg>
          {:else}
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9" /><path d="M9 12h6M12 9v6" stroke-linecap="round" /></svg>
          {/if}
        </span>
      </div>
      <div>
        <p class="font-display text-[26px] font-semibold tracking-tight tabular-nums leading-none">{c.value}</p>
        <p class="mt-1.5 text-[12px] text-muted">{c.sub}</p>
      </div>
    </div>
  {/each}
</div>

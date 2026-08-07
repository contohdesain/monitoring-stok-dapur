<script lang="ts">
  import { STOCK_DATA, fmtQty } from '../data/stock'
  import StatusPill from './StatusPill.svelte'
  import ExpiryPill from './ExpiryPill.svelte'

  let { onSelect }: { onSelect: (id: string) => void } = $props()

  const rank = (s: string) => (s === 'habis' ? 0 : s === 'menipis' ? 1 : 2)

  const flagged = STOCK_DATA.filter((i) => i.status !== 'aman' || i.isExpiringSoon)
  const list = [...flagged].sort((a, b) => rank(a.status) - rank(b.status) || (a.daysToExpiry ?? 99) - (b.daysToExpiry ?? 99)).slice(0, 6)
</script>

<div class="rounded-2xl border border-line bg-surface/80 backdrop-blur-sm p-5 sm:p-6 shadow-sm shadow-ink/[0.03]">
  <div class="flex items-baseline justify-between mb-4">
    <h2 class="font-display text-[17px] font-semibold tracking-tight">Perlu Perhatian</h2>
    <span class="text-[12px] text-muted">{flagged.length} bahan</span>
  </div>
  <div class="space-y-1">
    {#if list.length === 0}
      <p class="text-[13.5px] text-muted py-6 text-center">Semua bahan dalam kondisi aman.</p>
    {:else}
      {#each list as item}
        <button
          class="w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 -mx-3 hover:bg-paper transition-colors text-left"
          onclick={() => onSelect(item.id)}
        >
          <div class="min-w-0">
            <p class="text-[13.5px] font-medium truncate">{item.name}</p>
            <p class="text-[12px] text-muted font-mono tabular-nums">{fmtQty(item.stock, item.unit)} tersisa</p>
          </div>
          <div class="flex-none flex items-center gap-1.5">
            <StatusPill {item} />
            <ExpiryPill {item} />
          </div>
        </button>
      {/each}
    {/if}
  </div>
</div>

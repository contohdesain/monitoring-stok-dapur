<script lang="ts">
  import { STOCK_DATA, CATEGORIES, fmtQty, fmtIDR } from '../data/stock'
  import StatusPill from './StatusPill.svelte'
  import ExpiryPill from './ExpiryPill.svelte'

  let { onSelect }: { onSelect: (id: string) => void } = $props()

  let search = $state('')
  let category = $state('')
  let status = $state('')

  const rows = $derived(
    STOCK_DATA.filter((item) => {
      if (search.trim() && !item.name.toLowerCase().includes(search.trim().toLowerCase())) return false
      if (category && item.category !== category) return false
      if (status === 'kadaluarsa' && !item.isExpiringSoon) return false
      if (status && status !== 'kadaluarsa' && item.status !== status) return false
      return true
    })
  )
</script>

<section class="space-y-5">
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <div>
      <h1 class="font-display text-[26px] font-semibold tracking-tight">Daftar Stok Bahan</h1>
      <p class="mt-1 text-[14px] text-muted">Klik salah satu bahan untuk melihat detail dan riwayat pergerakan stok.</p>
    </div>
  </div>

  <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
    <div class="relative flex-1 max-w-sm">
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
        <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" stroke-linecap="round" />
      </svg>
      <input
        type="text"
        placeholder="Cari nama bahan..."
        bind:value={search}
        class="w-full rounded-full border border-line bg-surface pl-9 pr-4 py-2.5 text-[13.5px] placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50"
      />
    </div>
    <select bind:value={category} class="rounded-full border border-line bg-surface px-4 py-2.5 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-accent/30">
      <option value="">Semua kategori</option>
      {#each CATEGORIES as c}<option value={c}>{c}</option>{/each}
    </select>
    <select bind:value={status} class="rounded-full border border-line bg-surface px-4 py-2.5 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-accent/30">
      <option value="">Semua status</option>
      <option value="aman">Aman</option>
      <option value="menipis">Menipis</option>
      <option value="habis">Habis</option>
      <option value="kadaluarsa">Segera kadaluarsa</option>
    </select>
  </div>

  <div class="rounded-2xl border border-line bg-surface/80 backdrop-blur-sm overflow-hidden shadow-sm shadow-ink/[0.03]">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse min-w-[820px]">
        <thead>
          <tr class="text-[11.5px] uppercase tracking-wide text-muted border-b border-line">
            <th class="font-medium px-5 py-3">Bahan</th>
            <th class="font-medium px-4 py-3">Kategori</th>
            <th class="font-medium px-4 py-3 text-right">Stok</th>
            <th class="font-medium px-4 py-3">Level</th>
            <th class="font-medium px-4 py-3 text-right">Nilai</th>
            <th class="font-medium px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-line">
          {#each rows as item}
            <tr class="cursor-pointer hover:bg-paper/70 transition-colors" onclick={() => onSelect(item.id)}>
              <td class="px-5 py-3.5">
                <p class="text-[13.5px] font-medium">{item.name}</p>
                <p class="text-[11.5px] text-muted font-mono">{item.id}</p>
              </td>
              <td class="px-4 py-3.5 text-[13px] text-muted">{item.category}</td>
              <td class="px-4 py-3.5 text-right font-mono text-[13px] tabular-nums">{fmtQty(item.stock, item.unit)}</td>
              <td class="px-4 py-3.5">
                <div class="bar-track w-24">
                  <div
                    class="bar-fill"
                    class:!bg-crit={item.status === 'habis'}
                    class:!bg-warn={item.status === 'menipis'}
                    style="width:{item.pct}%"
                  ></div>
                </div>
              </td>
              <td class="px-4 py-3.5 text-right font-mono text-[13px] tabular-nums">{fmtIDR(item.value)}</td>
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <StatusPill {item} />
                  <ExpiryPill {item} />
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    {#if rows.length === 0}
      <p class="text-center text-[13.5px] text-muted py-10">Tidak ada bahan yang cocok dengan pencarian.</p>
    {/if}
  </div>
</section>

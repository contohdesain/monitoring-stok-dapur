<script lang="ts">
  import { STOCK_DATA, fmtDateShort, type MovementType } from '../data/stock'

  const typeMeta: Record<MovementType, { label: string; cls: string; sign: string }> = {
    masuk: { label: 'Stok masuk', cls: 'text-ok bg-ok-soft', sign: '+' },
    keluar: { label: 'Pemakaian', cls: 'text-muted bg-accent-soft', sign: '−' },
    opname: { label: 'Opname', cls: 'text-warn bg-warn-soft', sign: '±' },
  }

  const all = STOCK_DATA.flatMap((item) => item.history.map((h) => ({ ...h, itemName: item.name, itemId: item.id })))
  all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const recent = all.slice(0, 8)
</script>

<div class="rounded-2xl border border-line bg-surface/80 backdrop-blur-sm p-5 sm:p-6 shadow-sm shadow-ink/[0.03]">
  <div class="flex items-baseline justify-between mb-4">
    <h2 class="font-display text-[17px] font-semibold tracking-tight">Aktivitas Terbaru</h2>
    <span class="text-[12px] text-muted">7 hari terakhir</span>
  </div>
  <div class="divide-y divide-line">
    {#each recent as h}
      {@const m = typeMeta[h.type]}
      <div class="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
        <span class="flex-none grid h-8 w-8 place-items-center rounded-full {m.cls} font-mono text-[13px] font-semibold">{m.sign}</span>
        <div class="min-w-0 flex-1">
          <p class="text-[13.5px]"><span class="font-medium">{h.itemName}</span> <span class="text-muted">&middot; {m.label}</span></p>
          <p class="text-[12px] text-muted">{h.note} &middot; {h.by}</p>
        </div>
        <div class="flex-none text-right">
          <p class="font-mono text-[13px] tabular-nums">{h.qty}</p>
          <p class="text-[11.5px] text-muted">{fmtDateShort(h.date)}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

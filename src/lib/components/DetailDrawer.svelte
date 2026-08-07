<script lang="ts">
  import { STOCK_DATA, fmtQty, fmtIDR, fmtDate, fmtDateShort, type MovementType } from '../data/stock'
  import StatusPill from './StatusPill.svelte'
  import ExpiryPill from './ExpiryPill.svelte'

  let { itemId, onClose }: { itemId: string | null; onClose: () => void } = $props()

  const item = $derived(itemId ? STOCK_DATA.find((i) => i.id === itemId) : null)
  const isOpen = $derived(item !== null && item !== undefined)

  const typeMeta: Record<MovementType, { label: string; cls: string; sign: string }> = {
    masuk: { label: 'Stok masuk', cls: 'text-ok bg-ok-soft', sign: '+' },
    keluar: { label: 'Pemakaian', cls: 'text-muted bg-accent-soft', sign: '−' },
    opname: { label: 'Opname', cls: 'text-warn bg-warn-soft', sign: '±' },
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onClose()
  }
</script>

<svelte:window onkeydown={onKeydown} />

<div
  class="fixed inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 z-40"
  class:opacity-0={!isOpen}
  class:pointer-events-none={!isOpen}
  onclick={onClose}
  role="presentation"
></div>

<aside
  class="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-surface z-50 transition-transform duration-300 ease-out shadow-2xl overflow-y-auto"
  class:translate-x-full={!isOpen}
>
  {#if item}
    <div class="sticky top-0 bg-surface border-b border-line px-6 py-5 flex items-start justify-between gap-3 z-10">
      <div>
        <p class="text-[11.5px] font-mono text-muted">{item.id} &middot; {item.category}</p>
        <h2 class="font-display text-[20px] font-semibold tracking-tight mt-0.5">{item.name}</h2>
      </div>
      <button
        onclick={onClose}
        aria-label="Tutup"
        class="grid h-8 w-8 place-items-center rounded-full hover:bg-paper text-muted hover:text-ink transition-colors flex-none"
      >
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18" stroke-linecap="round" /></svg>
      </button>
    </div>

    <div class="px-6 py-5 space-y-6">
      <div class="flex items-center gap-2 flex-wrap">
        <StatusPill {item} />
        <ExpiryPill {item} />
      </div>

      <div>
        <div class="flex items-baseline justify-between mb-1.5">
          <span class="text-[12.5px] text-muted">Level stok saat ini</span>
          <span class="font-mono text-[13px] tabular-nums">{fmtQty(item.stock, item.unit)} / {fmtQty(item.max, item.unit)}</span>
        </div>
        <div class="bar-track h-2.5">
          <div
            class="bar-fill"
            class:!bg-crit={item.status === 'habis'}
            class:!bg-warn={item.status === 'menipis'}
            style="width:{item.pct}%"
          ></div>
        </div>
        <p class="mt-1.5 text-[12px] text-muted">Batas minimum: <span class="font-mono tabular-nums">{fmtQty(item.min, item.unit)}</span></p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-xl bg-paper p-3.5">
          <p class="text-[11.5px] text-muted">Harga satuan</p>
          <p class="font-mono text-[14px] tabular-nums mt-0.5">{fmtIDR(item.price)}</p>
        </div>
        <div class="rounded-xl bg-paper p-3.5">
          <p class="text-[11.5px] text-muted">Nilai stok</p>
          <p class="font-mono text-[14px] tabular-nums mt-0.5">{fmtIDR(item.value)}</p>
        </div>
        <div class="rounded-xl bg-paper p-3.5">
          <p class="text-[11.5px] text-muted">Supplier</p>
          <p class="text-[13px] mt-0.5">{item.supplier}</p>
        </div>
        <div class="rounded-xl bg-paper p-3.5">
          <p class="text-[11.5px] text-muted">{item.expiry ? 'Tanggal kadaluarsa' : 'Restock terakhir'}</p>
          <p class="text-[13px] mt-0.5 font-mono tabular-nums">{item.expiry ? fmtDate(item.expiry) : fmtDate(item.restock)}</p>
        </div>
      </div>

      <div>
        <h3 class="font-display text-[15px] font-semibold tracking-tight mb-3">Riwayat Pergerakan Stok</h3>
        <div class="divide-y divide-line">
          {#each item.history as h}
            {@const m = typeMeta[h.type]}
            <div class="flex items-center gap-3 py-3 first:pt-0">
              <span class="flex-none grid h-8 w-8 place-items-center rounded-full {m.cls} font-mono text-[13px] font-semibold">{m.sign}</span>
              <div class="min-w-0 flex-1">
                <p class="text-[13px] font-medium">{m.label}</p>
                <p class="text-[11.5px] text-muted">{h.note} &middot; {h.by}</p>
              </div>
              <div class="flex-none text-right">
                <p class="font-mono text-[13px] tabular-nums">{fmtQty(h.qty, item.unit)}</p>
                <p class="text-[11.5px] text-muted">{fmtDateShort(h.date)}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</aside>

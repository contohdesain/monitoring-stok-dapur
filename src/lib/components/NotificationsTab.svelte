<script lang="ts">
  import { STOCK_DATA, fmtQty, fmtDate } from '../data/stock'
  import StatusPill from './StatusPill.svelte'

  let { onSelect }: { onSelect: (id: string) => void } = $props()

  const habis = STOCK_DATA.filter((i) => i.status === 'habis')
  const menipis = STOCK_DATA.filter((i) => i.status === 'menipis')
  const kadaluarsa = STOCK_DATA.filter((i) => i.isExpiringSoon)

  const groups = [
    { title: 'Stok Habis', desc: 'Segera lakukan pemesanan darurat ke supplier.', items: habis, tone: 'crit' as const },
    { title: 'Stok Menipis', desc: 'Mendekati batas minimum, jadwalkan pemesanan berikutnya.', items: menipis, tone: 'warn' as const },
    { title: 'Segera Kadaluarsa', desc: 'Prioritaskan penggunaan dalam 3 hari ke depan.', items: kadaluarsa, tone: 'warn' as const },
  ].filter((g) => g.items.length)
</script>

<section class="space-y-6">
  <div>
    <h1 class="font-display text-[26px] font-semibold tracking-tight">Notifikasi Stok</h1>
    <p class="mt-1 text-[14px] text-muted">Daftar bahan yang membutuhkan tindakan segera, diurutkan berdasarkan urgensi.</p>
  </div>

  <div class="space-y-7">
    {#each groups as g}
      <div>
        <div class="flex items-center gap-2.5 mb-3">
          <span class="h-2 w-2 rounded-full" class:bg-crit={g.tone === 'crit'} class:bg-warn={g.tone === 'warn'}></span>
          <h2 class="font-display text-[16px] font-semibold tracking-tight">{g.title}</h2>
          <span class="text-[12px] text-muted font-mono tabular-nums">{g.items.length}</span>
        </div>
        <p class="text-[13px] text-muted mb-3">{g.desc}</p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {#each g.items as item}
            <button
              class="w-full text-left rounded-xl border border-line bg-surface/80 backdrop-blur-sm p-4 transition-colors shadow-sm shadow-ink/[0.03]"
              class:hover:border-crit={g.tone === 'crit'}
              class:hover:border-warn={g.tone === 'warn'}
              onclick={() => onSelect(item.id)}
            >
              <div class="flex items-start justify-between gap-2">
                <p class="text-[13.5px] font-medium">{item.name}</p>
                <StatusPill {item} />
              </div>
              <p class="mt-2 text-[12px] text-muted font-mono tabular-nums">{fmtQty(item.stock, item.unit)} tersisa &middot; min. {fmtQty(item.min, item.unit)}</p>
              {#if item.expiry}
                <p class="mt-1 text-[12px] font-mono" class:text-warn={item.isExpiringSoon} class:text-muted={!item.isExpiringSoon}>
                  Kadaluarsa {fmtDate(item.expiry)}
                </p>
              {/if}
            </button>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

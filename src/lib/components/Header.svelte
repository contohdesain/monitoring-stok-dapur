<script lang="ts">
  import { STOCK_DATA } from '../data/stock'

  let { activeTab = $bindable(), onToggleTheme, isDark }: { activeTab: string; onToggleTheme: () => void; isDark: boolean } = $props()

  const notifCount = $derived(
    STOCK_DATA.filter((i) => i.status === 'habis' || i.status === 'menipis' || i.isExpiringSoon).length
  )

  const tabs = [
    { id: 'dashboard', label: 'Ringkasan' },
    { id: 'stok', label: 'Daftar Stok' },
    { id: 'notifikasi', label: 'Notifikasi' },
  ]
</script>

<header class="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
  <div class="mx-auto max-w-7xl px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
    <div class="flex items-center gap-3">
      <div class="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-white shadow-sm shadow-accent/30">
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M4 4v6a4 4 0 0 0 4 4v10M8 4v8M4 4h4M12 4v8a4 4 0 0 0 4 4v6M12 4c0 4 4 4 4 8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div>
        <p class="font-display text-[19px] font-semibold leading-none tracking-tight">Dapur Nusantara Rasa</p>
        <p class="mt-1 text-[12px] text-muted">Monitoring Stok &middot; Cabang Kemang</p>
      </div>
    </div>
    <div class="flex items-center gap-5">
      <div class="hidden sm:block text-right">
        <p class="text-[12px] text-muted">Jumat, 7 Agustus 2026</p>
        <p class="text-[12px] text-muted">Pukul <span class="font-mono tabular-nums">09:42</span> WIB</p>
      </div>
      <button
        aria-label="Ganti tema"
        onclick={onToggleTheme}
        class="grid h-9 w-9 place-items-center rounded-full border border-line text-muted hover:text-ink hover:border-ink/30 transition-colors"
      >
        {#if isDark}
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke-linecap="round" />
          </svg>
        {:else}
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" stroke-linejoin="round" />
          </svg>
        {/if}
      </button>
      <div class="h-9 w-9 rounded-full bg-accent-soft text-accent grid place-items-center font-display text-[13px] font-semibold">RM</div>
    </div>
  </div>

  <nav class="mx-auto max-w-7xl px-5 sm:px-8">
    <div class="flex gap-6 -mb-px" role="tablist">
      {#each tabs as tab}
        <button class="tab-btn" class:is-active={activeTab === tab.id} role="tab" onclick={() => (activeTab = tab.id)}>
          {tab.label}
          {#if tab.id === 'notifikasi'}
            <span class="ml-1.5 inline-flex items-center justify-center rounded-full bg-crit text-paper text-[10px] font-mono font-semibold h-4 min-w-4 px-1">{notifCount}</span>
          {/if}
        </button>
      {/each}
    </div>
  </nav>
</header>

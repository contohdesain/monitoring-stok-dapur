<script lang="ts">
  import Header from './lib/components/Header.svelte'
  import DashboardTab from './lib/components/DashboardTab.svelte'
  import StockTable from './lib/components/StockTable.svelte'
  import NotificationsTab from './lib/components/NotificationsTab.svelte'
  import DetailDrawer from './lib/components/DetailDrawer.svelte'

  let activeTab = $state('dashboard')
  let selectedItemId = $state<string | null>(null)
  let isDark = $state(false)

  function selectItem(id: string) {
    selectedItemId = id
  }
  function closeDrawer() {
    selectedItemId = null
  }
  function toggleTheme() {
    isDark = !isDark
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }
</script>

<div class="min-h-screen bg-paper text-ink font-body antialiased">
  <Header bind:activeTab onToggleTheme={toggleTheme} {isDark} />

  <main class="mx-auto max-w-7xl px-5 sm:px-8 py-7">
    {#if activeTab === 'dashboard'}
      <DashboardTab onSelect={selectItem} />
    {:else if activeTab === 'stok'}
      <StockTable onSelect={selectItem} />
    {:else if activeTab === 'notifikasi'}
      <NotificationsTab onSelect={selectItem} />
    {/if}
  </main>

  <DetailDrawer itemId={selectedItemId} onClose={closeDrawer} />
</div>

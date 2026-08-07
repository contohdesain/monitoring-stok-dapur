<script lang="ts">
  import type { StockItem } from '../data/stock'

  let { item }: { item: StockItem } = $props()
</script>

{#if item.expiry}
  {#if item.isExpired}
    <span class="pill bg-crit-soft text-crit"><span class="pill-dot bg-crit"></span>Kadaluarsa</span>
  {:else if item.isExpiringSoon}
    <span class="pill bg-warn-soft text-warn">
      <span class="pill-dot bg-warn"></span>{item.daysToExpiry === 0 ? 'Kadaluarsa hari ini' : `H-${item.daysToExpiry}`}
    </span>
  {/if}
{/if}

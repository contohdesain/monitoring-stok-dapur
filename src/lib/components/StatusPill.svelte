<script lang="ts">
  import type { StockItem } from '../data/stock'

  const STATUS_META = {
    aman: { label: 'Aman', cls: 'bg-ok-soft text-ok', dot: 'bg-ok' },
    menipis: { label: 'Menipis', cls: 'bg-warn-soft text-warn', dot: 'bg-warn' },
    habis: { label: 'Habis', cls: 'bg-crit-soft text-crit', dot: 'bg-crit' },
  } as const

  let { item }: { item: StockItem } = $props()
  const meta = $derived(STATUS_META[item.status])
</script>

<span class="pill {meta.cls}"><span class="pill-dot {meta.dot}"></span>{meta.label}</span>

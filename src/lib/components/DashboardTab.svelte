<script lang="ts">
  import KpiCards from './KpiCards.svelte'
  import CategoryBars from './CategoryBars.svelte'
  import AttentionList from './AttentionList.svelte'
  import ActivityFeed from './ActivityFeed.svelte'

  let { onSelect }: { onSelect: (id: string) => void } = $props()
</script>

<section class="space-y-7">
  <div>
    <h1 class="font-display text-[26px] sm:text-[30px] font-semibold tracking-tight text-balance">Selamat pagi, kondisi dapur hari ini</h1>
    <p class="mt-1.5 text-[14px] text-muted max-w-[60ch]">
      Ringkasan stok bahan baku per hari ini. Segera tindak lanjuti bahan yang menipis atau mendekati kadaluarsa agar operasional dapur tidak terganggu.
    </p>
  </div>

  <KpiCards />

  <div class="grid grid-cols-1 lg:grid-cols-5 gap-5">
    <div class="lg:col-span-3"><CategoryBars /></div>
    <div class="lg:col-span-2"><AttentionList {onSelect} /></div>
  </div>

  <ActivityFeed />
</section>

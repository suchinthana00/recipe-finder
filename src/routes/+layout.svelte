<svelte:options runes={true} />

<script lang="ts">
  import { base } from '$app/paths';

  const { children } = $props();
</script>

<svelte:head>
  <script
    type="module"
    src={base + '/stencilrecipe/stencilrecipe.esm.js'}
  ></script>
</svelte:head>

<nav class="nav">
  <a href="/">Home</a>
  <a href="/favorites">Favorites</a>
  <a href="/meal-plan">Meal Plan</a>
</nav>

<main class="content">
  {@render children?.()}
</main>
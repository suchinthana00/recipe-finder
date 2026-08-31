<svelte:options runes={true} />

<script lang="ts">
  import { onMount } from 'svelte';

  const { children } = $props();

  onMount(async () => {
    try {
      const { defineCustomElements } = await import('stencilrecipe/loader');
      defineCustomElements();
    } catch {
      // Ignore custom element loader failures during SSR/hydration.
    }
  });
</script>

<nav class="nav">
  <a href="/">Home</a>
  <a href="/favorites">Favorites</a>
  <a href="/meal-plan">Meal Plan</a>
</nav>

<main class="content">
  {@render children?.()}
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    background: #f7f5ef;
    color: #1f1f1f;
  }

  .nav {
    display: flex;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e6dfd2;
    background: #fffaf0;
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  }

  .nav a {
    text-decoration: none;
    color: #5a3d2b;
    font-weight: 600;
    padding: 0.6rem 0.9rem;
    border-radius: 999px;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .nav a:hover {
    background: #f1e4c7;
    color: #2f2118;
  }

  .content {
    padding: 1.5rem;
  }
</style>

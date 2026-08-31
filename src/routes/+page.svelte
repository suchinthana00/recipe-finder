<svelte:options runes={true} />

<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import {
    getCategories,
    getRandomRecipe,
    getRecipesByCategory,
    searchRecipes
  } from '$lib/api/themealdb';
  import { appState } from '$lib/stores/app-state';
  import type { Recipe } from '$lib/types/recipe';

  type FeedRecipe = Pick<Recipe, 'id' | 'name' | 'image' | 'category'> & { isFavorite?: boolean };

  let recipes = $state<Recipe[]>([]);
  let categories = $state<string[]>([]);
  let selectedCategory = $state('');
  let searchValue = $state('');
  let loading = $state(true);
  let error = $state('');

  const feedRecipes = $derived<FeedRecipe[]>(
    recipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      category: recipe.category,
      isFavorite: appState.isFavorite(recipe.id)
    }))
  );

  onMount(async () => {
    await loadInitialRecipes();
  });

  async function loadInitialRecipes(): Promise<void> {
    loading = true;
    error = '';

    categories = await getCategories();
    selectedCategory = categories[0] ?? '';

    if (selectedCategory) {
      recipes = await getRecipesByCategory(selectedCategory);
    } else {
      recipes = [];
    }

    if (recipes.length === 0) {
      error = 'No recipes found.';
    }

    loading = false;
  }

  async function handleSearchChanged(event: CustomEvent<string>): Promise<void> {
    searchValue = event.detail;
    loading = true;
    error = '';

    if (searchValue.trim()) {
      recipes = await searchRecipes(searchValue.trim());
    } else if (selectedCategory) {
      recipes = await getRecipesByCategory(selectedCategory);
    } else {
      recipes = [];
    }

    if (recipes.length === 0) {
      error = 'No recipes found.';
    }

    loading = false;
  }

  async function handleFilterChanged(event: CustomEvent<string>): Promise<void> {
    selectedCategory = event.detail;
    searchValue = '';
    loading = true;
    error = '';
    recipes = selectedCategory ? await getRecipesByCategory(selectedCategory) : [];

    if (recipes.length === 0) {
      error = 'No recipes found.';
    }

    loading = false;
  }

  async function handleSurpriseMe(): Promise<void> {
    const recipe = await getRandomRecipe();

    if (recipe) {
      goto(`/recipes/${recipe.id}`);
    }
  }

  function handleRecipeSelected(event: CustomEvent<string>): void {
    goto(`/recipes/${event.detail}`);
  }

  function handleFavoriteToggled(event: CustomEvent<{ id: string; isFavorite: boolean }>): void {
    const recipe = recipes.find((item) => item.id === event.detail.id);

    if (recipe) {
      appState.toggleFavorite(recipe);
    }
  }
</script>

<section class="home-page">
  <h1>Recipe Finder</h1>

  <div class="controls">
    <recipe-search
      placeholder="Search recipes..."
      value={searchValue}
      onsearchChanged={handleSearchChanged}
    ></recipe-search>

    <div class="control-row">
      <recipe-filter
        options={categories}
        value={selectedCategory}
        onfilterChanged={handleFilterChanged}
      ></recipe-filter>

      <button class="surprise-button" onclick={handleSurpriseMe}>Surprise Me</button>
    </div>
  </div>

  {#if loading}
    <p>Loading...</p>
  {:else if error === 'No recipes found.'}
    <p>No recipes found.</p>
  {:else if error}
    <p>Error loading recipes.</p>
  {:else}
    <div class="feed-wrap">
      <recipe-feed
        recipes={feedRecipes}
        columns={3}
        gap="1rem"
        onrecipeSelected={handleRecipeSelected}
        onfavoriteToggled={handleFavoriteToggled}
      ></recipe-feed>
    </div>
  {/if}
</section>

<style>
  .home-page {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
  }

  .controls {
    display: grid;
    gap: 0.9rem;
    max-width: 100%;
  }

  .control-row {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    flex-wrap: wrap;
  }

  .surprise-button {
    border: 0;
    border-radius: 999px;
    padding: 0.8rem 1.2rem;
    background: linear-gradient(135deg, #ff7a3d, #ffb347);
    color: #fff;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 10px 24px rgba(255, 122, 61, 0.22);
    transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
  }

  .surprise-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 28px rgba(255, 122, 61, 0.28);
    filter: saturate(1.05);
  }

  .surprise-button:active {
    transform: translateY(0);
  }

  .surprise-button:focus-visible {
    outline: 3px solid rgba(255, 179, 71, 0.35);
    outline-offset: 3px;
  }

  .feed-wrap {
    width: 100%;
    min-width: 0;
  }

  .feed-wrap :global(recipe-feed) {
    display: block;
    width: 100%;
    min-width: 0;
  }
</style>
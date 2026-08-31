<svelte:options runes={true} />

<script lang="ts">
  import { goto } from '$app/navigation';
  import { appState } from '$lib/stores/app-state';
  import type { Recipe } from '$lib/types/recipe';

  type FeedRecipe = Pick<Recipe, 'id' | 'name' | 'image' | 'category'> & { isFavorite?: boolean };

  const recipes = $derived<FeedRecipe[]>(
    appState.favoriteRecipes.map((recipe: Recipe) => ({
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      category: recipe.category,
      isFavorite: true
    }))
  );

  function handleRecipeSelected(event: CustomEvent<string>): void {
    goto(`/recipes/${event.detail}`);
  }

  function handleFavoriteToggled(event: CustomEvent<{ id: string; isFavorite: boolean }>): void {
    const recipe = appState.favorites[event.detail.id];

    if (recipe) {
      appState.toggleFavorite(recipe);
    }
  }
</script>

<section>
  <h1>Favorites</h1>

  {#if recipes.length === 0}
    <p>No recipes found.</p>
  {:else}
    <recipe-feed
      recipes={recipes}
      columns={4}
      gap="1rem"
      onrecipeSelected={handleRecipeSelected}
      onfavoriteToggled={handleFavoriteToggled}
    ></recipe-feed>
  {/if}
</section>

<style>
  section :global(recipe-feed) {
    display: block;
    width: 100%;
  }
</style>

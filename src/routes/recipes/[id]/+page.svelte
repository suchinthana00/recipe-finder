<svelte:options runes={true} />

<script lang="ts">
  import { appState } from '$lib/stores/app-state';
  import type { PageData } from './$types';

  const { data } = $props<{ data: PageData }>();
  const recipe = $derived(data.recipe);
  const isFavorite = $derived(recipe ? appState.isFavorite(recipe.id) : false);

  function handleFavoriteToggled(_event: CustomEvent<boolean>): void {
    if (recipe) {
      appState.toggleFavorite(recipe);
    }
  }
</script>

{#if recipe}
  <section>
    <h1>{recipe.name}</h1>
    <img src={recipe.image} alt={recipe.name} style="max-width: 100%; height: auto;" />
    <p>Category: {recipe.category ?? 'Unknown'}</p>
    <p>Area: {recipe.area ?? 'Unknown'}</p>

    <favorite-button active={isFavorite} onfavoriteToggled={handleFavoriteToggled}></favorite-button>

    <h2>Ingredients</h2>
    <ul>
      {#each recipe.ingredients as ingredient}
        <li>{ingredient.name}{ingredient.measure ? ` - ${ingredient.measure}` : ''}</li>
      {/each}
    </ul>

    {#if recipe.instructions}
      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>
    {/if}

    {#if recipe.tags?.length}
      <p>Tags: {recipe.tags.join(', ')}</p>
    {/if}

    {#if recipe.youtube}
      <p><a href={recipe.youtube} target="_blank" rel="noreferrer">Watch on YouTube</a></p>
    {/if}
  </section>
{:else}
  <p>No recipe found.</p>
{/if}

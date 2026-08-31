<svelte:options runes={true} />

<script lang="ts">
  import { goto } from '$app/navigation';
  import { appState, type MealPlanDay } from '$lib/stores/app-state';

  const days: MealPlanDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const favoriteRecipes = $derived(appState.favoriteRecipes);
  let selectedRecipeIds = $state<Record<MealPlanDay, string>>({
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
    Sunday: ''
  });

  function handleAssignMeal(day: MealPlanDay): void {
    const recipeId = selectedRecipeIds[day];
    const recipe = appState.favoriteRecipes.find((item: { id: string }) => item.id === recipeId);

    if (recipe) {
      appState.assignMeal(day, recipe);
    }
  }

  function handleMealSelected(event: CustomEvent<string>): void {
    goto(`/recipes/${event.detail}`);
  }

  function handleMealRemoved(day: MealPlanDay): void {
    appState.removeMeal(day);
  }
</script>

<section>
  <h1>Meal Plan</h1>

  {#if favoriteRecipes.length === 0}
    <p>No recipes found.</p>
  {/if}

  {#each days as day}
    <div class="day-block">
      <h2>{day}</h2>

      <meal-plan-day
        day={day}
        recipeId={appState.mealPlan[day]?.id}
        recipeName={appState.mealPlan[day]?.name}
        recipeImage={appState.mealPlan[day]?.image}
        onmealSelected={handleMealSelected}
        onmealRemoved={() => handleMealRemoved(day)}
      ></meal-plan-day>

      {#if favoriteRecipes.length > 0}
        <div class="controls">
          <select bind:value={selectedRecipeIds[day]}>
            <option value="">Select a favorite</option>
            {#each favoriteRecipes as recipe}
              <option value={recipe.id}>{recipe.name}</option>
            {/each}
          </select>
          <button onclick={() => handleAssignMeal(day)} disabled={!selectedRecipeIds[day]}>Assign</button>
        </div>
      {/if}
    </div>
  {/each}
</section>

<style>
  .day-block {
    border: 1px solid #ddd;
    padding: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .controls {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
</style>

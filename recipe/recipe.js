const recipeDetails = document.getElementById('recipe-details');

let pageUrl = window.location;
let recipeUrl = new URL(pageUrl);
let categoryId = recipeUrl.searchParams.get("category_id");

fullMealDetails(categoryId);

function fullMealDetails(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
      let html = "";
      const meal = data.meals[0];
      if (data.meals) {

        let mealInstruction = replaceElem(meal.strInstructions);

        if (meal.strYoutube) {
          var youtube = meal.strYoutube;
          var utubeURL = new URL(youtube);
          var videoId = utubeURL.searchParams.get("v");
          var videoElement = videoRecipe(videoId);
        }

        html += `
            <div class="breadcrumbs mb-5"><a href="http://localhost/recipe-app/">Recipes</a> / ${meal.strMeal}</div>
            <div class="col-6">
              <div class="recipe-img mb-5">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="100%">
              </div>
              <div class="youtube-videos">
                ${videoElement ? videoElement : ""}
              </div>
            </div>
            <div class="col-6">
              <h1 class="recipe-title">${meal.strMeal}</h1>
              <p class="recipe-subtitle mb-5">${meal.strArea}</p>
              <div class="content">
                <div class="ingredients mb-4">
                  <h2 class="heading-02 mb-2">Ingredients</h2>
                  <ul>
                    <li>${meal.strMeasure1} ${meal.strIngredient1}</li>
                    <li>${meal.strMeasure2} ${meal.strIngredient2}</li>
                    <li>${meal.strMeasure3} ${meal.strIngredient3}</li>
                    <li>${meal.strMeasure4} ${meal.strIngredient4}</li>
                    <li>${meal.strMeasure5} ${meal.strIngredient5}</li>
                    <li>${meal.strMeasure6} ${meal.strIngredient6}</li>
                    <li>${meal.strMeasure7} ${meal.strIngredient7}</li>
                    <li>${meal.strMeasure8} ${meal.strIngredient8}</li>
                    <li>${meal.strMeasure9} ${meal.strIngredient9}</li>
                  </ul>
                </div>
                <div class="instructions">
                  <h2 class="heading-02  mb-2">Instructions</h2>
                  <p>${mealInstruction}</p>
                </div>
              </div>
            </div>
          `;
      }

      recipeDetails.innerHTML = html;
    })
}

function replaceElem(str) {
  return str.replace(/(?:\r\n|\r|\n)/g, '<span class="breakline"></span>');
}

function videoRecipe(id) {
  let youtubeURL = `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  return youtubeURL;
}

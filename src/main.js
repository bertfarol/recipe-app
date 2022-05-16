const mealList = document.getElementById('meals');
const selectedMeal = document.getElementById('meal');

getMealCategory();
getMealList();
getMeal();

// #CATEGORIES
function getMealCategory() {
  let dropdown = document.getElementById('meal-category');
  dropdown.length = 0;

  fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then(response => response.json())
    .then(data => {
      let option;
      if (data.meals) {
        data.meals.map(meal => {
          option = document.createElement('option');
          option.text = meal.strCategory;
          option.value = meal.strCategory;
          dropdown.add(option);
        });
      }
    })
    .catch(function (err) {
      console.error('Fetch Error -', err);
    });
}

// #MEAL LIST
function getMealList() {

  let selectedMealCategory = document.getElementById("meal-category").value;
  let category = selectedMealCategory === '' ? 'Beef' : selectedMealCategory;

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(response => response.json())
    .then(data => {
      let html = "";
      if (data.meals) {
        data.meals.map(meal => {
          html += `
              <div onclick="getMeal(this, '${meal.idMeal}')" data-id="${meal.idMeal}" class="${meal.idMeal === '52874' ? 'recipe-item d-flex align-items-center' : 'recipe-item d-flex align-items-center'}">
                <span class="recipe-img mb-0">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                </span>
                <div class="ms-4">
                  <p class="mb-0 meal-name">${meal.strMeal}</p>
                </div>
              </div>
            `;
        });
      }
      mealList.innerHTML = html;
      let recipeFirstChild = $('.recipe-item').eq(0).attr("data-id");
      getMeal(null, recipeFirstChild)
    })
    .catch(function (err) {
      console.error('Fetch Error -', err);
    });

}

// #SELECTED MEAL
function getMeal(e = null, mealId) {
  $('.recipe-item').removeClass("active");
  if (e === null) {
    $('.recipe-item').eq(0).addClass('active')
  }
  $(e).addClass('active');
  let selectedMealId = mealId === undefined ? '52874' : mealId;

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMealId}`)
    .then(response => response.json())
    .then(data => {
      let html = "";
      const meal = data.meals[0];

      if (data.meals) {
        let mealInstruction = truncate(meal.strInstructions);
        html += `
            <span class="image"><img src="${meal.strMealThumb}" alt="${meal.strMeal}"></span>
            <div class="text-end">
              <h2>${meal.strMeal}</h2>
              <span class="category">${meal.strCategory}</span>
              <p class="instruction">${mealInstruction}</p>
              <a href="recipe?category_id=${meal.idMeal}" class="btn btn-success">View Recipe</a>
             </div>
          `;
      }
      selectedMeal.innerHTML = html;
    })
}


// HELPER|FUNCTION
function truncate(input) {
  if (input.length > 150) {
    return input.substring(0, 150) + '...';
  }
  return input;
};


$('#meals .recipe-item').click(function () {
  $('.recipe-item').removeClass("active");
  $(this).addClass("active");
});

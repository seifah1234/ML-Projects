class Recipe {
  constructor(id, name, course, description, instructions, duration, rate, image){
      this.id = id;
      this.name = name;
      this.course = course;
      this.description = description;
      this.instructions = instructions;
      this.duration = duration;
      this.rate = rate;
      this.image = image;
  }
}

class Favorite {
  constructor(userId, recipeId){
      this.userId = userId;
      this.recipeId = recipeId;
  }
}

let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('favorites-container');
  
    recipes = recipes.filter((recipe) => favorites.find((favorite) => recipe.id === favorite.recipeId));
    if (recipes.length === 0) {
      container.innerHTML = '<p class="no-favorites">You have no favorite recipes yet... </p>';
    } else {
      recipes.forEach((recipe, index) => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
  
        card.innerHTML = `
          <div class="favorite-heart active">♥</div>
          <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
          <div class="recipe-content">
            <h3 class="recipe-title">${recipe.name}</h3>
            <div class="recipe-meta">
              <div class="recipe-rating">${"★".repeat(recipe.rate)}</div>
              <div class="recipe-time">${recipe.duration}</div>
            </div>
            <button class="view-button">View Recipe</button>
          </div>
        `;

        if(favorites.find(favorite => favorite.recipeId === recipe.id)){
          card.querySelector('.favorite-heart').style.color = 'red';
        }

        card.querySelector('.favorite-heart').addEventListener('click', () => {
            favorites.splice(index, 1); 
            localStorage.setItem('favorites', JSON.stringify(favorites));
            location.reload(); 
        })

        card.querySelector('.view-button').addEventListener('click', () => {
            window.location.href = `./view.html?recipeId=${recipe.id}`
        })

  
        container.appendChild(card);
      });
    }
  });
  
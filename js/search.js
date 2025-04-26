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

let recipes = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let userId = localStorage.getItem('userId');

if(localStorage.getItem('recipes')){
    recipes = JSON.parse(localStorage.getItem('recipes'));
}


function SR(recipess) {
    let grid = document.querySelector(".recipe-grid");
    grid.innerHTML = ""; 

    recipess.forEach(recipe => {
        let card = document.createElement('div');
        card.className = 'recipe-card';

        card.innerHTML = `
            <div class="favorite-heart">♥</div>
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
            if(favorites.find(favorite => favorite.recipeId === recipe.id)){
                favorites = favorites.filter(favorite => favorite.recipeId !== recipe.id);
                card.querySelector('.favorite-heart').style.color = '';
            }else{
                favorites.push(new Favorite(userId, recipe.id));
                card.querySelector('.favorite-heart').style.color = 'red';
            }

            localStorage.setItem('favorites', JSON.stringify(favorites));
        })

        card.querySelector('.view-button').addEventListener('click', () => {
            window.location.href = `./view.html?recipeId=${recipe.id}`
        })

        grid.appendChild(card);
    });
}

document.querySelector('.search-input').addEventListener('input', () => {
    let filteredRecipes = [];

    filteredRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().includes(document.querySelector('.search-input').value.toLowerCase()));
    SR(filteredRecipes);
})

var categories = document.getElementsByClassName('category-tab'); 
for(let i = 0; i < categories.length; i++){
    categories[i].addEventListener('click', () => {
        let filteredRecipes = [];
        
        filteredRecipes = recipes.filter((recipe) => recipe.course.toLowerCase() === categories[i].innerHTML.toLowerCase());
        SR(filteredRecipes);
        for(let i = 0; i < categories.length; i++){
            categories[i].classList.remove('active');
        }
        categories[i].classList.add('active');
    })
}

SR(recipes);
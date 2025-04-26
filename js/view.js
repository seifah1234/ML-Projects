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

class Ingredient {
    constructor(id, recipeId, name, quantity){
        this.id = id;
        this.recipeId = recipeId;
        this.name = name;
        this.quantity = quantity;
    }
}

class Favorite {
    constructor(userId, recipeId){
        this.userId = userId;
        this.recipeId = recipeId;
    }
}

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let userId = localStorage.getItem('userId');

let recipes = [];
if(localStorage.getItem('recipes')){
    recipes = JSON.parse(localStorage.getItem('recipes'));
}

let ingredients = [];
if(localStorage.getItem('ingredients')){
    ingredients = JSON.parse(localStorage.getItem('ingredients'));
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let recipeId = urlParams.get('recipeId')

function fetchRecipe(){
    let name=document.querySelector('.name');
    let course=document.querySelector('.course');


    let ingrediantsList =document.querySelector('.ingrediantsList');

    let recipe_image = document.querySelector('.recipe-image');

    let recipe_time=document.querySelector('.recipe-time');

    let recipe_rating=document.querySelector('.recipe-rating');


    let instructionsParagraph=document.querySelector('.instructionsParagraph');



    recipes.forEach(recipe => {
        if(recipe.id == recipeId){
            name.innerHTML= recipe.name;
            course.innerHTML = recipe.course;
            
            recipe_image.src = (recipe.image) ? recipe.image : '../images/placeholder.png';
            recipe_image.alt = recipe.name;
            instructionsParagraph.innerHTML = recipe.instructions;
            recipe_time.innerHTML= recipe.duration;
            recipe_rating.innerHTML = "★".repeat(recipe.rate);

            ingredients.forEach(ingredient => {
                if(ingredient.recipeId == recipeId){
                    const row = document.createElement('li');
                    
                    row.innerHTML = `${ingredient.quantity} - ${ingredient.name}`;
                
                    ingrediantsList.appendChild(row);
                }
            });   

            if(favorites.find(favorite => favorite.recipeId === recipeId)){
                document.querySelector('.favorite-heart').style.color = 'red';
            }
        
            document.querySelector('.favorite-heart').addEventListener('click', () => {
                if(favorites.find(favorite => favorite.recipeId === recipeId)){
                    favorites = favorites.filter(favorite => favorite.recipeId !== recipeId);
                    document.querySelector('.favorite-heart').style.color = '';
                }else{
                    favorites.push(new Favorite(userId, recipeId));
                    document.querySelector('.favorite-heart').style.color = 'red';
                }
        
                localStorage.setItem('favorites', JSON.stringify(favorites));
            })
        }
    })
}

fetchRecipe();
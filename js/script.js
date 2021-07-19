const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");
const mealDetailsDiv = document.querySelector(".meal-details");

//event Listener
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getRecepieDetails);
recipeCloseBtn.addEventListener("click", () => {
    mealDetailsDiv.style.display = "none";
})

//get meal list that matches with the ingredientse
function getMealList(event) 
{
    event.preventDefault();
    let searchInputTxt = document.getElementById("search").value.trim();
    if (searchInputTxt !== "") 
    {
        let mealResult=document.querySelector(".meal-result");
        mealResult.style.display="block";
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`).   // koi bhi random input dalne per vo null return karega..
            then(response => response.json())
            .then((data) => {
                let html = "";
                if (data.meals) {
                    data.meals.forEach((data) => {
                        html += `
                <div class="meal-item" data-id="${data.idMeal}">
                <div class="meal-img">
                    <img src="${data.strMealThumb}" alt="food image">
                </div>
                <div class="meal-name">
                    <h3> ${data.strMeal} </h3>
                    <a href="#" class="recepie-btn">
                        Get Recipe
                    </a>
                </div>
              </div>
                `;
                    })
                }
                else {
                    html = ` <h2> <mark> Sorry We didn't find any meal </mark> </h2>`;
                }
                mealList.innerHTML = html;
            })
    }
    else
    {
        alert("You Must Enter Something");
    }

}


function getRecepieDetails(event) {
    event.preventDefault();
    console.log(event.target);
    if (event.target.classList.contains("recepie-btn")) {
        let mealItem = event.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`).
            then(response => response.json()).
            then(data => {
                let html = "";
                let recepieArray = data.meals;  //simply array of objects but it showing only one object because of ID 
                recepieArray.forEach((recepieObject) => {
                    html += `
                    <h2 class="recepie title"> ${recepieObject.strMeal}</h2>
                    <p class="recipe-category"> ${recepieObject.strCategory}</p>
                    <div class="recipe-instruct">
                    <h3> Instructions </h3>
                    <p> 
                    ${recepieObject.strInstructions}
                    </p>
                    <div class="recipe-meal-img">
                        <img src="${recepieObject.strMealThumb}" alt="">
                    </div>
                    <div class="recipe-link">
                        <a href="${recepieObject.strYoutube}" target="_blank"> watch Video</a>
                    </div>
                    </div>
            `;
                });
                mealDetailContent.innerHTML = html;
                mealDetailsDiv.style.display = "block";
            }
            );
    }
}

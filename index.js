document.addEventListener("DOMContentLoaded", () => {

    renderCocktails()
    cocktailMenu()
    search()

  
})

// const specials = document.getElementById('cocktail-specials');
const cardUl = document.getElementById('cocktail-list');
const details = document.getElementById('cocktail-details');
const targetImgDiv = document.getElementById('cocktail-target-img')
const searchBar = document.getElementById('search')
const menuHeader = document.getElementById('cocktail-header')
let arr = [];

function cocktail(drink){
    const card = document.createElement('li')
    card.className = "card"
    card.id = drink.id
    cardUl.append(card)
    const cocktailImg = document.createElement('img')
    cocktailImg.className = "cocktailImg"
    cocktailImg.src= drink.img
    const cocktailName = document.createElement('h3')
    cocktailName.className = "cocktail-name"
    cocktailName.innerText = drink.name
    const cocktailDescription = document.createElement('p')
    cocktailDescription.className = "cocktailDescription"
    cocktailDescription.textContent = drink.description
    const ingredients = document.createElement("p")
    ingredients.className = "ingredients"
    ingredients.innerText = drink.ingredients
    ingredients.style.display = "none"
    const cardBtn = document.createElement('button')
    cardBtn.className = "cardBtn"
    cardBtn.innerText = "See More"
    card.append(cocktailImg, cocktailName, cocktailDescription, ingredients, cardBtn)
    cardBtn.addEventListener("click", showDetails)
    searchBar.style.display = "block"
    menuHeader.style.display = "block"
    targetImgDiv.innerHTML = ""
    details.innerHTML = ""
}
function renderCocktails(){
    fetch("http://localhost:3000/drinks")
    .then(res => res.json())
    .then(data => data.map(drink => cocktail(drink)))
}

function cocktailMenu(){
    const showCocktails = document.getElementById("cocktails")
    showCocktails.addEventListener('click', renderCocktails)
}



function showDetails(e){
    cardUl.innerHTML = ""
    targetImgDiv.innerHTML = ""
    details.innerHTML = ""
    const targetImgSrc = e.target.parentNode.getElementsByClassName("cocktailImg")[0].currentSrc
    const targetImg = document.createElement("img")
    targetImg.src = targetImgSrc
    targetImg.className="cocktailImg"
    targetImgDiv.append(targetImg)
    const cocktailname = document.createElement('h2')
    cocktailname.className="targetName"
    cocktailname.textContent = e.target.parentNode.getElementsByClassName("cocktail-name")[0].innerHTML
    const targetCocktailDescription = document.createElement('p')
    targetCocktailDescription.textContent = e.target.parentNode.getElementsByClassName("cocktailDescription")[0].innerHTML
    targetCocktailDescription.className = "cocktailDescription targetDescription"
    const targetIngredients = document.createElement('p')
    targetIngredients.textContent = e.target.parentNode.getElementsByClassName("ingredients")[0].innerHTML
    targetIngredients.style.display = "block"
    targetIngredients.className = "ingredients"
    const heart = document.createElement('p')
    heart.className = "heart"
    heart.innerHTML = `
            Like <span class="like-glyph">&#x2661;</span>
        `
    details.append(cocktailname, targetCocktailDescription, targetIngredients, heart)
    document.querySelector(".like-glyph").addEventListener("click", likeDrink)
    searchBar.style.display = "none"
    menuHeader.style.display = "none"

}

function likeDrink(e){
    const activated = e.target.classList.contains('activated-heart')
    if(!activated){
      e.target.classList.add('activated-heart')
    //   hearts.target.innerText = EMPTY_HEART
    } else{
      e.target.classList.remove('activated-heart')
    //   hearts.target.innerText = FULL_HEART
    }
    // activated;
  }

function search(){
    searchBar.addEventListener('keyup', function(){
        let input = searchBar.value
        input = input.toLowerCase()
        let searchName = document.getElementsByClassName('cocktail-name')
        for(i=0; i<searchName.length; i++){
            if(!searchName[i].innerHTML.toLowerCase().includes(input)){
                searchName[i].parentNode.style.display="none"
            } else{
                searchName[i].parentNode.style.display="block"
            }
        }
        
        console.log(searchName)
        console.log(searchName.length)
    })
   

}
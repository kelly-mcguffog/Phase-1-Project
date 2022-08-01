document.addEventListener("DOMContentLoaded", () => {

    const specials = document.getElementById('cocktail-specials');
    const details = document.getElementById('cocktail-details');

    function cocktail(drink){
        const card = document.createElement('div')
        card.className = "card"
        specials.append(card)
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

    cocktailMenu()

    function showDetails(e){
        specials.innerHTML = ""
        const targetImgDiv = document.getElementById('cocktail-target-img')
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
        details.append(cocktailname, targetCocktailDescription, targetIngredients)
    }

    renderCocktails()
})
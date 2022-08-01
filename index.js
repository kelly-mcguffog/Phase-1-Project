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
        const showCocktails = document.getElementById("cocktails")
        showCocktails.addEventListener('click', () => {
        fetch("http://localhost:3000/drinks")
        .then(res => res.json())
        .then(data => data.map(drink => cocktail(drink)))
    })
    }

    function showDetails(e){
        specials.innerHTML = ""
        const targetImgDiv = document.getElementById('cocktail-target-img')
        const targetImgSrc = e.target.parentNode.getElementsByClassName("cocktailImg")[0].currentSrc
        const targetImg = document.createElement("img")
        targetImg.src = targetImgSrc
        targetImgDiv.append(targetImg)
        const divDetails = document.createElement('div')
        const cocktailname = document.createElement('h3')
        cocktailname.textContent = e.target.parentNode.getElementsByClassName("cocktail-name")[0].innerHTML
        details.append(divDetails)
        const targetCocktailDescription = document.createElement('p')
        targetCocktailDescription.textContent = e.target.parentNode.getElementsByClassName("cocktailDescription")[0].innerHTML
        const targetIngredients = document.createElement('p')
        targetIngredients.textContent = e.target.parentNode.getElementsByClassName("ingredients")[0].innerHTML
        targetIngredients.style.display = "block"
        divDetails.append(cocktailname, targetCocktailDescription, targetIngredients)
        console.log(e.target.parentNode.getElementsByClassName("ingredients"))
    }

    renderCocktails()
})
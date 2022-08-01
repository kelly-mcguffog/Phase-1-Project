document.addEventListener("DOMContentLoaded", () => {
    function cocktail(drink){
        const specials = document.getElementById('cocktail-specials');
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
        const cardBtn = document.createElement('button')
        cardBtn.className = "cardBtn"
        cardBtn.innerText = "See More"
        card.append(cocktailImg, cocktailName, cocktailDescription, cardBtn)
    }
    function renderCocktails(){
        fetch("http://localhost:3000/drinks")
        .then(res => res.json())
        .then(data => data.map(drink => cocktail(drink)))
    }

    renderCocktails()
})
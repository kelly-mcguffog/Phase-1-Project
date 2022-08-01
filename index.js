document.addEventListener("DOMContentLoaded", () => {
    function cocktail(){
        const specials = document.getElementById('cocktail-specials');
        const card = document.createElement('div')
        card.className = "card"
        specials.append(card)
        const cocktailImg = document.createElement('img')
        cocktailImg.className = "cocktailImg"
        cocktailImg.src= "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/marg-h-1526063646.jpg";
        const cocktailName = document.createElement('h3')
        cocktailName.className = "cocktail-name"
        cocktailName.innerText = "Margarita"
        const cocktailDescription = document.createElement('p')
        cocktailDescription.className = "cocktailDescription"
        cocktailDescription.textContent = "A refreshing blend of sweet and tangy"
        const cardBtn = document.createElement('button')
        cardBtn.className = "cardBtn"
        cardBtn.innerText = "See More"
        card.append(cocktailImg, cocktailName, cocktailDescription, cardBtn)
    }
    cocktail()
})
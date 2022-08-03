document.addEventListener("DOMContentLoaded", () => {

    renderCocktails()
    cocktailMenu()
    search()
    filterHearts()

  
})

const cardUl = document.getElementById('cocktail-list');
const details = document.getElementById('cocktail-details');
const targetImgDiv = document.getElementById('cocktail-target-img')
const searchBar = document.getElementById('search')
const menuHeader = document.getElementById('cocktail-header')
// let arr = [];

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
    const ingredientsUl = document.createElement("ul")
    ingredientsUl.className = "ingredientsUl"
    const ingredients = drink.ingredients

        for(let i=0; i< ingredients.length; i++){
            const ingredientsLi = document.createElement('li')
            ingredientsLi.innerHTML = 
            `${ingredients[i].measurement} ${ingredients[i].ingredientName}`
            ingredientsUl.append(ingredientsLi)
        }
 
    ingredientsUl.style.display = "none"
    const cardBtn = document.createElement('button')
    cardBtn.className = "cardBtn"
    cardBtn.innerText = "See More"
    const heart = document.createElement('p')
    heart.id = `heart${drink.id}`
    heart.className = "heart"
    heart.innerHTML = drink.like
       
    card.append(cocktailImg, cocktailName, cocktailDescription, ingredientsUl, heart, cardBtn)
    
    heart.addEventListener("click", likeDrink)

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
    
    const targetObj = e.target.parentNode.getElementsByClassName("ingredientsUl")[0]
    targetObj.style.display = "inline-block"


    // const heart = document.createElement('p')
    // heart.className = "heart"
    // heart.innerHTML = `
    //         Like <span class="like-glyph">&#x2661;</span>
    //     `
    details.append(cocktailname, targetCocktailDescription, targetObj)
    // document.querySelector(".like-glyph").addEventListener("click", addLikeCocktail)
    searchBar.style.display = "none"
    menuHeader.style.display = "none"

}

function likeDrink(e){
    const activated = e.target.classList.contains('activated-heart')
    if(!activated){
      e.target.classList.add('activated-heart')
      addLikeCocktail(e)
    } else{
      e.target.classList.remove('activated-heart')
    }
    console.log(e.target)

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
                searchName[i].parentNode.style.display="inline-grid"
            }
        }
    })
   

}


function addLikeCocktail(e){
    console.log(e.target.parentNode.id)
    fetch(`http://localhost:3000/drinks/${e.target.parentNode.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(e)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

function filterHearts(){
    const favorites = document.getElementById('favorites')
    favorites.addEventListener('click', function hi() {
        const list = document.getElementsByClassName('card')
        for(let i=0; i < list.length; i++){
            if(list[i].childNodes[4].classList.contains("activated-heart")){
                list[i].style.display = "inline-grid"
                console.log(list[i].childNodes[4])
            }else{
                list[i].style.display = "none"
            }
        }

    })
}
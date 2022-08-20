document.cookie = 'cookie2=value2; SameSite=None; Secure';
document.addEventListener("DOMContentLoaded", () => {
    getAllCocktails()
    search()
    postReview()
    hoverStars() 
    saveRating()
    newIngredients()
    navLinks()
})

const home = document.getElementById('home')
const details = document.getElementById('target-cocktail-details')
const targetLike = document.querySelector(".target-heart")
const searchBar = document.getElementById('search')
const subText = document.getElementById('subtext')
const noFavorites = document.getElementById('default-no-favorites')
const commentSection = document.querySelector('#comment-section')
const cocktailRating = document.getElementById('starReview');
const reviewSection = document.getElementById('Review');
const form = document.querySelector('#reviewForm')
const stars = cocktailRating.querySelectorAll('.star');
const inputForm = document.getElementById('addCocktailForm')
const showInput = document.querySelector('.showInput')
const addIngredient = document.getElementById('addIngredient')
let rating = 0;

function renderCocktail(drink){
    const cardUl = document.getElementById('cocktail-list');
    home.style.display = "block"
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
    const cardBtn = document.createElement('button')
    cardBtn.className = "cardBtn"
    cardBtn.innerText = "See More"
    const heart = document.createElement('p')
    heart.innerHTML = "Like &#x2661;"
    heart.id = drink.id
    heart.className = "heart"
    cardBtn.details = drink
    card.append(cocktailImg, cocktailName, cocktailDescription, cardBtn, heart)
    
    heart.addEventListener("click", likeDrink)
    cardBtn.addEventListener("click", showDetails)
    reviewSection.style.display = "none";
    details.style.display = "none"
    noFavorites.style.display="none"
}

function getAllCocktails(){
    fetch("http://localhost:3000/drinks")
    .then(res => res.json())
    .then(data => renderAllCocktails(data))
}

function renderAllCocktails(drinks){
    drinks.forEach(renderCocktail)
}


function showDetails(e){
    const targetDetails = e.target.details
    home.style.display = "none";
    details.style.display = "block"
    
    const targetImg = document.getElementById("target-img")
    targetImg.src = targetDetails.img
    
    const targetName = document.getElementById("target-name")
    targetName.textContent = targetDetails.name

    const targetDescription = document.getElementById("target-description")
    targetDescription.textContent = targetDetails.description

    
    const targetIngredientsUl  = document.getElementById("ingredientsUl")
    targetIngredientsUl.innerHTML = ""

    for(const elements of targetDetails.ingredients){
        const targetIngredients = document.createElement("li")
        targetIngredients.textContent = `${elements.measurement} ${elements.ingredientName}`
        targetIngredientsUl.append(targetIngredients)
    }
        
    targetLike.id = e.target.parentNode.id
    const allHearts = e.target.parentNode.parentNode.getElementsByClassName('heart')
    const allHeartsArr = Array.from(allHearts)

    for(let i=0; i<allHeartsArr.length; i++){
        if(allHeartsArr[i].id === targetLike.id){
            targetLike.className = allHeartsArr[i].className
        }
    }
    reviewSection.style.display = "block"
}

targetLike.addEventListener('click', e => {
    likeDrink(e)
    console.log(document.querySelectorAll('.card'))
    const allDrinks = document.querySelectorAll('.card')
    const allDrinksArr = Array.from(allDrinks)
    for(const elements of allDrinksArr){
        if(elements.id === e.target.id){
            const targetCardLike = elements.querySelector('.heart')
            targetCardLike.className = e.target.className
        }
    }
})



function likeDrink(e){
    const activated = e.target.classList.contains('activated-heart')

    if(!activated){
        e.target.classList.add('activated-heart')
    } else{
        e.target.classList.remove('activated-heart')
    }  
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

function showFavorites(){
    home.style.display = "block"
    details.style.display = "none"
    reviewSection.style.display = "none"
    subText.style.display = "none"
    const list = document.getElementsByClassName('card')
    searchBar.style.display = "none"
    noFavorites.style.display="block"

    for(const cards of list){
        const cardElements = Array.from(cards.children)
        if(cardElements[4].classList.contains("activated-heart")){
            cards.style.display = "inline-grid"
            noFavorites.style.display = "none"
        }else{
            cards.style.display = "none"

        }
    }
}

function navLinks(){
    const favorites = document.getElementById('favorites')
    favorites.addEventListener('click', showFavorites)

    const showCocktails = document.getElementById("cocktails")
    showCocktails.addEventListener('click', () => {
        home.style.display = "block"
        noFavorites.style.display = "none"
        searchBar.style.display = "block"
        subText.style.display = "block"
        details.style.display = "none"
        reviewSection.style.display = "none"
        searchBar.value = ""
        const cocktailList = document.getElementsByClassName('card')
        const cocktailListArr = Array.from(cocktailList)
  
        for(const cockatil of cocktailListArr){
            cockatil.style.display = "inline-grid"
        }
    })
}



form.addEventListener('submit', e =>{
    e.preventDefault()
    console.log(e.target.childNodes[3])
    commentReview(e.target.childNodes[3].value)
    const targetReview = e.target.childNodes[5].children
    for(let i=0; i < targetReview.length; i++){
        if(targetReview[i].classList.contains("activated-star")){
            const createStar = document.createElement('span')
            createStar.textContent = targetReview[i].innerHTML
            commentSection.append(createStar)
            postReview(createStar)
        }
    }
    const line = document.createElement('hr')
    commentSection.append(line)

    removeClassFromElements('activated-star', e.target.childNodes[5].children);
    rating = 0;
    form.reset();
})
 
 
 function commentReview(content){
    for(let i=0; i<1; i++){
        let comment= document.createElement("p");
        comment.className = "comment"
        comment.textContent = content;
        commentSection.append(comment);
    }
}

function postReview(){
    cocktailRating.addEventListener('click', e => {
        if(!e.target.matches('.star')) return;
        const starID = parseInt(e.target.getAttribute('data-star'));
        removeClassFromElements('activated-star', stars);
        highlightStars(starID);
        rating = starID;
    });
}


function hoverStars() {
    cocktailRating.addEventListener('mouseover', e => {
        if(!e.target.matches('.star')) return;
        removeClassFromElements('activated-star', stars);
        const starID = parseInt(e.target.getAttribute('data-star'));
        highlightStars(starID);
    });
}


function saveRating(){
    cocktailRating.addEventListener('mouseleave', e => {
        removeClassFromElements('activated-star', stars);
        if (rating === 0) return;
        highlightStars(rating);
    });
}


function highlightStars(starID) {  
    for (let i = 0; i < starID; i++) {
        stars[i].classList.add('activated-star')
    }
}

function removeClassFromElements(className, elements) {
    for(let i = 0; i < elements.length; i++) {
    elements[i].classList.remove(className)
  }
}



showInput.addEventListener('click', () => {
    if(!inputForm.classList.contains('showCocktailForm')){
        inputForm.classList.add('showCocktailForm')
    }else{
        inputForm.classList.remove('showCocktailForm')
    }
})

function newIngredients(){
    const addAnotherIngredient = document.createElement('input')
    const newCocktail = document.getElementById('addNewCocktail')
    addAnotherIngredient.placeholder = "Ingredient.."
    addAnotherIngredient.className = "ingredient"
    addAnotherIngredient.name = "ingredient"
    addAnotherIngredient.type="text"
    const addAnotherMeasurement = document.createElement('input')
    addAnotherMeasurement.placeholder = "Measurement.."
    addAnotherMeasurement.className = "measurement"
    addAnotherMeasurement.name = "measurement"
    addAnotherMeasurement.type="text"
    const lineBreak = document.createElement('br')
    newCocktail.append(addAnotherIngredient, addAnotherMeasurement,lineBreak)
    }

let serializeForm = function(e){
    const allIngredients = document.querySelectorAll('.ingredient');
    const allMeasurements = document.querySelectorAll('.measurement');
    const ingredients = []

    allIngredients.forEach((element, index) => {
        const ingredientName = element.value
        const measurement = allMeasurements[index].value
        ingredients.push({ingredientName, measurement})
    })

    return {
        name:e.input_name.value,
        img:e.image_url.value,
        description:e.description.value,
        like: "Like &#x2661;",
        ingredients: ingredients,
    }
}

function submitForm(data){
   return fetch("http://localhost:3000/drinks", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(drink => console.log(drink))

}

function onHandleSubmit(e){
    e.preventDefault()
    const data = serializeForm(e.target)
    submitForm(data)
    .then(() => {
        e.target.reset();
        renderCocktail(data)
    })
}

addIngredient.addEventListener('click', newIngredients)
inputForm.addEventListener('submit', onHandleSubmit)
document.addEventListener("DOMContentLoaded", () => {

    getAllCocktails()
    search()
    filterHearts()
    cocktailMenu()
    postReview()
    hoverStars() 
    saveRating()
    newIngredients()

})

const cardUl = document.getElementById('cocktail-list');
const details = document.getElementById('cocktail-details');
const showCocktails = document.getElementById("cocktails")
const targetImgDiv = document.getElementById('cocktail-target-img')
const searchBar = document.getElementById('search')
const introText = document.getElementById('intro')
const favorites = document.getElementById('favorites')
const commentSection = document.querySelector('#comment-section')
const cocktailRating = document.getElementById('starReview');
const reviewSection = document.getElementById('Review');
const stars = cocktailRating.querySelectorAll('.star');
const form = document.querySelector('#reviewForm')
let rating = 0;
const newCocktail = document.getElementById('addNewCocktail')
const inputForm = document.getElementById('addCocktailForm')
const showInput = document.querySelector('.showInput')
const addIngredient = document.getElementById('addIngredient')

function renderCocktail(drink){
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
       
    card.append(cocktailImg, cocktailName, cocktailDescription, ingredientsUl, cardBtn, heart)
    
    heart.addEventListener("click", likeDrink)

    cardBtn.addEventListener("click", showDetails)

    favorites.addEventListener("click", filterHearts)

    showCocktails.addEventListener("click", cocktailMenu)

    
    reviewSection.style.display = "none";

    searchBar.style.display = "block"
    introText.style.display = "block"
    targetImgDiv.innerHTML = ""
    details.innerHTML = ""
}


function getAllCocktails(){
    fetch("http://localhost:3000/drinks")
    .then(res => res.json())
    .then(data => data.map(drink => renderCocktail(drink)))
}


function showDetails(e){
    inputForm.classList.add('showCocktailForm')
    cardUl.style.display = "none"
    targetImgDiv.innerHTML = ""
    details.innerHTML = ""
    searchBar.style.display = "none"
    introText.style.display = "none" 
    details.style.width = "50%";
    details.style.display = "inline-block";
    details.style.verticalAlign = "middle";
    details.style.marginLeft = "20px";

    const targetCocktail = e.target.parentNode.children
    const targetArr = [].slice.call(targetCocktail)

    const targetImg = document.createElement("img")
    targetImg.src = targetArr[0].currentSrc
    targetImg.className = "cocktailImg"
    targetImgDiv.append(targetImg)
    
    const targetName = document.createElement("h3")
    targetName.textContent = targetArr[1].innerText

    const targetDescription = document.createElement("p")
    targetDescription.textContent = targetArr[2].innerText
    targetDescription.className = "cocktailDescription targetDescription"
    
    const targetIngredientsUl  = targetArr[3].children
    const targetIngredientsArr = [].slice.call(targetIngredientsUl)
    const targetUl = document.createElement('ul')

    reviewSection.style.display = "block";

    for(let i=0; i< targetIngredientsArr.length; i++){
        const targetIngredients = document.createElement("li")
        targetIngredients.textContent = targetIngredientsArr[i].innerText
        targetUl.append(targetIngredients)
        targetUl.className = "ingredientsUl"
    }

    const targetLike = document.createElement("p")
    targetLike.textContent = targetArr[5].innerText
    targetLike.className = targetArr[5].className
    details.append(targetName, targetDescription, targetUl, targetLike)
    details.id = e.target.parentNode.id
    targetLike.addEventListener('click', likeDrink)
    targetLike.id = "heart" + e.target.parentNode.id
    showCocktails.addEventListener("click", (e) => {
        searchBar.value = ""
        cocktailMenu()
        reviewSection.style.display = "none";
        searchBar.style.display = "block"
        introText.style.display = "block"
        const updateLike =  e.target.parentNode.parentNode.parentNode.getElementsByClassName("heart")
        const heartArr = [].slice.call(updateLike)
        for(let i = 0; i < heartArr.length; i++){
            if(heartArr[i].id === targetLike.id){
            heartArr[i].className = targetLike.className
        }
    }
})

favorites.addEventListener('click', (e) => {
        targetImgDiv.innerHTML = ""
        details.innerHTML = ""
        searchBar.value = ""
        searchBar.style.display = "block"
        introText.style.display = "block" 
        reviewSection.style.display = "none";

        const updateFavorites =  e.target.parentNode.parentNode.parentNode.getElementsByClassName("heart")
        const favoriteIdArr = [].slice.call(updateFavorites)

        for(let i = 0; i<favoriteIdArr.length; i++){
            if(!(favoriteIdArr[i].classList.contains('activated-heart'))){
                cardUl.style.display = "block"
                favoriteIdArr[i].parentElement.style.display = "none"
            }else{
                cardUl.style.display = "block"
                favoriteIdArr[i].parentElement.style.display = "inline-grid"
            }
   
        }

    })
}

function cocktailMenu(){
    targetImgDiv.innerHTML = ""
    details.innerHTML = ""
    cardUl.style.display = "block"
    const uniqueIds = [];
    const uniqueCocktails = document.getElementsByClassName('card')
    const arr = [].slice.call(uniqueCocktails)
    const unique = arr.filter(element => {
    const isDuplicate = uniqueIds.includes(element.id);
          
    if (!isDuplicate) {
        uniqueIds.push(element.id);
        return true;
    }
        return false;
            
    });

    for(let i=0; i < unique.length; i++){
        unique[i].style.display = "inline-grid"
        cardUl.append(unique[i])
     }       
}

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

function filterHearts(){
    targetImgDiv.innerHTML = ""
    details.innerHTML = ""
    const list = document.getElementsByClassName('card')
    for(let i=0; i < list.length; i++){
        if(list[i].childNodes[5].classList.contains("activated-heart")){
            list[i].style.display = "inline-grid"
        }else{
            list[i].style.display = "none"
        }
    }
}


  
form.addEventListener('submit', e =>{
    e.preventDefault()
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
        ingredients.push({ingredientName,measurement})
    })

    return {
        name:e.name.value,
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
    console.log(data)
    submitForm(data)
    .then(() => {
        e.target.reset();
        renderCocktail(data)
    })
}

addIngredient.addEventListener('click', newIngredients)
inputForm.addEventListener('submit', onHandleSubmit)

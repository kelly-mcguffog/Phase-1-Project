document.addEventListener("DOMContentLoaded", () => {

    renderCocktails()
    cocktailMenu()
    search()
    filterHearts()
    createForm()
    postReview()

  
})

const cardUl = document.getElementById('cocktail-list');
const details = document.getElementById('cocktail-details');
const targetImgDiv = document.getElementById('cocktail-target-img')
const searchBar = document.getElementById('search')
const menuHeader = document.getElementById('cocktail-header')
const commentSection = document.querySelector('#comment-section')

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
       
    card.append(cocktailImg, cocktailName, cocktailDescription, ingredientsUl, cardBtn, heart)
    
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
 
    const targetImg =  e.target.parentNode.getElementsByClassName("cocktailImg")[0]
    targetImgDiv.append(targetImg)
    
    const cocktailname = e.target.parentNode.getElementsByClassName("cocktail-name")[0]

    const targetCocktailDescription = e.target.parentNode.getElementsByClassName("cocktailDescription")[0]
    targetCocktailDescription.className = "cocktailDescription targetDescription"
    const targetObj = e.target.parentNode.getElementsByClassName("ingredientsUl")[0]
    targetObj.style.display = "inline-block"


    const targetHeart = e.target.parentNode.getElementsByClassName("heart")[0]
    console.log(targetHeart)
    details.append(cocktailname, targetCocktailDescription, targetObj, targetHeart)
 
    searchBar.style.display = "none"
    menuHeader.style.display = "none"

}

function createForm(){
   const form = document.querySelector('form')
   form.addEventListener('submit', function submitForm(e){
        e.preventDefault()

        commentReview(e.target.childNodes[3].value)
        
        const targetReview = e.target.childNodes[5].children
        for(let i=0; i < targetReview.length; i++){
            if(targetReview[i].classList.contains("activated-star")){
                const createStar = document.createElement('span')
            createStar.textContent = targetReview[i].innerHTML
            console.log(createStar)
            commentSection.append(createStar)
            postReview(createStar)
            }
        }

        console.log(e.target.childNodes[5].children)
        form.reset();
    })
}

function commentReview(content){

    for(let i=0; i<1; i++){
        let comment= document.createElement("p");
        comment.textContent = content;
        commentSection.append(comment);
    }
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
    favorites.addEventListener('click', function filterFavorites() {
        const list = document.getElementsByClassName('card')
        for(let i=0; i < list.length; i++){
            if(list[i].childNodes[5].classList.contains("activated-heart")){
                list[i].style.display = "inline-grid"
                console.log(list[i].childNodes[4])
            }else{
                list[i].style.display = "none"
            }
        }

    })
}



/*
* Variables
*/
const productRating = document.getElementById('starReview');
const stars = productRating.querySelectorAll('.star');
let rating = 0;

/*
* Event Listeners
*/
function postReview(){
    productRating.addEventListener('click', e => {
  if(!e.target.matches('.star')) return;

  const starID = parseInt(e.target.getAttribute('data-star'));
    
  removeClassFromElements('activated-star', stars);
  highlightStars(starID);
  
  rating = starID; // set rating
});
}

// Highlight on hover
productRating.addEventListener('mouseover', e => {
  if(!e.target.matches('.star')) return;
  
  removeClassFromElements('activated-star', stars);
  const starID = parseInt(e.target.getAttribute('data-star'));
  highlightStars(starID);
});

//If a rating has been clicked, snap back to that rating on mouseleave
productRating.addEventListener('mouseleave', e => {
  removeClassFromElements('activated-star', stars);
  if (rating === 0) return;
  highlightStars(rating);
});

/*
* Functions
*/

// Highlight active star and all those upto it
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
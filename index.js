document.addEventListener("DOMContentLoaded", () => {

    getAllCocktails()

    search()
    filterHearts()
    postReview()
    hoverStars() 
    saveRating()
    createForm()
    cocktailMenu()

})

const cardUl = document.getElementById('cocktail-list');
const details = document.getElementById('cocktail-details');
const targetImgDiv = document.getElementById('cocktail-target-img')
const searchBar = document.getElementById('search')
const menuHeader = document.getElementById('cocktail-header')
const commentSection = document.querySelector('#comment-section')
const productRating = document.getElementById('starReview');
const stars = productRating.querySelectorAll('.star');
let rating = 0;
const showCocktails = document.getElementById("cocktails")



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

    cardBtn.addEventListener("click", showDetails, likeDrink)
    
    searchBar.style.display = "block"
    menuHeader.style.display = "block"
    targetImgDiv.innerHTML = ""
    details.innerHTML = ""
    // cardUl.style.display = "block"
}
function getAllCocktails(){
    fetch("http://localhost:3000/drinks")
    .then(res => res.json())
    .then(data => data.map(drink => renderCocktail(drink)))
}


// function handleSubmit(e){
// 	let cocktailObj = {
// 	name:e.target.name.value,
// 	imageUrl:e.target.image_url.value,
// 	description:e.target.description.value,
// 	}
// 	renderCocktail(cocktailObj)
// 	cocktailDetails(cocktailObj)
// }

// function cocktailDetails(cocktailObj){
//     fetch(`http://localhost:3000/drinks`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(cocktailObj)
//     })
//     .then(res => res.json())
//     .then(data => console.log(data))
// }


function showDetails(e){
    // cardUl.innerHTML = ""
    cardUl.style.display = "none"

    targetImgDiv.innerHTML = ""
    details.innerHTML = ""
    searchBar.style.display = "none"
    menuHeader.style.display = "none"
    
    // const targetImg =  e.target.parentNode.getElementsByClassName("cocktailImg")[0]
    // targetImgDiv.append(targetImg)
    
    // const cocktailname = e.target.parentNode.getElementsByClassName("cocktail-name")[0]

    // const targetCocktailDescription = e.target.parentNode.getElementsByClassName("cocktailDescription")[0]
    // targetCocktailDescription.className = "cocktailDescription targetDescription"
    // const targetObj = e.target.parentNode.getElementsByClassName("ingredientsUl")[0]
    // targetObj.style.display = "inline-block"


    // const targetHeart = e.target.parentNode.getElementsByClassName("heart")[0]

    // details.id = e.target.parentNode.id
    
    // details.append(cocktailname, targetCocktailDescription, targetObj, targetHeart)
 
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

    for(let i=0; i< targetIngredientsArr.length; i++){
        const targetIngredients = document.createElement("li")
        targetIngredients.textContent = targetIngredientsArr[i].innerText
        targetUl.append(targetIngredients)
        targetUl.className = "ingredientsUl"
        console.log(targetIngredientsUl)
    }

const targetLike = document.createElement("p")
targetLike.textContent = targetArr[5].innerText
console.log("target array",targetArr[5].className)
targetLike.className = targetArr[5].className
   details.append(targetName, targetDescription, targetUl, targetLike)
details.id = e.target.parentNode.id
targetLike.addEventListener('click', likeDrink)
targetLike.id = "heart" + e.target.parentNode.id
showCocktails.addEventListener("click", (e) => {
    cocktailMenu()
    const updateLike =  e.target.parentNode.parentNode.parentNode.getElementsByClassName("heart")
    const heartArr = [].slice.call(updateLike)
    for(let i = 0; i < heartArr.length; i++){
        if(heartArr[i].id === targetLike.id){
            heartArr[i].className = targetLike.className
        }
    }
})

}

function cocktailMenu(){
    // targetImgDiv.innerHTML = ""
    // details.innerHTML = ""
    // showCocktails.addEventListener('click', () => {
    //    console.log(e.target.parentNode.parentNode.parentNode.getElementsByClassName("heart"))
    //    const updateLike =  e.target.parentNode.parentNode.parentNode.getElementsByClassName("heart")
    //    const heartArr = [].slice.call(updateLike)
    //    console.log(heartArr)
       
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
          console.log("unique:", unique)
          
    
    // })

}
function likeDrink(e){
    const activated = e.target.classList.contains('activated-heart')
    if(!activated){
      e.target.classList.add('activated-heart')
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
    console.log("test",e.target.parentNode.getElementsByClassName("heart"))
    fetch(`http://localhost:3000/drinks/${e.target.parentNode.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(e)
    })
    .then(res => res.json())
    .then(data => likeDrink(data))
}

function filterHearts(){
    const favorites = document.getElementById('favorites')
    favorites.addEventListener('click', function filterFavorites() {
        targetImgDiv.innerHTML = ""
        details.innerHTML = ""
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
         const line = document.createElement('hr')
         commentSection.append(line)
         console.log(e.target.childNodes[5].children)
         removeClassFromElements('activated-star', e.target.childNodes[5].children);
         rating = 0;
         form.reset();
        
         
     })
 }
 
 function commentReview(content){
 
     for(let i=0; i<1; i++){
         let comment= document.createElement("p");
        comment.className = "comment"
         comment.textContent = content;
         commentSection.append(comment);
     }
 }

function postReview(){
    productRating.addEventListener('click', e => {
  if(!e.target.matches('.star')) return;

  const starID = parseInt(e.target.getAttribute('data-star'));
    
  removeClassFromElements('activated-star', stars);
  highlightStars(starID);
  
  rating = starID; // set rating
});
}


function hoverStars() {
    productRating.addEventListener('mouseover', e => {
  if(!e.target.matches('.star')) return;
  
  removeClassFromElements('activated-star', stars);
  const starID = parseInt(e.target.getAttribute('data-star'));
  highlightStars(starID);
});
}


function saveRating(){
    productRating.addEventListener('mouseleave', e => {
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
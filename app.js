'use strict';
let votingRounds = 25;
let storeArr = [];

let imgContainer = document.getElementById('imageContainer');
let imgOne = document.getElementById('imageOne');
let imgTwo = document.getElementById('imageTwo');
let imgThree = document.getElementById('imageThree');

let resultBtn = document.getElementById('showResults');
let list = document.getElementById('list');

function Product (item, fileExtension = 'jpg') {
  this.storeItem = item;
  this.image = `img/${item}.${fileExtension}`;
  this.views = 0;
  this.click = 0;

  storeArr.push(this);
}
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep','png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');


function getRandomIndex(){
  return Math.floor(Math.random()* storeArr.length);
}

function renderImg() {

  let itemRandOne = getRandomIndex();
  let itemRandTwo = getRandomIndex();
  let itemRandThree = getRandomIndex();
  while (itemRandOne === itemRandTwo || itemRandThree === itemRandOne || itemRandTwo === itemRandThree) {
    itemRandTwo = getRandomIndex();
    itemRandThree = getRandomIndex();
  } 
  imgOne.src = storeArr[itemRandOne].image;
  imgOne.alt = storeArr[itemRandOne].storeItem;
  storeArr[itemRandOne].views++;

  imgTwo.src = storeArr[itemRandTwo].image;
  imgTwo.alt = storeArr[itemRandTwo].storeItem;
  storeArr[itemRandTwo].views++;

  imgThree.src = storeArr[itemRandThree].image;
  imgThree.alt = storeArr[itemRandThree].storeItem;
  storeArr[itemRandThree].views++;
}
renderImg();

function handleClick(event) {
  let imgClicked = event.target.alt;

  for(let i =0; i < storeArr.length; i++) {
    if(imgClicked === storeArr[i].storeItem) {
      storeArr[i].click++;
    }
  }

  votingRounds--;
  if(votingRounds === 0) {
    imgContainer.removeEventListener('click',handleClick);
    return;
  }
  renderImg();
}

function handleBtn (event) {
  if(votingRounds === 0) {
    for (let i = 0; i < storeArr.length; i++) {

      let li = document.createElement('li');
      li.innerText = `${storeArr[i].storeItem} had ${storeArr[i].click} votes, and was seen ${storeArr[i].views} times.`;

      list.appendChild(li);

    }
  }
}

imgContainer.addEventListener('click',handleClick);
resultBtn.addEventListener('click',handleBtn);




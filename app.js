'use strict';
let votingRounds = 25;
let storeArr = [];

let imgContainer = document.getElementById('imageContainer');
let imgOne = document.getElementById('imageOne');
let imgTwo = document.getElementById('imageTwo');
let imgThree = document.getElementById('imageThree');


let ctx = document.getElementById('myChart').getContext('2d');

let getArr = localStorage.getItem('items');
let parsedArr = JSON.parse(getArr);


function Product (item, fileExtension = 'jpg') {
  this.storeItem = item;
  this.image = `img/${item}.${fileExtension}`;
  this.views = 0;
  this.click = 0;

  storeArr.push(this);
}
if(getArr){
  storeArr = parsedArr;
}else{
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

}


function getRandomIndex(){
  return Math.floor(Math.random()* storeArr.length);
}

let ranArr = [];
function renderImg() {

  while (ranArr.length < 6) {
    let ranNum = getRandomIndex();
    if (!ranArr.includes(ranNum)) {
      ranArr.push(ranNum);
    }

  }


  let itemRandOne = ranArr.shift();
  let itemRandTwo = ranArr.shift();
  let itemRandThree = ranArr.shift();

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

function renderChart() {

  let itemName = [];
  let voteData = [];
  let viewData = [];

  for(let i = 0; i < storeArr.length; i++) {
    itemName.push(storeArr[i].storeItem);
    voteData.push(storeArr[i].click);
    viewData.push(storeArr[i].views);
  }

  let myChartObj = {
    type: 'bar',
    data: {
      labels: itemName,
      datasets: [{
        label: '# of Votes',
        data: voteData,
        backgroundColor: [
          'red'
        ],
        borderColor: [
          'red'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: viewData,
        backgroundColor: [
          'blue'
        ],
        borderColor: [
          'blue'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {
              size: 20
            }
          }
        }
      }
    }
  };

  const myChart = new Chart(ctx, myChartObj);
}


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

    renderChart();

    let strArr = JSON.stringify(storeArr);
    localStorage.setItem('items',strArr);

    return;
  }
  renderImg();
}



imgContainer.addEventListener('click',handleClick);
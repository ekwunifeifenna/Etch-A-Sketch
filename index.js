// The colmns and rows in the grid

let gridSize = 24;


const container = document.querySelector('.grid-container');

let bgColor= '#ffffff';
container.style.backgroundColor = bgColor;

//Creating all the items to fill the grid
// having the grid with each item at 1fr would leave left over space at the end of the grid
    //  when there were lots of items, doing it this way seemed to fill in that extra space.
    // however the grid broke when there were 3 or less items, so the if statment fixes that


function createGrid() {

    let gridWidth = container.offsetWidth / gridSize;
    container.style.gridTemplateColumns = `repeat(${gridSize - 3}, ${gridWidth}px) 1fr 1fr 1fr`;
    container.style.gridTemplateRows = `repeat(${gridSize - 3}, ${gridWidth}px) 1fr 1fr 1fr`;

    if (gridSize < 4) {
      container.style.gridTemplateColumns = `repeat(${gridSize},1fr`;
      container.style.gridTemplateRows = `repeat(${gridSize}, 1fr`;
    }
  

    // Creating the squares that actually fill the grid
    for (let i = 0; i < gridSize ** 2; i++) {
      const square = document.createElement('div');
      square.classList.add('grid-item');
      square.setAttribute('draggable', 'false');
      square.style.backgroundColor = bgColor;
      container.appendChild(square);
      square.classList.add('border-top-left');
    }



    //add a right border the the right most items
    //this line selects the right most element in every row
    const rightItems = document.querySelectorAll(`.grid-item:nth-child(${gridSize}n)`);


    
    for (let i = 0; i < rightItems.length; i++) {
      rightItems[i].setAttribute('data-right', 'true');
      rightItems[i].classList.toggle('border-right');
    }
  
    // add a bottom border to the bottom most items
    let gridItems = document.querySelectorAll('.grid-item');
    const lastItems = Array.from(gridItems).slice(-`${gridSize}`);
    for (let i = 0; i < lastItems.length; i++) {
      lastItems[i].setAttribute('data-bottom', 'true');
      lastItems[i].classList.toggle('border-bottom');
    }
  }


//   To run the function 
createGrid();
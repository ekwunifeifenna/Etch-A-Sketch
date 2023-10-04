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


// The items in the grid
gridItems = document.querySelectorAll('.grid-item');

// set default colour to black
let ink = '#000000';

//pen color picker
const colorPicker = document.querySelector('#color-select');

//An event listener that listens for an input event for the colrs
colorPicker.addEventListener('input', (e) => {
  ink = e.target.value;  //stores the selected color in ink
  if (grab) {
    grab = false;
    dropper.classList.remove('btn-on');
  }
  // fill = false;
  // colorFillButton.classList.remove('btn-on');
});


// Color picker for the background
// will not change the grid items that have the attribute data-inked = true
const bgColorPicker = document.querySelector('#background-color-select');



// toggle button colour when clicked
const buttons = document.getElementsByTagName('button');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    buttons[i].classList.toggle('btn-on');
  });
}


//The color fill button



//The color getter button
const dropper = document.querySelector('#color-grabber');
let grab = false;
dropper.addEventListener('click', () => {
  // when grab is true, all drawing is frozen until a color is selected
  if (grab) {
    grab = false;
    dropper.classList.remove('btn-on');
  } else {
    grab = true;
  }

  if (fill) {
    fill = false;
    colorFillButton.classList.remove('btn-on');
  }
});



//The Eraser button
let eraser = false;
const eraserButton = document.querySelector('#eraser-btn');
eraserButton.addEventListener('click', () => {
  if (eraser) {
    eraser = false;
  } else {
    eraser = true;
    shading = false;
    shaderButton.classList.remove('btn-on');
    rainbow = false;
    rainbowButton.classList.remove('btn-on');
    lighten = false;
    lightenButton.classList.remove('btn-on');
  }

  if (grab) {
    grab = false;
    dropper.classList.remove('btn-on');
  }
});




//The Rainbow button
let rainbow = false;
const rainbowButton = document.querySelector('#rainbow-btn');
rainbowButton.addEventListener('click', () => {
  if (rainbow) {
    rainbow = false;
  } else {
    rainbow = true;
    shading = false;
    shaderButton.classList.remove('btn-on');
    lighten = false;
    lightenButton.classList.remove('btn-on');
    eraser = false;
    eraserButton.classList.remove('btn-on');
  }

  if (grab) {
    grab = false;
    dropper.classList.remove('btn-on');
  }
});


//The Shading button
let shading = false;
const shaderButton = document.querySelector('#shader-btn');
shaderButton.addEventListener('click', () => {
  if (shading) {
    shading = false;
  } else {
    shading = true;
    rainbow = false;
    rainbowButton.classList.remove('btn-on');
    lighten = false;
    lightenButton.classList.remove('btn-on');
    eraser = false;
    eraserButton.classList.remove('btn-on');
  }
  if (grab) {
    grab = false;
    dropper.classList.remove('btn-on');
  }
});







//The lighten button
let lighten = false;
const lightenButton = document.querySelector('#lighten-btn');
lightenButton.addEventListener('click', () => {
  if (lighten) {
    lighten = false;
  } else {
    lighten = true;
    shading = false;
    shaderButton.classList.remove('btn-on');
    rainbow = false;
    rainbowButton.classList.remove('btn-on');
    eraser = false;
    eraserButton.classList.remove('btn-on');
  }
  if (grab) {
    grab = false;
    dropper.classList.remove('btn-on');
  }
});



//The function for the shading
function RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(',') > -1 ? ',' : ' ';
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(')')[0].split(sep);
  
    let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);
  
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    b = (+rgb[2]).toString(16);
  
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    return '#' + r + g + b;
  }

  function adjust(RGBToHex, rgb, amount) {
    let color = RGBToHex(rgb);
    return (
      '#' +
      color
        .replace(/^#/, '')
        .replace(/../g, (color) =>
          ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
        )
    );
  }


//Create a random color function 
function randomColor() {
    // return "#" + Math.floor(Math.random()*16777215).toString(16);
    // this returns fewer colors but they are all nice and bright
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
  }

  
  //Slider Function
  function rangeSlider(value) {
    let gridLabels = document.querySelectorAll('#range-value');
    progressBar.style.width = (value / 60) * 100 + '%';
    for (let i = 0; i < gridLabels.length; i++) {
      gridLabels[i].textContent = value;
    }
    // document.querySelectorAll('#range-value').textContent = value;
    gridSize = parseInt(value);
    deleteGrid();
    createGrid();
    listen();
    reInit();
    // turn the grid button back on if it is off.
    const gridButton = document.querySelector('#grid-btn');
    if (gridButton.classList.contains('btn-on')) {
      //pass
    } else {
      gridButton.classList.toggle('btn-on');
    }
  }
  
  function reInit() {
    deleteGrid();
    createGrid();
    listen();
  }

  function rangeSliderValue(value) {
    let gridLabels = document.querySelectorAll('#range-value');
    for (let i = 0; i < gridLabels.length; i++) {
      gridLabels[i].textContent = value;
    }
    progressBar.style.width = (value / 60) * 100 + '%';
  }




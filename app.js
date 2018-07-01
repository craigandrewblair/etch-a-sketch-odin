window.onload = function onload() {
  let currentGridSize = 16;

  // create div with classname and content
  const createAppendNewDivWithContent = (newElemName, className, id, newElemTxtContent,
    divIdToAppendTo) => {
    // create div
    const newDiv = document.createElement(newElemName);
    // add class
    newDiv.className = className;
    // add id
    newDiv.id = id;
    // add content
    const newContent = document.createTextNode(newElemTxtContent);
    // add text node to new div
    newDiv.appendChild(newContent);
    // add the new element with content to DOM
    const currentDiv = document.getElementById(divIdToAppendTo);
    currentDiv.appendChild(newDiv);
  };

    // create custom size grid
  const createGrid = (w) => {
    const sqWide = w;
    const totalSqs = sqWide * sqWide;
    const widthPx = 480 / sqWide;
    const sqWidthHeight = `${widthPx}px`;
    for (let i = 0; i < totalSqs; i += 1) {
      createAppendNewDivWithContent('div', 'sq-div', '', '', 'grid');
    }
    const nodes = document.querySelectorAll('.sq-div');
    for (let i = 0; i < nodes.length; i += 1) {
      nodes[i].style.width = sqWidthHeight;
      nodes[i].style.height = sqWidthHeight;
    }
  };
  createGrid(16);

  // change square div color on hover
  const increaseOpacity = () => {
    const nodes = document.querySelectorAll('.sq-div');
    for (let i = 0; i < nodes.length; i += 1) {
      nodes[i].onmouseover = function mouseOverOpacity() {
        let curOpacity = 0;
        curOpacity = parseFloat(curOpacity + this.style.opacity);
        if (curOpacity < 1) {
          curOpacity += 0.1;
        }
        nodes[i].style.opacity = curOpacity;
      };
    }
  };
  increaseOpacity();

  // set resize knob text
  function resizeKnobText() {
    document.querySelector('#knob-1').textContent = `${currentGridSize}  x  ${currentGridSize}`;
  }
  resizeKnobText();

  // prompt user for grid size and change accordingly
  const gridSizePromptAndChange = () => {
    const size = this.prompt('Please enter the width of grid required', '16');
    createGrid(size);
    increaseOpacity();
    currentGridSize = size;
    resizeKnobText();
  };

  // set events
  // resize button
  const sizeBtn = document.querySelector('#knob-1');
  sizeBtn.onclick = () => {
    const gridDiv = document.querySelector('#grid');
    gridDiv.innerHTML = '';
    gridSizePromptAndChange();
  };

  // reset button
  const resetBtn = document.querySelector('#knob-2');
  resetBtn.onclick = () => {
    const gridDiv = document.querySelector('#grid');
    gridDiv.innerHTML = '';
    createGrid(currentGridSize);
    increaseOpacity();
  };
};

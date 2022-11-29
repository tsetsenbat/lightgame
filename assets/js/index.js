const menuText = document.querySelector('#menu-text-container');
const select = document.querySelector('select');
const startButton = document.querySelector('button');
const controlsDiv = document.querySelector('div#controls');
const table = document.querySelector('table');

const nameInput = document.querySelector('#name-input');
const mapInput = document.querySelector('#map-input');

const controlsForm = document.querySelector('#controls-form');
controlsForm.style.display = 'none';
const lightbulb = '💡';
const displayNameSpan = document.querySelector('span#display-name');
displayNameSpan.style.display = 'none';
const timerSpan = document.querySelector('span#timer')
timerSpan.style.display = 'none';
const restartBtn = document.querySelector('#restart-button');
restartBtn.style.display = 'none';

let board = null
let blackCell = null
let whiteCell = null
let startTime = null

// Styles for the map selector

select.addEventListener('change', () => {
    if (select.value != 'custom') {
        controlsForm.style.display = 'none';
    } else {
        controlsForm.style.display = 'block';
    }
})

//Events for when start button is clicked.

startButton.addEventListener('click', function () {
    if (select.value === 'easy') {
        startGame(7);
    } else if (select.value === 'advanced') {
        startGame(7)
    } else if (select.value === 'extreme') {
        startGame(10)
    } else {
        let n = mapInput.value;
        startGame(n);
    }
})

//Main function for starting the game.

function startGame(n) {
    menuText.style.display = 'none';
    controlsDiv.style.display = 'none';
    table.innerHTML = '';
    startTime = Date.now();
    timerSpan.style.display = 'block';
    displayNameSpan.innerHTML = nameInput.value;
    displayNameSpan.style.display = 'block';
    restartBtn.style.display = 'block';

    for (let i = 0; i < n; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < n; j++) {
            let td = document.createElement('td');
            td.dataset.litBy = 0;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    generateMap();
}

// Drawing the map based on selected difficulty.

function generateMap() {
    if (select.value === 'easy') {
        blackCell = [[0, 3], [1, 1], [1, 5], [3, 0], [3, 3], [3, 6], [5, 1], [5, 5], [6, 3]];
        for (let i = 0; i < blackCell.length; i++) {
            let x = blackCell[i][0];
            let y = blackCell[i][1];
            let cell = table.rows[x].cells[y];
            cell.style.backgroundColor = 'black';

            let random = Math.floor(Math.random() * 3);
            if (random !== 0) {
                cell.innerText = random;
                cell.style.color = 'white';
            }
        }
    } else if (select.value === 'advanced') {
        blackCell = [[0, 1], [0, 5], [1, 3], [2, 0], [2, 6], [3, 3], [4, 0], [4, 6], [5, 3], [6, 1], [6, 5]];
        for (let i = 0; i < blackCell.length; i++) {
            let x = blackCell[i][0];
            let y = blackCell[i][1];
            let cell = table.rows[x].cells[y];
            cell.style.backgroundColor = 'black';

            let random = Math.floor(Math.random() * 4);
            if (random !== 0) {
                cell.innerText = random;
                cell.style.color = 'white';
            }
        }
    } else if (select.value === 'extreme') {
        blackCell = [];
        for (let i = 0; i < 20; i++) {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            let cell = table.rows[x].cells[y];
            cell.style.backgroundColor = 'black';

            let random = Math.floor(Math.random() * 4);
            if (random !== 0) {
                cell.innerText = random;
                cell.style.color = 'white';
            }
        }
    } else {
        blackCell = [];
        for (let i = 0; i < mapInput.value * 2; i++) {
            let x = Math.floor(Math.random() * parseInt(mapInput.value));
            let y = Math.floor(Math.random() * parseInt(mapInput.value));
            let cell = table.rows[x].cells[y];
            cell.style.backgroundColor = 'black';

            let random = Math.floor(Math.random() * 4);
            if (random !== 0) {
                cell.innerText = random;
                cell.style.color = 'white';
            }
        }
    }
}

//Event for when a cell is clicked.

table.addEventListener('click', function (e) {
    if (e.target.style.backgroundColor !== 'black') {
        if (e.target.innerText === lightbulb) {
            e.target.innerText = '';
        } else {
            e.target.innerText = lightbulb;
        }
    } else {
        alert('You can not place a light bulb on a black cell!');
    }

    let whiteCell = [];
    let blackCell = [];
    let lightbulbCell = [];
    let n = table.rows.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let cell = table.rows[i].cells[j];
            if (cell.style.backgroundColor === 'black') {
                blackCell.push([i, j]);
            } else if (cell.innerText === lightbulb) {
                lightbulbCell.push([i, j]);
            } else {
                whiteCell.push([i, j]);
            }
        }
    }

    for (let i = 0; i < whiteCell.length; i++) {
        let x = whiteCell[i][0];
        let y = whiteCell[i][1];
        let cell = table.rows[x].cells[y];
        cell.style.backgroundColor = 'white';
    }

    for (let i = 0; i < lightbulbCell.length; i++) {
        let x = lightbulbCell[i][0];
        let y = lightbulbCell[i][1];
        let cell = table.rows[x].cells[y];
        cell.style.backgroundColor = 'yellow';

        //Moving upward

        for (let j = x - 1; j >= 0; j--) {
            let cell = table.rows[j].cells[y];
            if (cell.style.backgroundColor !== 'black') {
                cell.style.backgroundColor = 'yellow';
            } else {
                break;
            }
        }

        //Moving downward

        for (let j = x + 1; j < n; j++) {
            let cell = table.rows[j].cells[y];
            if (cell.style.backgroundColor !== 'black') {
                cell.style.backgroundColor = 'yellow';
            } else {
                break;
            }
        }

        //Moving left

        for (let j = y - 1; j >= 0; j--) {
            let cell = table.rows[x].cells[j];
            if (cell.style.backgroundColor !== 'black') {
                cell.style.backgroundColor = 'yellow';
            } else {
                break;
            }
        }

        //Moving right

        for (let j = y + 1; j < n; j++) {
            let cell = table.rows[x].cells[j];
            if (cell.style.backgroundColor !== 'black') {
                cell.style.backgroundColor = 'yellow';
            } else {
                break;
            }
        }
    }

    for (let i = 0; i < blackCell.length; i++) {
        let x = blackCell[i][0];
        let y = blackCell[i][1];
        let cell = table.rows[x].cells[y];
        cell.style.backgroundColor = 'black';
    }

    // let solved = false;
    // for (let i = 0; i < n; i++) {
    //     for (let j = 0; j < n; j++) {
    //         let cell = table.rows[i].cells[j];
    //         if (cell.style.backgroundColor === 'black' && cell.innerText !== '') {
    //             let count = 0;
    //             for (let k = i - 1; k >= 0; k--) {
    //                 let cell = table.rows[k].cells[j];
    //                 if (cell.style.backgroundColor === 'yellow') {
    //                     count++;
    //                 } else {
    //                     break;
    //                 }
    //                 console.log(count)
    //             }
    //             for (let k = i + 1; k < n; k++) {
    //                 let cell = table.rows[k].cells[j];
    //                 if (cell.style.backgroundColor === 'yellow') {
    //                     count++;
    //                 } else {
    //                     break;
    //                 }
    //                 console.log(count)
    //             }
    //             for (let k = j - 1; k >= 0; k--) {
    //                 let cell = table.rows[i].cells[k];
    //                 if (cell.style.backgroundColor === 'yellow') {
    //                     count++;
    //                 } else {
    //                     break;
    //                 }
    //                 console.log(count)
    //             }
    //             for (let k = j + 1; k < n; k++) {
    //                 let cell = table.rows[i].cells[k];
    //                 if (cell.style.backgroundColor === 'yellow') {
    //                     count++;
    //                 } else {
    //                     break;
    //                 }
    //                 console.log(count)
    //             }
    //             if (count === parseInt(cell.innerText)) {
    //                 solved = true; 
    //                 break;
    //             }
    //         }
    //     }
    // }

    //Winning condition: If all white cells are yellow, then the player wins.

    let count = 0;
    for (let i = 0; i < whiteCell.length; i++) {
        let x = whiteCell[i][0];
        let y = whiteCell[i][1];
        let cell = table.rows[x].cells[y];
        if (cell.style.backgroundColor === 'yellow') {
            count++;
        }
    }

    if (count === whiteCell.length) {
        alert('You win!');
    }
})

setInterval(function () {
    let dt = Math.floor((Date.now() - startTime) / 1000)
    let sec = String(dt % 60).padStart(2, '0')
    let min = ('0' + Math.floor(dt / 60)).slice(-2)
    timerSpan.innerText = `${min}:${sec}`
}, 500)

restartBtn.addEventListener('click', function () {
    window.location.reload()
})


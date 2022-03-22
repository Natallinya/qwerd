let sizeOfBoard = 9;
let sizeOfLine = 3;
let cellCollection;
let player;
let moveByX;
let moveByY;
let moveCount;
let winnerArray;
let isComputer = false;
let boardSize = new Array(sizeOfBoard);
let playerTitle = document.getElementById('player');
let clearAll = document.getElementById('clearAll');
let both = document.getElementById('both');
let mode = document.getElementById('mode');
let computerButton = document.getElementById('computer');
clearAll.addEventListener('click', clear)
both.addEventListener('click', bothPlayer)
computerButton.addEventListener('click', computerPlayer);
let winnerResults = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

(function initTable() {
    let board = document.getElementById('board');
    for (let i = 0; i < boardSize.length; i++) {
        let cell = document.createElement('div');
        cell.classList.add('board__cell');
        cell.setAttribute('index', i.toString());
        cell.id = i.toString();
        board.appendChild(cell);
    }
    addModEvent();
    initVariable();
}());

function move() {
    let target = window.event.currentTarget;
    if (!target.innerText) {
        target.innerText = player;
        player === 'x' ? moveByX.push(+target.getAttribute('index')) :
            moveByY.push(+target.getAttribute('index'));
        moveCount++;
        if (checkWinner(moveByX) || checkWinner(moveByY)) {
            showResult(target);
            return;
        }
        if (isComputer) {
            player = 'o';
            playerTitle.innerHTML = `Ходит игрок ${player}`;
            computerStep(target);
        }
            player = player === 'x' ? 'o' : 'x';
            playerTitle.innerHTML = `Ходит игрок ${player}`;
    }

}

function computerStep() {
    for (let i = 0; i < boardSize.length; i++) {
        let elem = document.getElementById(i.toString());
        if (elem.innerText === "") {
            moveByY.push(+elem.getAttribute('index'));
            if (checkWinner(moveByY)) {
                showResult(elem);
                return;
            } else {
                moveByY.pop();
            }
        }
    }
    for (let i = 0; i < boardSize.length; i++) {
        let elem = document.getElementById(i.toString());
        if (elem.innerText === "") {
            moveByX.push(+elem.getAttribute('index'));
            if (checkWinner(moveByX)) {
                moveByY.push(+elem.getAttribute('index'));
                elem.innerText = player;
                moveByX.pop();
                moveCount++;
                if (checkWinner(moveByY)) {
                    showResult(elem);
                }
                return;
            } else {
                moveByX.pop();
            }
        }
    }
    randomStep();
}

function randomStep() {
    let i = Math.floor(Math.random() * sizeOfBoard);
    let elem = document.getElementById(i.toString());
    while (elem.innerText !== "") {
        i = Math.floor(Math.random() * sizeOfBoard);
        elem = document.getElementById(i.toString());
    }
    moveCount++;
    elem.innerText = player;
    moveByY.push(+elem.getAttribute('index'));
    if (checkWinner(moveByY)) {
        showResult(elem);
    }
}

function addModEvent() {
    cellCollection = document.querySelectorAll('.board__cell');
    for (let i = 0; i < cellCollection.length; i++) {
        cellCollection[i].addEventListener('click', move);
    }
}

function bothPlayer() {
    clear();
    mode.innerHTML = 'Два игрока';
}

function computerPlayer() {
    clear();
    isComputer = true;
    mode.innerHTML = 'Игра с компьютером';
}

function clear() {
    cellCollection.forEach(item => item.innerText = '');
    initVariable();
}

function initVariable() {
    player = 'x';
    moveByX = [];
    moveByY = [];
    moveCount = 0;
    winnerArray = [];
    playerTitle.innerHTML = `Ходит игрок X`;
}

function checkWinner(checkArray) {
    if (checkArray.length >= sizeOfLine) {
        winnerArray = winnerResults.find(item => !item.some(elem => checkArray.indexOf(elem) === -1)) || [];
        return !!(winnerArray.length || moveCount === sizeOfBoard);

    }
}

function showResult(elem) {
    if (winnerResults.find(item => !item.some(elem => moveByY.indexOf(elem) === -1))) {
        elem.innerText = player;
        setTimeout(() => { alert(`Победитель игрок О`); clear();}, 1000);
        return;
    }
    if (winnerResults.find(item => !item.some(elem => moveByX.indexOf(elem) === -1))) {
        elem.innerText = player;
        setTimeout(() => { alert(`Победитель игрок X`); clear();}, 1000);
        return;
    }
    if (moveCount === sizeOfBoard) {
        elem.innerText = player;
        setTimeout(() => {  alert('Ничья!'); clear();}, 1000);
    }
}

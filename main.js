const map = [
    "    WWWWW          ",
    "    W   W          ",
    "    WB  W          ",
    "  WWW  BWW         ",
    "  W  B B W         ",
    "WWW W WW W   WWWWWW",
    "W   W WW WWWWW  OOW",
    "W B  B          OOW",
    "WWWWW WWW WSWW  OOW",
    "    W     WWWWWWWWW",
    "    WWWWWWW        "
]

const main = document.getElementById("maze");

for (let i = 0; i < map.length; i++) {
    let row = map[i];
    let mazeBoard = document.createElement("div");
    mazeBoard.classList.add("mazeRow");
    for (let j = 0; j < row.length; j++) {
        let cell = document.createElement("div");
        cell.dataset.rowIndex = i;
        cell.dataset.cellIndex = j;
        mazeBoard.appendChild(cell);

        switch (row[j]) {
            case "W":
                cell.classList.add("borderWall");
                cell.dataset.cellType = "border";
                break;

            case "S":
                cell.setAttribute("id", "start");
                cell.dataset.cellType = "start";
                break;

            case " ":
                cell.classList.add("blankSpace");
                cell.dataset.cellType = "floor";
                break;

            case "O":
                cell.classList.add("openStorage");
                cell.dataset.cellType = "floor";
                break;

            case "B":
                cell.classList.add("blankSpace");
                cell.dataset.cellType = "floor";
                const box = document.createElement("div");
                box.classList.add("box");
                box.dataset.cellType = "box";
                cell.appendChild(box);
                break;

        }
    }
    main.appendChild(mazeBoard)
}

// console.log(document.querySelectorAll("ul>li:not([id=player])").length)

function checkWin() {
    let winCount = 0;
    const hole = document.querySelectorAll(".openStorage");
    hole.forEach(element => {
        let foo = element.childElementCount;
        if (foo === 1 && element.firstChild.id !== "player") {
            winCount++;
        }
        if (winCount === 6) {

            setTimeout(function () {
                alert("You Win!");
            }, 500);
        }
    })
}
checkWin()

let boxTop;
let boxLeft;
let x;
let y;

const player = document.getElementById("player");

let start = document.getElementById("start");
start.appendChild(player);

let currentPosition = start;

function findNextPosition(element, rowOffset, columnOffset) {
    const nextRowPosition = Number(element.dataset.rowIndex) + rowOffset;
    const nextColumnPosition = Number(element.dataset.cellIndex) + columnOffset;
    const nextCellElement = document.querySelector("[data-row-index = '" + nextRowPosition + "'][data-cell-index = '" + nextColumnPosition + "']");

    return nextCellElement;
}

document.addEventListener('keydown', (event) => {
    let nextCell
    let followingCell

    switch (event.key) {

        case 'ArrowUp':
            nextCell = findNextPosition(currentPosition, -1, 0)
            followingCell = findNextPosition(nextCell, -1, 0)
            break;

        case 'ArrowDown':
            nextCell = findNextPosition(currentPosition, +1, 0)
            followingCell = findNextPosition(nextCell, +1, 0)
            break;

        case 'ArrowLeft':
            nextCell = findNextPosition(currentPosition, 0, -1)
            followingCell = findNextPosition(nextCell, 0, -1)
            break;

        case 'ArrowRight':
            nextCell = findNextPosition(currentPosition, 0, +1)
            followingCell = findNextPosition(nextCell, 0, +1)
            break;

    }


    if (nextCell) {

        const box = nextCell.firstElementChild;

        if (box && box.dataset.cellType === "box" &&
            followingCell.dataset.cellType === "floor" &&
            followingCell.childElementCount === 0) {

            followingCell.appendChild(box);

        }

        if (nextCell.dataset.cellType === "floor" && nextCell.childElementCount === 0) {

            nextCell.appendChild(player);
            currentPosition = nextCell;

        }
    }
    checkWin();
})
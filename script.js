const cells = document.querySelectorAll(".cell")
const btn = document.getElementById("my-btn")
const info1 = document.querySelector(".info1")
const info2 = document.querySelector(".info2")
btn.addEventListener("click", newGame)

var clickCount = 0
var scoreDraw = 0
var gameCount = 1
var player1 = {
    name: "player1",
    score: 0,
    letter: 'X'
}
var player2 = {
    name: "player2",
    score: 0,
    letter: 'O'
}

function winAnimation(cells){
   cells.forEach(cell => {
       cell.style.color="red"
    });
}   

function win(player) {
    var winStatus = false
    winCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]]
    winCombinations.forEach(combination => {
        var cell1Node = cells[combination[0]]
        var cell1 = cell1Node.innerText
        var cell2Node = cells[combination[1]]
        var cell2 = cell2Node.innerText
        var cell3Node = cells[combination[2]]
        var cell3 = cell3Node.innerText
        if (cell1 == cell2 && cell2 == cell3 && cell1 == player.letter && cell1 != "") {
            player.score++
            let playerScoreUpdate = document.querySelector(`.${player.name}`)
            playerScoreUpdate.innerText = player.score
            winStatus = true
            winAnimation([cell1Node, cell2Node, cell3Node])
        }
    });
    return winStatus
}

function newGame() {
    gameCount++
    cells.forEach(cell => {
        cell.style.pointerEvents = "all"
        cell.style.color="white"
        cell.innerText = ""
        if (gameCount % 2 == 0) {
            clickCount = 0
            info1.style.color = "red"
            info2.style.color = "white"
        }
        else {
            clickCount = 1
            info1.style.color = "white"
            info2.style.color = "red"
        }
    });
}



function draw() {
    let flag = true
    cells.forEach(cell => {
        if (cell.innerText == "")
            flag = false
    });
    return flag
}

newGame()

cells.forEach(cell => {
    cell.addEventListener("click", function (event) {
        if (cell.innerText == "") {
            if (clickCount % 2 == 0) {
                cell.innerText = "X"
                info1.style.color = "white"
                info2.style.color = "red"
            }
            else {
                cell.innerText = "O"
                info1.style.color = "red"
                info2.style.color = "white"
            }
            clickCount++
        }
        if (win(player1) || win(player2)) {
            cells.forEach(cell => {
                cell.style.pointerEvents = "none"
            });
            setTimeout(newGame, 3000)
        }
        else
            if (draw()) {
                scoreDraw++
                document.querySelector(".draw").innerText = scoreDraw
                setTimeout(newGame, 3000)
            }
    })
});





const fs = require('fs')

const content = fs.readFileSync('./input.txt', 'utf-8')

const lines = content.split("\n").map(l => l.trim())

const grid = []
let startPosition = { row: 0, col: 0, count: 0 }
let row = 0
let rowSize, colSize
for (const line of lines) {
    if (!line) continue
    if (line.includes("S")) {
        startPosition.row = row
        startPosition.col = line.indexOf("S")
        colSize = line.split("").length
    }
    grid.push(line.split(""))
    row++
}

rowSize = grid.length
const positions = []

function canGoLeft(row, col) {
    if (col - 1 < 0) return false
    const leftTile = grid[row][col - 1]
    if (leftTile === '-' || leftTile === 'L' || leftTile === "F") return true
    return false
}

function canGoRight(row, col) {
    if (col + 1 >= colSize) return false
    const rightTile = grid[row][col + 1]
    if (rightTile === '-' || rightTile === '7' || rightTile === "J") return true
    return false
}

function canGoDown(row, col) {
    if (row + 1 >= rowSize) return false;
    const downTile = grid[row + 1][col]
    if (downTile === "|" || downTile === "L" || downTile === "J") return true
    return false
}

function canGoUp(row, col) {
    if (row - 1 < 0) return false;
    const upTile = grid[row - 1][col]
    if (upTile === "|" || upTile === "7" || upTile === "F") return true
    return false
}

if (canGoLeft(startPosition.row, startPosition.col)){
    positions.push({row: startPosition.row, col: startPosition.col - 1, count: 1})
}
if (canGoRight(startPosition.row, startPosition.col)){
    positions.push({row: startPosition.row, col: startPosition.col + 1, count: 1})
}
if (canGoUp(startPosition.row, startPosition.col)){
    positions.push({row: startPosition.row - 1, col: startPosition.col, count: 1})
}
if (canGoDown(startPosition.row, startPosition.col)){
    positions.push({row: startPosition.row + 1, col: startPosition.col, count: 1})
}

function move(prevPosition, currentPosition){
    const currentTile = grid[currentPosition.row][currentPosition.col]
    switch(currentTile){
        case "|":
            if(prevPosition.row > currentPosition.row){
                currentPosition.row--
                prevPosition.row--
            } else {
                currentPosition.row++
                prevPosition.row++
            }
            break
        case "-":
            if(prevPosition.col > currentPosition.col){
                currentPosition.col--
                prevPosition.col--
            } else {
                currentPosition.col++
                prevPosition.col++
            }
            break
        case "L":
            if(prevPosition.row < currentPosition.row){
                currentPosition.col++
                prevPosition.row++
            } else {
                currentPosition.row--
                prevPosition.col--
            }
            break
        case "J":
            if(prevPosition.row < currentPosition.row){
                currentPosition.col--
                prevPosition.row++
            } else {
                currentPosition.row--
                prevPosition.col++
            }
            break
        case "7":
            if(prevPosition.row > currentPosition.row){
                currentPosition.col--
                prevPosition.row--
            } else {
                currentPosition.row++
                prevPosition.col++
            }
            break
        case "F":
            if(prevPosition.row > currentPosition.row){
                currentPosition.col++
                prevPosition.row--
            } else {
                currentPosition.row++
                prevPosition.col--
            }
            break
        case ".":
            console.log("Wrong path")
            break
        case "S":
            console.log("Reached start")
            break
    }
    currentPosition.count++
    return [prevPosition, currentPosition]
}

function startWithTwoPossibleWays(way1, way2){
    let prevWay1 = {...startPosition}
    let prevWay2 = {...startPosition}
    while(way1.row !== way2.row || way1.col !== way2.col){
        [prevWay1, way1] = move(prevWay1, way1)
        if(way1.row === way2.row && way1.col === way2.col){
            return way1.count
        }
        [prevWay2, way2] = move(prevWay2, way2)
    }
    return way1.count
}

if(positions.length === 2){
    console.log(startWithTwoPossibleWays(positions[0], positions[1]))
}


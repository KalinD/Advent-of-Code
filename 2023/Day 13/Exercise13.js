const fs = require('fs')

const content = fs.readFileSync('./testInput.txt', 'utf-8')

const lines = content.split("\n").map(l => l.trim())

const allGrids = []

let currentGrid = []

for (const line of lines) {
    if (!line) {
        allGrids.push(currentGrid)
        currentGrid = []
        continue
    }
    currentGrid.push(line.split(""))
}

function getMirrorIndexesOfArray(arr) {
    const indexes = []

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            let tmp1 = i, tmp2 = i + 1
            while (arr[tmp1] === arr[tmp2] && tmp1 >= 0 && tmp2 < arr.length) {
                tmp1--
                tmp2++
            }
            if (tmp1 === -1 || tmp2 === arr.length) {
                indexes.push(i + 1) // Indexing in Problem starts at 1
            }
        }
    }
    return indexes
}

function getRepeatingIndex(indexes) {
    let arr1 = indexes[0]
    for (let i = 1; i < indexes.length; i++) {
        if (indexes[i].includes(-1)) return -1
        arr1 = indexes[i].filter(index => arr1.includes(index))
    }
    return arr1.length === 0 ? -1 : arr1[0]
}

function getMirrorRow(grid) {
    const indexes = []
    for (let col = 0; col < grid[0].length; col++) {
        const column = []
        for (let row = 0; row < grid.length; row++) {
            column.push(grid[row][col])
        }
        indexes.push(getMirrorIndexesOfArray(column))
    }
    return getRepeatingIndex(indexes)
}

function getMirrorColumn(grid) {
    const indexes = []
    for (let row = 0; row < grid.length; row++) {
        indexes.push(getMirrorIndexesOfArray(grid[row]))
    }
    return getRepeatingIndex(indexes)
}

const columnsToTheLeft = []
const rowsAbove = []

for (const grid of allGrids) {
    const column = getMirrorColumn(grid)
    if(column !== -1) columnsToTheLeft.push(column)
    else rowsAbove.push(getMirrorRow(grid))
}

let sum = columnsToTheLeft.reduce((p, c) => p + c, 0) + 100 * rowsAbove.reduce((p, c) => p + c, 0)
console.log("Sum of all nodes:", sum)


const smudgeColumnsToTheLeft = []
const smudgeRowsAbove = []

for (const grid of allGrids) {
    const gridRowsAbove = []
    const gridColumnsToTheLeft = []
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            const copyGrid = [...grid.map(row => [...row])]
            copyGrid[i][j] = copyGrid[i][j] === "." ? "#" : "."
            const row = getMirrorRow(copyGrid)
            const column = getMirrorColumn(copyGrid)
            if (row !== -1) {
                gridRowsAbove.push(row)
            }
            if (column !== -1 && row === -1) {
                gridColumnsToTheLeft.push(column)
            }
        }
    }
    if (gridRowsAbove.length > 0) {
        smudgeRowsAbove.push(Math.min(...gridRowsAbove))
    } else {
        smudgeColumnsToTheLeft.push(Math.min(...gridColumnsToTheLeft))
    }
}


sum = smudgeColumnsToTheLeft.reduce((p, c) => p + c, 0) + 100 * smudgeRowsAbove.reduce((p, c) => p + c, 0)
console.log("Sum of all smudged nodes:", sum)

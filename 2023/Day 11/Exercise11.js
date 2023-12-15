const fs = require('fs')

const content = fs.readFileSync('./input.txt', 'utf-8')

const lines = content.split("\n").map(l => l.trim())

const originalGalaxy = []
for (const line of lines) {
    if (!line) continue
    originalGalaxy.push([...line.split("")])
}

const emptyRows = []
let emptyCols = [...Array(originalGalaxy[0].length).keys()];
const galaxyLocations = []

for (let row = 0; row < originalGalaxy.length; row++) {
    let isEmptyRow = true
    for (let col = 0; col < originalGalaxy[row].length; col++) {
        if (originalGalaxy[row][col] === "#") {
            emptyCols = emptyCols.filter(x => x !== col)
            isEmptyRow = false
            galaxyLocations.push({ row, col })
        }
    }
    if (isEmptyRow) emptyRows.push(row)
}

function getDistanceBetweenGalaxies(galaxy1, galaxy2, emptyIncrease = 1) {
    function isRowBetweenGalaxies(row, galaxy1, galaxy2) {
        return (galaxy1.row > row && row > galaxy2.row) || (galaxy1.row < row && row < galaxy2.row)
    }
    function isColBetweenGalaxies(col, galaxy1, galaxy2) {
        return (galaxy1.col > col && col > galaxy2.col) || (galaxy1.col < col && col < galaxy2.col)
    }

    const emptyRowsPassed = emptyRows.filter(row => isRowBetweenGalaxies(row, galaxy1, galaxy2))
    const emptyColsPassed = emptyCols.filter(col => isColBetweenGalaxies(col, galaxy1, galaxy2))
    const toAdd = (emptyRowsPassed.length + emptyColsPassed.length) * emptyIncrease
    if (emptyIncrease !== 1) return Math.abs(galaxy2.row - galaxy1.row) + Math.abs(galaxy1.col - galaxy2.col) - (emptyRowsPassed.length + emptyColsPassed.length) + toAdd
    return Math.abs(galaxy2.row - galaxy1.row) + Math.abs(galaxy1.col - galaxy2.col) + toAdd

}

const distances = []
for (let index1 = 0; index1 < galaxyLocations.length - 1; index1++) {
    for (let index2 = index1 + 1; index2 < galaxyLocations.length; index2++) {
        distances.push(getDistanceBetweenGalaxies(galaxyLocations[index1], galaxyLocations[index2]))
    }
}
console.log("Sum of distance between galaxies:", distances.reduce((p, c) => p + c, 0))

const newDistances = []
for (let index1 = 0; index1 < galaxyLocations.length - 1; index1++) {
    for (let index2 = index1 + 1; index2 < galaxyLocations.length; index2++) {
        newDistances.push(getDistanceBetweenGalaxies(galaxyLocations[index1], galaxyLocations[index2], 1000000))
    }
}

console.log("New sum of distance between galaxies:", newDistances.reduce((p, c) => p + c, 0))

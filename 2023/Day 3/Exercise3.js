const fs = require('fs')

const content = fs.readFileSync('./input.txt', 'utf-8')

const lines = content.split("\n")

const martix = []
let row = 0

for (const line of lines) {
    if (!line) continue
    martix.push([])
    const actialLine = line.trim()
    for (let i = 0; i < actialLine.length; i++) {
        if (actialLine[i] === '.') {
            martix[row].push('.')
        }
        else if ('0' <= actialLine[i] && actialLine[i] <= '9') {
            let j = i
            let number = Number(actialLine[j])
            j++;
            while (j < actialLine.length && '0' <= actialLine[j] && actialLine[j] <= '9') {
                number = number * 10 + Number(line[j])
                j++
            }
            while (i < j) {
                martix[row].push(number)
                i++;
            }
            i--;
        }
        else if (actialLine[i] === '*'){
            martix[row].push('*')
        } else {
            martix[row].push('#')
        }
    }
    row++;
}

const numbersToSum = []

for (let row = 0; row < martix.length; row++) {
    for (let col = 0; col < martix[row].length; col++) {
        if (martix[row][col] === '*' || martix[row][col] === '#') {
            if (typeof martix[row][col - 1] === "number") { // Left
                numbersToSum.push(martix[row][col - 1])
            }
            if (typeof martix[row][col + 1] === "number") { // Right
                numbersToSum.push(martix[row][col + 1])
            }


            if (typeof martix[row - 1][col - 1] === "number") { // Top-left
                numbersToSum.push(martix[row - 1][col - 1])
            }
            if (typeof martix[row - 1][col] === "number" && typeof martix[row - 1][col - 1] !== "number") { // Top
                numbersToSum.push(martix[row - 1][col])
            }
            if (typeof martix[row - 1][col + 1] === "number" && typeof martix[row - 1][col] !== "number") { // Top-Right
                numbersToSum.push(martix[row - 1][col + 1])
            }

            if (typeof martix[row + 1][col + 1] === "number") { // Bottom-right
                numbersToSum.push(martix[row + 1][col + 1])
            }
            if (typeof martix[row + 1][col] === "number" && typeof martix[row + 1][col + 1] !== "number") { // Bottom
                numbersToSum.push(martix[row + 1][col])
            }
            if (typeof martix[row + 1][col - 1] === "number" && typeof martix[row + 1][col] !== "number") { // Bottom-Left
                numbersToSum.push(martix[row + 1][col - 1])
            }
        }
    }
}

console.log("Sum of all parts:", numbersToSum.reduce((p, c) => p + c, 0))

const ratiosToSum = []

for (let row = 0; row < martix.length; row++) {
    for (let col = 0; col < martix[row].length; col++) {
        const numbersOnRow = []
        if (martix[row][col] === '*') {
            if (typeof martix[row][col - 1] === "number") { // Left
                numbersOnRow.push(martix[row][col - 1])
            }
            if (typeof martix[row][col + 1] === "number") { // Right
                numbersOnRow.push(martix[row][col + 1])
            }


            if (typeof martix[row - 1][col - 1] === "number") { // Top-left
                numbersOnRow.push(martix[row - 1][col - 1])
            }
            if (typeof martix[row - 1][col] === "number" && typeof martix[row - 1][col - 1] !== "number") { // Top
                numbersOnRow.push(martix[row - 1][col])
            }
            if (typeof martix[row - 1][col + 1] === "number" && typeof martix[row - 1][col] !== "number") { // Top-Right
                numbersOnRow.push(martix[row - 1][col + 1])
            }

            if (typeof martix[row + 1][col + 1] === "number") { // Bottom-right
                numbersOnRow.push(martix[row + 1][col + 1])
            }
            if (typeof martix[row + 1][col] === "number" && typeof martix[row + 1][col + 1] !== "number") { // Bottom
                numbersOnRow.push(martix[row + 1][col])
            }
            if (typeof martix[row + 1][col - 1] === "number" && typeof martix[row + 1][col] !== "number") { // Bottom-Left
                numbersOnRow.push(martix[row + 1][col - 1])
            }
        }
        if(numbersOnRow.length === 2){
            ratiosToSum.push(numbersOnRow[0] * numbersOnRow[1])
        }
    }
}


console.log("Sum of all ratios:", ratiosToSum.reduce((p, c) => p + c, 0))

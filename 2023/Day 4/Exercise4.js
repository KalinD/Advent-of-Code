const fs = require('fs')

const content = fs.readFileSync('./input.txt', 'utf-8')

const lines = content.split("\n")

function getPoint(line){
    const winning = line.split("|")[0].trim().split(" ").map(x => Number(x))
    const numbers = line.split("|")[1].trim().split(" ").map(x => Number(x))
    let points = 0
    for(const number of numbers){
        if(winning.includes(number)){
            points = points === 0 ? 1 : points * 2
        }
    }

    return points
}

const pointsToSum = []

for(const line of lines){
    if(!line) continue
    const actualLine = line.replace(/ +/g, " ")
    pointsToSum.push(getPoint(actualLine.split(":")[1]))
}

console.log("Total points:", pointsToSum.reduce((p, c) => p + c, 0))

const cardToAmount = {}

function addAmountToCard(cardNumber, cardAmount){
    if(cardNumber in cardToAmount){
        cardToAmount[cardNumber] += cardAmount
    } else {
        cardToAmount[cardNumber] = cardAmount
    }
}

function checkWonCards(line, cardNumber){
    const winning = line.split("|")[0].trim().split(" ").map(x => Number(x))
    const numbers = line.split("|")[1].trim().split(" ").map(x => Number(x))
    let i = 1
    for(const number of numbers){
        if(winning.includes(number)){
            addAmountToCard(cardNumber + i, cardToAmount[cardNumber])
            i++
        }
    }
}

for(const line of lines){
    if(!line) continue
    const actualLine = line.replace(/ +/g, " ")
    const cardNumber = Number(actualLine.split(":")[0].split(" ")[1].trim())
    addAmountToCard(cardNumber, 1)
    checkWonCards(actualLine.split(":")[1], cardNumber)
}

let sum = 0
for(const cardNumber in cardToAmount){
    sum += cardToAmount[cardNumber]
}

console.log("Total Scratchcards:", sum)

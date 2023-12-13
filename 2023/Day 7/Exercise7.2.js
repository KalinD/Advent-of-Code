const fs = require('fs')

const content = fs.readFileSync('./input.txt', 'utf-8')

const lines = content.split("\n").map(l => l.trim())

const handsAndBids = []

const handTypes = {
    "High card": 1,
    "One pair": 2,
    "Two pair": 3,
    "Three of a kind": 4,
    "Full house": 5,
    "Four of a kind": 6,
    "Five of a kind": 7
}

const cardOrder = {
    'A': 13, 'K': 12, 'Q': 11, 'T': 10,
    '9': 9, '8': 8, '7': 7, '6': 6, '5': 5,
    '4': 4, '3': 3, '2': 2, 'J': 1
}

function getCardCounts(hand){
    const cardToCount = {
        'A': 0, 'K': 0, 'Q': 0, 'J': 0, 'T': 0,
        '9': 0, '8': 0, '7': 0, '6': 0, '5': 0,
        '4': 0, '3': 0, '2': 0
    }
    for (const card of hand) {
        cardToCount[card]++
    }
    let m = 0
    let mCard = 'A'
    for(const [key, value] of Object.entries(cardToCount)){
        if(value > m && key !== 'J'){
            mCard = key
            m = value
        }
    }
    cardToCount[mCard] += cardToCount.J
    cardToCount.J = 0

    return cardToCount
}

function getHandType(hand) {
    const cardToCount  = getCardCounts(hand)
    let countOfThrees = 0
    let countsOfTwos = 0
    for (const value of Object.values(cardToCount)) {
        switch(value){
            case 5: return handTypes['Five of a kind']
            case 4: return handTypes['Four of a kind']
            case 3:
                countOfThrees++
                break
            case 2:
                countsOfTwos++
                break
            default:
                continue
        }
    }
    if (countOfThrees === 1 && countsOfTwos === 1) {
        return handTypes['Full house']
    }
    if (countOfThrees === 1) {
        return handTypes['Three of a kind']
    }
    if (countsOfTwos === 2) {
        return handTypes['Two pair']
    }
    if (countsOfTwos === 1) {
        return handTypes['One pair']
    }
    return handTypes["High card"]
}

for (const line of lines) {
    if (!line) continue
    const hand = line.split(" ")[0]
    const bid = Number(line.split(" ")[1])
    const type = getHandType(hand)
    handsAndBids.push({ hand, bid, type })
}

function sortHands(handAndBid1, handAndBid2) {
    const hand1 = handAndBid1.hand
    const hand2 = handAndBid2.hand
    const type1 = handAndBid1.type
    const type2 = handAndBid2.type
    if (type1 === type2) {
        for (let i = 0; i < hand1.length; i++) {
            if (cardOrder[hand1[i]] === cardOrder[hand2[i]]) continue
            return cardOrder[hand1[i]] - cardOrder[hand2[i]]
        }
    }
    return type1 - type2
}

handsAndBids.sort(sortHands)

let sum = 0
for(let i = 0; i < handsAndBids.length; i++){
    sum += (i + 1) * handsAndBids[i].bid
}

console.log(`Total winnings: ${sum}`)

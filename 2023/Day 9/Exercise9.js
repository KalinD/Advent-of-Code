const fs = require('fs')

const content = fs.readFileSync('./input.txt', 'utf-8')

const lines = content.split("\n").map(l => l.trim())

const sequences = []
for(const line of lines){
    if(!line) continue
    sequences.push(line.split(" ").map(Number))
}

function isAllZeroes(sequence){
    return sequence.every(x => x === 0)
}

function getNextValueForSequence(sequence){
    const subsequences = [sequence]
    while(!isAllZeroes(subsequences[subsequences.length - 1])){
        const latestSquence = subsequences[subsequences.length - 1]
        const s = []
        for(let i = 0; i < latestSquence.length - 1; i++){
            s.push(latestSquence[i + 1] - latestSquence[i])
        }
        subsequences.push(s)
    }
    let nextValue = 0
    for(let i = subsequences.length - 2; i >= 0; i--){
        const l = subsequences[i].length
        nextValue = subsequences[i][l - 1] + nextValue
    }
    return nextValue
}

const nextValues = []
for(const sequence of sequences){
    nextValues.push(getNextValueForSequence(sequence))
}

console.log("Sum of extrapolated values:", nextValues.reduce((p, c) => p + c, 0))

function getPreviousValueForSequence(sequence){
    const subsequences = [sequence]
    while(!isAllZeroes(subsequences[subsequences.length - 1])){
        const latestSquence = subsequences[subsequences.length - 1]
        const s = []
        for(let i = 0; i < latestSquence.length - 1; i++){
            s.push(latestSquence[i + 1] - latestSquence[i])
        }
        subsequences.push(s)
    }
    let prevValue = 0
    for(let i = subsequences.length - 2; i >= 0; i--){
        prevValue = subsequences[i][0] - prevValue
    }
    return prevValue
}

const prevValues = []
for(const sequence of sequences){
    prevValues.push(getPreviousValueForSequence(sequence))
}

console.log("Sum of previous extrapolated values:", prevValues.reduce((p, c) => p + c, 0))

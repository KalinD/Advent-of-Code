const fs = require('fs')

const content = fs.readFileSync('./input.txt', 'utf-8')

const lines = content.split("\n")
const valuePerRow = []

const spelledOutDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

function getValueFromLine(line) {
    let first, last
    let firstIndex, lastIndex
    for (let i = 0; i < line.length; i++) {
        if ('0' <= line[i] && line[i] <= '9') {
            if (first === undefined) {
                firstIndex = i
                first = Number(line[i])
            } else {
                last = Number(line[i])
                lastIndex = i
            }
        }
    }
    if (!last) {
        last = first
        lastIndex = firstIndex
    }
    for(const digit of spelledOutDigits){
        if(line.includes(digit)){
            let f = line.indexOf(digit)
            let l = line.lastIndexOf(digit)
            if(firstIndex === undefined || f < firstIndex){
                first = spelledOutDigits.indexOf(digit) + 1
                firstIndex = f
            }
            if(lastIndex === undefined || l > lastIndex){
                last = spelledOutDigits.indexOf(digit) + 1
                lastIndex = l
            }
        }
    }
    return first * 10 + last
}

for (const line of lines) {
    if (line) {
        valuePerRow.push(getValueFromLine(line))
    }
}

console.log(valuePerRow.reduce((prev, curr) => curr + prev, 0))

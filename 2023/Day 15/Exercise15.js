const fs = require('fs')

const content = fs.readFileSync('./input.txt', 'utf-8')

const lines = content.split("\n").map(l => l.trim())

function hash(input) {
    let value = 0
    for (let i = 0; i < input.length; i++) {
        value += input.charCodeAt(i)
        value *= 17
        value %= 256
    }
    return value
}

for (const line of lines) {
    if (!line) continue
    const steps = line.split(",")
    const results = steps.map(step => hash(step))
    console.log("Sum of results:", results.reduce((p, c) => p + c, 0))
}

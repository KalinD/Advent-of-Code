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

const steps = lines[0].split(",")
const results = steps.map(step => hash(step))
console.log("Sum of results:", results.reduce((p, c) => p + c, 0))

const boxes = {}

for (const step of steps) {
    if (step.includes("-")) {
        const label = step.split("-")[0]
        const box = hash(label)
        if (box in boxes && boxes[box].some(item => item.label === label)) boxes[box] = boxes[box].filter(item => item.label !== label)
    } else if (step.includes("=")) {
        const label = step.split("=")[0]
        const focalLength = step.split("=")[1]
        const box = hash(label)
        if (box in boxes) {
            if (boxes[box].some(item => item.label === label)) {
                boxes[box] = boxes[box].map(item => {
                    if (item.label === label) {
                        return ({ label, focalLength })
                    }
                    return item
                })
            } else boxes[box].push({ label, focalLength })
        }
        else boxes[box] = [{ label, focalLength }]
    }
}

const focusPowers = []

for(const [key, value] of Object.entries(boxes)){
    const boxMultiplier = 1 + parseInt(key)
    for(let i = 0; i < value.length; i++){
        focusPowers.push(boxMultiplier * (i + 1) * value[i].focalLength)
    }
}

console.log("Focusing power:", focusPowers.reduce((p, c) => p + c, 0))

const fs = require('fs')

const content = fs.readFileSync('./input.txt', 'utf-8')

const lines = content.split("\n").map(l => l.trim())

const sequence = lines[0].split("")

const locations = {}

for (let i = 2; i < lines.length; i++) {
    if (!lines[i]) continue
    const origin = lines[i].split(" = ")[0]
    const left = lines[i].split(" = ")[1].split(", ")[0].slice(1)
    const right = lines[i].split(" = ")[1].split(", ")[1].slice(0, -1)
    locations[origin] = { L: left, R: right }
}

let steps = 0
let currentLocation = "AAA"
while (currentLocation !== "ZZZ") {
    for (const s of sequence) {
        steps++
        currentLocation = locations[currentLocation][s]
    }
}

console.log("Steps:", steps)


let startLocations = []
for (const key of Object.keys(locations)) {
    if (key.charAt(2) === "A") {
        startLocations.push(key)
    }
}

let stepsPerLocation = startLocations.map(l => 0)
let currentLocations = [...startLocations]
for (let i = 0; i < currentLocations.length; i++) {
    while (currentLocations[i].charAt(2) !== 'Z') {
        for (const s of sequence) {
            stepsPerLocation[i]++
            currentLocations[i] = locations[currentLocations[i]][s]
        }
    }
}

function gcd(a, b) {
    if (a === 0) return b
    return gcd(b % a, a)
}

function lcm(a, b){
    return (a * b) / gcd(a, b)
}

function getLeastCommonMultiple(numbers) {
    let result = lcm(numbers[0], numbers[1])
    for (let i = 2; i < numbers.length; i++) {
        result = lcm(result, numbers[i])
    }
    return result;
}

console.log("Ghost steps:", getLeastCommonMultiple(stepsPerLocation))

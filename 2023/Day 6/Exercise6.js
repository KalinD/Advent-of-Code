const fs = require('fs')

const content = fs.readFileSync('./input.txt', 'utf-8')

const lines = content.split("\n").map(l => l.trim())

const times = lines[0].split(":")[1].split(" ").reduce((p, c) => c ? [...p, c] : p, []).map(x => Number(x))
const distances = lines[1].split(":")[1].split(" ").reduce((p, c) => c ? [...p, c] : p, []).map(x => Number(x))

const counts = []

for (let i = 0; i < times.length; i++) {
    let speed = 1
    let remainingTime = times[i] - 1
    while (remainingTime <= distances[i] / speed) {
        speed++
        remainingTime--
    }
    const max = remainingTime

    speed = times[i] - 1
    remainingTime = 1
    while (remainingTime <= distances[i] / speed) {
        speed--
        remainingTime++
    }
    const min = remainingTime
    counts.push(max - min + 1)
}

console.log("Product of possible ways to win:", counts.reduce((p, c) => p * c, 1))

const totalTime = Number(times.reduce((p, c) => p + c, ""))
const totalDistance = Number(distances.reduce((p, c) => p + c, ""))

let speed = 1
let remainingTime = totalTime - 1
while (remainingTime <= totalDistance / speed) {
    speed++
    remainingTime--
}
const max = remainingTime

speed = totalTime - 1
remainingTime = 1
while (remainingTime <= totalDistance / speed) {
    speed--
    remainingTime++
}
const min = remainingTime
console.log("Ways to beat the single race:", max - min + 1)

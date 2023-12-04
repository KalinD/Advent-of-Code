const fs = require('fs')

const content = fs.readFileSync('./input.txt', 'utf-8')

const lines = content.split("\n")

const cubesPerColor = {
    'red': 12,
    'green': 13,
    'blue': 14
}

const possibleGames = []

function areSetsValid(line) {
    const sets = line.split("; ")
    for (const set of sets) {
        const cubes = set.split(", ")
        for (const cube of cubes) {
            const amount = Number(cube.split(" ")[0])
            const color = cube.split(" ")[1].trim()
            if (cubesPerColor[color] < amount) {
                return false
            }
        }
    }
    return true;
}

for (const line of lines) {
    if (line) {
        const game = Number(line.split(": ")[0].split(" ")[1])
        if (areSetsValid(line.split(": ")[1])) {
            possibleGames.push(game)
        }
    }
}

console.log("Sum of games:", possibleGames.reduce((p, c) => p + c, 0))

const setPowers = []

function getGamePower(line){
    const minimumPerColor = {
        'red': 0,
        'green': 0,
        'blue': 0
    }
    const sets = line.split("; ")
    for (const set of sets) {
        const cubes = set.split(", ")
        for (const cube of cubes) {
            const amount = Number(cube.split(" ")[0])
            const color = cube.split(" ")[1].trim()
            if (minimumPerColor[color] < amount) {
                minimumPerColor[color] = amount
            }
        }
    }
    return minimumPerColor['blue'] * minimumPerColor['green'] * minimumPerColor['red'];

}

for (const line of lines) {
    if (line) {
        const game = Number(line.split(": ")[0].split(" ")[1])
        setPowers.push(getGamePower(line.split(": ")[1]))
    }
}

console.log("Total power:", setPowers.reduce((p, c) => c + p, 0))

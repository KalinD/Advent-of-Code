const fs = require('fs')

const content = fs.readFileSync('./input.txt', 'utf-8')

const lines = content.split("\n").map(l => l.trim())

function isCorrectGrouping(springs, groups) {
    const actualGrouping = []
    let count = 0
    for (let spring of springs) {
        if (spring === "#") count++
        else {
            if (count !== 0) actualGrouping.push(count)
            count = 0
        }
    }
    if (count !== 0) {
        actualGrouping.push(count)
    }
    if (actualGrouping.length !== groups.length) {
        return false
    }
    for (let i = 0; i < groups.length; i++) {
        if (groups[i] !== actualGrouping[i]) return false
    }
    return true
}

function getArrangements(springs, groups) {
    if (!springs.includes("?")) {
        if (isCorrectGrouping(springs, groups)) return 1
        return 0
    }
    let count = 0
    const withDamaged = [...springs]
    const withOperational = [...springs]
    const index = springs.indexOf("?")
    withDamaged[index] = "#"
    withOperational[index] = "."
    count += getArrangements(withDamaged, groups) + getArrangements(withOperational, groups)
    return count
}

// TODO: Iterative Solution
// function getArrangementsIter(springs, groups){
//     for()
// }

const possibleArrangements = []
const extendedPossibleArrangements = []
for (const line of lines) {
    if (!line) continue
    const springs = line.split(" ")[0].split("")
    const groups = line.split(" ")[1].split(",").map(Number)
    possibleArrangements.push(getArrangements(springs, groups))

    // const extendedSprings = line.split(" ")[0].split("")
    // const extendedGroups = line.split(" ")[1].split(",").map(Number)
    // for (let i = 0; i < 4; i++) {
    //     extendedSprings.splice(extendedSprings.length, 0, "?", ...springs)
    //     extendedGroups.splice(extendedGroups.length, 0, ...groups)
    // }
    // extendedPossibleArrangements.push(getArrangements(extendedSprings, extendedGroups))
}

// 7916
console.log("Sum of possible arrangements:", possibleArrangements.reduce((p, c) => p + c, 0))
// console.log("Sum of extended possible arrangements:", extendedPossibleArrangements.reduce((p, c) => p + c, 0))

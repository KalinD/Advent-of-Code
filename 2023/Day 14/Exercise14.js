const fs = require('fs')

const content = fs.readFileSync('./input.txt', 'utf-8')

const lines = content.split("\n").map(l => l.trim())

const dish = []

for(const line of lines){
    if(!line) continue
    const row = line.split("")
    dish.push(row)
}

function tiltNorth(dish){
    const dishCopy = [...dish.map(row => [...row])]
    for(let i = 1; i < dishCopy.length; i++){
        for(let j = 0; j < dishCopy[i].length; j++){
            if(dishCopy[i][j] === "O"){
                for(let k = i - 1; k >= 0; k--){
                    if(dishCopy[k][j] === "."){
                        dishCopy[k][j] = "O"
                        dishCopy[k + 1][j] = '.'
                        continue
                    }
                    break
                }
            }
        }
    }
    return dishCopy
}

function calculateLoad(dish){
    let load = 0
    for(let i = dish.length - 1; i >= 0; i--){
        load += (dish.length - i) * dish[i].reduce((p, c) => c === "O" ? p + 1 : p, 0)
    }
    return load
}

console.log("Total load:", calculateLoad(tiltNorth(dish)))

// Should be 1000000000 but 1000 works for this because after some time the cycle reaches an equilibrium
const spinCycles = 1000 

let copyDish = [...dish.map(row => [...row])]

function tiltWest(dish){
    const dishCopy = [...dish.map(row => [...row])]
    for(let i = 1; i < dishCopy[0].length; i++){
        for(let j = 0; j < dishCopy.length; j++){
            if(dishCopy[j][i] === "O"){
                for(let k = i - 1; k >= 0; k--){
                    if(dishCopy[j][k] === "."){
                        dishCopy[j][k] = "O"
                        dishCopy[j][k + 1] = '.'
                        continue
                    }
                    break
                }
            }
        }
    }
    return dishCopy
}

function tiltSouth(dish){
    const dishCopy = [...dish.map(row => [...row])]
    for(let i = dishCopy.length - 2; i >= 0; i--){
        for(let j = 0; j < dishCopy[i].length; j++){
            if(dishCopy[i][j] === "O"){
                for(let k = i + 1; k < dishCopy.length; k++){
                    if(dishCopy[k][j] === "."){
                        dishCopy[k][j] = "O"
                        dishCopy[k - 1][j] = '.'
                        continue
                    }
                    break
                }
            }
        }
    }
    return dishCopy
}

function tiltEast(dish){
    const dishCopy = [...dish.map(row => [...row])]
    for(let i = dishCopy[0].length - 2; i >= 0; i--){
        for(let j = 0; j < dishCopy.length; j++){
            if(dishCopy[j][i] === "O"){
                for(let k = i + 1; k < dishCopy[0].length; k++){
                    if(dishCopy[j][k] === "."){
                        dishCopy[j][k] = "O"
                        dishCopy[j][k - 1] = '.'
                        continue
                    }
                    break
                }
            }
        }
    }
    return dishCopy
}

for(let i = 0; i < spinCycles; i++){
    copyDish = tiltNorth(copyDish)
    copyDish = tiltWest(copyDish)
    copyDish = tiltSouth(copyDish)
    copyDish = tiltEast(copyDish)
}

console.log("Total load after", spinCycles, "cycles:", calculateLoad(copyDish))



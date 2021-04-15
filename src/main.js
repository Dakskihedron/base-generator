function reverse(s) {
    return s.toString().split('').reverse().join('')
}

function baseOutput(topOutput, bottomOutput, operation) {
    let pos = 0
    /* Top value */
    topOutput = reverse(topOutput)
    for (i = 0; i < 8; i++) {
        let char = topOutput.charAt(pos)
        document.getElementById(`top-${pos}`).innerHTML = ''
        document.getElementById(`top-${pos}`).innerHTML = char
        pos++
    }
    /* Bottom value */
    pos = 0
    bottomOutput = reverse(bottomOutput)
    for (i = 0; i < 8; i++) {
        let char = bottomOutput.charAt(pos)
        document.getElementById(`bottom-${pos}`).innerHTML = ''
        document.getElementById(`bottom-${pos}`).innerHTML = char
        pos++
    }
    /* Arithmetic operation */
    const operator = document.getElementById('operator')
    if (operation == 'sub') {
        operator.innerHTML = '−'
    } else {
        operator.innerHTML = '+'
    }
    return
}

function baseGenerate() {
    let seed = new Date().getTime()
    var m = new MersenneTwister(seed)
    let base = document.getElementById("base-select").value
    const operators = ['add', 'sub']
    let operation = operators[Math.floor(m.random() * operators.length)]
    let topOutput = ''
    let bottomOutput = ''
    const limit = {
        10: 99999999,
        2: 255,
        16: 4294967295
    }
    /* Randomisation */
    let sum = Math.floor((m.random() * limit[base]) + 1)
    let operandOne = Math.floor((m.random() * sum) + 1)
    let operandTwo = sum - operandOne
    /* Assign values to variables */
    if (operation == 'sub') {
        let outputs = [operandOne, operandTwo]
        topOutput = sum
        bottomOutput = outputs[Math.floor(m.random() * outputs.length)]
    } else {
        topOutput = operandOne
        bottomOutput = operandTwo
    }
    /* Call output function */
    if (base == 10) {
        return baseOutput(topOutput, bottomOutput, operation)
    } else {
        topOutput = topOutput.toString(base).toUpperCase()
        bottomOutput = bottomOutput.toString(base).toUpperCase()
        return baseOutput(topOutput, bottomOutput, operation)
    }
}

function toggleDark() {
    document.body.classList.toggle('dark');
}

function checkDark() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.toggle('dark');
    } 
}
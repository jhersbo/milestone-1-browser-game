let stopWatch = document.getElementById('stopwatch')

let sec = 0;
let ms = 0;
let time;
let stopTime = false
function cycle(){
    time = `${sec}.${ms}`
    if (stopTime === false){
        sec = parseInt(sec)
        ms = parseInt(ms)
        ms += 10
        if(ms === 100){
            sec += 1
            ms = 0
        }
        stopWatch.textContent = `Time: ${sec}.${ms} seconds`
        setTimeout(cycle, 100)
    }
    console.log(`${sec}.${ms}`)
    return time
}
function stopTimer(){
    if (stopTime === false){
        stopTime = true
    }
}
function resetTimer(){
    ms = 0 
    sec = 0
    return ms, sec
}

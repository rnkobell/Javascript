//ストップウォッチ
let timer;
let startTime;
let elapsed = 0;
let running = false;


const $time = $(".time.stopwatch");
const $startBtn = $(".start_btn");
const $stopBtn = $(".stop_btn");
const $resetBtn = $(".reset_btn");


function updateDisplay(ms) {
    let totalMilliseconds = ms;

    let hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
    totalMilliseconds %= (1000 * 60 * 60);

    let minutes = Math.floor(totalMilliseconds / (1000 * 60));
    totalMilliseconds %= (1000 * 60);

    let seconds = Math.floor(totalMilliseconds / 1000);
    totalMilliseconds %= 1000;

    let milliseconds = Math.floor(totalMilliseconds / 100);

    $time.text(`${hours}:${minutes}:${seconds}:${milliseconds}`);
}


function start() {
    if (running == true) return;
    running = true;

    startTime = Date.now() - elapsed;

    timer = setInterval(() => {
      elapsed = Date.now() - startTime;
      updateDisplay(elapsed);
    }, 10);


    $startBtn.prop("disabled", true);
    $stopBtn.prop("disabled", false);
    $resetBtn.prop("disabled", false);
}


function stop() {
    if (!running) return;
    running = false;

    clearInterval(timer);


    $startBtn.prop("disabled", false);
    $stopBtn.prop("disabled", true);
    $resetBtn.prop("disabled", false);
}


function reset() {
    clearInterval(timer);
    running = false;
    elapsed = 0;
    updateDisplay(0);


    $startBtn.prop("disabled", false);
    $stopBtn.prop("disabled", true);
    $resetBtn.prop("disabled", true);
}


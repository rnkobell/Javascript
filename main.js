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


//電卓
let result; //=押した後のやつ
let currentCalc = ""; //途中式

const $display = $(".display_result");
const $numberBtn = $(".number_btn");
const $calcBtn = $(".calc_btn");
const $cBtn = $(".c_btn")
const $equalBtn = $(".equal_btn")


function get_number() {
    const number = event.target.innerText; // 押したボタンの文字を取る
    currentCalc += number;                // 入力に追加
    $display.text(currentCalc);          // 画面に表示
}

function get_calc() {
    const value = event.target.innerText;
    if (currentCalc === "") return;
    if (/[\+\-\×÷]$/.test(currentCalc)) {
      currentCalc = currentCalc.slice(0, -1);
    }

    currentCalc += value;
    $display.text(currentCalc);
}

function get_equal() {
    if (currentCalc === "") return;

    try {
      // 演算子をJSで使える形に変換
      let expression = currentCalc
        .replace(/×/g, "*")
        .replace(/÷/g, "/");

      result = eval(expression); // ← シンプルに計算
      $display.text(result);

      // 次の計算に使えるように
      currentCalc = String(result);
    } catch (e) {
      $display.text("Error");
      currentCalc = "";
  }
}

function get_c() {
    currentCalc = "";
    result = 0;
    $display.text("0");
}
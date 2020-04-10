const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const range = document.querySelector('.js-range');
const colors = document.querySelector('.color-list');
const btnFill = document.querySelector('.btn-fill');
const btnDownload = document.querySelector('.btn-download');
const btnClear = document.querySelector('.btn-clear');

// 사이즈 및 색상 init
const CANVAS_W = 700;
const CANVAS_H = 700;
const COLOR_INIT = '#222222'; 

// 캔버스 초기화
canvas.width = CANVAS_W;
canvas.height = CANVAS_H;
ctx.strokeStyle = COLOR_INIT;
ctx.fillStyle = COLOR_INIT;
ctx.lineWidth = 2.5;

// 초기 색상 활성화
colors.children[0].classList.add('active');

let isDrawing = false;
let fillFlag = false;

function drawingStop(){
  isDrawing = false;
}

function drawingStart() {
  isDrawing = true;
}

// drawing
function onMouseMove(e){
  const x = e.offsetX;
  const y = e.offsetY;

  if (!isDrawing){
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// 브러쉬 크기 조절
function brushController(e){
  const value = e.target.value;
  ctx.lineWidth = value;
}

// 색상 고르기
function colorController(e){
  const colorList = Array.from(colors.children);
  if (!e.target.classList.contains('active') && e.target.tagName === 'LI') {
    colorList.forEach(item => {
      item.classList.remove('active');
    })
    e.target.classList.add('active');
  }

  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

// 캔버스 색상 채우기
function onClickFill(){
  if (fillFlag){
    ctx.fillRect(0, 0, CANVAS_W,CANVAS_H)
  }
}

// 색상채우기 버튼 status
function onClickFillStatus(e){
  fillFlag = !fillFlag;
  if(fillFlag){
    e.target.classList.add('active');
  } else {
    e.target.classList.remove('active');
  }
}

// 그림판 초기화
function onClickReset(){
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
}

if(canvas){
  canvas.addEventListener('mousemove',onMouseMove);
  canvas.addEventListener('mouseleave', drawingStop)
  canvas.addEventListener('mousedown', drawingStart);
  canvas.addEventListener('mouseup',drawingStop);
  canvas.addEventListener('mouseup', onClickFill);
}

if(range) {
  range.addEventListener('change', brushController)
}

if(colors) {
  colors.addEventListener('click',colorController)
}

if(btnFill) {
  btnFill.addEventListener('click',onClickFillStatus)
}

if(btnClear) {
  btnClear.addEventListener('click',onClickReset)
}

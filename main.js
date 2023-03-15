
//켄버스 셋팅
let canvas;
let ctx;
canvas = document.createElement("canvas");

ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backGroundImg, shipImg, bulletImg, enemyImg, gameOverImg;

let shipX = canvas.width/2-32;
let shipY = canvas.height-74;
function loadImg(){
    backGroundImg = new Image();
    backGroundImg.src = 'img/background_space.jpg';

    shipImg = new  Image();
    shipImg.src = 'img/spaceship.png';

    gameOverImg = new Image();
    gameOverImg.src = 'img/game_over.png';

}

let keysDown = {};
function setKeyboardListener(){
    document.addEventListener('keydown',function(evt){
        keysDown[evt.keyCode] = true;
    });

    document.addEventListener("keyup", function(evt){
        delete  keysDown[evt.keyCode];
    });
}


function update(){

    if(39 in keysDown){
        shipX += 5;
    }

    if(37 in keysDown){
        shipX += -5;
    }

    if(shipX <= 0){
        shipX = 0;
    }

    if(shipX >= canvas.width-64){
        shipX = canvas.width-64; 
    }
}

function render(){
    ctx.drawImage(backGroundImg,0,0,canvas.width,canvas.height);
    ctx.drawImage(shipImg,shipX,shipY,64,64);
}

function main(){
    update();
    render();
    requestAnimationFrame(main);
}
loadImg();
setKeyboardListener();
main();

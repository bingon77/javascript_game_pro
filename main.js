
//켄버스 셋팅
let canvas;
let ctx;
canvas = document.createElement("canvas");

ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

//이미지 저장하는 변수
let backGroundImg, shipImg, bulletImg, enemyImg, gameOverImg;

//key up/down저장 하는 함수
let keysDown = {};

//bullet 총알의 리스트 저장하는 함수
let bulletList = [];

//초기 비행선 및 비행기 이동의 함수
let shipX = canvas.width/2-32;
let shipY = canvas.height-74;


let bulletMoveY = 7;
let shipMoveX = 5;
function loadImg(){
    backGroundImg = new Image();
    backGroundImg.src = 'img/background_space.jpg';

    shipImg = new  Image();
    shipImg.src = 'img/spaceship.png';

    gameOverImg = new Image();
    gameOverImg.src = 'img/game_over.png';


    bulletImg = new Image();
    bulletImg.src = "img/bullet.png"

}



//Key down/up 이벤트 정의
function setKeyboardListener(){
    document.addEventListener('keydown',function(evt){

        //비행기 좌우 이베느 정의
        keysDown[evt.keyCode] = true;
    });

    document.addEventListener("keyup", function(evt){
        delete  keysDown[evt.keyCode];

        if(evt.keyCode == 32){
            createBullet();
        }
    });
}



function bulletClass(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.x = shipX+21;
        this.y = shipY;
        bulletList.push(this);
    }

    this.update = function(){
        this.y -= bulletMoveY;
    }
}

function createBullet(){

    let b = new bulletClass();
    b.init();
}

function update(){

    if(39 in keysDown){
        shipX += shipMoveX;
    }

    if(37 in keysDown){
        shipX += (-shipMoveX);
    }



    //우주선이 왼쪽으로 무한대로 업데이트 되지 않도록 하는 함수
    if(shipX <= 0){
        shipX = 0;
    }

    //우주선이 오른쪽으로 무한대로 업데이트 되지 않도록 하는 함수
    if(shipX >= canvas.width-64){
        shipX = canvas.width-64;
    }

    //총알의 y좌표 업데이트 하는 함수
    for (let i = 0; i < bulletList.length; i++) {
        bulletList[i].update();
    }
}

function render(){
    ctx.drawImage(backGroundImg,0,0,canvas.width,canvas.height);
    ctx.drawImage(shipImg,shipX,shipY,64,64);

    for (let i = 0; i < bulletList.length; i++) {
        ctx.drawImage(bulletImg,bulletList[i].x,bulletList[i].y,20,30);
    }
}

function main(){
    update();
    render();
    requestAnimationFrame(main);
}
loadImg();
setKeyboardListener();
main();


//방향키를 누르면
//우주선의 xy 좌표가 바뀌고 다시 render 그려준다.


//총알 만들기
/*
1. 스페이스바를 누르면 총알 발사
2. 총알이 발사 = 총알의 y값이 -- , 총알의 x값은 ? 스페이스바를 누른 순간의 우주선의 가운데
3. 발사된 총알들은 총알 배열에 저장을 한다.
4. 총알들은 x,y 좌표값이 있어야 한다.
5. 총알 배열을 가지고 render 그려준다
 */

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

let enemyY = 3;

let gameScore = 0;
let gameOver = false; // true 게임 끝!!!
function loadImg(){
    backGroundImg = new Image();
    backGroundImg.src = 'img/background_space.jpg';

    shipImg = new  Image();
    shipImg.src = 'img/spaceship.png';

    gameOverImg = new Image();
    gameOverImg.src = 'img/game_over.png';


    bulletImg = new Image();
    bulletImg.src = "img/bullet.png"

    enemyImg = new Image();
    enemyImg.src = "img/enemy.png"

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
        this.alive = true; //true 살아있는 총알 , false 죽은 총알;
        bulletList.push(this);
    }

    this.update = function(){
        this.y -= bulletMoveY;
    }



    this.checkHit = function(){
        for (let i = 0; i < enemyList.length; i++) {
            if(this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x+48){
                gameScore++;
                this.alive = false;
                enemyList.splice(i,1);
            }
        }
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

        if(bulletList[i].alive){
            bulletList[i].update();
            bulletList[i].checkHit();
        }
    }

    //적군의 y좌표 없데이트 한다.
    for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].update();
    }
}

function render(){
    ctx.drawImage(backGroundImg,0,0,canvas.width,canvas.height);
    ctx.drawImage(shipImg,shipX,shipY,64,64);
    ctx.fillText(`score : ${gameScore}`,20,20);
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";

    for (let i = 0; i < bulletList.length; i++) {
        if(bulletList[i].alive){
            ctx.drawImage(bulletImg,bulletList[i].x,bulletList[i].y,20,30);
        }

    }


    for (let i = 0; i < enemyList.length; i++) {
        ctx.drawImage(enemyImg,enemyList[i].x,enemyList[i].y,48,48);
    }
}

function main(){
    if(!gameOver){
        update();
        render();
        requestAnimationFrame(main);
    }else{
        ctx.drawImage(gameOverImg,40,100,380,380);
    }

}


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




//적군 만들기
/*
1. 적군은 x,y좌표를 가진다 좌표 init
2.
 */


let enemyList = [];
function generateRandomValue(min,max){
    let randomNum = Math.random()*(max-min+1)+min;
    return randomNum;
}
function enemyClass(){
    this.x = 0;
    this.y = 0;

    this.init = function(){
        this.y = 0;
        this.x = generateRandomValue(0,canvas.width-48);
        enemyList.push(this);
    }
    this.update = function(){
        this.y += enemyY;

        if(this.y >= canvas.height-48){
            gameOver = true;
        }
    }
}


function createEnemy(){
    const interval = setInterval(function(){
        let e = new enemyClass();
        e.init();
    },1000);
}


//적군 소멸 및 총알 소멸
/*
총알.
 */



loadImg();
setKeyboardListener();
main();
createEnemy();
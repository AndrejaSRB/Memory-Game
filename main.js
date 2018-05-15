let container = document.querySelector('.container');
let score = document.querySelector('.score')
let time = document.querySelector('.time')
let timeRemaning = document.querySelector('.timeRemaning')
let image = document.querySelector('.image');
let textClock = image.children[1];
let clock = time.children[0];
let clicked = [];
let counter = 0;
let hits = 0;
let n = 0;

createGrid();
let boxes = document.querySelectorAll('.box');
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', flip)
    
}






function flip() {
    this.removeEventListener('click', flip);
    clicked.push(this)
    counter++
    let back = this.children[0]
    let front = this.children[1]
    back.style.transform = "perspective(900px) rotateY(0deg)";
    front.style.transform = "perspective(900px) rotateY(180deg)";
    if (counter == 2){
        stopClicks();
        check();
        
    }
    
}
function gameTime() {
    
    let time = setInterval(function() {
        if (n <= 100){
            clock.style.height = n+"%";
            n++
            if (n > 50) {
                image.style.display = "block"
            }else if (n < 50){
                image.style.display = "none"
            }
            if (n > 80){
                textClock.style.color = "red"
            }
        }else {
            
            timeRemaning.innerHTML = "Nazalost vreme je isteklo!!!"
            container.style.opacity = "0.7"
            stopClicks();
            clearInterval(time);

        }
        
    },1000)
    
}

function check() {
    let back1 = clicked[0].children[0];
    let back2 = clicked[1].children[0];
    let front1 = clicked[0].children[1];
    let front2 = clicked[1].children[1];
    if (back1.innerHTML == back2.innerHTML){
        hits++
        clicked.length = 0;
        counter = 0;
        n = 0;
        addClicks();
        score.innerHTML = "<p>Pogodjenih parova - "+hits+"!</p>"
        if (hits == 32 ){
            aler("Cestitamo uspeliste da pronadjete sve parove!");
            stopClicks();
        }
    }else {
       setTimeout(function() {
        clicked.length = 0;
        counter = 0;
        back1.style.transform = "perspective(900px) rotateY(180deg)";
        front1.style.transform = "perspective(900px) rotateY(0deg)";
        back2.style.transform = "perspective(900px) rotateY(180deg)";
        front2.style.transform = "perspective(900px) rotateY(0deg)";
        addClicks();
       },700)
    }
}

function stopClicks() {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].removeEventListener('click',flip)
        
    }
}
function addClicks() {
 
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].addEventListener('click', flip)
    }
  }


function createGrid() {
    let text = "";
    for (let i = 0; i < 64; i++) {
        let rand = Math.floor(Math.random()*icons1.length);
        text+='<div class="box">';
        text +='<div class="back">'+icons1[rand]+'</div>';
        text +='<div class="front"><img src="img/slika1.jpg" alt=""></div>';
        text +='</div>'
        icons1.splice(rand,1);
    }
    container.innerHTML = text;
    gameTime();
}
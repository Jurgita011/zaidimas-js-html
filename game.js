const flyingObject = document.getElementById('square');
const buttonOk = document.getElementById('ok');
const infoText = document.getElementById('info-text');
const viewWidth = document.body.clientWidth;
const viewHeight = document.body.clientHeight;
let rezultHuman = 0;
let rezultComputer = 0;
let set = 0;
let round = 1;
let flyinInterval;
let timerInterval;
let winner = '';
let rezults = '';
let timerTime = 300; //0.01/
const changeInterval = 1000; //
let timer = 0;
const timerObject = document.getElementById('timer');
const  soundObject = document.getElementById("myAudio"); 
let overall = [];
let finalist = "";


function playAudio() { 
    soundObject.play(); 
    soundObject.volume = 0.15;
} 

function randomMinMax(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }


function timerRunOut(){
    rezultComputer++;
    puttFlyingObjectInRandomPlace();
    flyinInterval =  setTimeout(timerRunOut, 1000);
}

function puttFlyingObjectInRandomPlace(){
    const positionX = randomMinMax(0, (viewWidth-200));
    const positionY = randomMinMax(0, (viewHeight-200));
    square.style.setProperty('--top', positionY + 'px');
    square.style.setProperty('--left', positionX  + 'px');
    square.style.display='block';
}



function roundEnd() {
    
    if (rezultHuman > rezultComputer){ 
        overall[round-1]=1;
        winner = "Zmogus -> "  + overall.filter(x => x===1).length + " Laimejimu";
    } else if(rezultHuman == rezultComputer) {
        overall[round-1]=0;
        winner = "Lygiosios -> "+ overall.filter(x => x===0).length + " Lygiuju";
    } else {
        overall[round-1]=-1;
        winner = "Kompiuteris -> " + overall.filter(x => x===-1).length + " Laimejimu";
    };

    console.log(overall);

    rezults += `Roundas: ${round} > Zmg: ${rezultHuman} - PC: ${rezultComputer}. NUGALETOJAS: ${winner} \n\r`;
    document.getElementById('info').style.display = 'flex';
    infoText.innerText = rezults;
    rezultComputer = 0;
    rezultHuman = 0;

    if (round >= 10){
        if (overall.reduce((a,b)=>a+b)>0){
            finalist = 'ZMOGUS';
        } else if(overall.reduce((a,b)=>a+b)===0){
            finalist = 'LYGIOSIOS';
        } else {
            finalist = 'KOMPIUTERIS';
        }
        infoText.innerText = rezults + "Žaidimas baigtas. \n\r Matcho nugaletojas: " + finalist ; 
        round = 1;
        rezults = '';
        overall = [];
        return;
    }
    round++;
    
}
   
function timeDownCounter(){
timerObject.innerHTML = `<span style="font-size:20px; display:inline-block">Roundas ${round}</span> <br> ${Math.floor(timerTime/10)} : ${timerTime%10} <br> <span style="font-size:20px; display:inline-block"> Žmg: ${rezultHuman} / PC: ${rezultComputer}</span> <br>`;
timerTime --;
if (timerTime <= 0){
    timerObject.innerHTML = `<span style="font-size:20px; display:inline-block">Roundas ${round}</span> <br> 0 : 0 <br> <span style="font-size:20px; display:inline-block"> Žmg: ${rezultHuman} / PC: ${rezultComputer}</span> <br>`;
    clearInterval(timerInterval);
    clearTimeout(flyinInterval);
    square.style.display='none';
    timerTime = 300;
    roundEnd();
}
}


buttonOk.addEventListener("click", ()=>{
    document.getElementById('info').style.display = 'none';
    timerInterval = setInterval(timeDownCounter, 100);
    puttFlyingObjectInRandomPlace();
    flyinInterval =  setTimeout(timerRunOut, changeInterval);
});


flyingObject.addEventListener("click", ()=>{
    playAudio();    
    rezultHuman=rezultHuman+1;
    rezultComputer=rezultComputer;
    clearTimeout(flyinInterval);
    puttFlyingObjectInRandomPlace();
    flyinInterval =  setTimeout(timerRunOut, 1000);  //
});  

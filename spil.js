let myRand;

let point;
console.log(point);

let liv;
console.log(liv);

const god1 = document.querySelector("#handsker_container");
const god2 = document.querySelector("#dynamit_container");

const ond1 = document.querySelector("#yvonnehat_container");
const ond2 = document.querySelector("#ost_container");

window.addEventListener("load", sidenVises);
function sidenVises() {
  console.log("sidenVises");

  //Skjul andre skærme
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  //Vis start skærm
  document.querySelector("#start").classList.remove("hide");
  //Klik på start_knap
  document.querySelector("#start_knap").addEventListener("click", startGame);

  // startGame();
}

function startGame() {
  console.log("startGame");

  //Nulstil point og udskriv
  point = 0;
  //reset liv til 3
  liv = 3;
  document.querySelector("#liv1").classList.remove("fjernet");
  document.querySelector("#liv2").classList.remove("fjernet");
  document.querySelector("#liv3").classList.remove("fjernet");

  //Skjul andre skærme
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#start").classList.add("hide");

  //Start timer
  document.querySelector("#time_sprite").classList.add("timer");
  document
    .querySelector("#time_container")
    .addEventListener("animationend", stopSpillet);

  //Giv container en position en delay og en speed
  //god
  god1.classList.add("pos1", "delay1", "speed1");
  god2.classList.add("pos3", "delay1", "speed1");
  //ond
  ond1.classList.add("pos2", "delay2", "speed2");
  ond2.classList.add("pos4", "delay2", "speed2");

  //Variablen er sat lig med et tilfældigt tal mellem 1 og 4
  myRand = Math.floor(Math.random() * 5) + 1;
  //God container en random position
  god1.classList.add("pos" + myRand);
  god2.classList.add("pos" + myRand);
  myRand = Math.floor(Math.random() * 5) + 1;
  //Ond container en random position
  ond1.classList.add("pos" + myRand);
  ond2.classList.add("pos" + myRand);

  //Falder-animationer på alle elementer
  //god
  god1.classList.add("falder");
  god2.classList.add("falder");
  //ond
  ond1.classList.add("falder");
  ond2.classList.add("falder");

  //Lyt efter falder-animationer er færdig
  //god
  god1.addEventListener("animationiteration", godReset);
  god2.addEventListener("animationiteration", godReset);
  //ond
  ond1.addEventListener("animationiteration", ondReset);
  ond2.addEventListener("animationiteration", ondReset);

  //Lyt efter klik på alle elementer
  //god
  god1.addEventListener("mousedown", clickGod);
  god2.addEventListener("mousedown", clickGod);
  //ond
  ond1.addEventListener("mousedown", clickOnd);
  ond2.addEventListener("mousedown", clickOnd);

  document.querySelector("#mine_point").innerHTML = point;

  //Tilføjer musik
  document.querySelector("#musik").play();
  //sætter loop på musik
  document.querySelector("#musik").loop = true;
}

//God fryser og forsvinder
function clickGod() {
  console.log("clickGod");
  console.log(this);

  //lyd
  //Gør så man kan høre lyden på ny god, selvom lyden ikke er færdigafspillet
  document.querySelector("#lyd1").currentTime = 0;
  //Tilføjer lyd når man klikker
  document.querySelector("#lyd1").play();
  // document.querySelector("#handsker_sprite").classList.add("#lyd1");

  //ryd op, så man ikke kan kilkke på den samme flere gange
  this.removeEventListener("mousedown", clickGod);
  //frys -animation
  this.classList.add("frys");
  //forsvind -animation
  this.firstElementChild.classList.add("fade");
  //Lyt efter flyv-animationer er færdig
  this.addEventListener("animationend", godReset);
  point++;
  document.querySelector("#mine_point").textContent = point;
}

//EFTER KLIK - God animation reset og start på ny position
function godReset() {
  console.log("godReset");
  console.log(this);
  //ryd op, fjern alt er på container og sprite
  this.classList = "";
  this.firstElementChild.classList = "";
  document;
  //For at kunne genstarte flyv animationen, da vi fjener og tilføjer den i samme function
  this.offsetLeft;
  //sæt variablen lig med et tilfældigt tal mellem 1 og 4
  myRand = Math.floor(Math.random() * 4) + 1;

  //Giv en position til container
  this.classList.add("pos" + myRand);
  //giv container ny tilfældig speed
  this.classList.add("speed" + myRand);
  //Start flyv-animationer på element
  this.classList.add("falder");
  //Lyt efter klik på element
  this.addEventListener("mousedown", clickGod);
}

//Ond fryser og forsvinder
function clickOnd() {
  console.log("clickOnd");
  console.log(this);
  document.querySelector("#liv" + liv).classList.add("fjernet");
  liv--;
  console.log("liv er" + liv);

  document.querySelector("#wosh").currentTime = 0;
  //Tilføjer lyd når man klikker
  document.querySelector("#wosh").play();

  //ryd op, så man ikke kan kilkke på den samme flere gange
  this.removeEventListener("mousedown", clickOnd);
  //frys -animation
  this.classList.add("frys");
  //forsvind -animation
  this.firstElementChild.classList.add("roterforsvind");

  this.addEventListener("animationend", ondReset);

  if (liv <= 0) {
    console.log("ikke flere liv");
    stopSpillet();
  }
}
//EFTER KLIK - Ond animation reset og start på ny position
function ondReset() {
  console.log("ondReset");
  console.log(this);
  //ryd op, fjern alt er på container og sprite
  this.classList = "";
  this.firstElementChild.classList = "";
  //For at kunne genstarte flyv animationen, da vi fjener og tilføjer den i samme function
  this.offsetLeft;
  //sæt variablen lig med et tilfældigt tal mellem 1 og 4
  myRand = Math.floor(Math.random() * 4) + 1;

  //Giv en position til container
  this.classList.add("pos" + myRand);
  //giv container ny tilfældig speed
  this.classList.add("speed" + myRand);
  //Start flyv-animationer på element
  this.classList.add("falder");
  //Lyt efter klik på element
  this.addEventListener("mousedown", clickOnd);
}

//STOP SPILLET
function stopSpillet() {
  console.log("stopSpillet");

  //Stop timer
  document.querySelector("#time_sprite").classList.remove("timer");
  document
    .querySelector("#time_container")
    .removeEventListener("animationend", stopSpillet);

  //fjern alt er på alle elementers container og sprite for GOD
  //handsker
  god1.classList = "";
  document.querySelector("#handsker_sprite").classList = "";
  //fjern alle event listener på alle containere
  god1.removeEventListener("animationiteration", godReset);
  god1.removeEventListener("animationend", godReset);
  god1.removeEventListener("mousedown", clickGod);
  //dynamit
  god2.classList = "";
  document.querySelector("#dynamit_sprite").classList = "";
  //fjern alle event listener på alle containere
  god2.removeEventListener("animationiteration", godReset);
  god2.removeEventListener("animationend", godReset);
  god2.removeEventListener("mousedown", clickGod);

  //fjern alt er på alle elementers container og sprite for OND
  ond1.classList = "";
  document.querySelector("#yvonnehat_sprite").classList = "";
  //fjern alle event listener på alle containere
  ond1.removeEventListener("animationiteration", ondReset);
  ond1.removeEventListener("animationend", ondReset);
  ond1.removeEventListener("mousedown", clickOnd);
  //ost
  ond2.classList = "";
  document.querySelector("#yvonnehat_sprite").classList = "";
  //fjern alle event listener på alle containere
  ond2.removeEventListener("animationiteration", ondReset);
  ond2.removeEventListener("animationend", ondReset);
  ond2.removeEventListener("mousedown", clickOnd);

  //Gameover
  if (liv <= 0) {
    gameOver();
  } else if (point >= 5) {
    levelComplete();
  } else {
    gameOver();
  }
}

function gameOver() {
  console.log("Du tabte");
  //skruer ned for musikken
  document.querySelector("#musik").pause();
  //Vis gameover skærm
  document.querySelector("#game_over").classList.remove("hide");
  //Udskriv points
  document.querySelector("#game_over_points").textContent = point;
  //Klik på genstart1
  document.querySelector("#genstart1").addEventListener("click", startGame);
}

function levelComplete() {
  console.log("Du vandt");
  //skruer ned for musikken
  document.querySelector("#musik").pause();
  //Vis levelComplete skærm
  document.querySelector("#level_complete").classList.remove("hide");
  //Udskriv points
  document.querySelector("#level_complete_points").textContent = point;
  //Klik på genstart2
  document.querySelector("#genstart2").addEventListener("click", startGame);
}

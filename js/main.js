
//document.getElementById('start_game').addEventListener('click', startGame(), false);
var total_cards = 8,
      generate_cards = total_cards+1,
      coins = 0,
      cards_id = [],
      open_cards = 0,
      value_open_cards = [],
      id_open_cards = [],
      timer_showCard = 500,//500 ms
      timer_checkValueArray = 1000;

function startGame() {
  //alert('start');
  
  document.getElementById('sceneMenu').style.display = "none";
  document.getElementById('sceneGame').style.display = "block";
  
  document.getElementById('coinsNow').innerHTML = coins;
  document.getElementById('total_cards').innerHTML = total_cards;

  
  for(var i=1; i<generate_cards; i++) {//need + 1
    cards_id.push(i);  
  }
  for(var i=1; i<generate_cards; i++) {//need + 1
    cards_id.push(i);  
  }
  shuffle(cards_id);
  
  console.log(cards_id);
  
  var blockCards = document.createElement('div');
    blockCards.className = "flex flex-direction-row flex-align-items-start flex-justify-content-space-around flex-wrap";
    //blockCards.innerHTML = "id: "+i+" v: "+cards_id[i];
    blockCards.id = "card_list";
    //blockCards.setAttribute("onClick", "core("+i+");");
    //blockCards.setAttribute("data-value", cards_id[i]);
    
    sceneGame.appendChild(blockCards);
  
  for (var i = 0; i < cards_id.length; i++) {
    var card = document.createElement('div');
    card.className = "card margin-0-10-10-10 animate_open";
    //card.innerHTML = "id: "+i+" v: "+cards_id[i];
    card.id = i;
    card.setAttribute("onClick", "core("+i+");");
    card.setAttribute("data-value", cards_id[i]);
    
    card_list.appendChild(card);
    
    
    
  }
  
}

function core(card_id) {
  if(open_cards == 2) {
    //alert('check');
    setTimeout("checkValueArray("+card_id+")",timer_checkValueArray);
    console.log(value_open_cards);
    console.log(id_open_cards);
  } else {
    open_cards = open_cards + 1;  
    check(card_id);
  } 
  //alert(open_cards);
}

function check(card_id) {
  var card = document.getElementById(card_id),
      card_value = card.getAttribute("data-value");
  
  //alert("id: "+card_id+" v: "+card_value);
  openCard(card_id);
  setTimeout("showCard("+card_id+")",timer_showCard);//через 1 секунд
  value_open_cards.push(card_value);
  id_open_cards.push(card_id);
  
  if(open_cards == 2) {
    //alert('check');
    setTimeout("checkValueArray("+card_id+")",timer_checkValueArray);
    console.log(value_open_cards);
    console.log(id_open_cards);
  }
  
}

function checkValueArray(card_id) {//////////////////////////////////////////   WIN
  var card = document.getElementById(card_id); 
  
  if(value_open_cards[0] == value_open_cards[1] && id_open_cards[0] != id_open_cards[1]) {
    //alert('win');
    
    coins = coins + 1;
    document.getElementById('coinsNow').innerHTML = coins;
    
    document.getElementById(id_open_cards[0]).classList.remove("open");
    document.getElementById(id_open_cards[1]).classList.remove("open");
    
    document.getElementById(id_open_cards[0]).removeAttribute("onClick");
    document.getElementById(id_open_cards[1]).removeAttribute("onClick");
    
    open_cards = 0;
    value_open_cards = [];
    id_open_cards = [];
    
    checkEndGame();
    
  } else {
    //alert('lose'); 
    document.getElementById(id_open_cards[0]).classList.remove("open");
    document.getElementById(id_open_cards[1]).classList.remove("open");
    
    document.getElementById(id_open_cards[0]).classList.add("animate_open");
    document.getElementById(id_open_cards[1]).classList.add("animate_open");
    
    document.getElementById(id_open_cards[0]).style.background = "";
    document.getElementById(id_open_cards[1]).style.background = "";
    
    //document.getElementById(id_open_cards[0]).style.backgroundPosition = "50% 20px,50% 52px";
    //document.getElementById(id_open_cards[1]).style.backgroundPosition = "50% 20px,50% 52px";
    
    open_cards = 0;
    value_open_cards = [];
    id_open_cards = [];
    
  }
}

function showCard(card_id) {
  var card = document.getElementById(card_id),
      card_value = card.getAttribute("data-value");
  
  card.classList.remove("animate_open");
  
  card.style.background = "url(img/"+card_value+".png) no-repeat #fff 50% 50%";
}

function openCard(card_id) {
  var card = document.getElementById(card_id);
  
  card.classList.add("open");
  
  card.style.backgroundPosition = "50% 0px,50% 70px";
}

function checkEndGame() {
  if(coins == total_cards) {
    alert('finish');
    
    var scene = document.createElement('div');
    scene.className = "block height-100-p absolute flex flex-direction-column flex-align-items-center flex-justify-content-center";
    scene.id = "scene_id";
    display.appendChild(scene);
    
    var message = document.createElement('div');
    message.className = "fs";
    message.innerHTML = "Вы виграли";
    //message.id = "scene_id';
    //scene.setAttribute("onClick", "core("+i+");");
    //scene.setAttribute("data-value", cards_id[i]);
    scene_id.appendChild(message);
    
    var infoCoins = document.createElement('div');
    infoCoins.className = "";
    infoCoins.innerHTML = "Найдено: "+coins+"/"+total_cards;
    //message.id = "scene_id';
    //scene.setAttribute("onClick", "core("+i+");");
    //scene.setAttribute("data-value", cards_id[i]);
    scene_id.appendChild(infoCoins);
    
    var goToMenu = document.createElement('div');
    goToMenu.className = "";
    goToMenu.innerHTML = "<a href='javascript:void(0)' >Вернутся в меню</a>";
    //message.id = "scene_id';
    goToMenu.setAttribute("onClick", "showMenu();");
    //scene.setAttribute("data-value", cards_id[i]);
    scene_id.appendChild(goToMenu);
  }
}

function showMenu() {
  document.getElementById('sceneMenu').style.display = "block";
  document.getElementById('sceneGame').style.display = "none";
  document.getElementById('scene_id').style.display = "none";
  
  zeroGame();
}

function zeroGame() {
  //total_cards = 0,
  //generate_cards = total_cards+1,
  coins = 0,
  cards_id = [],
  open_cards = 0,
  value_open_cards = [],
  id_open_cards = [];
  
  var card_list = document.getElementById("card_list");
  card_list.parentNode.removeChild(card_list);
  
}

function stopGame() {
  var scene = document.createElement('div');
    scene.className = "block height-100-p absolute flex flex-direction-column flex-align-items-center flex-justify-content-center";
    scene.id = "scene_id";
    display.appendChild(scene);
    
    var message = document.createElement('div');
    message.className = "fs";
    message.innerHTML = "Игра окончена";
    //message.id = "scene_id';
    //scene.setAttribute("onClick", "core("+i+");");
    //scene.setAttribute("data-value", cards_id[i]);
    scene_id.appendChild(message);
    
    var infoCoins = document.createElement('div');
    infoCoins.className = "";
    infoCoins.innerHTML = "Найдено: "+coins+"/"+total_cards;
    //message.id = "scene_id';
    //scene.setAttribute("onClick", "core("+i+");");
    //scene.setAttribute("data-value", cards_id[i]);
    scene_id.appendChild(infoCoins);
    
    var goToMenu = document.createElement('div');
    goToMenu.className = "";
    goToMenu.innerHTML = "<a href='javascript:void(0)' >Вернутся в меню</a>";
    //message.id = "scene_id';
    goToMenu.setAttribute("onClick", "showMenu();");
    //scene.setAttribute("data-value", cards_id[i]);
    scene_id.appendChild(goToMenu);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
function startGame() {
  alert('start');
  document.getElementById('sceneMenu').style.display = "none";
  document.getElementById('sceneGame').style.display = "block";
  
  document.getElementById('coinsNow').innerHTML = '0';
  
  for(var i=1; i<17;i++) {//create 16 cards
    var card = document.createElement('div');
    card.className = "card margin-0-10-10-10";
    card.innerHTML = i;
    card.id = i;
    
    card_list.appendChild(card);
  }
}
*/

//id = card-list
/*
for(var i=0; i<10; i++) {
var div = document.createElement('div');
div.className = "alert";
div.innerHTML = "Hello";

bloks.appendChild(div);
}
*/
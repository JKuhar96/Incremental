var gameData = {
  copper: 0,
  copperPerClick: 1,
  copperPerClickCost: 10,
  firstCopperMiner: 100
}

const updateSpeed = 20

// Function for button click gain to get basic currency
function mineCopper() {
  gameData.copper += gameData.copperPerClick
  document.getElementById("copperMined").innerHTML = gameData.copper + " Copper Mined"
  if (gameData.copper >= gameData.copperPerClickCost) {
    document.getElementById("copperPerClickUpgrade").removeAttribute("hidden")
    document.getElementById("copperPerClickUpgrade").removeAttribute("disabled")
  }

  if (gameData.copper >= gameData.firstCopperMiner) {
    document.getElementById("firstCopperMiner").removeAttribute("hidden")
    document.getElementById("firstCopperMiner").removeAttribute("disabled")
  }
}

// Function for button to upgrade click gain
function buyCopperPerClick() {
  if (gameData.copper >= gameData.copperPerClickCost) {
    gameData.copper -= gameData.copperPerClickCost
    gameData.copperPerClick += 1
    gameData.copperPerClickCost *= 2
    document.getElementById("copperMined").innerHTML = gameData.copper + " Copper Mined"
    document.getElementById("copperPerClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.copperPerClick + ") " + "Cost: " + gameData.copperPerClickCost + " Copper"
    document.getElementById("copperPerClickUpgrade").setAttribute("disabled", true)
  }
}

// Function for first automated miner
function unlockFirstCopperMiner() {
  if (gameData.copper >= gameData.firstCopperMiner) {
    gameData.copper -= gameData.firstCopperMiner
    gameData.firstCopperMiner *= 2
    update()
    window.setInterval(function () {
      gameData.copper += 10
      saveGameData()
      update()
     }, 1000)
    document.getElementById("firstCopperMiner").setAttribute("disabled", true)
  }
}

function firstAutomatorValue() {
  
}

function saveGameData() {
  localStorage.setItem("currencyMinerSave", JSON.stringify(gameData))
}

function loadGameData() {
  var saveGame = JSON.parse(localStorage.getItem("currencyMinerSave"))
  if (saveGame !== null) {
    if (typeof saveGame.copper !== "undefined")
      gameData.copper = saveGame.copper;
    if (typeof saveGame.copperPerClick !== "undefined")
      gameData.copperPerClick = saveGame.copperPerClick;
    if (typeof saveGame.copperPerClickCost !== "undefined")
      gameData.copperPerClickCost = saveGame.copperPerClickCost;
    if (typeof saveGame.firstCopperMiner !== "undefined")
      gameData.firstCopperMiner = saveGame.firstCopperMiner;
    
    gameData = saveGame
  }
  document.getElementById("copperMined").innerHTML = gameData.copper + " Copper Mined"
}

function update(){
  document.getElementById("copperMined").innerHTML = gameData.copper + " Copper Mined"
}

loadGameData()

update()

var gameloop = setInterval(function() {
  if (ticking) return;
  ticking = true;
  update();
  ticking = false;
}, 1000 / updateSpeed)
var saveloop = setInterval(saveGameData, 3000)
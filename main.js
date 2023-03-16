var gameData = {
  copper: 0,
  copperPerClick: 1,
  copperPerClickCost: 10,
  firstCopperMiner: 1000
}

//#region Functions for the first tab
// Function for button click gain to get basic currency
function mineCopper() {
  gameData.copper += gameData.copperPerClick
  document.getElementById("copperMined").innerHTML = gameData.copper + " Copper Mined"
}

// Function for button to upgrade click gain
function buyCopperPerClick() {
  if (gameData.copper >= gameData.copperPerClickCost) {
    gameData.copper -= gameData.copperPerClickCost
    gameData.copperPerClick += 1
    gameData.copperPerClickCost *= 2
    document.getElementById("copperMined").innerHTML = gameData.copper + " Copper Mined"
  }
}

// Function for first automated miner
function unlockFirstMiner() {
  if (gameData.copper >= gameData.firstCopperMiner) {
    gameData.copper -= gameData.firstCopperMiner
    window.setInterval(function (){gameData.copper += 100}, 10000)
  }
}
//#endregion

if (gameData.copper === 10) {
  document.getElementById("copperPerClickUpgrade").removeAttribute("hidden")
}

// Save the game every 15 seconds
var saveGameLoop = window.setInterval(function () {
  localStorage.setItem("currencyMinerSave", JSON.stringify(gameData))
}, 15000)

// Get save data from local storage and parse
var savegame = JSON.parse(localStorage.getItem("currencyMinerSave"))
if (savegame !== null) {
  if (typeof savegame.copper !== "undefined") gameData.copper = savegame.copper;
  if (typeof savegame.copperPerClick !== "undefined") gameData.copperPerClick = savegame.copperPerClick;
  if (typeof savegame.copperPerClickCost !== "undefined") gameData.copperPerClickCost = savegame.copperPerClickCost;
  if (typeof savegame.firstCopperMiner !== "undefined") gameData.firstCopperMiner = savegame.firstCopperMiner;

  gameData = savegame
}

// Loop that can be used for automation
var mainGameLoop = window.setInterval(function () {

}, 1000)
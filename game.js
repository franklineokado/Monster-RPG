const playerStats = {
  xp: 0,
  health: 100,
  gold: 50
}

function renderPlayerStats() {
  document.querySelector('.js-player-stats').innerHTML = `XP: <strong>${playerStats.xp}</strong>, Health: <strong>${playerStats.health}</strong>, Gold: <strong>${playerStats.gold}</strong>`
}

renderPlayerStats()

let inventory = ['stick']

const weapons = [
  {name: 'stick', power: 5},
  {name: 'dagger', power: 30},
  {name: 'claw hammer', power: 50},
  {name: 'sword', power: 100}
]

let currentIndex = 0
let currentWeapon = weapons[currentIndex]

const monsters = [
  {name: "Slime", level: 2, health: 15},
  {name: "Fanged beast", level: 8, health: 60},
  {name: "Dragon", level: 20, health: 300}
]

const btn1 = document.querySelector('.js-go-store-btn')
const btn2 = document.querySelector('.js-go-cave-btn')
const btn3 = document.querySelector('.js-fight-dragon-btn')
const locationText = document.querySelector('.js-location')

function goStore() {
  btn1.innerText = 'Buy 10 health (10 gold)'
  if(inventory.includes('sword')) {
    btn2.innerText = 'Sell weapon (15 gold)'
  } else {
    btn2.innerText = 'Buy weapon (30 gold)'
  }
  btn3.innerText = 'Go to town square'
  locationText.innerText = 'You enter the store'
}

function goCave() {
  btn1.innerText = 'Fight slime'
  btn2.innerText = 'Fight fanged beast'
  btn3.innerText = 'Go to town square'
  locationText.innerText = 'You enter the cave. You see some monsters'
}

function goTown() {
  monsters[0].health = 15;
  monsters[1].health = 60;
  monsters[2].health = 300;

  btn1.innerText = 'Go to store'
  btn2.innerText = 'Go to cave'
  btn3.innerText = 'Fight dragon'
  locationText.innerText = 'You are in the town square. You see a sign that says "Store".'

  document.querySelector('.js-monster-details').style.display = 'none'

  renderPlayerStats()
}

function secretLocation() {
  if(playerStats.health <= 20) {
    document.querySelector('.js-player-stats').innerHTML = `XP: <strong>${playerStats.xp}</strong>, Health: <span style="color:red">${playerStats.health}</span>, Gold: <strong>${playerStats.gold}</strong>`
  } else {
    renderPlayerStats()
  }

  btn1.innerText = '2'
  btn2.innerText = '8'
  btn3.innerText = 'Head to town square'

  locationText.innerHTML = 'You enter the <strong>secret location</strong>. Gold is hidden behind the two doors - <strong>2 AND 8</strong>. But be <br>careful, one room holds a monster at a time, protecting the Gold. <strong>Choose wisely</strong>.'
}

function renderMonsterDetails(monster) {
  document.querySelector('.js-monster-details').innerHTML = `Monster Name: <strong>${monster.name}</strong>, Health: <strong>${monster.health}</strong>, level: <strong>${monster.level}</strong>.`
}

function fightMonster(monster) {
  renderPlayerCriticalCondition(monster)
  renderMonsterCriticalCondition(monster)

  btn1.innerText = 'Attack'
  btn2.innerText = 'Dodge'
  btn3.innerText = 'Run'
  locationText.innerHTML = `You are fighting the monster <strong>${monster.name}</strong>.`
  document.querySelector('.js-monster-details').style.display = 'initial'
  renderMonsterDetails(monster)
}

function buyHealth() {
  if(playerStats.gold >= 10) {
    playerStats.health += 10
    playerStats.gold -= 10
    renderPlayerStats()
  } else {
    locationText.innerText = 'You do not have enough gold to buy health.'
  }
}

let heavierHit = playerHits()

function playerHits() {
  const hit = currentWeapon.power + Math.floor(Math.random() * playerStats.xp) + 1
  return hit
}

function renderPowerDisplay() {
  document.querySelector('.js-power-display').innerHTML = `Estimated Player Power: <strong>${heavierHit}</strong>`
}

renderPowerDisplay()

function buyWeapon() {
  if(playerStats.gold >= 30) {
    playerStats.gold -= 30
    renderPlayerStats()
    currentWeapon = weapons[currentIndex += 1]
    inventory.push(currentWeapon.name)
    heavierHit = playerHits()
    renderPowerDisplay()

    if(inventory.length === 1) {
      locationText.innerHTML = `You now have a <strong>${inventory[inventory.length-1]}</strong>. In your inventory you have: <strong>${inventory[0]}</strong>.`
    } else if(inventory.length === 2) {
      locationText.innerHTML = `You now have a <strong>${inventory[inventory.length-1]}</strong>. In your inventory you have: <strong>${inventory[0]}</strong> and <strong>${inventory[1]}</strong>.`
    } else if(inventory.length === 3) {
      locationText.innerHTML = `You now have a <strong>${inventory[inventory.length-1]}</strong>. In your inventory you have: <strong>${inventory[0]}</strong>, <strong>${inventory[1]}</strong> and <strong>${inventory[2]}</strong>.`
    } else if(inventory.length === 4) {
      locationText.innerHTML = `You now have a <strong>${inventory[inventory.length-1]}</strong>. In your inventory you have: <strong>${inventory[0]}</strong>, <strong>${inventory[1]}</strong>, <strong>${inventory[2]}</strong> and <strong>${inventory[3]}</strong>.`
    }

    if(inventory.includes('sword')) {
      btn2.innerText = 'Sell weapon (15 gold)'
    }
  } else {
    locationText.innerText = 'You do not have enough gold to buy a weapon.'
  }
}

function monsterHits(monster) {
  const hit = (monster.level * 5) - Math.floor(Math.random() * playerStats.xp)

  return hit > 0 ? hit : 0
}

const hints = [
  {hintTxt: 'Earn gold by defeating a monster'},
  {hintTxt: 'Unlock the secret location to find gold'},
  {hintTxt: 'Deafeating a monster unlocks a secret location'},
  {hintTxt: 'There are 4 weapons that you can buy. Sword is the most powerful'},
  {hintTxt: 'You can sell your weapon when you have sword in your inventory'},
  {hintTxt: 'Be very careful when your life turns red'},
  {hintTxt: 'High XP or high player power is not a guarantee that you will win. Protect your life'},
  {hintTxt: "Successfully dodging a monster's attack can earn you more power"},
  {hintTxt: 'Protect your life by running away'},
  {hintTxt: 'The monsters gain experience too and can dodge your attack'},
  {hintTxt: 'Be careful at the secret location'},
  {hintTxt: 'Defeating a monster earns you experience'},
  {hintTxt: 'Buying a new weapon increases your power'},
  {hintTxt: "Your power depends on your current weapon's power plus a random number based on the level of your experience"},
  {hintTxt: 'When fighting a monster, take note of its level & health. Level determines its power & health <br>determines the level of damage it can withstand'},
  {hintTxt: "Monster's power depends on its level a randomised number based on your experience"},
  {hintTxt: "Be very careful when facing the dragon"},
  {hintTxt: "Higher experience makes you suffer less damage from the monster's attack"},
  {hintTxt: "Higher power inflicts more damage on the monster"},
  {hintTxt: "Sell your weapons to earn more gold - Only if you had bought the weapon sword and it is in your inventory"},
  {hintTxt: "The weapons are claw hammer, stick, sword and dagger. Sword inflicts the most damage"},
  {hintTxt: "Defeating the dragon requires a really smart strategy and some sacrifice"},
  {hintTxt: "While attacking there are chances that your weapon might break"}
]

let shownHintIndexes = [];

function renderHints() {
  if (shownHintIndexes.length === hints.length) {
    shownHintIndexes = []; // Reset when all hints have been shown
  }

  let randomIndex;

  // Keep picking a new index until we find one not shown yet
  do {
    randomIndex = Math.floor(Math.random() * hints.length);
  } while (shownHintIndexes.includes(randomIndex));

  shownHintIndexes.push(randomIndex); // Mark it as shown

  const hint = hints[randomIndex];
  document.querySelector('.js-hints').innerHTML = `<span class="hint-txt"><strong>Hint:</strong> ${hint.hintTxt}</span>`;
}


function dodgeAttack(monster) {
  if(Math.random() > .5) {
    locationText.innerHTML = `You successfully dodge the attack from the <strong>${monster.name}</strong> and earns more experience that levels up your power.`

    heavierHit += 1
    renderPowerDisplay()
  } else {
    playerStats.health -= monsterHits(monster)

    if(playerStats.health <= 0) {
      youLose()
      locationText.innerHTML = `You tried to dodge but got hit by the <strong>${monster.name}</strong>. Unfortunately <strong>You die!!!</strong>`
      renderHints()
      return
    }

    renderPlayerStats()
    locationText.innerHTML = `You tried to dodge but got hit by the <strong>${monster.name}</strong>.`
  }
}

function youLose() {
  playerStats.health = 0
  renderPlayerStats()

  btn1.innerText = 'REPLAY?'
  btn2.innerText = 'REPLAY?'
  btn3.innerText = 'REPLAY?'
}

function renderPlayerCriticalCondition(monster) {
  if(playerStats.health <= monsterHits(monster)) {
    document.querySelector('.js-player-stats').innerHTML = `XP: <strong>${playerStats.xp}</strong>, Health: <span style="color:red">${playerStats.health}</span>, Gold: <strong>${playerStats.gold}</strong>`
  } else {
    renderPlayerStats()
  }
}

function renderMonsterCriticalCondition(monster) {
  if(monster.health <= heavierHit) {
    document.querySelector('.js-monster-details').innerHTML = `Monster Name: <strong>${monster.name}</strong>, Health: <span style="color:red; font-weight:bold">${monster.health}</span>, level: <strong>${monster.level}</strong>.`
  } else {
    renderMonsterDetails(monster)
  }
}

function attack(monster) {
  if(monster.health < heavierHit) {//upon the player attacking & the monster's health is lower than the player's hit, the monster is killed
    playerStats.health -= monsterHits(monster)
    monster.health -= heavierHit
    
    if(playerStats.health > monster.health) {//this takes care of the situation that when the monster attacks & the player attacks, there are chances that they might die. so the code checks who suffers the most damage. if it is the monster then the player wins and gets revived with health of 1
      if(playerStats.health <= 0) {
        playerStats.health = 1
      }
    
      playerStats.xp += monster.level
      playerStats.gold += Math.floor(monster.level * 6.7);

      renderPlayerStats()

      btn1.innerText = 'Go to town square'
      btn2.innerText = 'Go to town square'
      btn3.innerText = 'Go to town square'

      document.querySelector('.js-monster-details').style.display = 'none'
      locationText.innerHTML = 'The monster screams "Arg!" as it dies. You gain <strong>experience points(XP)</strong> and <strong>Gold</strong>. <br>You also unlock a <strong>secret location</strong> that lies through the 3rd door leading to town.'
      heavierHit = playerHits()
      renderPowerDisplay()

      if(monster.name === 'Dragon') {
        document.querySelector('.js-game-info').innerHTML = '<h1>MISSION COMPLETE</h1>You finally defeat the <strong>Dragon</strong> and the people in the town are safe again.'

        btn1.innerText = 'REPLAY?'
        btn2.innerText = 'REPLAY?'
        btn3.innerText = 'REPLAY?'

        locationText.innerHTML = 'Congratulations. You finally complete the game. You can click <strong>"REPLAY?"</strong> to restart <br>the game. Level 2 that will be more exciting and challenging is droping soon. <strong>Stay tuned...</strong>'
      }
    } else {//if the player suffers the most damage upon monster's attack, he loses
      youLose()
      locationText.innerHTML = `You attack the <strong>${monster.name}</strong> and it attacks back. Unfortunately <strong>you die!!!</strong>.`
      renderHints()
    }
    return
  }

  if(playerStats.health > 0) {//so long as the player is alive,he can attack
    
    if(Math.random() <= .1 && inventory.length !== 1) {//if he attacks there is a 10% possibility of his weapon breaking so long as it is not the only weapon in his inventory
      const brokenWeapon = inventory.pop()

      if(inventory.length === 0) {
        locationText.innerHTML = `Your only weapon, <strong>${brokenWeapon}</strong> breaks and gets assigned <strong>stick</strong> as the recovery weapon. <br>You can go to the store and buy a new weapon.`
        inventory = ['stick']
      }

      locationText.innerHTML = `Your <strong>${brokenWeapon}</strong> breaks.`
      currentWeapon = weapons[currentIndex -= 1]
      heavierHit = playerHits()
      renderPowerDisplay()
    } else {//if the weapon does not break he proceeds the attack
      const randomNumber = Math.floor(Math.random() * 10) + 1

      if(randomNumber >= 1 && randomNumber <= 8) {//when he attacks there is only an 80% chance of him hitting.
        playerStats.health -= monsterHits(monster)//when he attacks, the monster also attacks back

        /*
        if(heavierHit > playerHits()) {//when the player had dodged the monsters attack and gained a higher power, he uses that power to inflict damage to the monster
          monster.health -= heavierHit
        } else {//if the player never dodged the monster's atttack, he inflicts damage on the monster with his regular power
          monster.health -= playerHits()//he attacks and inflicts some damage on the monster
        }
        */

        monster.health -= heavierHit
        
        renderPlayerStats()
        renderPlayerCriticalCondition(monster)
        renderMonsterDetails(monster)
        renderMonsterCriticalCondition(monster)

        if(playerStats.health > 0) {
          locationText.innerHTML = `You attack the <strong>${monster.name}</strong> with your <strong>${currentWeapon.name}</strong> and it attacks back.`
        } else if(playerStats.health <= 0) {//when the player's health is 0 or gets below zero, he loses and is offered the option to replay.When he replays the game starts over with the default player and moster stats
          youLose()
          locationText.innerHTML = `You attack the <strong>${monster.name}</strong> with your <strong>${currentWeapon.name}</strong> and it attacks back. Unfortunately <strong>You die!!!</strong>.`
          renderHints()
        } 
      } else {//if the player misses the monster, he still suffers the monster's hit because the monster attacks
        playerStats.health -= monsterHits(monster)

        if(playerStats.health <= 0) {//when the monster attacks and the player's life is zero or drops below zero, the player loses
          youLose()
          locationText.innerHTML = `You attack the <strong>${monster.name}</strong> with your <strong>${currentWeapon.name}</strong>. <strong>It dodges</strong> and attacks back. Unfortunately <strong>You die!!!</strong>.`
          renderHints()
          return
        }

        renderPlayerStats()
        renderPlayerCriticalCondition(monster)
        renderMonsterDetails(monster)
        locationText.innerHTML = `You attack the <strong>${monster.name}</strong> with your <strong>${currentWeapon.name}</strong>. <strong>It dodges</strong> and attacks back.`
      }
    }
  }
}

function resetGame() {
  document.querySelector('.js-game-info').innerHTML = 'Welcome to <strong>Dragon Repeller</strong>. You must defeat the dragon that is <br>attacking people in the town. You have to save them. <strong>Be Careful.</strong><br><strong>(<i>Head to the store to buy weapons and more health to defeat the dragon. <br>Fight some monsters in the cave to earn you more experience(XP) and gold</i>)</strong>'

  goTown()
  playerStats.xp = 0
  playerStats.health = 100
  playerStats.gold = 50
  inventory = ['stick']
  renderPlayerStats()
  currentIndex = 0
  currentWeapon = weapons[currentIndex]
  heavierHit = playerHits()
  renderPowerDisplay()

  document.querySelector('.js-hints').innerHTML = ``
}

function openDoor(doorNumber) {
  const numbers = []

  while(numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 10) + 1)
  }

  if(numbers.includes(doorNumber)) {
    playerStats.gold += 10

    if(playerStats.health <= 20) {
      document.querySelector('.js-player-stats').innerHTML = `XP: <strong>${playerStats.xp}</strong>, Health: <span style="color:red">${playerStats.health}</span>, Gold: <strong>${playerStats.gold}</strong>.`
    } else {
      renderPlayerStats()
    }

    locationText.innerHTML = 'Congratulations. You picked the safe door. You win <strong>10 Golds</strong>.'
  } else {
    playerStats.health -= 20

    if(playerStats.health <= 20) {
      document.querySelector('.js-player-stats').innerHTML = `XP: <strong>${playerStats.xp}</strong>, Health: <span style="color:red">${playerStats.health}</span>, Gold: <strong>${playerStats.gold}</strong>.`
    } else {
      renderPlayerStats()
    }

    if(playerStats.health <= 0) {
      youLose()
      locationText.innerHTML = 'Unfortunately you encounter the monster and gets attacked. Unfortunately <strong>You die!!!</strong>.'
      renderHints()
      return
    }

    locationText.innerHTML = 'Unfortunately you encounter the monster and gets attacked. You lose <strong>20 Health</strong>.'
  }
}

function sellWeapon() {
  if(inventory.length === 1) {
    locationText.innerHTML = `You can't sell your only weapon. You have only <strong>${inventory[0]}</strong> in your inventory.`
    return
  } 

  const soldWeapon = inventory.shift()
  playerStats.gold += 15
  renderPlayerStats()

  if(inventory.length === 1) {
    locationText.innerHTML = `You sold <strong>${soldWeapon}</strong>. In your inventory you now have: <strong>${inventory[0]}</strong>.`
  } else if(inventory.length === 2) {
    locationText.innerHTML = `You sold <strong>${soldWeapon}</strong>. In your inventory you now have: <strong>${inventory[0]}</strong> and <strong>${inventory[1]}</strong>.`
  } else if(inventory.length === 3) {
    locationText.innerHTML = `You sold <strong>${soldWeapon}</strong>. In your inventory you now have: <strong>${inventory[0]}</strong>, <strong>${inventory[1]}</strong> and <strong>${inventory[2]}</strong>.`
  }
}

document.querySelector('.js-go-store-btn').addEventListener('click', () => {
  if(btn1.innerText === 'Buy 10 health (10 gold)') {
    buyHealth()
    return
  } else if(btn1.innerText === 'Fight slime') {
    fightMonster(monsters[0])//you are fighting slime
    return
  } else if(btn1.innerText === 'Attack') {
    if(document.querySelector('.js-monster-details').innerHTML.includes('Slime')) {
      attack(monsters[0])
    } else if(document.querySelector('.js-monster-details').innerHTML.includes('Fanged beast')) {
      attack(monsters[1])
    } else if(document.querySelector('.js-monster-details').innerHTML.includes('Dragon')) {
      attack(monsters[2])
    }
    return
  } else if(btn1.innerText === 'Go to town square') {
    goTown()
    return
  } else if(btn1.innerText === 'REPLAY?') {
    resetGame()
    return
  } else if(btn1.innerText === '2') {
    openDoor(2)
    return
  }

  goStore()
})

document.querySelector('.js-go-cave-btn').addEventListener('click', () => {
  if(btn2.innerText === 'Buy weapon (30 gold)') {
    buyWeapon()
    return 
  } else if(btn2.innerText === 'Fight fanged beast') {
    fightMonster(monsters[1])//you are fighting fanged beast
    return
  } else if(btn2.innerText === 'Go to town square') {
    goTown()
    return
  } else if(btn2.innerText === 'Dodge') {
    if(document.querySelector('.js-monster-details').innerHTML.includes('Slime')) {
      dodgeAttack(monsters[0])
    } else if(document.querySelector('.js-monster-details').innerHTML.includes('Fanged beast')) {
      dodgeAttack(monsters[1])
    } else if(document.querySelector('.js-monster-details').innerHTML.includes('Dragon')) {
      dodgeAttack(monsters[2])
    }
    return
  } else if(btn2.innerText === 'REPLAY?') {
    resetGame()
    return
  } else if(btn2.innerText === '8') {
    openDoor(8)
    return
  } else if(btn2.innerText === 'Sell weapon (15 gold)') {
    sellWeapon()
    return
  }

  goCave()
})

document.querySelector('.js-fight-dragon-btn').addEventListener('click', () => {
  if(btn3.innerText === 'Go to town square') {
    if(locationText.innerText.includes('secret location')) {
      secretLocation()
    } else {
      goTown()
    }
    return
  } else if(btn3.innerText === 'Head to town square' || btn3.innerText === 'Run') {
    goTown()
    return
  } else if(btn3.innerText === 'REPLAY?') {
    resetGame()
    return
  }

  fightMonster(monsters[2])//you are fighting dragon
})

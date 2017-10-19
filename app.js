
/*

git: https://github.com/darkphotonKN/DivinityCalculatorApp.git

Divinity: Original Sin 2 Damage Calculator

Testing how effective your party's damage type is against certain disparities (or lack of)
in physical and magical armor.

Step 1. One Enemy, One Party

Party Character:

- Type: Object
- Physical damage and magical damage properties

Enemy Character:

- Type: Object
- Physical armor and magical armor properties

Function Simulate Attack
- Checks enemy's lowest defense stat.
- Character attacks with his damage type to the same defense type on the enemy.
- Party character numbers are used to damage enemy character defense numbers,
iterating until 0 defense stats is reached.
- While iterating

*/

// constructors

function Character(phyAtt, magAtt) {
  this.physicalAttack = phyAtt;
  this.magicAttack = magAtt;
}

function Enemy(phyDef, magDef) {
  this.physicalDefense = phyDef;
  this.magicDefense = magDef;
}


function attack(attacker, target) {
  var attacksMade = 0; // count attacks made to remove armor
  var attackAtk; // attacker's chosen damage
  var defenderDef;

  if(attacker.physicalAttack > attacker.magicAttack) {
    attackAtk = attacker.physicalAttack;
    defenderDef = target.physicalDefense; // set corresponding defense value of defender
  } else {
    attackAtk = attacker.magicAttack;
    defenderDef = target.magicDefense; // set correpsonding defense value of defender
  }

  while(defenderDef>0) {
    defenderDef -= attackAtk;
    attacksMade++;
  }

  return attacksMade;
}

// testing

var ned_stark = new Character(10,1);
//console.log(ned_stark.physicalAttack);
var tyrion = new Enemy(122,0);

var result = attack(ned_stark, tyrion);
console.log(result);

var output = document.getElementById('calc-box');
output.innerHTML = result;

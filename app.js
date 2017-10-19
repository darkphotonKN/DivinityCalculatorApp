
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

function Character(name, phyAtt, magAtt) {
  this.name = name;
  this.physicalAttack = phyAtt;
  this.magicAttack = magAtt;
}

function Enemy(phyDef, magDef) {
  this.physicalDefense = phyDef;
  this.magicDefense = magDef;
}

// normal attack function, attack with your highest dmg type
function attack(attacker, target) {
  var attacksMade = 0; // count attacks made to remove armor
  var attackAtk; // attacker's chosen damage
  var defenderDef; // defender's defense matching attacker's chosen type

  // choosing highest attack
  if(attacker.physicalAttack > attacker.magicAttack) {
    attackAtk = attacker.physicalAttack;
    defenderDef = target.physicalDefense; // set corresponding defense value of defender
  } else if (attacker.physicalAttack == attacker.magicAttack) {
    attackAtk = attacker.physicalAttack;
    defenderDef = target.physicalDefense; // if phys and mag attack the same just go with phys
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

// secondary attack function, only attack opponent's lowest defenses regardless of your own attack values
function attackLowest(attacker, target) {
  var attacksMade = 0; // count attacks made to remove armor
  var attackAtk; // attacker's chosen damage
  var defenderDef; // defender's defense matching attacker's chosen type

  // choosing lowest defense
  if(target.phyDef < target.magDef) {
    attackAtk = attacker.physicalAttack;
    defenderDef = target.physicalDefense; // set corresponding defense value of defender
  } else if (target.phyDef > target.magDef) {
    attackAtk = attacker.physicalAttack;
    defenderDef = target.physicalDefense; // if phys and mag attack the same just go with phys
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

// character1 always one element type, character2 always hybrid
function efficiencyCompare(character1, character2, target) {
  var fight1Res = attack(character1, target);
  var fight2Res = attackLowest(character2, target);

  var result = 0;
  if(fight1Res > fight2Res) {
    result = (fight1Res - fight2Res)/fight1Res;
    console.log(character2.name + " used less hits to remove armor.");
  } else if (fight1Res == fight2Res) {
    result = 1;
    console.log("Efficiency was even");
  } else {
      result = (fight2Res - fight1Res)/fight2Res;
      console.log(character1.name + " used less hits to remove armor.");
  }

  return result;
}

/* TESTING */

// attackers
var ned_stark = new Character("Eddark Stark", 10, 0);
var pyatPree = new Character("Pyat Pree", 0, 10);
var bericDondarrion = new Character("Beric Dondarrion", 7, 7);

// targets
var tyrion = new Enemy(100, 50);
var qyburn = new Enemy(50, 100);
var melisandre = new Enemy(0, 200);
var thorosOfMyr = new Enemy(100, 100);
var gregorClegane = new Enemy(200, 0);

var result = attack(ned_stark, tyrion);
var result2 = attackLowest(bericDondarrion, tyrion);
var efficiency_test_1 = efficiencyCompare(ned_stark, bericDondarrion, tyrion);
console.log("Fight 1: " + result);
console.log("Fight 2: " + result2);
console.log("Efficiency: " + efficiency_test_1);

/* main output */
var output = document.getElementById('output');
output.innerHTML = result;

/* analysis output */
var analysisOut = document.getElementById('analysis');
analysisOut.innerHTML = "Efficiency = " + efficiency_test_1;

















console.log();

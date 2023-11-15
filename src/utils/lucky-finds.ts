import { LuckyFinds } from "./global-types";
import { randomInRange, rollDice } from "./random-numbers";

export function generateLuckyFinds({count = 1, minRoll = 1, maxRoll = 100 }: {count?: number, minRoll?: number, maxRoll?: number}): string[] {
  const finds: string[] = [];
  for (let i = 0; i < count; i++) {
    const luckyFindTypeRoll = rollDice({sides: 100});
    let luckyFindResult: string | null = null;
    if (luckyFindTypeRoll <= 11) luckyFindResult = generateBooksFind(minRoll, maxRoll);
    else if (luckyFindTypeRoll <= 22) luckyFindResult = generateClothingFind(minRoll, maxRoll);
    else if (luckyFindTypeRoll <= 35) luckyFindResult = generateCoinsAndGemsFind(minRoll, maxRoll);
    else if (luckyFindTypeRoll <= 46) luckyFindResult = generateCombatGearFind(minRoll, maxRoll);
    else if (luckyFindTypeRoll <= 59) luckyFindResult = generateDiverseItemsFind(minRoll, maxRoll);
    else if (luckyFindTypeRoll <= 70) luckyFindResult = generateJewelryFind(minRoll, maxRoll);
    else if (luckyFindTypeRoll <= 81) luckyFindResult = generateLiquorFind(minRoll, maxRoll);
    else if (luckyFindTypeRoll <= 87) luckyFindResult = generateMiscellaneousMagicFind(minRoll, maxRoll);
    else if (luckyFindTypeRoll <= 100) luckyFindResult = generateRawMaterialsFind(minRoll, maxRoll);
    if (luckyFindResult) {
      finds.push(luckyFindResult);
    }
  }
  return finds;
}

function generateBooksFind(minRoll: number, maxRoll: number): string {
  let itemRoll = rollDice({sides: 100});
  while (itemRoll < minRoll || itemRoll > maxRoll){
    itemRoll = rollDice({sides: 100});
  }

  if (itemRoll <= 15) return 'Poetry book, value: 50 gp';
  if (itemRoll <= 30) return 'History text, value: 100 gp';
  if (itemRoll <= 42) return 'Religious text, value: 200 gp';
  if (itemRoll <= 54) return 'Lost music, value: 400 gp';
  if (itemRoll <= 64) return 'Minor scroll, value: varies';
  if (itemRoll <= 73) return 'Spell book (level 0-3), value: varies';
  if (itemRoll <= 80) return 'Medium scroll, value: varies';
  if (itemRoll <= 86) return 'Spell book (level 0-6), value: varies';
  if (itemRoll <= 91) return 'Lost history, value: 25,000 gp';
  if (itemRoll <= 95) return 'Major scroll, value: varies';
  if (itemRoll <= 98) return 'Lost religious text, value: 50,000 gp';
  if (itemRoll <= 100) return 'Spell book (level 0-9), value: varies';
  return 'Unknown Books found';
}
function generateClothingType(): string {
  const itemRoll = rollDice({sides: 10});
  if (itemRoll === 1) return 'Belt';
  if (itemRoll === 2) return 'Body';
  if (itemRoll === 3) return 'Chest';
  if (itemRoll === 4) return 'Eyes';
  if (itemRoll === 5) return 'Feet';
  if (itemRoll === 6) return 'Hand';
  if (itemRoll === 7) return 'Head';
  if (itemRoll === 8) return 'Headband';
  if (itemRoll === 9) return 'Shoulders';
  return 'Wrists';
}
function generateClothingFind(minRoll: number, maxRoll: number): string {
  let itemRoll = rollDice({sides: 100});
  while (itemRoll < minRoll || itemRoll > maxRoll){
    itemRoll = rollDice({sides: 100});
  }

  if (itemRoll <= 25) return `Simple outfit`;
  if (itemRoll <= 45) return `Noble outfit`;
  if (itemRoll <= 60) return `Royal outfit`;
  if (itemRoll <= 70) return `Lesser minor ${generateClothingType()} item`;
  if (itemRoll <= 80) return `Greater minor ${generateClothingType()} item`;
  if (itemRoll <= 88) return `Lesser medium ${generateClothingType()} item`;
  if (itemRoll <= 94) return `Greater medium ${generateClothingType()} item`;
  if (itemRoll <= 98) return `Lesser major ${generateClothingType()} item`;
  if (itemRoll <= 100) return `Greater major ${generateClothingType()} item`;
  return 'Unknown Clothing found';
}
function generateCoinsAndGemsFind(minRoll: number, maxRoll: number): string {
  let itemRoll = rollDice({sides: 100});
  while (itemRoll < minRoll || itemRoll > maxRoll){
    itemRoll = rollDice({sides: 100});
  }



  if (itemRoll <= 20) return `${rollDice({sides: 100})} gold, ${rollDice({sides: 100})} silver, ${rollDice({sides: 100})} copper`;
  if (itemRoll <= 40) return `${rollDice({count: 2, sides: 10})} least semi-precious stones (5 gp each)`;
  if (itemRoll <= 55) return `${rollDice({sides: 100, count: 2})} gold, ${rollDice({sides: 100, count: 2})} silver`;
  if (itemRoll <= 70) return `${rollDice({count: 2, sides: 10})} lesser semi-precious stones (25 gp each)`;
  if (itemRoll <= 77) return `${rollDice({count: 4, sides: 100})} gold`;
  if (itemRoll <= 84) return `${rollDice({count: 2, sides: 10})} semi-precious stones (50 gp each)`;
  if (itemRoll <= 89) return `${rollDice({sides: 100})} platinum`;
  if (itemRoll <= 94) return `${rollDice({count: 2, sides: 10})} greater semi-precious stones (250 gp each)`;
  if (itemRoll <= 97) return `${rollDice({count: 2, sides: 10})} lesser precious stones (500 gp each)`;
  if (itemRoll <= 100) return `${rollDice({count: 2, sides: 10})} greater precious stones (2,500 gp each)`;
  return 'Unknown Coins and gems found';
}
function generateCombatGearFind(minRoll: number, maxRoll: number): string {
  let itemRoll = rollDice({sides: 100});
  while (itemRoll < minRoll || itemRoll > maxRoll){
    itemRoll = rollDice({sides: 100});
  }

  if (itemRoll <= 15) return `${rollDice({sides: 4})} mwk light armors/shields`;
  if (itemRoll <= 30) return `${rollDice({sides: 4})} mwk weapons`;
  if (itemRoll <= 40) return `${rollDice({sides: 4})} mwk medium armor`;
  if (itemRoll <= 50) return `${rollDice({sides: 4})} mwk heavy armor`;
  if (itemRoll <= 58) return `Lesser minor armor/shield`;
  if (itemRoll <= 65) return `Lesser minor weapon`;
  if (itemRoll <= 71) return `Greater minor armor/shield`;
  if (itemRoll <= 76) return `Greater minor weapon`;
  if (itemRoll <= 81) return `Lesser medium armor/shield`;
  if (itemRoll <= 85) return `Lesser medium weapon`;
  if (itemRoll <= 89) return `Greater medium armor/shield`;
  if (itemRoll <= 92) return `Greater medium weapon`;
  if (itemRoll <= 95) return `Lesser major armor/shield`;
  if (itemRoll <= 97) return `Lesser major weapon`;
  if (itemRoll <= 99) return `Greater major armor/shield`;
  if (itemRoll <= 100) return `Greater major weapon`;
  return 'Unknown Combat gear found';
}
const artItems = [
  ['porcelain dolls', 'paintings', 'silver statuettes', 'engraved jade', 'ivory bowls'],
  ['silver masks', 'golden censers', 'masterwork musical instruments', 'golden hand mirrors'],
  ['marble idols', 'golden chess sets', 'platinum holy symbols', 'mithral scepters', 'skillful paintings'],
  ['platinum masks', 'golden flutes', 'platinum cups', 'masterful paintings'],
  ['mithral hourglasses with diamond dust', 'darkwood and platinum music boxes', 'bejeweled swords', 'crystallized dragon hearts', 'paintings by the greatest of masters'],
  ['frozen vampire souls', 'inverted soul gems', 'shards of pure fire', 'adamantine poiuyt', 'ethereal tapestries'],
];
function generateArtObject(grade: number): string {
  const itemList = artItems[grade-1];
  if (itemList) {
    return itemList[randomInRange(0, itemList.length-1)];
  }
  return `Grade ${grade} art object`;
}
function generateDiverseItemsFind(minRoll: number, maxRoll: number): string {
  let itemRoll = rollDice({sides: 100});
  while (itemRoll < minRoll || itemRoll > maxRoll){
    itemRoll = rollDice({sides: 100});
  }
  if (itemRoll <= 18) return `${generateArtObject(1)}, value 50 gp`;
  if (itemRoll <= 33) return `${generateArtObject(2)}, value 100 gp`;
  if (itemRoll <= 46) return `${generateArtObject(3)}, value 500 gp`;
  if (itemRoll <= 56) return `${generateArtObject(4)}, value 1,000 gp`;
  if (itemRoll <= 65) return `${generateArtObject(5)}, value 5,000 gp`;
  if (itemRoll <= 73) return `${generateArtObject(6)}, value 10,000 gp`;
  if (itemRoll <= 80) return 'Lesser minor slotless item, value varies';
  if (itemRoll <= 86) return 'Greater minor slotless item, value varies';
  if (itemRoll <= 91) return 'Lesser medium slotless item, value varies';
  if (itemRoll <= 95) return 'Greater medium slotless item, value varies';
  if (itemRoll <= 98) return 'Lesser major slotless item, value varies';
  if (itemRoll <= 100) return 'Greater major slotless item, value varies';
  return 'Unknown Diverse items found';
}
function generateJewelryFind(minRoll: number, maxRoll: number): string {
  let itemRoll = rollDice({sides: 100});
  while (itemRoll < minRoll || itemRoll > maxRoll){
    itemRoll = rollDice({sides: 100});
  }

  if (itemRoll <= 20) return 'Silver jewelry, value 10 gp';
  if (itemRoll <= 35) return 'Gold jewelry, value 100 gp';
  if (itemRoll <= 43) return 'Lesser minor neck slot item';
  if (itemRoll <= 51) return 'Lesser minor ring';
  if (itemRoll <= 58) return 'Greater minor neck slot item';
  if (itemRoll <= 65) return 'Greater minor ring';
  if (itemRoll <= 72) return 'Exquisite jewelry, value 2,000 gp';
  if (itemRoll <= 77) return 'Lesser medium neck slot item';
  if (itemRoll <= 82) return 'Lesser medium ring';
  if (itemRoll <= 86) return 'Greater medium neck slot item';
  if (itemRoll <= 90) return 'Greater medium ring';
  if (itemRoll <= 94) return 'Royal jewelry, value 10,000 gp';
  if (itemRoll <= 96) return 'Lesser major neck slot item';
  if (itemRoll <= 98) return 'Lesser major ring';
  if (itemRoll <= 99) return 'Greater major neck slot item';
  if (itemRoll <= 100) return 'Greater major ring';
  return 'Unknown Jewelry found';
}
function generateLiquorFind(minRoll: number, maxRoll: number): string {
  let itemRoll = rollDice({sides: 100});
  while (itemRoll < minRoll || itemRoll > maxRoll){
    itemRoll = rollDice({sides: 100});
  }
  if (itemRoll <= 20) return 'Gallon of mead, value 2 gp, weight 8 lbs';
  if (itemRoll <= 30) return 'Barrel of mead, value 62 gp, weight 248 lbs';
  if (itemRoll <= 40) return 'Bottle of wine, value 10 gp, weight 1.5 lbs';
  if (itemRoll <= 49) return 'Minor potion';
  if (itemRoll <= 56) return 'Cask of wine, value 120 gp, weight 18 lbs';
  if (itemRoll <= 63) return 'Bottle of rare wine, value 200 gp, weight 2 lbs';
  if (itemRoll <= 70) return 'Cask of rare wine, value 2,400 gp, weight 24 lbs';
  if (itemRoll <= 77) return 'Medium potion';
  if (itemRoll <= 82) return 'Bottle of rare whiskey, value 800 gp, weight 1 lbs';
  if (itemRoll <= 87) return 'Cask of rare whiskey, value 9,600 gp, weight 12 lbs';
  if (itemRoll <= 92) return 'Major potion';
  if (itemRoll <= 97) return 'Bottle of artifact liquor, value 2,000 gp, weight 2 lbs';
  if (itemRoll <= 100) return 'Cask of artifact liquor, value 24,000 gp, weight 24 lbs';
  return 'Unknown Liquor found';
}
function generateMiscellaneousMagicFind(minRoll: number, maxRoll: number): string {
  let itemRoll = rollDice({sides: 100});
  while (itemRoll < minRoll || itemRoll > maxRoll){
    itemRoll = rollDice({sides: 100});
  }
  
  if (itemRoll <= 20) return 'Minor wand';
  if (itemRoll <= 35) return 'Lesser medium rod';
  if (itemRoll <= 50) return 'Lesser medium staff';
  if (itemRoll <= 60) return 'Medium wand';
  if (itemRoll <= 70) return 'Greater medium rod';
  if (itemRoll <= 80) return 'Greater medium staff';
  if (itemRoll <= 85) return 'Major wand';
  if (itemRoll <= 90) return 'Lesser major rod';
  if (itemRoll <= 95) return 'Lesser major staff';
  if (itemRoll <= 98) return 'Greater major rod';
  if (itemRoll <= 100) return 'Greater major staff';
  return 'Unknown Miscellaneous magic found';
}
function generateRawMaterialsFind(minRoll: number, maxRoll: number): string {
  let itemRoll = rollDice({sides: 100});
  while (itemRoll < minRoll || itemRoll > maxRoll){
    itemRoll = rollDice({sides: 100});
  }

  if (itemRoll <= 7) return 'Shipment of wood, value 10 gp, 1 ton';
  if (itemRoll <= 20) return 'Shipment of masonry stone, value 100 gp, 1 ton';
  if (itemRoll <= 32) return 'Shipment of iron, value 200 gp, 1 ton';
  if (itemRoll <= 39) return 'Bolts of cloth, value 400 gp, 1/20th ton';
  if (itemRoll <= 48) return 'Crate of copper, value 500 gp, 1/2 ton';
  if (itemRoll <= 55) return 'Bolts of silk, value 1,000 gp, 1/20th ton';
  if (itemRoll <= 64) return 'Crate of glass, value 1,000 gp, 1/2 ton';
  if (itemRoll <= 72) return 'Box of darkwood, value 2,000 gp, 1/5th ton';
  if (itemRoll <= 79) return 'Box of silver, value 2,000 gp, 1/5th ton';
  if (itemRoll <= 85) return 'Box of ivory, value 5,000 gp, 1/5th ton';
  if (itemRoll <= 90) return 'Alchemical materials, value 5,000 gp, 1/20th ton';
  if (itemRoll <= 94) return 'Box of gold, value 10,000 gp, 1/10th ton';
  if (itemRoll <= 97) return 'Magic materials, value 10,000 gp, 1/20th ton';
  if (itemRoll <= 99) return 'Box of mithril, value 25,000 gp, 1/20th ton';
  if (itemRoll <= 100) return 'Box of adamantine, value 50,000 gp, 1/20th ton';
  return 'Unknown Raw materials found';
}
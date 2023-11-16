import './Tile.css';
import { Ruin, Speed, TileType, displayNameMap, partySpeedDisplayMap } from '../../utils/global-types';
import { randomInRange, rollDice } from '../../utils/random-numbers';
import { generateLuckyFinds } from '../../utils/lucky-finds';

const explorationTimes: Record<Speed, Record<'easy' | 'hard', number>> = {
  xslow: { easy: 3, hard: 5 },
  slow: { easy: 2, hard: 4 },
  normal: { easy: 1, hard: 3 },
  fast: { easy: 1, hard: 2 },
  xfast: { easy: 1, hard: 1 },
}

const travelTimes: Record<Speed, Record<'easy' | 'medium' | 'hard', number>> = {
  xslow: { easy: 11, medium: 16, hard: 32 },
  slow: { easy: 8, medium: 12, hard: 24 },
  normal: { easy: 5, medium: 8, hard: 16 },
  fast: { easy: 4, medium: 6, hard: 12 },
  xfast: { easy: 3, medium: 5, hard: 10 },
}

export default function Tile({ tileType, speed, exploring } : { tileType: TileType, speed: Speed, exploring: boolean, key?: string }) {
  const getDays = (): number => {
    switch(tileType) {
      case 'desert':
      case 'grasslands':
      case 'tundra':
        return explorationTimes[speed]['easy'];
      default:
        return explorationTimes[speed]['hard'];
    }
  };
  const explorationTime = `${getDays()} days`;

  const getHours = (): number => {
    switch(tileType) {
      case 'grasslands':
        return travelTimes[speed]['easy'];
      case 'canopy':
        return travelTimes[speed]['hard'];
      default:
        return travelTimes[speed]['medium'];
    }
  };
  const travelTime = `${getHours()} hours`;
  const elapsedTime = exploring ? explorationTime : travelTime;

  const featureDiscovered = exploring ? true : rollDice({sides: 100}) < 34;

  const tileFeaturesRoll = rollDice({sides: 100});

  let settlement: string | null = null;
  let ruin: Ruin | null = null;
  let salvage: Record<'a' | 'b' | 'c' | 'd' | 'e', number> = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
  };
  const luckyFinds: string[] = [];
  const lawfulTile = tileType === 'mountains' || tileType === 'desert' || tileType === 'tundra';
  const chaoticTile = tileType === 'forest' || tileType === 'jungle' || tileType === 'swamps' || tileType === 'canopy';

  let welcoming = true;
  let population = 0;
  if (lawfulTile) {
    if (tileFeaturesRoll < 11) {
      const randomType = rollDice({sides: 20});
      if (randomType <= 6) {
        population = rollDice();
        settlement = `Shack (${population} people)`;
      } else if (randomType <= 11) {
        population = randomInRange(7, 20);
        settlement = `Thorpe (${population} people)`;
      } else if (randomType <= 15) {
        population = randomInRange(21, 60);
        settlement = `Hamlet (${population} people)`;
      } else if (randomType <= 18) {
        population = randomInRange(61, 200);
        settlement = `Village (${population} people)`;
      } else {
        population = randomInRange(201, 2000);
        settlement = `Small town (${population} people)`;
      }
    } else if (tileFeaturesRoll < 16) {
      const ruinTypeRoll = rollDice({sides: 100});
      if (ruinTypeRoll <= 18) ruin = 'Shack';
      else if (ruinTypeRoll <= 33) ruin = 'Farm';
      else if (ruinTypeRoll <= 45) ruin = 'Building';
      else if (ruinTypeRoll <= 53) ruin = 'Grand building';
      else if (ruinTypeRoll <= 63) ruin = 'Thorp';
      else if (ruinTypeRoll <= 72) ruin = 'Hamlet';
      else if (ruinTypeRoll <= 79) ruin = 'Village';
      else if (ruinTypeRoll <= 85) ruin = 'Small town';
      else if (ruinTypeRoll <= 90) ruin = 'Large town';
      else if (ruinTypeRoll <= 94) ruin = 'Small city';
      else if (ruinTypeRoll <= 97) ruin = 'Large city';
      else if (ruinTypeRoll <= 99) ruin = 'Metropolis';
      else if (ruinTypeRoll <= 100) ruin = 'Ancient Dungeon';
    }
  } else if (chaoticTile) {
    if (tileFeaturesRoll < 6) {
      const randomType = rollDice({sides: 20});
      if (randomType <= 4) {
        welcoming = false;
        population = rollDice({ sides: 20 });
        settlement = `Thorpe (${population} people, unwelcoming)`;
      } else if (randomType <= 6) {
        population = rollDice({ sides: 20 });
        settlement = `Thorpe (${population} people, welcoming)`;
      } else if (randomType <= 9) {
        welcoming = false;
        population = randomInRange(21, 60);
        settlement = `Hamlet (${population} people, unwelcoming)`;
      } else if (randomType <= 11) {
        population = randomInRange(21, 60);
        settlement = `Hamlet (${population} people, welcoming)`;
      } else if (randomType <= 13) {
        welcoming = false;
        population = randomInRange(61, 200);
        settlement = `Village (${population} people, unwelcoming)`;
      } else if (randomType <= 14) {
        population = randomInRange(61, 200);
        settlement = `Village (${population} people, welcoming)`;
      } else if (randomType <= 16) {
        welcoming = false;
        population = randomInRange(201, 2000);
        settlement = `Small town (${population} people, unwelcoming)`;
      } else if (randomType <= 17) {
        population = randomInRange(201, 2000);
        settlement = `Small town (${population} people, welcoming)`;
      } else if (randomType <= 19) {
        welcoming = false;
        population = randomInRange(2001, 5000);
        settlement = `Large town (${population} people, unwelcoming)`;
      } else if (randomType <= 20) {
        population = randomInRange(2001, 5000);
        settlement = `Large town (${population} people, welcoming)`;
      }
    } else if (tileFeaturesRoll < 26) {
      const ruinTypeRoll = rollDice({sides: 100});
      if (ruinTypeRoll <= 18) ruin = 'Shack';
      else if (ruinTypeRoll <= 33) ruin = 'Farm';
      else if (ruinTypeRoll <= 45) ruin = 'Building';
      else if (ruinTypeRoll <= 53) ruin = 'Grand building';
      else if (ruinTypeRoll <= 63) ruin = 'Thorp';
      else if (ruinTypeRoll <= 72) ruin = 'Hamlet';
      else if (ruinTypeRoll <= 79) ruin = 'Village';
      else if (ruinTypeRoll <= 85) ruin = 'Small town';
      else if (ruinTypeRoll <= 90) ruin = 'Large town';
      else if (ruinTypeRoll <= 94) ruin = 'Small city';
      else if (ruinTypeRoll <= 97) ruin = 'Large city';
      else if (ruinTypeRoll <= 99) ruin = 'Metropolis';
      else if (ruinTypeRoll <= 100) ruin = 'Ancient Dungeon';
    }
  }

  let timeToSearch = '0 minutes';
  switch(ruin) {
    case 'Shack': {
      timeToSearch = '1 minute';
      if (rollDice({sides: 100}) <= 50) {
        luckyFinds.push(...generateLuckyFinds({maxRoll: 60}));
      }
      break;
    }
    case 'Farm': {
      timeToSearch = '10 minutes';
      const salvageRoll = rollDice({sides: 100});
      if (salvageRoll > 50) {
        if (salvageRoll > 75) {
          salvage['d'] = 1;
        } else {
          salvage['e'] = 1;
        }
      }
      break;
    }
    case 'Building': {
      timeToSearch = '1 hour';
      const salvageRoll = rollDice({sides: 100});
      const salvageAmount = Math.max(rollDice({extra: -2}), 0);
      if (salvageRoll <= 40) {
        salvage['e'] = salvageAmount;
      } else if (salvageRoll <= 80) {
        salvage['d'] = salvageAmount;
      } else {
        salvage['c'] = salvageAmount;
      }
      break;
    }
    case 'Grand building': {
      timeToSearch = '4 hours';
      const salvageRoll = rollDice({sides: 100});
      const salvageAmount = Math.max(rollDice({sides: 12, extra: -4}), 0);
      if (salvageRoll <= 30) {
        salvage['e'] = salvageAmount;
      } else if (salvageRoll <= 60) {
        salvage['d'] = salvageAmount;
      } else if (salvageRoll <= 80) {
        salvage['c'] = salvageAmount;
      } else if (salvageRoll <= 95) {
        salvage['b'] = salvageAmount;
      } else {
        salvage['a'] = salvageAmount;
      }
      break;
    }
    case 'Thorp': {
      timeToSearch = '4 hours';
      salvage['e'] = Math.max(rollDice({extra: -2}), 0);
      salvage['d'] = Math.max(rollDice({sides: 4, extra: -2}), 0);
      break;
    }
    case 'Hamlet': {
      timeToSearch = '8 hours';
      salvage['e'] = Math.max(rollDice({sides: 8, extra: -3}), 0);
      salvage['d'] = Math.max(rollDice({sides: 6, extra: -2}), 0);
      salvage['c'] = Math.max(rollDice({sides: 3, extra: -2}), 0);
      break;
    }
    case 'Village': {
      timeToSearch = '1 day';
      salvage['e'] = Math.max(rollDice({sides: 12, extra: -4}), 0);
      salvage['d'] = Math.max(rollDice({sides: 8, extra: -3}), 0);
      salvage['c'] = Math.max(rollDice({sides: 4, extra: -2}), 0);
      break;
    }
    case 'Small town': {
      timeToSearch = '1 week';
      salvage['e'] = Math.max(rollDice({sides: 20, extra: -5}), 0);
      salvage['d'] = Math.max(rollDice({sides: 12, extra: -4}), 0);
      salvage['c'] = Math.max(rollDice({sides: 6, extra: -2}), 0);
      salvage['b'] = Math.max(rollDice({sides: 3, extra: -2}), 0);
      break;
    }
    case 'Large town': {
      timeToSearch = '2 weeks';
      salvage['e'] = Math.max(rollDice({sides: 100, extra: -10}), 0);
      salvage['d'] = Math.max(rollDice({sides: 20, extra: -5}), 0);
      salvage['c'] = Math.max(rollDice({sides: 8, extra: -3}), 0);
      salvage['b'] = Math.max(rollDice({sides: 4, extra: -2}), 0);
      break;
    }
    case 'Small city': {
      timeToSearch = '1 month';
      salvage['e'] = Math.max(rollDice({count: 2, sides: 100, extra: -20}), 0);
      salvage['d'] = Math.max(rollDice({sides: 100, extra: -10}), 0);
      salvage['c'] = Math.max(rollDice({sides: 20, extra: -5}), 0);
      salvage['b'] = Math.max(rollDice({sides: 6, extra: -2}), 0);
      salvage['a'] = Math.max(rollDice({sides: 3, extra: -2}), 0);
      break;
    }
    case 'Large city': {
      timeToSearch = '3 months';
      salvage['e'] = Math.max(rollDice({count: 10, sides: 100, extra: -100}), 0);
      salvage['d'] = Math.max(rollDice({count: 2, sides: 100, extra: -20}), 0);
      salvage['c'] = Math.max(rollDice({sides: 100, extra: -10}), 0);
      salvage['b'] = Math.max(rollDice({sides: 20, extra: -5}), 0);
      salvage['a'] = Math.max(rollDice({sides: 6, extra: -2}), 0);
      break;
    }
    case 'Metropolis': {
      timeToSearch = '6 month';
      salvage['e'] = Math.max(rollDice({count: 100, sides: 100, extra: -1000}), 0);
      salvage['d'] = Math.max(rollDice({count: 10, sides: 100, extra: -100}), 0);
      salvage['c'] = Math.max(rollDice({count: 2, sides: 100, extra: -20}), 0);
      salvage['b'] = Math.max(rollDice({sides: 100, extra: -10}), 0);
      salvage['a'] = Math.max(rollDice({sides: 20, extra: -5}), 0);
      break;
    }
    case 'Ancient Dungeon': {
      timeToSearch = 'Varies';
      break;
    }
  }

  if (salvage['e']) luckyFinds.push(...generateLuckyFinds({count: rollDice({ count: salvage['e'], sides: 2, extra: -salvage['e'] }), maxRoll: 60}));
  if (salvage['d']) luckyFinds.push(...generateLuckyFinds({count: rollDice({ count: salvage['d'], sides: 4, extra: -salvage['d'] }), maxRoll: 80}));
  if (salvage['c']) luckyFinds.push(...generateLuckyFinds({count: rollDice({ count: salvage['c'], sides: 4 })}));
  if (salvage['b']) luckyFinds.push(...generateLuckyFinds({count: rollDice({ count: salvage['b'], sides: 6 }), minRoll: 20}));
  if (salvage['a']) luckyFinds.push(...generateLuckyFinds({count: rollDice({ count: salvage['a'], sides: 8 }), minRoll: 40}));

  const luckyFindsOutput = luckyFinds.length > 0 ? luckyFinds.map(item => <div>{item}</div>) : 'No lucky finds';
  let gptPrompt = ``;
  if (exploring) {
    gptPrompt += `The PCs spend ${elapsedTime} fully exploring a 95 sq mi area of the ${tileType} terrain. `
  } else {
    gptPrompt += `The PCs spend ${elapsedTime} traveling through the 12 sq mi length of the ${tileType} terrain. `
  }

  if (ruin) {
    if (ruin === 'Ancient Dungeon') {
      gptPrompt += `At some point during this time, they discover the entrance to an ${ruin}. Please generate a description of their time in the ${tileType}, including some unique elements and vivid descriptions of the natural environment they find themselves in. Then also describe the entrance to the ${ruin}, and generate a unique theme for the ${ruin} for the GM to use to build it.`;
    } else {
      gptPrompt += `At some point during this time, they find a ruin of a ${ruin}. They then take the next ${timeToSearch} to fully explore the ruin. `;
      const totalSalvageTons = salvage['a'] + salvage['b'] + salvage['c'] + salvage['d'] + salvage['e'];
      gptPrompt += `They find ${totalSalvageTons} tons of salvage. `
      if (luckyFinds.length > 0) {
        gptPrompt += `They also find the following specific valuable items: ${luckyFinds.join('; ')}. `;
      }
      gptPrompt += `Please generate a description of their time in the ${tileType}, including some unique elements and vivid descriptions of the natural environment they find themselves in, and then a description of the ruin that they found and some key points of interest.`;
    }
  }
  else if (settlement) {
    gptPrompt += `During their search, they happen upon a ${lawfulTile ? 'lawful' : 'chaotic'} settlement of ${population} people, who are ${welcoming ? 'welcoming' : 'not welcoming'} to the PCs. Please generate a description of their time in the forest, including some unique elements and vivid descriptions of the natural environment they find themselves in, and then a description of the settlement that they found and a few interesting NPCs they might interact with while there.`;
  }
  else {
    gptPrompt += `Unfortunately, they don't find any ruins nor any settlements. Please generate a description of their time in the ${tileType}, including some unique elements and vivid descriptions of the natural environment they find themselves in.`
  }
  
    return <>
        <p>{displayNameMap[tileType]} Exploration Results</p>
        <div className='tileResults'>
          <p className='resultName'>Elapsed Time: </p>
          <div className='resultValue'>{elapsedTime}</div>
          <p className='resultName'>Settlement: </p>
          <div className='resultValue'>{settlement ? settlement : 'No settlement found'}</div>
          <p className='resultName'>Ruin: </p>
          <div className='resultValue'>{ruin ? ruin : 'No ruin found'}</div>
          {ruin || settlement ? <>
            <p className='resultName'>Feature Discovered?: </p>
            <div className='resultValue'>{`${featureDiscovered}`}</div>
          </> : <></>}
          {ruin ?
          <>
            <p className='resultName'>Time to search: </p>
            <div className='resultValue'>{timeToSearch}</div>
            <p className='resultName'>Rank E Salvage:</p>
            <div className='resultValue'>{salvage['e']} tons, worth {salvage['e']*20} gp</div>
            <p className='resultName'>Rank D Salvage:</p>
            <div className='resultValue'>{salvage['d']} tons, worth {salvage['d']*200} gp</div>
            <p className='resultName'>Rank C Salvage:</p>
            <div className='resultValue'>{salvage['c']} tons, worth {salvage['c']*2000} gp</div>
            <p className='resultName'>Rank B Salvage:</p>
            <div className='resultValue'>{salvage['b']} tons, worth {salvage['b']*10000} gp</div>
            <p className='resultName'>Rank A Salvage:</p>
            <div className='resultValue'>{salvage['a']} tons, worth {salvage['a']*50000} gp</div>
            <p className='resultName'>Lucky Finds:</p>
            <div className='resultValue'>
              {luckyFindsOutput}
            </div>
          </> : <></>}
          <p className='resultName'>ChatGPT Prompt: </p>
          <div className='resultValue'>{gptPrompt}</div>
        </div>
    </>;
}
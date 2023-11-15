import { useState } from 'react';
import './TileExplorer.css';
import { Speed, TileType, displayNameMap, partySpeedDisplayMap } from '../../utils/global-types';
import Tile from '../Tile/Tile';



export default function TileExplorer() {
    const [exploredTile, setExploredTile] = useState<TileType | null>(null);
    const [partySpeed, setPartySpeed] = useState<Speed>('normal');
    const [passingThrough, setPassingThrough] = useState(false);
    const [key, setKey] = useState('1');

    function exploreTile(tileType: TileType) {
        setExploredTile(tileType);
        setKey(`${Math.random()}`);
    }
    return <>
        <div className='configOption'>
            <p>Party Speed: </p>
            <select onChange={(e) => setPartySpeed(e.target.value as Speed)}>
                { (Object.keys(partySpeedDisplayMap) as Speed[]).map(speed => <option selected={speed === partySpeed} value={speed}>{partySpeedDisplayMap[speed]}</option>)}
            </select>
        </div>
        <div className='configOption'>
            <input type='checkbox' checked={passingThrough} onChange={() => setPassingThrough(!passingThrough)}/>
            <p>Just Passing Through</p>
        </div>

        <p>What kind of tile do you want to explore?</p>
        <ul className='TileList'>
            { (Object.keys(displayNameMap) as TileType[]).map(tileType => <li><button className='TileButton' onClick={() => {console.log('tile clicked');exploreTile(tileType);}}>{displayNameMap[tileType]}</button></li>)}
        </ul>
        { exploredTile === null ? <p>Nothing explored yet</p> : <Tile tileType={exploredTile} speed={partySpeed} passingThrough={passingThrough} /> }
    </>;
}
import { useState } from 'react';
import './TileExplorer.css';
import { Speed, TileType, displayNameMap, partySpeedDisplayMap } from '../../utils/global-types';
import Tile from '../Tile/Tile';
import ToggleSwitch from '../ToggleSwitch';
import Dropdown from 'react-dropdown';

const partySpeedOptions = (Object.keys(partySpeedDisplayMap) as Speed[]).map(speed => ({ value: speed, label: partySpeedDisplayMap[speed]}));

export default function TileExplorer() {
    const [exploredTile, setExploredTile] = useState<TileType | null>(null);
    const [partySpeed, setPartySpeed] = useState<Speed>('normal');
    const [exploring, setExploring] = useState(true);
    const [key, setKey] = useState('1');

    function exploreTile(tileType: TileType) {
        setExploredTile(tileType);
        setKey(`${Math.random()}`);
    }
    return <>
        <div className='configOption'>
            <p>Party Speed: </p>
            <Dropdown options={partySpeedOptions} onChange={(opt) => setPartySpeed(opt.value as Speed)} value={partySpeed} placeholder="Select an option" />
        </div>
        <div className='configOption'>
            <ToggleSwitch
                id="exploring"
                checked={exploring}
                onChange={() => setExploring(!exploring)}
            />
            <label htmlFor="exploring">Fully Exploring?</label>
        </div>

        <p>What kind of tile do you want to explore?</p>
        <ul className='TileList'>
            { (Object.keys(displayNameMap) as TileType[]).map(tileType => <li><button className={`TileButton TileButton-${tileType}`} onClick={() => {exploreTile(tileType);}}><img src={`hex-${tileType}.png`} />{displayNameMap[tileType]}</button></li>)}
        </ul>
        { exploredTile === null ? <p>Nothing explored yet</p> : <Tile tileType={exploredTile} speed={partySpeed} exploring={exploring} /> }
    </>;
}
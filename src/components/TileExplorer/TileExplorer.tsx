import { useState } from 'react';
import './TileExplorer.css';
import { Speed, TileType, displayNameMap } from '../../utils/global-types';
import Tile from '../Tile/Tile';
import TravelOptions from '../TravelOptions';
import TilePicker from '../TilePicker';

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
        <TravelOptions partySpeed={partySpeed} setPartySpeed={setPartySpeed} exploring={exploring} setExploring={setExploring} />
        <TilePicker selectedTile={exploredTile} onTileChanged={exploreTile} />
        { exploredTile === null ? <p>Nothing explored yet</p> : <Tile tileType={exploredTile} speed={partySpeed} exploring={exploring} /> }
    </>;
}
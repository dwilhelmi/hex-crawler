import './TravelOptions.scss';
import ToggleSwitch from '../ToggleSwitch';
import Dropdown from 'react-dropdown';
import { Speed, TileType, displayNameMap, partySpeedDisplayMap } from '../../utils/global-types';

const partySpeedOptions = (Object.keys(partySpeedDisplayMap) as Speed[]).map(speed => ({ value: speed, label: partySpeedDisplayMap[speed]}));

export default function TravelOptions({ partySpeed, setPartySpeed, exploring, setExploring }: { partySpeed: Speed, setPartySpeed: (speed: Speed) => void, exploring: boolean, setExploring: (exploring: boolean) => void }) {
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
  </>;
}

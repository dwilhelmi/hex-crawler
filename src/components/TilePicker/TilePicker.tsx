import { TileType, displayNameMap } from '../../utils/global-types';
import './TilePicker.scss';

export default function TilePicker({ selectedTile, onTileChanged }: { selectedTile?: TileType | null, onTileChanged: (tile: TileType) => void }) {
  return <>
    <p>What kind of tile do you want to explore?</p>
    <ul className='TileList'>
        { (Object.keys(displayNameMap) as TileType[]).map(
          tileType => <li>
            <button
              className={`TileButton ${tileType === selectedTile ? 'SelectedTile' : ''}`}
              onClick={() => {onTileChanged(tileType);}}
            >
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={`hex-${tileType}.png`} />
                  </div>
                  <div className="flip-card-back">
                    <img src={`hex-crawler-icon.png`} />
                  </div>
                </div>
              </div>
              {displayNameMap[tileType]}
            </button>
          </li>
        )}
    </ul>
  </>;
}

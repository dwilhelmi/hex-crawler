export type TileType = 'canopy' | 'desert' | 'grasslands' | 'jungle' | 'mountains' | 'swamps' | 'forest' | 'tundra';
export type Speed = 'xslow' | 'slow' | 'normal' | 'fast' | 'xfast';
export type Ruin =
  'Shack' |
  'Farm' |
  'Building' |
  'Grand building' |
  'Thorp' |
  'Hamlet' |
  'Village' |
  'Small town' |
  'Large town' |
  'Small city' |
  'Large city' |
  'Metropolis' |
  'Ancient Dungeon';
export type LuckyFinds = 
  | 'Books'
  | 'Clothing'
  | 'Coins and gems'
  | 'Combat gear'
  | 'Diverse items'
  | 'Jewelry'
  | 'Liquor'
  | 'Miscellaneous magic'
  | 'Raw materials';

export const displayNameMap: Record<TileType, string> = {
  canopy: 'Canopy',
  desert: 'Desert',
  grasslands: 'Grasslands',
  jungle: 'Jungle',
  mountains: 'Mountains',
  swamps: 'Swamps',
  forest: 'Forest',
  tundra: 'Tundra',
};

export const partySpeedDisplayMap: Record<Speed, string> = {
  xslow: '15 feet',
  slow: '20 feet',
  normal: '30 feet',
  fast: '40 feet',
  xfast: '50 feet',
}
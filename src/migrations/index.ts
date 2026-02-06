import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260206_031718 from './20260206_031718';
import * as migration_20260206_051350 from './20260206_051350';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260206_031718.up,
    down: migration_20260206_031718.down,
    name: '20260206_031718',
  },
  {
    up: migration_20260206_051350.up,
    down: migration_20260206_051350.down,
    name: '20260206_051350'
  },
];

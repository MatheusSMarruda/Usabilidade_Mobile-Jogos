// CardSprites.jsx — sprites chibi pixel-art para as cartas do jogo.
// Convertido do card-sprites.jsx (Pixel Art - Memory Game) para ES module.

import { PixelSprite } from './Sprites';

const P = {
  k: '#1a0e06',
  K: '#0a0604',
  w: '#ffffff',
  W: '#f0ede5',
  pink: '#f49aa0',
  pinkD: '#c06868',
  pinkL: '#f9bcc2',
  blush: '#ff8898',
};

const ursoM = `
..................
..kkkk......kkkk..
.kbbBBk....kBBbbk.
.kbBBBBkkkkBBBBbk.
.kbBBBBBBBBBBBBbk.
kbBBBBBBBBBBBBBBbk
kbBBKKBBBBBBKKBBbk
kbBBKKBBBBBBKKBBbk
kbBBBBBwwwwBBBBBbk
kbBBBwwwKKwwwBBBbk
.kbBBwKwwwwKwBBbk.
.kbBBwwwkkwwwBBbk.
..kbBBwwwwwwBBbk..
...kbBBBBBBBBbk...
....kkbbBBBBkk....
.......kkkkk......`;
const ursoP = { k: P.k, K: P.K, B: '#8b5a2b', b: '#5a3410', w: '#e8c090' };

const coelhoM = `
..................
.....kk.....kk....
.....kWk....kWk...
.....kPk....kPk...
.....kPk....kPk...
.....kPk....kPk...
.....kPkkkkkkPk...
....kkWWWWWWWWkk..
...kWWWWWWWWWWWWk.
..kWWKKWWWWWWKKWk.
..kWKKKWWWWWWKKKk.
.kWWKKWWWWWWWWKKWk
.kWWWWWWWWpwWWWWWk
.kWWWWWWWpppwWWWWk
.kWWWWWWWwwwWWWWWk
..kWWWWWWKKKWWWWk.
..kWWWWWWwwwWWWWk.
...kWWWWWWWWWWWk..
....kkWWWWWWWkk...
.......kkkkk......`;
const coelhoP = { k: P.k, K: P.K, W: P.W, w: '#d0c8bc', P: P.pinkL, p: P.pink };

const coalaM = `
..................
.kkkk........kkkk.
kgGGGkk....kkGGGgk
kgGGGGGk..kGGGGGGk
kgGGGGGGkkGGGGGGGk
.kgGGGGGGGGGGGGGk.
.kgGGGGGGGGGGGGGk.
kgGGKKGGGGGGKKGGgk
kgGKKKGGGGGGKKKGgk
kgGGGGGGKKKGGGGGgk
kgGGGGGKKKKKGGGGgk
.kgGGGGGKKKGGGGgk.
.kgGGGGwwwwwGGGgk.
..kgGGGwwwwGGGgk..
...kgGGGGGGGGgk...
.....kkgggggkk....`;
const coalaP = { k: P.k, K: P.K, G: '#9098a0', g: '#606870', w: '#e0d8cc' };

const gatoM = `
..................
..kk..........kk..
..koKk......kkOk..
..kOOkkk..kkOOOk..
..kOOPkkkkOOPOOk..
.kOOOOOOOOOOOOOOk.
.kOOOOOOOOOOOOOOk.
kOOOgGOOOOOOgGOOOk
kOOOGGOOOOOOGGOOOk
kOOOGOOOOOOOGGOOOk
.kOOOOOOppOOOOOOk.
.kOOOOOwkwOOOOOOk.
..kOOOOOwwOOOOOk..
..kOOwOOOOOOOwOk..
...kOOwwwwwwwOk...
.....kkkOOkkkk....`;
const gatoP = { k: P.k, K: P.K, O: '#e88838', o: '#b86018', G: '#5a8848', g: '#3a6028', P: P.pink, p: '#000', w: '#b86018' };

const guaxM = `
..................
..kkkk......kkkk..
.kGGGGk....kGGGGk.
.kGGGGGkkkkGGGGGk.
.kGGGGGGGGGGGGGGk.
kGGkkkkGGGGkkkkGGk
kGkKKKKGGGGKKKKkGk
kGkKKKKwwwwKKKKkGk
kGkKwwKwwwwKwwKkGk
.kGkKKwwwwwwKKkGk.
..kGGGGpKKpGGGGk..
..kGGGGGpppGGGGk..
...kGGGGkKkGGGk...
...kGGGGwwwGGGk...
....kGGGGGGGGk....
......kkkkkk......`;
const guaxP = { k: P.k, K: P.K, G: '#a0a0a8', g: '#606070', w: P.W, p: '#181818' };

const dogM = `
..................
.....kk.....kkk...
....kBBk...kBBBk..
...kBBBBk.kBBBbk..
..kBBBBBBkBBBBk...
.kbBBBBBBBBBBBk...
.kbBBBBBBBBBBBBk..
kbBBKKBBBBBBKKBBk.
kbBBKKBBBBBBKKBBk.
kbBBBBBBKKBBBBBBk.
kbBBBBwwKKwwBBBBk.
.kbBBwKwwwwKwBBk..
.kbBBwwKkkKwwBBk..
..kbBBwwwwwwBBk...
...kkbbBBBBbbk....
......kkkkkk......`;
const dogP = { k: P.k, K: P.K, B: '#e0b868', b: '#b08838', w: '#f0d8a8' };

const raposaM = `
..................
...kkk......kkk...
..kOOOk....kOOOk..
..kOWOk....kOWOk..
..kOWWOkkkkOWWOk..
.kOWWOOOOOOOOWWOk.
.kOOOOOOOOOOOOOOk.
kOOOKKOOOOOOKKOOOk
kOOOKKOOOOOOKKOOOk
kOOOOOOOOOOOOOOOOk
.kOOOOWWWWWWOOOOk.
.kOOOWWWKKWWWOOOk.
..kOWWWWKKWWWWOk..
..kWWWWpppppWWWk..
...kWWWWWWWWWWk...
....kkWWWWWWkk....
......kkkkkk......
..................`;
const raposaP = { k: P.k, K: P.K, O: '#e87028', o: '#b04818', W: P.W, w: '#e0d8cc', p: '#1a0e06' };

const esqM = `
..................
..kk..........kk..
.kBBk........kBBk.
.kbBBkkkkkkkkBBbk.
.kbBBBBBBBBBBBBbk.
kbBBBBBBBBBBBBBBbk
kbBBBBBBBBBBBBBBbk
kbBBKKBBBBBBKKBBbk
kbBBKKBBBBBBKKBBbk
kbBBBBWWWWWWBBBBbk
kbBBBWWWWWWWWBBBbk
.kbBBWWWkkWWWBBbk.
.kbBBWWWwwWWWBBbk.
..kbBBBwwwwWBBbk..
...kbBBBWWWBBbk...
....kkbBBBBbkk....
......kkkkkk......
..................`;
const esqP = { k: P.k, K: P.K, B: '#d89858', b: '#a06830', W: '#e8c090', w: '#1a0e06' };

const vacaM = `
....................
....kk........kk....
....kHk......kHk....
...kkHkk....kkHkk...
...kWWWkkkkkkWWWk...
..kWWWWWKKKKWWWWWk..
.kWKKWWWWWWWWWKKWk..
.kWKKWWWKKWWWWKKWk..
kWWWWWWWKKWWWWWWWk..
kWWWKKWWWWWWWKKWWWk.
kWWKKKWWWWWWWKKKWWk.
kWWWWWWPPPPPPWWWWWk.
.kWWWPPPPPPPPPPWWk..
.kWWWPPkKKkKKkPPWk..
..kWPPPPPPPPPPPPWk..
..kWPPPPPPPPPPPPPk..
...kkWWWKKWWKKWWkk..
.....kkkkkkkkkkk....
....................
....................`;
const vacaP = { k: P.k, K: P.K, W: P.W, P: P.pinkL, H: '#4a3020' };

const porcoM = `
..................
..kk..........kk..
.kPPk........kPPk.
.kpPPkkkkkkkkPPpk.
.kpPPPPPPPPPPPPpk.
kpPPPPPPPPPPPPPPpk
kpPPKKPPPPPPKKPPpk
kpPPKKPPPPPPKKPPpk
kpPPPPPRRRRPPPPPpk
.kpPPPRRRRRRPPPpk.
.kpPPRKRPPKRKRPpk.
.kpPPRRRPPRRRRPpk.
..kpPPRRRRRRPPpk..
..kpPPPPPPPPPPpk..
...kkppPPPPPPkk...
......kkkkkk......`;
const porcoP = { k: P.k, K: P.K, P: '#f49aa0', p: '#c06868', R: '#d47078' };

export const CARD_ANIMALS = [
  { id: 'urso',     name: 'Urso',     matrix: ursoM,   palette: ursoP   },
  { id: 'coelho',   name: 'Coelho',   matrix: coelhoM, palette: coelhoP },
  { id: 'coala',    name: 'Coala',    matrix: coalaM,  palette: coalaP  },
  { id: 'gato',     name: 'Gato',     matrix: gatoM,   palette: gatoP   },
  { id: 'guaxinim', name: 'Guaxinim', matrix: guaxM,   palette: guaxP   },
  { id: 'cachorro', name: 'Cachorro', matrix: dogM,    palette: dogP    },
  { id: 'raposa',   name: 'Raposa',   matrix: raposaM, palette: raposaP },
  { id: 'esquilo',  name: 'Esquilo',  matrix: esqM,    palette: esqP    },
  { id: 'vaca',     name: 'Vaca',     matrix: vacaM,   palette: vacaP   },
  { id: 'porco',    name: 'Porco',    matrix: porcoM,  palette: porcoP  },
];

export function CardSprite({ animal, size = 4, style }) {
  const entry = CARD_ANIMALS.find(a => a.id === animal);
  if (!entry) return null;
  return <PixelSprite matrix={entry.matrix} palette={entry.palette} px={size} style={style} />;
}

const backM = `
.................
........k........
.......kGk.......
......kGgGk......
.....kGgmgGk.....
....kGgmBmgGk....
...kGgmBgBmgGk...
..kGgmBgGgBmgGk..
.kGgmBgGBGgBmgGk.
.kGgBgGgBgGgBgGk.
.kGgmgBgBgBgmgGk.
.kGgBgGgBgGgBgGk.
..kGgmBgGgBmgGk..
...kGgmBgBmgGk...
....kGgmBmgGk....
.....kGgmgGk.....
......kGgGk......
.......kGk.......
........k........
........k........
........k........
.................`;
const backP = { k: '#1a2a10', G: '#3d5028', g: '#5c7040', B: '#6b8048', m: '#7a9355' };

export function CardBack({ size = 4, style }) {
  return <PixelSprite matrix={backM} palette={backP} px={size} style={style} />;
}

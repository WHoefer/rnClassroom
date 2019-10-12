import { emSize } from './util/EMSize';
import { Platform } from 'react-native';

/* Android fontFamilies
normal
notoserif
sans-serif
sans-serif-light
sans-serif-thin
sans-serif-condensed
sans-serif-medium
serif
Roboto
monospace
*/

export const PLR = emSize.EMROUND(2);
export const WIDTH = emSize.DEVICE_WIDTH - PLR - PLR;
export const LINE = emSize.EMROUND(0.125);
export const BACKGROUND = _200;
export const MENUCOLOR = 'green';
export const BORDERRADIUS = emSize.EMROUND(1);
export const TEXTTCOLOR = '#000000';
export const RADIUS = emSize.EMROUND(1);
export const VERTICAL_MARGINS = emSize.EMROUND(1); // preview Player
export const ASPECT_RATIO_IMAGE = 4.0/3.0

// Android Color Palette Light green Primary
const _50 = '#F1F8E9';
const _100 = '#DCEDC8';
const _200 = '#C5E1A5';
const _300 = '#AED581';
const _400 = '#9CCC65';
const _500 = '#8BC34A';
const _600 = '#7CB342';
const _700 = '#689F38';
const _800 = '#558B2F';
const _900 = '#33691E';
const A100 = '#CCFF90';
const A200 = '#B2FF59';
const A400 = '#76FF03';
const A700 = '#64DD17';
const BLACK = '#000000';
const GRAY = '#555555';
const WHITE = '#FFFFFF';

// Android Color Palette Orange Secondary
const s50 = '#FFFDE7';
const s100 = '#FFF9C4';
const s200 = '#FFF59D';
const s300 = '#FFF176';
const s400 = '#FFEE58';
const s500 = '#FFEB3B';
const s600 = '#FDD835';
const s700 = '#FBC02D';
const s800 = '#F9A825';
const s900 = '#F57F17';
const sA100 = '#FFFF8D';
const sA200 = '#FFFF00';
const sA400 = '#FFEA00';
const sA700 = '#FFD600';


export const SIZE_PREVIEW_PLAYER_ICON = 120;
export const SIZE_PLAYER_ICON = 35;
export const WIDTH_PLAYER_CONTROL = WIDTH;
export const HEIGHT_PLAYER_CONTROL = 40;
export const HEIGHT_PLAYER_SPACE = 40;


// Background colors
export const THEMES_PAGE_BACKGROUND = _100;
export const THEMES_LIST_BACKGROUND = _100;
export const THEMES_MENUE_BACKGROUND = _900;
export const THEMES_PLAYER_CONTROLS_BACKGROUND = _800;
export const THEMES_PLAYER_BACKGROUND = _300;
// Text colors
export const THEMES_MENUE_COLOR =WHITE;
export const THEMES_LIST_MAIN_COLOR = BLACK;
export const THEMES_LIST_SUB_COLOR = _900;
// Button colors
export const THEMES_PREVIEW_PLAYER_ICON = sA700;
export const THEMES_PLAYER_PRESS = A700;
export const THEMES_PLAYER_BUTTON = BLACK;
export const THEMES_PLAYER_BUTTON_NA = WHITE;
// Extra colors
export const THEMES_LIST_BORDERCOLOR = _300;
export const THEMES_STATUSBAR_BACKGROUND = _800;

export const styles = {
  statusBar: {
    backgroundColor: THEMES_STATUSBAR_BACKGROUND,
  },
  menue: {
    backgroundColor: THEMES_MENUE_BACKGROUND,
    color: THEMES_MENUE_COLOR,
    height: 60,
    padding: 20,
  },
  menueText: {
    color: THEMES_MENUE_COLOR,
    fontSize: emSize.EM(1.6),
    fontStyle: 'italic',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  chapter: {
    backgroundColor: THEMES_LIST_BACKGROUND,
    borderColor: THEMES_LIST_BORDERCOLOR,
  },
  chapterMain: {
    color: THEMES_LIST_MAIN_COLOR,
    fontSize: emSize.EM(1.8),
    padding: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  chapterSub: {
    color: THEMES_LIST_SUB_COLOR,
    fontSize: emSize.EM(1.0),
    padding: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  infoTextHeader: {
    fontSize: emSize.EM(1.4),
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  infoText: {
    fontSize: emSize.EM(1.2),
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  page: {
    backgroundColor: THEMES_PAGE_BACKGROUND,
  },
  pageText: {
    fontSize: emSize.EM(1.3),
    fontStyle: 'normal',
    fontWeight: 'normal',
    //fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'normal',
    color: '#000000',
    paddingTop: emSize.EMROUND(0),
    paddingBottom: emSize.EMROUND(0),
    paddingLeft: PLR,
    paddingRight: PLR,
  },
  pageTextHeader1: {
    fontSize: emSize.EM(1.6),
    fontStyle: 'normal',
    fontWeight: 'bold',
    //fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'serif',
    color: '#000000',
    paddingTop: emSize.EMROUND(0),
    paddingBottom: emSize.EMROUND(0),
    paddingLeft:PLR,
    paddingRight: PLR,
  },
  pageTextHeader2: {
    fontSize: emSize.EM(1.4),
    fontStyle: 'italic',
    fontWeight: 'normal',
    //fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'serif',
    color: '#000000',
    paddingTop: emSize.EMROUND(0),
    paddingBottom: emSize.EMROUND(0),
    paddingLeft:PLR,
    paddingRight: PLR,
  },
  pageTextHeader3: {
    fontSize: emSize.EM(1.4),
    fontStyle: 'normal',
    fontWeight: 'normal',
    //fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'serif',
    color: '#000000',
    paddingTop: emSize.EMROUND(0),
    paddingBottom: emSize.EMROUND(0),
    paddingLeft:PLR,
    paddingRight: PLR,
  },
  pageTextFormated: {
    fontSize: emSize.EM(1.1),
    fontStyle: 'normal',
    fontWeight: 'bold',
    //fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'normal',
    color: '#000000',
    backgroundColor: '#dddddd',
    paddingTop: emSize.EMROUND(0),
    paddingBottom:  emSize.EMROUND(0),
    paddingLeft:PLR,
    paddingRight: PLR,
  },
  pageDelimiter1: {
    backgroundColor: BACKGROUND,
    width: WIDTH,
    height: LINE,
    marginTop: emSize.EMROUND(0.2),
    marginBottom:  emSize.EMROUND(0.2),
    marginHorizontal :PLR,
  },
  pageDelimiter2: {
    backgroundColor: BACKGROUND,
    width: WIDTH,
    height: LINE,
    marginTop: emSize.EMROUND(0.5),
    marginBottom:  emSize.EMROUND(0.5),
    marginHorizontal :PLR,
  },
  pageDelimiter3: {
    backgroundColor: MENUCOLOR,
    width: WIDTH,
    height: LINE,
    marginTop: emSize.EMROUND(1.0),
    marginBottom:  emSize.EMROUND(1.0),
    marginHorizontal :PLR,
  },
  pageImage: {
    width: WIDTH,
    aspectRatio: 4/3,
    marginHorizontal :PLR,
    paddingBottom:  emSize.EMROUND(0),
  },
  pageVideo: {
    width: WIDTH,
    aspectRatio: 4/3,
    marginHorizontal :PLR,
    paddingBottom:  emSize.EMROUND(0),
  },
  playerSpace: {
    height: 40,
    width: WIDTH,
    backgroundColor: BACKGROUND,
  },
  playerButton: {
    paddingTop: emSize.EMROUND(1),
    paddingBottom: emSize.EMROUND(1),
    alignItems: 'center',
    borderRadius: BORDERRADIUS,
    width: 40,
  },
  playerIcon: {
    color: THEMES_PLAYER_BUTTON,
    size: 30,
  },
  playerButtonText: {
    fontSize: emSize.EM(1.2),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  flipBookText: {
    fontSize: emSize.EM(1.4),
    fontStyle: 'normal',
    fontWeight: 'normal',
    //fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'normal',
    color: '#000000',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 0,
  },
  flipBookTextFormated: {
    fontSize: emSize.EM(1.4),
    fontStyle: 'normal',
    fontWeight: 'bold',
    //fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'normal',
    color: '#000000',
    backgroundColor: '#dddddd',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft:0,
    paddingRight: 0,
  },

};

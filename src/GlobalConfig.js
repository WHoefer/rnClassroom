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

// Android Color Palette Light green
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
const WHITE = '#FFFFFF';



export const THEMES_PLAYER_PRESS = A700;
export const THEMES_PLAYER_BUTTON = WHITE;
export const THEMES_PLAYER_BACKGROUND = _800;
export const THEMES_PLAYER_BORDER = _900;
export const THEMES_MENUE_BACKGROUND = _900;
export const THEMES_STATUSBAR_BACKGROUND = _800;

export const styles = {
  statusBar: {
    backgroundColor: THEMES_STATUSBAR_BACKGROUND,
  },
  menue: {
    backgroundColor: THEMES_MENUE_BACKGROUND,
    height: 40
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
    backgroundColor: BACKGROUND,
  },
  pageText: {
    fontSize: emSize.EM(1.2),
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
  playerContainer: {
    marginTop: emSize.EMROUND(1.0),
    marginBottom:  emSize.EMROUND(1.0),
    marginHorizontal :PLR,
    borderWidth: 0,
    borderRadius: BORDERRADIUS,
    backgroundColor: BACKGROUND,

  },
  playerButtonContainer: {
    borderWidth: 1,
    borderRadius: BORDERRADIUS,
    borderColor:THEMES_PLAYER_BORDER,
    backgroundColor: THEMES_PLAYER_BACKGROUND,
    borderBottomLeftRadius: BORDERRADIUS,
    borderBottomRightRadius: BORDERRADIUS,
  },
  playerButton: {
    paddingTop: emSize.EMROUND(1),
    paddingBottom: emSize.EMROUND(1),
    alignItems: 'center',
    borderRadius: BORDERRADIUS,
    width: 60,
  },
  playerButtonUnderlay: {
    underlayColor: THEMES_PLAYER_PRESS,
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
  playerText: {
    fontSize: emSize.EM(1.2),
    fontStyle: 'normal',
    fontWeight: 'normal',
    //fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'normal',
    color: '#000000',
    paddingTop: 0,
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 0,
  },
  playerTextFormated: {
    fontSize: emSize.EM(1.1),
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
  playerImage: {
    width: WIDTH,
    aspectRatio: 4/3,
    //marginHorizontal :PLR,
    paddingBottom:  emSize.EMROUND(0),
  },


};

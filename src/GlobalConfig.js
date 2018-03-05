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
export const BACKGROUND = '#FFFFFF';
export const MENUCOLOR = 'green';
export const BORDERRADIUS = emSize.EMROUND(1);
export const TEXTTCOLOR = '#000000';

export const styles = {
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
  playerAudio: {
    backgroundColor: MENUCOLOR,
    width: WIDTH,
    marginTop: emSize.EMROUND(1.0),
    marginBottom:  emSize.EMROUND(1.0),
    marginHorizontal :PLR,
  },
  playerButton: {
    paddingTop: emSize.EMROUND(1),
    paddingBottom: emSize.EMROUND(1),
    borderRadius: BORDERRADIUS,
    paddingLeft: PLR,
    paddingRight: PLR,
  },
  playerAudioText: {
    fontSize: emSize.EM(1.2),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#FFFFFF',
  },
  playerImage: {
    width: WIDTH,
    aspectRatio: 4/3,
    //marginHorizontal :PLR,
    paddingBottom:  emSize.EMROUND(0),
  },


};

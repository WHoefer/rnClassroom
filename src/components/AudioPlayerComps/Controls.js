import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { 
  styles, 
  RADIUS, 
  HEIGHT_PLAYER_CONTROL, 
  WIDTH_PLAYER_CONTROL, 
  THEMES_PLAYER_CONTROLS_BACKGROUND,
  SIZE_PLAYER_ICON,
  THEMES_PLAYER_BUTTON,
  THEMES_PLAYER_PRESS,
  BORDERRADIUS
} from './../../GlobalConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';



const  PLAY_ICON = "play-arrow";
const  PAUSE_ICON = "pause";
const  STOP_ICON = "stop";
const  NEXT_ICON = "skip-next";
const  PREVIOUS_ICON = "skip-previous";

const PLAY = 1;
const PAUSE = 2;
const STOP = 3;


const renderButton = (id, name, onPress) => {
   const style = {
    //paddingTop: emSize.EMROUND(1),
    //paddingBottom: emSize.EMROUND(1),
    alignItems: 'center',
    borderRadius: BORDERRADIUS,
    width: HEIGHT_PLAYER_CONTROL,
    height: HEIGHT_PLAYER_CONTROL

   }

    return(
      <TouchableHighlight
        key={id+name}
        onPress={ () => { onPress()}}
        style={style}
        underlayColor={THEMES_PLAYER_PRESS}
      >
        <Icon 
          name={name} 
          size={SIZE_PLAYER_ICON} 
          color={THEMES_PLAYER_BUTTON} 
        />
      </TouchableHighlight>
    );
  }

const renderPlayPause = (id, onPressPlay, onPressPause, onResume, playState ) => {
    if(playState === PAUSE) {
       return renderButton(id, PLAY_ICON, onResume)
    } else if( playState === STOP){
      return renderButton(id, PLAY_ICON, onPressPlay)
    }
    return renderButton(id, PAUSE_ICON, onPressPause)
 
  }

  export const Controls =  (props) => {

    const buttonContainer = {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: RADIUS,
      backgroundColor: THEMES_PLAYER_CONTROLS_BACKGROUND,
      borderBottomLeftRadius: RADIUS,
      borderBottomRightRadius: RADIUS,
      height: HEIGHT_PLAYER_CONTROL,
      width: WIDTH_PLAYER_CONTROL
    };

    return(
        <View key={props.id + 'Buttons'} style={buttonContainer}>
            {renderPlayPause(props.id, 
               props.onPressPlay,
               props.onPressPause,
               props.onResume,
               props.playState )}
            {renderButton(props.id, PREVIOUS_ICON, props.onPressBack)}
            {renderButton(props.id, NEXT_ICON, props.onPressNext)}
            {renderButton(props.id, STOP_ICON, props.onPressStop)}
        </View>
    );
  }

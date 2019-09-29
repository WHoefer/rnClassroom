import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { styles } from './../../GlobalConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';



const  PLAY_ICON = "play-arrow";
const  PAUSE_ICON = "pause";
const  STOP_ICON = "stop";
const  NEXT_ICON = "skip-next";
const  PREVIOUS_ICON = "skip-previous";

const PLAY = 1;
const PAUSE = 2;
const STOP = 3;


const renderButton = (id, name, onPress, style) => {
    return(
      <TouchableHighlight
        key={id+name}
        onPress={ () => { onPress()}}
        style={[styles.playerButton, style]}
        underlayColor={styles.playerButtonUnderlay.underlayColor}>
        <Icon name={name} size={styles.playerIcon.size} color={styles.playerIcon.color} />
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

    let buttonContainer = {}
    Object.assign(buttonContainer, styles.playerButtonContainer,
      {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    });

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

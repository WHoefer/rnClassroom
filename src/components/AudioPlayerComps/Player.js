import React from 'react';
import { View } from 'react-native';
import { PLR, THEMES_PLAYER_BACKGROUND, WIDTH, HEIGHT_PLAYER_SPACE } from './../../GlobalConfig';
import { FlipBook } from './FlipBook';
import { Controls } from './Controls';




export const Player =  (props) => {

    let containerStyle = {
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'stretch',
        flex: 1,
        backgroundColor: THEMES_PLAYER_BACKGROUND,
      };

    const space = {
      height: HEIGHT_PLAYER_SPACE,
      width: WIDTH,
      backgroundColor: THEMES_PLAYER_BACKGROUND,
    }  
    
    return(
      <View key={props.id + 'container'} style={containerStyle}>
        <View style={{marginHorizontal: PLR}}>
          <FlipBook
            id={props.id + 'Name'}
            text={props.text}
            image={props.image}
            subType={props.subType}
          />
          <View style={space} ></View>
          <Controls 
            id={props.id + 'Buttons'}
            playState={props.playState}
            onPressPlay={props.onPressPlay}
            onPressPause={props.onPressPause}
            onResume={props.onResume}
            onPressBack={props.onPressBack}
            onPressNext={props.onPressNext}
            onPressStop={props.onPressStop}
          />
        </View>
      </View>
    );
}
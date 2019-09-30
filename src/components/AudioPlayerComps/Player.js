import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { styles } from './../../GlobalConfig';
import { FlipBook } from './FlipBook';
import { Controls } from './Controls';




export const Player =  (props) => {

    let containerStyle = {}
    Object.assign(containerStyle, styles.playerContainer, {
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'stretch',
        flex: 1
      }
    );

    let buttonContainer = {}
    Object.assign(buttonContainer, styles.playerButtonContainer,
      {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    });

    return(
        <View key={props.id + 'container'} style={containerStyle}>
        <View >
          <FlipBook
            id={props.id + 'Name'}
            text={props.text}
            image={props.image}
            subType={props.subType}
          />
          <View style={styles.playerSpace} ></View>
        </View>
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
        <View style={styles.playerSpace} ></View>
        <TouchableHighlight onPress={props.onPressClose}>
          <View key={props.id + 'ButtonZurueck'} style={buttonContainer}>
            <Text>Player schließen</Text>
          </View>
        </TouchableHighlight>
      </View>

    );
}
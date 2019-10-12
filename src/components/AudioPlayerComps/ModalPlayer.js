import React from 'react';
import { View, Modal, Text } from 'react-native';
import { styles } from './../../GlobalConfig';
import { Menu } from './../menu';
import { Player } from './Player';
import { PreView } from './PreView';


export const ModalPlayer =  (props) => {
  
    if(!props.loaded){
      return(
        <Text key={props.id + 'warten'}>
          {"Bitte warten..."}
        </Text>
      );
    }
  
    return (
      <View style={{marginTop: 22}}>
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.modalVisible}
            onRequestClose={ () => {console.log('Close Modal')}}
        >
          <Menu 
            onPressBack={props.onPressClose}
            onPressDownload={props.onPressDownload}
          >
            <Player
              key={props.id}
              text={props.text}
              image={props.image}
              subType={props.subType}
              playState={props.playState}
              onPressPlay={props.onPressPlay}
              onPressPause={props.onPressPause}
              onResume={props.onResume}
              onPressBack={props.onPressBack}
              onPressNext={props.onPressNext}
              onPressStop={props.onPressStop}
            />
          </Menu>
        </Modal>
        <PreView 
          key={props.id + 'Name'}
          text={props.text}
          image={props.image}
          subType={props.subType}
          onPress={props.onPress}
        />
      </View>
    );
  }
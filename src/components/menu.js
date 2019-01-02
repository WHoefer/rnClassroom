import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import { styles } from './../GlobalConfig';

export const Menu = (props) => {
    return (
      <View style={{flex: 1}} >
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = {styles.statusBar.backgroundColor} translucent = {false}/>
      	<View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: styles.menue.backgroundColor, height: styles.menue.height}} >
          <TouchableHighlight
            onPress={props.onPressBack}
            underlayColor='white'
            activeOpacity={1}
          >
            <Text style={{padding: 10, color: 'white'}}>zurück</Text>
          </TouchableHighlight>
          <Text style={{padding: 10, color: 'white'}}>Yoga</Text>
          <TouchableHighlight
            onPress={props.onPressDownload}
            underlayColor='white'
            activeOpacity={1}
          >
            <Text style={{padding: 10, color: 'white'}}>download</Text>
          </TouchableHighlight>
        </View>
        {props.children}
      </View>
    );
}

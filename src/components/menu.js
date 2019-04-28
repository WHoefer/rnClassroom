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
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Menu = (props) => {
    return (
      <View style={{flex: 1}} >
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = {styles.statusBar.backgroundColor} translucent = {false}/>
      	<View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: styles.menue.backgroundColor,
          height: styles.menue.height,
          padding : styles.menue.padding}} >

          <TouchableHighlight
            onPress={props.onPressBack}
            underlayColor='white'
            activeOpacity={1}
          >
            <Icon name={'arrow-back'} size={styles.menue.height/2} color={styles.menue.color} />
          </TouchableHighlight>
          <Text style={styles.menueText}>YogaBase</Text>
          <TouchableHighlight
            onPress={props.onPressDownload}
            underlayColor='white'
            activeOpacity={1}
          >
            <Icon name={'cloud-download'} size={styles.menue.height/2} color={styles.menue.color} />
          </TouchableHighlight>
        </View>
        {props.children}
      </View>
    );
}

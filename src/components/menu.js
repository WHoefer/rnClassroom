import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';

export const Menu = (props) => {
    return (
      <View style={{flex: 1}} >
      	<View style={{flexDirection: 'row', backgroundColor: 'red', height: 40}} >
          <TouchableHighlight
            onPress={props.onPressBack}
            underlayColor='white'
            activeOpacity={1}
          >
            <Text style={{padding: 10, color: 'white'}}>zurück</Text>
          </TouchableHighlight>
        </View>
        {props.children}
      </View>
    );
}

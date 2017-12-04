'use-strict';
import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';

export const FormatedText = (key, text) => {
  const ft = <Text style={{color: 'red'}} >{text}</Text>
  const t = ['Hallo', ft, 'Hallo']
  return (
    <View key={key+'formatedText'}>
     <Text >
       {t}
     </Text>
    </View>
  );
}

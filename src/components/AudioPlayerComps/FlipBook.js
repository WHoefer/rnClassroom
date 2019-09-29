import React from 'react';
import { View, Image } from 'react-native';
import { FormatedText } from './../FormatedText';
import { styles, RADIUS } from './../../GlobalConfig';

export const FlipBook =  (props) => {
    if(  props.subType != null && props.subType === 'textAndAudio') {
        return (FormatedText(props.id, props.text, styles.playerText, styles.playerTextFormated));
    } else if(  props.subType != null &&   props.subType === 'imageAndAudio') {
        return (
            <Image
                key={props.id}
                source={props.image}
                resizeMode="contain"
                style={styles.playerImage}
                borderBottomLeftRadius={RADIUS}
                borderBottomRightRadius={RADIUS}
                borderTopLeftRadius={RADIUS}
                borderTopRightRadius={RADIUS}
             />
        );
    } else {
        return (
          <View
            key={props.id}
            style={styles.playerImage}
            borderBottomLeftRadius={RADIUS}
            borderBottomRightRadius={RADIUS}
            borderTopLeftRadius={RADIUS}
            borderTopRightRadius={RADIUS}
            />);
    }
}
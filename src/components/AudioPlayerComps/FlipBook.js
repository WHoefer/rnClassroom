import React from 'react';
import { View, Image } from 'react-native';
import { FormatedText } from './../FormatedText';
import { styles, RADIUS, ASPECT_RATIO_IMAGE, PLR } from './../../GlobalConfig';

export const FlipBook =  (props) => {

    const styleImage = { 
        aspectRatio: ASPECT_RATIO_IMAGE,
        backgroundColor: 'rgba(100, 100, 100, 0.0)'
    }

    if(  props.subType != null && props.subType === 'textAndAudio') {
        return (
            <FormatedText
                key={props.id} 
                text={props.text} 
                style={styles.flipBookText}
                styleFormat={styles.flipBookTextFormated}
            />
        );
    } else if(  props.subType != null &&   props.subType === 'imageAndAudio') {
        return (
            <Image
                key={props.id}
                source={props.image}
                resizeMode="contain"
                style={styleImage}
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
            style={styleImage}
            borderBottomLeftRadius={RADIUS}
            borderBottomRightRadius={RADIUS}
            borderTopLeftRadius={RADIUS}
            borderTopRightRadius={RADIUS}
            />
        );
    }
}
import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlipBook } from './FlipBook';
import { styles, RADIUS } from './../../GlobalConfig';

const  PLAY_PREVIEW = "play-circle-outline";

export const PreView =  (props) => {
    let containerStyle = {}
    Object.assign(containerStyle, styles.playerContainer, {
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'stretch',
        flex: 1
      }
    );

    return(
    <TouchableHighlight
        style={containerStyle}
        onPress={ props.onPress }
        >
            <View>
                <FlipBook
                    key={props.id + 'Name'}
                    text={props.text}
                    image={props.image}
                    subType={props.subType}
                />
                <View style={{
                    position: 'absolute', 
                    left: 0, 
                    right: 0, 
                    top: 0, 
                    bottom: 0, 
                    backgroundColor: 'rgba(100, 100, 100, 0.4)'
                    }}
                    borderBottomLeftRadius={RADIUS}
                    borderBottomRightRadius={RADIUS}
                    borderTopLeftRadius={RADIUS}
                    borderTopRightRadius={RADIUS}
                >
                    <View style={{ 
                        flex: 1, 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center'
                        }}
                        borderBottomLeftRadius={RADIUS}
                        borderBottomRightRadius={RADIUS}
                        borderTopLeftRadius={RADIUS}
                        borderTopRightRadius={RADIUS}
                    >
                        <Icon 
                            name={PLAY_PREVIEW} 
                            size={150} 
                            color={'rgba(255,255,255,0.9)'} 
                        />
                    </View>
                </View>
            </View>
    </TouchableHighlight>);
}
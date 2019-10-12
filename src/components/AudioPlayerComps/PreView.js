import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlipBook } from './FlipBook';
import { PLR, RADIUS, THEMES_PREVIEW_PLAYER_ICON, SIZE_PREVIEW_PLAYER_ICON, VERTICAL_MARGINS } from './../../GlobalConfig';

const  PLAY_PREVIEW = "play-circle-outline";

export const PreView =  (props) => {
    let containerStyle = {
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'stretch',
        flex: 1,
        marginTop: VERTICAL_MARGINS,
        marginBottom: VERTICAL_MARGINS,
        marginHorizontal :PLR,
        borderRadius: RADIUS,
        backgroundColor: RADIUS,
      };

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
                    backgroundColor: 'rgba(100, 100, 100, 0.1)',
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
                        alignItems: 'center',
                        }}
                        borderBottomLeftRadius={RADIUS}
                        borderBottomRightRadius={RADIUS}
                        borderTopLeftRadius={RADIUS}
                        borderTopRightRadius={RADIUS}
                    >
                        <Icon 
                            name={PLAY_PREVIEW} 
                            size={SIZE_PREVIEW_PLAYER_ICON} 
                            color={THEMES_PREVIEW_PLAYER_ICON} 
                        />
                    </View>
                </View>
            </View>
    </TouchableHighlight>);
}
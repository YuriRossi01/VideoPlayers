//-------IMPORT-------//
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import  Slider from '@react-native-community/slider';

const ProgressBar = props => {
    const{
        currentTime,
        duration,
        onSlideCapture,
        onSlideStart,
        onSlideComplete
    } = props;
    //-------GESTIONE MIN E SEC-------//
    const getMinutesFromSeconds = time => {
        const min = time >= 60 ? Math.floor(time / 60) : 0;
        const sec = Math.floor(time - min * 60);

        return `${min >= 10 ? min : '0' + min}:${
            sec >= 10 ? sec : '0' + sec
        }`;
    };

    const position = getMinutesFromSeconds(currentTime);
    const fullDuration = getMinutesFromSeconds(duration);

    const handleOnSlide = time =>{
        onSlideCapture({seekTime: time});
    };
    return(
        <View style={styles.wrapper}>
            <Slider
                value={currentTime}
                minimumValue={0}
                maximumValue={duration}
                step={1}
                onValueChange={handleOnSlide}
                onSlidingStart={onSlideStart}
                onSlidingComplete={onSlideComplete}
                minimumTrackTintColor={'#F44336'}
                maximumTrackTintColor={'#FFFFFF'}
                thumbTintColor={'#F44336'}
            />
            <View style={styles.timeWrapper}>
                <Text style={styles.timeLeft}>{position}</Text>
                <Text style={styles.timeRight}>{fullDuration}</Text>
            </View>
        </View>
    );
};
//------- GESTIONE STILI-------//
const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    timeWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 5,
    },
    timeLeft: {
      flex: 1,
      fontSize: 16,
      color: '#FFFFFF',
      paddingLeft: 10,
    },
    timeRight: {
      flex: 1,
      fontSize: 16,
      color: '#FFFFFF',
      textAlign: 'right',
      paddingRight: 10,
    },
});

export default ProgressBar;
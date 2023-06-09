import React, {useState, useEffect} from 'react';
import Video from 'react-native-video';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import ProgressBar from './ProgressBar';
import PlayerControl from './PlayerControl';
import Orientation from 'react-native-orientation-locker';
import {FullscreenClose, FullscreenOpen} from './Icone';

const windowHeight = Dimensions.get('window').width * (9 / 16);
const windowWidth = Dimensions.get('window').width;

const height = Dimensions.get('window').width;
const width = Dimensions.get('window').height;

const VideoPlayer = () => {
    
    const videoRef = React.createRef();

    useEffect(() => {
        Orientation.addOrientationListener(handleOrientation);
        return () => {
          Orientation.removeOrientationListener(handleOrientation);
        };
    }, []);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [play, setPlay] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [showControl, setShowControl] = useState(true);
   

// ----------HandleOrientation-------------//
    const handleOrientation = orientation => {
        if(orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'){
            setFullscreen(true);
            StatusBar.setHidden(true);
        } else {
            setFullscreen(false);
            StatusBar.setHidden(false);
        }
    };
// ----------HandlePlayPause-------------//
    const handlePlayPause = () => {
        if (play) {
            setPlay(false);
            setShowControl(true);
            return;
        }
        setTimeout(() => setShowControl(false),2000);
        setPlay(true);
    };
// ----------HandlePlay-------------//
    const handlePlay = () => {
        setTimeout(() => setShowControl(false),500);
        setPlay(true);
    };
// ----------SkipBackward-------------//
    const skipBackward = () => {
        videoRef.current.seek(currentTime - 5);
        setCurrentTime(currentTime - 5);
    };
// ----------SkipForward-------------//
    const skipForward = () => {
        videoRef.current.seek(currentTime + 5);
        setCurrentTime(currentTime + 5);
    };
// ----------HandControls-------------//
    const handleControls = () => {
        if (showControl) {
            setShowControl(false);
        } else { 
            setShowControl(true);
        }
    };
// ----------HandFullScreen-------------//
    const handleFullscreen = () => {
        if (fullscreen) {
            Orientation.unlockAllOrientations();
        } else {
            Orientation.lockToLandscapeLeft();
        }
    };
// ----------Fine Load-------------//
    const onLoadEnd = data => {
        setDuration(data.duration);
        setCurrentTime(data.currentTime);
    };
// ----------Pregresso -------------//
    const onProgress = data =>{
        setCurrentTime(data.currentTime);
    };
// ----------Seek-------------//
    const onSeek = data => {
        videoRef.current.seek(data.seekTime);
        setCurrentTime(data.seekTime);
    };
// ----------End-------------//
    const onEnd = () =>{
        setPlay(false);
        videoRef.current.seek(0);
    };

    return(
        <View style={fullscreen ? styles.fullscreenContainer : styles.container}>
            <TouchableOpacity onPress={handleControls}>
                <Video
                    ref={videoRef}
                    source={{uri:'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
                    style={fullscreen ? styles.fullscreenVideo : styles.video}
                    controls={false}
                    resizeMode={'contain'}
                    onLoad={onLoadEnd}
                    onProgress={onProgress}
                    onEnd={onEnd}
                    paused={play}
                    muted={false}
                />
                {showControl && (
                    <View style={styles.controlOverlay}>
                        <TouchableOpacity
                            onPress={handleFullscreen}
                            hitSlop={{top:10, bottom:10, left:10, right:10}}
                            style={styles.fullscreenButton}>
                            {fullscreen ? <FullscreenClose/> : <FullscreenOpen/>}
                        </TouchableOpacity>

                        <PlayerControl
                            onPlay={handlePlay}
                            onPause = {handlePlayPause}
                            playing = {play}
                            skipBackwards = {skipBackward}
                            skipForwards = {skipForward}
                        />

                        <ProgressBar
                            currentTime = {currentTime}
                            duration = {duration > 0 ? duration : 0}
                            onSlideStart = {handlePlayPause}
                            onSlideComplete = {handlePlayPause}
                            onSlideCapture = {onSeek}
                        />
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ebebeb',
    },
    fullscreenContainer: {
      flex: 1,
      backgroundColor: '#ebebeb',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 5,
    },
    video: {
      height: windowHeight,
      width: windowWidth,
      backgroundColor: 'black',
    },
    fullscreenVideo: {
      flex: 1,
      height: height,
      width: width,
      backgroundColor: 'black',
    },
    text: {
      marginTop: 30,
      marginHorizontal: 20,
      fontSize: 15,
      textAlign: 'justify',
    },
    fullscreenButton: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'flex-end',
      alignItems: 'center',
      paddingRight: 10,
    },
    controlOverlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#000000c4',
      justifyContent: 'space-between',
    },
});

export default VideoPlayer;
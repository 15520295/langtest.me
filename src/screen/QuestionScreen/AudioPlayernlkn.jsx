import React, { Component, PureComponent } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import Slider from 'react-native-slider';
import { Asset, Audio, Font } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFFFFF';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = 'Loading...';
const BUFFERING_STRING = 'Buffering...';
const RATE_SCALE = 3.0;

export default class AudioPlayer extends PureComponent {
    constructor(props) {
        super(props);
        this.index = 0;
        this.isSeeking = false;
		this.shouldPlayAtEndOfSeek = false;
		this.playbackInstance = new Audio.Sound();
        this.state = {
            playbackInstanceName: LOADING_STRING,
            playbackInstancePosition: null,
            playbackInstanceDuration: null,
            shouldPlay: false,
            isPlaying: false,
            isBuffering: false,
            isLoading: true,
            volume: 1.0,
            rate: 1.0,
		};


    }
	
    componentDidMount() {
	    Audio.setAudioModeAsync({
	        allowsRecordingIOS: false,
	        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
	        playsInSilentModeIOS: true,
	        shouldDuckAndroid: true,
	        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
	        playThroughEarpieceAndroid: false
		});
		
		this.playbackInstance.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
	}
	
	componentDidUpdate(prevProps, prevState, snapshot){
		if(prevProps.uri !== this.props.uri){
			this._loadNewPlaybackInstance(true);
		}
	}
	componentWillUnmount() {
		if (this.playbackInstance != null) {
			this.playbackInstance.stopAsync();
	        this.playbackInstance.unloadAsync();
	        this.playbackInstance.setOnPlaybackStatusUpdate(null);
	        this.playbackInstance = null;
	    }
	}
	
	
    async _loadNewPlaybackInstance(playing) {
	    const source = this.props.uri;
	    await this.playbackInstance.loadAsync(source);

	    this._updateScreenForLoading(false);
    }

    _updateScreenForLoading(isLoading) {
	    if (isLoading) {
	        this.setState({
	            isPlaying: false,
	            playbackInstanceName: LOADING_STRING,
	            playbackInstanceDuration: null,
	            playbackInstancePosition: null,
	            isLoading: true,
	        });
	    } else {
	        this.setState({
	            playbackInstanceName: this.props.name,
	            isLoading: false,
	        });
	    }
    }

	_onPlaybackStatusUpdate = status => {
	    if (status.isLoaded) {
	        this.setState({
	            playbackInstancePosition: status.positionMillis,
	            playbackInstanceDuration: status.durationMillis,
	            shouldPlay: status.shouldPlay,
	            isPlaying: status.isPlaying,
	            isBuffering: status.isBuffering,
	            rate: status.rate,
	            volume: status.volume,
	        });
	        if (status.didJustFinish) {
				this._onStopPressed();
	            // this._advanceIndex(true);
	            // this._updatePlaybackInstanceForIndex(true);
	        }
	    } else {
	        if (status.error) {
	            console.log(`FATAL PLAYER ERROR: ${status.error}`);
	        }
	    }
	};

	_advanceIndex(forward) {
	    this.playbackInstance.stopAsync();
	}

	async _updatePlaybackInstanceForIndex(playing) {
	    this._updateScreenForLoading(true);
	    this._loadNewPlaybackInstance(playing);
	}

	_onPlayPausePressed = () => {
	    if (this.playbackInstance != null) {
	        if (this.state.isPlaying) {
	            this.playbackInstance.pauseAsync();
	        } else {
	            this.playbackInstance.playAsync();
	        }
	    }
	};

	_onStopPressed = () => {
	    if (this.playbackInstance != null) {
			this.playbackInstance.stopAsync();
	    }
	};

	_onForwardPressed = () => {
	    if (this.playbackInstance != null) {
	        this._advanceIndex(true);
	        this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
	    }
	};

	_onBackPressed = () => {
	    if (this.playbackInstance != null) {
	        this._advanceIndex(false);
	        this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
	    }
	};

	_onVolumeSliderValueChange = value => {
	    if (this.playbackInstance != null) {
	        this.playbackInstance.setVolumeAsync(value);
	    }
	};

	_trySetRate = async rate => {
	    if (this.playbackInstance != null) {
	        try {
	            await this.playbackInstance.setRateAsync(rate);
	        } catch (error) {
	            // Rate changing could not be performed, possibly because the client's Android API is too old.
	        }
	    }
	};

	_onRateSliderSlidingComplete = async value => {
	    this._trySetRate(value * RATE_SCALE);
	};

	_onSeekSliderValueChange = value => {
	    if (this.playbackInstance != null && !this.isSeeking) {
	        this.isSeeking = true;
	        this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
	        this.playbackInstance.pauseAsync();
	    }
	};

	_onSeekSliderSlidingComplete = async value => {
	    if (this.playbackInstance != null) {
	        this.isSeeking = false;
	        const seekPosition = value * this.state.playbackInstanceDuration;
	        if (this.shouldPlayAtEndOfSeek) {
	            this.playbackInstance.playFromPositionAsync(seekPosition);
	        } else {
	            this.playbackInstance.setPositionAsync(seekPosition);
	        }
	    }
	};

	_getSeekSliderPosition() {
	    if (
	        this.playbackInstance != null &&
			this.state.playbackInstancePosition != null &&
			this.state.playbackInstanceDuration != null
	    ) {
	        return (
	            this.state.playbackInstancePosition /
				this.state.playbackInstanceDuration
	        );
	    }
	    return 0;
	}

	_getMMSSFromMillis(millis) {
	    const totalSeconds = millis / 1000;
	    const seconds = Math.floor(totalSeconds % 60);
	    const minutes = Math.floor(totalSeconds / 60);

	    const padWithZero = number => {
	        const string = number.toString();
	        if (number < 10) {
	            return '0' + string;
	        }
	        return string;
	    };
	    return padWithZero(minutes) + ':' + padWithZero(seconds);
	}

	_getTimestamp() {
	    if (
	        this.playbackInstance != null &&
			this.state.playbackInstancePosition != null &&
			this.state.playbackInstanceDuration != null
	    ) {
	        return `${this._getMMSSFromMillis(
	            this.state.playbackInstancePosition
	        )} / ${this._getMMSSFromMillis(
	            this.state.playbackInstanceDuration
	        )}`;
	    }
	    return '';
	}

	render() {
	    return(
	        <View style={styles.container}>
				            <View
	                style={[
	                    {
	                        opacity: this.state.isLoading
	                            ? DISABLED_OPACITY
	                            : 1.0,
	                    },
	                ]}
	            >
	                <Slider
	                    style={styles.playbackSlider}
	                    value={this._getSeekSliderPosition()}
	                    onValueChange={this._onSeekSliderValueChange}
	                    onSlidingComplete={this._onSeekSliderSlidingComplete}
	                    thumbTintColor="#000000"
	                    minimumTrackTintColor="#4CCFF9"
	                    disabled={this.state.isLoading}
	                />
	            </View>
	            <View style={styles.infoContainer}>
	                <View
	                    style={[
	                        styles.buttonsContainerBase,
	                        styles.buttonsContainerTopRow,
	                        {
	                            opacity: this.state.isLoading
	                                ? DISABLED_OPACITY
	                                : 1.0,
	                        },
	                    ]}
	                >
	                    <TouchableHighlight
	                        underlayColor={BACKGROUND_COLOR}
	                        style={styles.wrapper}
	                        onPress={this._onPlayPausePressed}
	                        disabled={this.state.isLoading}
	                    >
	                        <View>
	                            {this.state.isPlaying ? (
	                                <MaterialIcons
	                                    name="pause"
	                                    size={40}
	                                    color="#56D5FA"
	                                />
	                            ) : (
	                                <MaterialIcons
	                                    name="play-arrow"
	                                    size={40}
	                                    color="#56D5FA"
	                                />
	                            )}
	                        </View>
	                    </TouchableHighlight>
	                </View>
	                <View style={styles.detailsContainer}>
	                    <Text style={[styles.text]}>
	                        {this.state.playbackInstanceName}
	                    </Text>
	                    <Text style={[styles.text]}>
	                        {this.state.isBuffering ? (
	                            BUFFERING_STRING
	                        ) : (
	                            this._getTimestamp()
	                        )}
	                    </Text>
	                </View>
	            </View>
	        </View>
	    );
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: BACKGROUND_COLOR,
        maxHeight: 90
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    detailsContainer: {
        height: 40,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    playbackContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    playbackSlider: {
        alignSelf: 'stretch',
        marginLeft: 10,
        marginRight: 10,
    },
    text: {
        fontSize: FONT_SIZE,
        minHeight: FONT_SIZE,
        textAlign: 'center'
    },
    buttonsContainerBase: {
        flex: 1,
        flexDirection: 'row',
    },
    buttonsContainerTopRow: {
        maxHeight: 40,
        maxWidth: 40,
    }
});

AudioPlayer.propTypes = {
    uri: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
};
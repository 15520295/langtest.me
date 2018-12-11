import * as React from 'react'
import { View, Text, Button} from 'native-base';
import { StyleSheet, ViewStyle } from 'react-native';
import * as Progress from 'react-native-progress';
import { heightPercentageToDP, widthPercentageToDP } from '../../helper/ratioHelper';
import { systemWeights } from 'react-native-typography';
import { NavigationScreenProps, NavigationParams } from 'react-navigation';
export interface ResultScreenProps extends NavigationScreenProps<NavigationParams, any>{
    totalAnswer: number,
    correctAnswer: number,
    uncorrectedAnswer: number,
    leftButtonText: string,
    leftButtonClick?: () => void,
    rightButtonText: string,
    rightButtonClick?: () => void,
}

interface ResultScreenState{
    progress: number
}


class ResultScreen extends React.Component<ResultScreenProps, ResultScreenState>{
    static defaultProps : ResultScreenProps = {
        totalAnswer: 10,
        correctAnswer: 10,
        uncorrectedAnswer: 0,
        leftButtonText: "Click me",
        rightButtonText: "Home",
        navigation: null
    }

    constructor(props: ResultScreenProps){
        super(props);

        this.state = {
            progress: 0
        }
    }

    componentDidMount(){
        const correctedAnswer: number = this.props.navigation.getParam('correctedAnswer', this.props.correctAnswer);
        const totalAnswer: number = this.props.navigation.getParam('totalAnswer', this.props.correctAnswer);
        this.setState({
            progress: correctedAnswer / totalAnswer
        })
    }

    render(){
        const correctedAnswer: number = this.props.navigation.getParam('correctedAnswer', this.props.correctAnswer);
        const uncorrectedAnswer: number = this.props.navigation.getParam('uncorrectedAnswer', this.props.correctAnswer);
        const totalAnswer: number = this.props.navigation.getParam('totalAnswer', this.props.correctAnswer);
        const leftButtonText: number = this.props.navigation.getParam('leftButtonText', this.props.leftButtonText);
        const rightButtonText: number = this.props.navigation.getParam('rightButtonText', this.props.rightButtonText);
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Progress.Circle 
                        size={widthPercentageToDP(40)} 
                        showsText={true}
                        progress={this.state.progress}
                        borderWidth={0}
                        thickness={7}
                        fill="white"
                        style={{marginLeft: widthPercentageToDP(30)}}>
                        </Progress.Circle>
                    <View style={styles.colorContainer}>
                        <View style={styles.textContainer}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.labelLeftText}>TOTAL QUESTION</Text>
                                <Text style={styles.labelLeftText}>CORRECT ANSWER</Text>
                                <Text style={styles.labelLeftText}>WRONG ANSWER</Text>
                            </View>
                            <View style={styles.numberContainer}>
                                <Text style={styles.numberText}>{totalAnswer}</Text>
                                <Text style={[styles.numberText, {color: '#46C00D'}]}>{correctedAnswer}</Text>
                                <Text style={[styles.numberText, {color: '#EF2121'}]}>{uncorrectedAnswer}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}> 
                    <Button onPress={this.props.leftButtonClick} style={[styles.button as ViewStyle, {backgroundColor: '#FF5252'}]}>
                        <Text>{leftButtonText}</Text>
                    </Button>
                    <Button info bordered onPress={this.props.leftButtonClick} style={[styles.button as ViewStyle, {borderWidth: 3}]}>
                        <Text style={{textAlign: "center"}}>{rightButtonText}</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles  = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: heightPercentageToDP(40),
        justifyContent: 'flex-start',
        alignContent: 'stretch'
    },
    progress : {
        alignContent: 'center'
    },
    colorContainer: {
        flex : 1,
        flexDirection: 'row',
        marginTop: -widthPercentageToDP(20),
        height: heightPercentageToDP(40),
        backgroundColor: '#019AE8',
        zIndex: -1
    },
    textContainer: {
        marginTop: heightPercentageToDP(16),
        marginLeft: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(8),
        marginBottom: heightPercentageToDP(5),
        flex : 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    labelContainer: {
        flex: 2,
        marginLeft: widthPercentageToDP(8),
        marginTop: heightPercentageToDP(4),
        marginBottom: heightPercentageToDP(4),
        justifyContent: 'space-between'
    },
    labelLeftText: {
        fontSize: 15,
        textAlign: 'left',
        ...systemWeights.semibold
    },
    numberText: {
        fontSize: 15,
        textAlign: 'right',
        ...systemWeights.semibold
    },
    numberContainer: {
        flex: 1,
        marginRight: widthPercentageToDP(8),
        marginTop: heightPercentageToDP(4),
        marginBottom: heightPercentageToDP(4),
        alignContent: 'flex-end',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        marginTop: heightPercentageToDP(2),
        marginLeft: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(8),
        height: heightPercentageToDP(7),
        maxHeight: heightPercentageToDP(7),
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        borderRadius: 10,
        width: widthPercentageToDP(37),
        justifyContent: 'center',
    }


})
export default ResultScreen;
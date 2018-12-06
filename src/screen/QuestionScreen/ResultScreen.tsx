import * as React from 'react'
import { View, Text, Button} from 'native-base';
import { StyleSheet, ViewStyle } from 'react-native';
import * as Progress from 'react-native-progress';
import { heightPercentageToDP, widthPercentageToDP } from '../../helper/ratioHelper';
import { systemWeights } from 'react-native-typography';
export interface ResultScreenProps{
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
        rightButtonText: "Home"
    }

    constructor(props: ResultScreenProps){
        super(props);

        this.state = {
            progress: 0
        }
    }

    componentDidMount(){
        this.setState({
            progress: 0.3
        })
    }

    render(){
        
        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Progress.Circle 
                        size={widthPercentageToDP(40)} 
                        showsText={true}
                        progress={this.state.progress}
                        borderWidth={0}
                        thickness={5}
                        fill="white"
                        style={{marginLeft: widthPercentageToDP(30)}}>
                        </Progress.Circle>
                    <View style={styles.colorContainer}>
                        <View style={styles.textContainer}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.labelText}>TOTAL QUESTION</Text>
                                <Text style={styles.labelText}>CORRECT ANSWER</Text>
                                <Text style={styles.labelText}>WRONG ANSWER</Text>
                            </View>
                            <View style={styles.labelContainer}>
                                <Text style={styles.labelText}>{this.props.totalAnswer}</Text>
                                <Text style={styles.labelText}>{this.props.correctAnswer}</Text>
                                <Text style={styles.labelText}>{this.props.uncorrectedAnswer}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}> 
                    <Button info onPress={this.props.leftButtonClick} style={styles.button as ViewStyle}>
                        <Text>{this.props.leftButtonText}</Text>
                    </Button>
                    <Button bordered onPress={this.props.leftButtonClick} style={styles.button as ViewStyle}>
                        <Text style={{textAlign: "center"}}>{this.props.leftButtonText}</Text>
                    </Button>
                </View>
            </View>
        )
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
        marginTop: heightPercentageToDP(28),
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
        marginTop: heightPercentageToDP(12),
        marginLeft: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(8),
        flex : 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    labelContainer: {
        flex: 1,
    },
    labelText: {
        fontSize: 12,
        ...systemWeights.bold
    },
    numberContainer: {
        flex: 1
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
        width: widthPercentageToDP(40),
        justifyContent: 'center'
    }


})
export default ResultScreen;
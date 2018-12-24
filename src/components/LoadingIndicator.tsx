import * as React from 'react';
import * as Progress from 'react-native-progress';
import { widthPercentageToDP } from '../helper/ratioHelper';
import { View } from 'native-base';

export default class LoadingIndicator extends React.Component{
    render(){
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Progress.Circle
                    size={widthPercentageToDP(14)} 
                    indeterminate={true}
                    borderWidth={2}>
                </Progress.Circle>
            </View>
        )
    }
}
import * as React from 'react';
import { View, Text, Row } from 'native-base';
import IProfile from '../../entity/Profile';
import { Image, ViewStyle, Platform } from 'react-native';
import { widthPercentageToDP } from '../../helper/ratioHelper';
import { AntDesign } from '@expo/vector-icons';
import { systemWeights } from 'react-native-typography';
import { getNumberWithOrdinal } from '../../helper/numberHelper';

export interface MyProfileComponentProps{
    profile: IProfile
    style?: ViewStyle
}

export default class MyProfileComponent extends React.Component<MyProfileComponentProps>{
    constructor(props: MyProfileComponentProps){
        super(props);
    }
    


    render(){
        const {profile} = this.props;
        return(
            <View style={[{flex: 1, backgroundColor: '#019AE8'}, this.props.style]}>
                <View style={{flex: 3, flexDirection: 'row', justifyContent: 'flex-start'}}>
                    {/* avatar */}
                    <View style={{marginLeft: widthPercentageToDP(3),flex: 2, flexDirection: 'row', alignItems:'center'}}>
                        <Image 
                        source={require('../../../assets/images/joychou.jpg')}
                        style={{width:widthPercentageToDP(20), height: widthPercentageToDP(20), borderRadius: widthPercentageToDP(20) / 2}}
                        resizeMode='center'/>
                    </View>
                    {/* Time, time spend */}
                    <View style={{flex: 5, flexDirection: 'column', justifyContent: 'center'}}>
                        <Text style={[{color: 'white', fontSize: 30}, systemWeights.semibold ]}>{profile.name}</Text>
                        <Text style={[{color: 'white', fontSize: 14}, systemWeights.regular ]}>Time spent: {profile.timeSpent} minutes</Text>
                    </View>
                    {/* rank */}
                    <View style={{flex: 2, flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center', marginRight: widthPercentageToDP(3)}}>
                        <Text style={[{color: 'white', fontSize: 56, textAlign: 'right'}, systemWeights.semibold ]}>{profile.rank}</Text>
                        <Text style={[{marginBottom: widthPercentageToDP(10) ,color: 'white', fontSize: 20, textAlign: 'right', textAlignVertical : 'top'}, systemWeights.regular ]}>{getNumberWithOrdinal(profile.rank)}</Text>
                    </View>
                </View>
                {/* Question */}
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#019AE8', marginLeft: widthPercentageToDP(6)}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <AntDesign name='smile-circle' color={'white'} size={20}/>
                        <Text style={[{color: 'white', fontSize: 16}, systemWeights.semibold ]}> {profile.correctAnswer}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <AntDesign name='frown' color={'white'} size={20}/>
                        <Text style={[{color: 'white', fontSize: 16}, systemWeights.semibold ]}> {profile.correctAnswer}</Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={[{color: 'white', flex: 1, textAlign: 'right', marginRight: widthPercentageToDP(3)}, systemWeights.semibold]}>{profile.totalQuestion} Questions</Text>
                    </View>
                </View>
            </View>
        )
    }
} 
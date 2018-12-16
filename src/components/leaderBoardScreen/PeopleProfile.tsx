import * as React from 'react';
import { View, Text, Row, Card } from 'native-base';
import IProfile from '../../entity/Profile';
import { Image, ViewStyle, Platform } from 'react-native';
import { widthPercentageToDP } from '../../helper/ratioHelper';
import { AntDesign } from '@expo/vector-icons';
import { systemWeights } from 'react-native-typography';
import { getNumberWithOrdinal } from '../../helper/numberHelper';

export interface PeopleProfileComponentProps{
    profile: IProfile
    style?: ViewStyle
}

export default class PeopleProfileComponent extends React.Component<PeopleProfileComponentProps>{
    constructor(props: PeopleProfileComponentProps){
        super(props);
    }
    
    render(){
        const {profile} = this.props;
        return(
            <Card style={[{flex: 1, backgroundColor: 'white'}, this.props.style]}>
                <View style={{flex: 3, flexDirection: 'row', justifyContent: 'flex-start'}}>
                    {/* avatar */}
                    <View style={{flex: 1.5, flexDirection: 'row', alignItems:'center', justifyContent: 'center'}}>
                        <Image 
                        source={require('../../../assets/images/joychou.jpg')}
                        style={{width:widthPercentageToDP(15), height: widthPercentageToDP(15), borderRadius: widthPercentageToDP(15) / 2}}
                        resizeMode='center'/>
                    </View>
                    {/* Time, time spend */}
                    <View style={{flex: 5, flexDirection: 'column', justifyContent: 'center'}}>
                        <Text style={[{color: '#2B2A2A', fontSize: 16}, systemWeights.regular]}>{profile.name}</Text>
                        <View style={{height: '10%'}}></View>
                        <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'}}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <AntDesign name='smile-circle' color={'#2B2A2A'} size={14}/>
                            <Text style={[{color: '#2B2A2A', fontSize: 12}, systemWeights.regular ]}> {profile.correctAnswer}</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <AntDesign name='frown' color={'#2B2A2A'} size={14}/>
                            <Text style={[{color: '#2B2A2A', fontSize: 12}, systemWeights.regular ]}> {profile.correctAnswer}</Text>
                        </View>
                        <View style={{flex: 2, flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={[{color: '#949494', fontSize: 12, flex: 1, textAlign: 'right', marginRight: widthPercentageToDP(3)}, systemWeights.regular]}>{profile.totalQuestion} Questions</Text>
                        </View>
                    </View>
                    </View>
                    {/* rank */}
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center', marginRight: widthPercentageToDP(3)}}>
                        <Text style={[{fontSize: 30, textAlign: 'right'}, systemWeights.light ]}>{profile.rank}</Text>
                        <Text style={[{marginBottom: widthPercentageToDP(10), fontSize: 16, textAlign: 'right', textAlignVertical : 'top'}, systemWeights.light ]}>{getNumberWithOrdinal(profile.rank)}</Text>
                    </View>
                </View>
                {/* Question */}
            </Card>
        )
    }
} 
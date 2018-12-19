import * as React from 'react';
import * as Progress from 'react-native-progress';


export interface Props extends Progress.BarPropTypes{
    interval: number,
    totalTime: number,
    onTick?: (timer: number) => void,
    onOver?: () => void
}

interface State{
    process: number,
    percent: number
}

export default class QuizScreenTimer extends React.Component<Props, State>{
    _clockCall: NodeJS.Timeout;
    constructor(props: Props){
        super(props)

        this.state = {
            process: 0,
            percent: 0
        }
    }

    componentDidMount() {
        const {interval, onTick, totalTime, onOver} = this.props;
        this._clockCall = setInterval(() => {
            const process = this.state.process + interval;
            const percent = process / totalTime;
            if(onTick){
                onTick(this.state.process);
            };
            if(process > totalTime && onOver){
                onOver();
                clearInterval(this._clockCall);
            }
            this.setState({
                process: process,
                percent: percent
            });

        }, interval);
    }

    componentWillUnmount() {
        clearInterval(this._clockCall);
    }

    render(){
        return(
            <Progress.Bar progress={this.state.percent} {...this.props}/>
        )
    }
}
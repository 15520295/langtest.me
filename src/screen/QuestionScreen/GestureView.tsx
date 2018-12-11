import * as React from 'react';
import { PanResponder, PanResponderInstance, ViewProps, PanResponderGestureState } from 'react-native';
import { View } from 'native-base';

export interface GestureViewProps extends ViewProps{
    touchThreshold? :number
    swipeThreshold? :number
    quadrantThreshold?: number
    onLeftSwipe?: () => void,
    onRightSwipe?: () => void
}

interface GestureViewStates{
    quadrants: any
}

export default class GestureView extends React.Component<GestureViewProps, GestureViewStates>{
    _panResponder: PanResponderInstance;
    static defaultProps : GestureViewProps = {
        touchThreshold : 20,
        swipeThreshold: 30,
        quadrantThreshold: 30
    }
    constructor(props: GestureViewProps){
        super(props);

        this.state = {
            quadrants: this.calculateQuadrants(props.quadrantThreshold),
        }

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (_, gestureState) =>{
                const {dx, dy} = gestureState;
                return (Math.abs(dx) > this.props.touchThreshold) || (Math.abs(dy) > this.props.touchThreshold);
            },
            onPanResponderRelease: (_, gestureState) => this.handleSwipe(gestureState)
        });

        this.calculateQuadrants = this.calculateQuadrants.bind(this);
        this.handleSwipe = this.handleSwipe.bind(this);
    }

    calculateQuadrants (threshold: number): any {
        return {
            right: [0 + threshold, 0 - threshold],
            up: [-90 + threshold, -90 - threshold],
            down: [90 + threshold, 90 - threshold],
            topLeft: [-180 + threshold, -180],
            bottomLeft: [180, 180 - threshold]
        };
    }

    isInsideQuadrant (quadrants: any, direction: string, angle: number): boolean {
        return angle >= quadrants[direction][1] && angle <= quadrants[direction][0];
    }

    handleSwipe (gesture:PanResponderGestureState): void {
        const angle = Math.atan2(gesture.dy, gesture.dx) * (180 / Math.PI);
        const distance = Math.sqrt(Math.pow(gesture.dx, 2) + Math.pow(gesture.dy, 2));

        if (distance > this.props.swipeThreshold) {
            if (this.props.onRightSwipe && this.isInsideQuadrant(this.state.quadrants, 'right', angle)) {
                this.props.onRightSwipe();
            } else if (this.props.onLeftSwipe && this.isInsideQuadrant(this.state.quadrants, 'topLeft', angle)) {
                this.props.onLeftSwipe();
            } else if (this.props.onLeftSwipe && this.isInsideQuadrant(this.state.quadrants, 'bottomLeft', angle)) {
                this.props.onLeftSwipe();
            } 
        } 
    }

    render(){
        return(
            <View {...this.props} {...this._panResponder.panHandlers}>
                {this.props.children}
            </View>
        )
    }
}
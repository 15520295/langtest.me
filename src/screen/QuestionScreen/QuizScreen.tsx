import QuizStore from "../../store/quizStore";
import React from 'react';
import {Subscribe, Provider} from "unstated";
import QuizScreenContainer, {QuizScreenContainerProps} from "./QuizScreenContainer";
import {NavigationScreenProps, NavigationScreenConfig, NavigationParams} from "react-navigation";

export interface QuizScreenProps extends QuizScreenContainerProps {

}

export default class QuizScreen extends React.Component<QuizScreenProps> {
    static navigationOption: NavigationScreenConfig<{}> = {
        header: null
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        const {navigation} = this.props;
        return (
            <Provider>
                <Subscribe to={[QuizStore]}>
                    {(quizStore) => (
                        <QuizScreenContainer
                            navigation={navigation}
                            onQuizOver={navigation.getParam('quizOver', undefined)}
                            quizStore={quizStore as QuizStore}
                        />
                    )}
                </Subscribe>
            </Provider>
        );
    }
}
import QuizStore from "../../store/quizStore";
import React from 'react';
import { Subscribe, Provider } from "unstated";
import QuizScreenContainer from "./QuizScreenContainer";
import { NavigationScreenProps } from "react-navigation";

export interface QuizScreenProps extends NavigationScreenProps<{}>{ 
    quizStore: QuizStore,
}

export default class QuizScreen extends React.Component<QuizScreenProps>{
    constructor(props: any){
        super(props);
    }

    render() {
        const {navigation} = this.props;
        return(
            <Provider>
                 <Subscribe to={[QuizStore]}>
          {(quizStore) => (
            <QuizScreenContainer
                navigation = {navigation}
              quizStore={quizStore as QuizStore}
            />
          )}
        </Subscribe>
            </Provider>
        )
    }
}
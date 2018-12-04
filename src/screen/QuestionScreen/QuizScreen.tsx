import QuizStore from "../../store/quizStore";
import React from 'react';
import { Subscribe, Provider } from "unstated";
import QuizScreenContainer from "./QuizScreenContainer";

  

export default class QuizScreen extends React.Component{
    static navigationOptions = {
        header: null
    };
    
    constructor(props: any){
        super(props);
    }

    render() {
        return(
            <Provider>
                 <Subscribe to={[QuizStore]}>
          {(quizStore) => (
            <QuizScreenContainer
              quizStore={quizStore as QuizStore}
            />
          )}
        </Subscribe>
            </Provider>
        )
    }
}
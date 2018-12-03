import QuizStore from "../../store/quizStore";
import React from 'react';
import { Subscribe, Provider } from "unstated";
import QuestionScreenContainer from "./QuestionScreenContainer";

  

export default class QuizScreen extends React.Component{
    constructor(props: any){
        super(props);
    }

    render(){
        return(
            <Provider>
                 <Subscribe to={[QuizStore]}>
          {(quizStore) => (
            <QuestionScreenContainer
              quizStore={quizStore as QuizStore}
            />
          )}
        </Subscribe>
            </Provider>
        )
    }
}
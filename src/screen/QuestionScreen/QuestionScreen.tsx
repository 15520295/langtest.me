import QuizStore from "../../store/quizStore";
import React from 'react';
import { Subscribe, Provider } from "unstated";
import QuestionScreenDumb from "./QuestionScreenDumb";

  

export default class QuizScreen extends React.Component{
    constructor(props: any){
        super(props);
    }

    render(){
        return(
            <Provider>
                 <Subscribe to={[QuizStore]}>
          {(quizStore) => (
            <QuestionScreenDumb
              quizStore={quizStore}
            />
          )}
        </Subscribe>
            </Provider>
        )
    }
}
import QuizStore from "../../store/quizStore";
import React from 'react';
import { Subscribe, Provider } from "unstated";
import QuestionScreenContainer from "./QuestionScreenContainer";

  

export default class QuizScreen extends React.Component {

    static navigationOptions = {
        header: null // !!! Hide Header
        // title:'Question',
        // // header: { visible:false },
        // drawerIcon:(
        //     <Image source={require('../../assets/images/home.png')}
        //            style={{height: 24, width: 24}}
        //     />
        // )
    };
    constructor(props: any) {
        super(props);
    }

    render() {
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
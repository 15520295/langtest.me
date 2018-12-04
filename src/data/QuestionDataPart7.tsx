import IQuestion, { QuestionType } from "../entity/Question";

const QuestionDataPart7 : IQuestion[] = [{
    id: 'p7_001',
    type: QuestionType.part7,
    question: 'What is suggested about the car?',
    answer: ['It was recently repaired.', 'It has had more than one owner', 'It is very fuel efficient', 'It has been on sale for six months'],
    correctAnswer: 0,
    explain: "Nothing at all",
    help: "Arimasen",
    imageAsset: require('./../../assets/images/part7/p7_001.png')
},
{
    id: 'p7_002',
    type: QuestionType.part7,
    question: 'According to the advertisement, why is Ms.Ghorbani selling her car?',
    answer: ['She cannot repair the car’s temperature control', 'She finds it difficult to maintain', 'She would like to have a newer model.', 'She is leaving for another country.'],
    correctAnswer: 3,
    explain: "Nothing at all",
    help: "Arimasen",
    imageAsset: require('./../../assets/images/part7/p7_001.png')
}]

export default QuestionDataPart7;

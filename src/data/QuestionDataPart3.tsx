import IQuestion, { QuestionType } from "../entity/Question";

const QuestionDataPart3 : IQuestion[] = [{
    id: 'p3_001',
    type: QuestionType.part3,
    question: 'Why is the woman calling?',
    answer: ['To cancel an order', 'To complain about a product', 'To redeem a gift card', 'To renew a warranty'],
    correctAnswer: 1,
    explain: "Nothing at all",
    help: "Arimasen",
    audioAsset: require('./../../assets/audio/doraemon.mp3'),
}, {
    id: 'p3_002',
    type: QuestionType.part3,
    question: 'Look at the graphic. What size screen will the man order? ',
    answer: ['11 inches', '13 inches', '15 inches', '17 inches'],
    correctAnswer: 1,
    explain: "Nothing at all",
    help: "Arimasen",
    audioAsset: require('./../../assets/audio/doraemon.mp3'),
    imageAsset: require('./../../assets/images/part3/p3_002.png')
}];

export default QuestionDataPart3;

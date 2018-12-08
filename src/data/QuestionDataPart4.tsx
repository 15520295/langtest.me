import IQuestion, { QuestionType } from "../entity/Question";

const QuestionDataPart4 : IQuestion[] = [{
    id: 'p4_001',
    type: QuestionType.part4,
    question: 'What does the speaker say about the repair?',
    answer: ['It is not required', 'It has been finished early.', 'It will be inexpensive.', 'It is covered by a warranty'],
    correctAnswer: 1,
    explain: "Nothing at all",
    help: "Arimasen",
    audioAsset: require('./../../assets/audio/doraemon.mp3'),
    difficultLevel: 3
}, {
    id: 'p4_002',
    type: QuestionType.part4,
    question: 'When can the listener pick up his car?',
    answer: ['Today', 'Tomorrow', 'Next week', 'In two weeks'],
    correctAnswer: 2,
    explain: "Nothing at all",
    help: "Arimasen",
    audioAsset: require('./../../assets/audio/doraemon.mp3'),
    difficultLevel: 3
}];

export default QuestionDataPart4;

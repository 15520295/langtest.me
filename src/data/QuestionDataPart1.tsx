import IQuestion, { QuestionType } from "../entity/Question";

const QuestionDataPart1 : IQuestion[] = [{
    id: 'p1_001',
    type: QuestionType.part1,
    question: '',
    answer: ['A', 'B', 'C', 'D'],
    correctAnswer: 2,
    explain: "Nothing at all",
    help: "No thing at all",
    imageAsset: require('./../../assets/images/part1/p1_001.png'),
    audioAsset: require('./../../assets/audio/doraemon.mp3')
},
{
    id: 'p1_002',
    type: QuestionType.part1,
    question: '',
    answer: ['A', 'B', 'C', 'D'],
    correctAnswer: 2,
    explain: "Nothing at all",
    help: "No thing at all",
    imageAsset: require('./../../assets/images/part1/p1_001.png'),
    audioAsset: require('./../../assets/audio/doraemon.mp3')
}]

export default QuestionDataPart1;

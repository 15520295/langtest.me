import IQuestion, { QuestionType } from "../entity/Question";

const QuestionDataPart2 : IQuestion[] = [{
    id: 'p1_002',
    type: QuestionType.part2,
    question: '',
    answer: ['A', 'B', 'C'],
    correctAnswer: 2,
    explain: "Nothing at all",
    help: "No thing at all",
    audioAsset: require('./../../assets/audio/doraemon.mp3')
},
{
    id: 'p1_002',
    type: QuestionType.part2,
    question: '',
    answer: ['A', 'B', 'C'],
    correctAnswer: 2,
    explain: "Nothing at all",
    help: "No thing at all",
    audioAsset: require('./../../assets/audio/doraemon.mp3')
}]

export default QuestionDataPart2;
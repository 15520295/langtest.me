import IQuestion, { QuestionType } from "../entity/Question";

const QuestionDataPart2 : IQuestion[] = [{
    id: 'p2_001',
    type: QuestionType.part2,
    question: '',
    answer: ['A', 'B', 'C'],
    correctAnswer: 2,
    explain: "Nothing at all",
    help: "No thing at all",
    audioAsset: require('./../../assets/audio/doraemon.mp3'),
    difficultLevel: 3
},
{
    id: 'p2_002',
    type: QuestionType.part2,
    question: '',
    answer: ['A', 'B', 'C'],
    correctAnswer: 2,
    explain: "Nothing at all",
    help: "No thing at all",
    audioAsset: require('./../../assets/audio/doraemon.mp3'),
    difficultLevel: 3
}]

export default QuestionDataPart2;

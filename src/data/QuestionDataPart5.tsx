import IQuestion, { QuestionType } from "../entity/Question";

const QuestionDataPart5 : IQuestion[] = [{
    id: 'p5_001',
    type: QuestionType.part5,
    question: 'Thank you for your ------ in the Foxdale Apartments community enhancement survey',
    answer: ['participant', 'participation', 'participate', 'participated'],
    correctAnswer: 2,
    explain: "Nothing at all",
    help: "Arimasen",
    difficultLevel: 3,
    comeWith: ['p5_002', 'p5_002', 'p5_003']
}, {
    id: 'p5_002',
    type: QuestionType.part5,
    question: 'Company officials must disclose their own ------ affairs.',
    answer: ['finance', 'financing', 'financial', 'financed'],
    correctAnswer: 3,
    explain: "Nothing at all",
    help: "Arimasen",
}, {
    id: 'p5_003',
    type: QuestionType.part5,
    question: 'Ms. Kim asks that the marketing team e-mail the final draft to ------ before 5 p.m.',
    answer: ['her', 'she', 'hers', 'herself'],
    correctAnswer: 0,
    explain: "Nothing at all",
    help: "Arimasen",
}]

export default QuestionDataPart5;

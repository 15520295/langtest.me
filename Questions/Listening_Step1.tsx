import IQuestion, {QuestionType} from "../entity/Question";

//TODO: Thêm hình Cho Part 1, Part 2, Part 4, Part 5

const QUESTION_PHASE: string = 'Listen and circle the correct answers.'
const QuestionDataPart1: IQuestion[] = [{
    id: 'step1_1_002',
    type: QuestionType.part2,
    question: QUESTION_PHASE,
    answer: ['A', 'B', 'C'],
    correctAnswer: 1,
    imageAsset: require('./../../assets/images/test1/p1_1_001.png'),
    audioAsset: require('C:\Users\huydd\Downloads\Documents\TOEFL PRIMARY-20190506T064336Z-001\TOEFL PRIMARY\Step 1\Toefl Primary Step 1 - Book1'),
    difficultLevel: 3
}, {
    id: 'step1_1_003',
    type: QuestionType.part2,
    question: QUESTION_PHASE,
    answer: ['A', 'B', 'C'],
    correctAnswer: 2,
    audioAsset: require('C:\Users\huydd\Downloads\Documents\TOEFL PRIMARY-20190506T064336Z-001\TOEFL PRIMARY\Step 1\Toefl Primary Step 1 - Book1'),
    difficultLevel: 3
}, {
    id: 'step1_1_004',
    type: QuestionType.part2,
    question: QUESTION_PHASE,
    answer: ['A', 'B', 'C'],
    correctAnswer: 0,
    audioAsset: require('C:\Users\huydd\Downloads\Documents\TOEFL PRIMARY-20190506T064336Z-001\TOEFL PRIMARY\Step 1\Toefl Primary Step 1 - Book1'),
    difficultLevel: 3
}];


const QuestionDataPart2: IQuestion[] = [{
    id: 'step1_1_005',
    type: QuestionType.part2,
    question: QUESTION_PHASE,
    answer: ['A', 'B', 'C'],
    correctAnswer: 1,
    audioAsset: require('C:\Users\huydd\Downloads\Documents\TOEFL PRIMARY-20190506T064336Z-001\TOEFL PRIMARY\Step 1\Toefl Primary Step 1 - Book1'),
    difficultLevel: 3
}, {
    id: 'step1_1_006',
    type: QuestionType.part2,
    question: QUESTION_PHASE,
    answer: ['A', 'B', 'C'],
    correctAnswer: 2,
    audioAsset: require('C:\Users\huydd\Downloads\Documents\TOEFL PRIMARY-20190506T064336Z-001\TOEFL PRIMARY\Step 1\Toefl Primary Step 1 - Book1'),
    difficultLevel: 3
}, {
    id: 'step1_1_007',
    type: QuestionType.part2,
    question: QUESTION_PHASE,
    answer: ['A', 'B', 'C'],
    correctAnswer: 0,
    audioAsset: require('C:\Users\huydd\Downloads\Documents\TOEFL PRIMARY-20190506T064336Z-001\TOEFL PRIMARY\Step 1\Toefl Primary Step 1 - Book1'),
    difficultLevel: 3
}];

const QuestionDataPart3: IQuestion[] = [{
    id: 'step1_1_008',
    type: QuestionType.part2,
    question: QUESTION_PHASE,
    answer: ['A', 'B', 'C'],
    correctAnswer: 1,
    audioAsset: require('C:\Users\huydd\Downloads\Documents\TOEFL PRIMARY-20190506T064336Z-001\TOEFL PRIMARY\Step 1\Toefl Primary Step 1 - Book1'),
    difficultLevel: 3
}, {
    id: 'step1_1_009',
    type: QuestionType.part2,
    question: QUESTION_PHASE,
    answer: ['A', 'B', 'C'],
    correctAnswer: 2,
    audioAsset: require('C:\Users\huydd\Downloads\Documents\TOEFL PRIMARY-20190506T064336Z-001\TOEFL PRIMARY\Step 1\Toefl Primary Step 1 - Book1'),
    difficultLevel: 3
}, {
    id: 'step1_1_0010',
    type: QuestionType.part2,
    question: QUESTION_PHASE,
    answer: ['A', 'B', 'C'],
    correctAnswer: 0,
    audioAsset: require('C:\Users\huydd\Downloads\Documents\TOEFL PRIMARY-20190506T064336Z-001\TOEFL PRIMARY\Step 1\Toefl Primary Step 1 - Book1'),
    difficultLevel: 3
}];

const QuestionDataPart4: IQuestion[] = [{
    id: 'step1_1_0011',
    type: QuestionType.part2,
    question: QUESTION_PHASE,
    answer: ['A', 'B', 'C'],
    correctAnswer: 1,
    audioAsset: require('C:\Users\huydd\Downloads\Documents\TOEFL PRIMARY-20190506T064336Z-001\TOEFL PRIMARY\Step 1\Toefl Primary Step 1 - Book1'),
    difficultLevel: 3
}, {
    id: 'step1_1_0012',
    type: QuestionType.part2,
    question: QUESTION_PHASE,
    answer: ['A', 'B', 'C'],
    correctAnswer: 2,
    audioAsset: require('C:\Users\huydd\Downloads\Documents\TOEFL PRIMARY-20190506T064336Z-001\TOEFL PRIMARY\Step 1\Toefl Primary Step 1 - Book1'),
    difficultLevel: 3
}];

const QuestionDataPart5: IQuestion[] = [{
    id: 'step1_1_0013',
    type: QuestionType.part2,
    question: QUESTION_PHASE,
    answer: ['A', 'B', 'C'],
    correctAnswer: 1,
    audioAsset: require('C:\Users\huydd\Downloads\Documents\TOEFL PRIMARY-20190506T064336Z-001\TOEFL PRIMARY\Step 1\Toefl Primary Step 1 - Book1'),
    difficultLevel: 3
}, {
    id: 'step1_1_0014',
    type: QuestionType.part2,
    question: QUESTION_PHASE,
    answer: ['A', 'B', 'C'],
    correctAnswer: 2,
    audioAsset: require('C:\Users\huydd\Downloads\Documents\TOEFL PRIMARY-20190506T064336Z-001\TOEFL PRIMARY\Step 1\Toefl Primary Step 1 - Book1'),
    difficultLevel: 3
}];
export default QuestionDataPart1;

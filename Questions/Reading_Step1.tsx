import IQuestion, {QuestionType} from "../entity/Question";

//TODO: Edit imageAsset for Part 1, Part 2
const QUESTION_PHASE_PART1_123: string = 'Choose the word that goes best with each picture'
const QUESTION_PHASE_PART1_456: string = 'What does the arrow show?'
const QUESTION_PHASE_PART1_789: string = 'Choose the sentence that goes best with each picture'

const QuestionDataPart1: IQuestion[] = [{
    id: 'p1_1_001',
    type: QuestionType.part4,
    question: QUESTION_PHASE_PART1_123,
    answer: [
        'Face',
        'Hand',
        'Feed'],
    correctAnswer: 0,
    imageAsset: require('./../../assets/images/test1/p1_1_001.png'),
    comeWith: ['p4_1_071', 'p4_1_072', 'p4_1_073'],
    difficultLevel: 3
}, {
    id: 'p1_1_002',
    type: QuestionType.part4,
    question: QUESTION_PHASE_PART1_123,
    answer: [
        'Glass',
        'Glasses',
        'Glassy'],
    correctAnswer: 0,
    imageAsset: require('./../../assets/images/test1/p1_1_001.png'),
    comeWith: ['p4_1_071', 'p4_1_072', 'p4_1_073'],
    difficultLevel: 3
}, {
    id: 'p1_1_003',
    type: QuestionType.part4,
    question: QUESTION_PHASE_PART1_123,
    answer: [
        'Bangs',
        'Pigtail',
        'Ponytail'],
    correctAnswer: 0,
    imageAsset: require('./../../assets/images/test1/p1_1_001.png'),
    comeWith: ['p4_1_071', 'p4_1_072', 'p4_1_073'],
    difficultLevel: 3
}, {
    id: 'p1_1_004',
    type: QuestionType.part4,
    question: QUESTION_PHASE_PART1_456,
    answer: [
        'Short',
        'Tall',
        'Small'],
    correctAnswer: 0,
    imageAsset: require('./../../assets/images/test1/p1_1_001.png'),
    comeWith: ['p4_1_071', 'p4_1_072', 'p4_1_073'],
    difficultLevel: 3
}, {
    id: 'p1_1_005',
    type: QuestionType.part4,
    question: QUESTION_PHASE_PART1_456,
    answer: [
        'Straight hair',
        'Mustache',
        'Curly hair'],
    correctAnswer: 0,
    imageAsset: require('./../../assets/images/test1/p1_1_001.png'),
    comeWith: ['p4_1_071', 'p4_1_072', 'p4_1_073'],
    difficultLevel: 3
}, {
    id: 'p1_1_006',
    type: QuestionType.part4,
    question: QUESTION_PHASE_PART1_456,
    answer: [
        'He has short hair',
        'She has long hair',
        'She has a ponytail'],
    correctAnswer: 0,
    imageAsset: require('./../../assets/images/test1/p1_1_001.png'),
    comeWith: ['p4_1_071', 'p4_1_072', 'p4_1_073'],
    difficultLevel: 3
}, {
    id: 'p1_1_007',
    type: QuestionType.part4,
    question: QUESTION_PHASE_PART1_789,
    answer: [
        'He has a scar on his face',
        'He has a beard',
        'He has a mustache'],
    correctAnswer: 0,
    imageAsset: require('./../../assets/images/test1/p1_1_001.png'),
    comeWith: ['p4_1_071', 'p4_1_072', 'p4_1_073'],
    difficultLevel: 3
}, {
    id: 'p1_1_008',
    type: QuestionType.part4,
    question: QUESTION_PHASE_PART1_789,
    answer: [
        'My grandfather has short blond hair.',
        'My grandmother has long blond hair.',
        'My grandfather has short white hair.'],
    correctAnswer: 0,
    imageAsset: require('./../../assets/images/test1/p1_1_001.png'),
    comeWith: ['p4_1_071', 'p4_1_072', 'p4_1_073'],
    difficultLevel: 3
}, {
    id: 'p1_1_009',
    type: QuestionType.part4,
    question: QUESTION_PHASE_PART1_789,
    answer: [
        'My sister wears a yellow hat.',
        'My sister wears glasses.',
        'My sister has a glass.'],
    correctAnswer: 0,
    imageAsset: require('./../../assets/images/test1/p1_1_001.png'),
    comeWith: ['p4_1_071', 'p4_1_072', 'p4_1_073'],
    difficultLevel: 3
}];

//
const QuestionDataPart2: IQuestion[] = [{
    id: 'p2_1_001',
    type: QuestionType.part4,
    question: 'Read the hint and choose the best answers',
    answer: [
        'A freckle',
        'Glasses',
        'A mustache'],
    correctAnswer: 0,
    imageAsset: require('./../../assets/images/test1/p1_1_001.png'),
    comeWith: ['p4_1_071', 'p4_1_072', 'p4_1_073'],
    difficultLevel: 3
}, {
    id: 'p2_1_002',
    type: QuestionType.part4,
    question: 'Read the hint and choose the best answers',
    answer: [
        'A scar',
        'A beard',
        'A wrinkle'],
    correctAnswer: 0,
    imageAsset: require('./../../assets/images/test1/p1_1_001.png'),
    comeWith: ['p4_1_071', 'p4_1_072', 'p4_1_073'],
    difficultLevel: 3
}, {
    id: 'p2_1_003',
    type: QuestionType.part4,
    question: 'Read the hint and choose the best answers',
    answer: [
        'Curly hair',
        'A dimple',
        'A ponytail'],
    correctAnswer: 0,
    imageAsset: require('./../../assets/images/test1/p1_1_001.png'),
    comeWith: ['p4_1_071', 'p4_1_072', 'p4_1_073'],
    difficultLevel: 3
}];

export default QuestionDataPart1;

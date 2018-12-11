import IQuestion, { QuestionType } from "../entity/Question";

export default interface IQuizService{
    getQuestion(): IQuestion[],
    reset(): void,
    initQuickTest(numberOfQuestion: number, difficultLevel: number): Promise<void>,
    initTest(type: QuestionType, numberOfQuestion: number, difficultLevel: number): Promise<void>
    initTestVocabulary(questions: IQuestion[]): Promise<void>
}
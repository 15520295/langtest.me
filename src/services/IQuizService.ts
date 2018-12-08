import IQuestion, { QuestionType } from "../entity/Question";

export default interface IQuizService{
    getQuestion(): IQuestion[],
    reset(): void,
    initQuickTest(numberOfQuestion: number, difficultLevel: number): void,
    initTest(type: QuestionType, numberOfQuestion: number, difficultLevel: number): void
}
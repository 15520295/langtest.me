
export default interface IQuestion {
    id: string,
    type: QuestionType, 
    question: string,
    answer: string[], 
    correctAnswer: number,
    explain?: string,
    help?: string,
    audioAsset?: number, // As the new format some audio question have i picture
    imageAsset?: number,
    comeWith?: string[] // There are some question that come together xD
    difficultLevel: number
}

export enum QuestionType{
    part1 = "Part 1",
    part2 = "Part 2",
    part3 = "Part 3",
    part4 = "Part 4",
    part5 = "Part 5",
    part6 = "Part 6",
    part7 = "Part 7",
    vocabulary = "Vocabulary"
}

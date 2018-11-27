import AssetFile from "./AssetFile";

export default interface Question {
    id: string,
    type: QuestionType, 
    question: string,
    answer?: string[], 
    correctAnswer: number,
    explain?: string,
    help?: string,
    assets?: AssetFile[], // As the new format some audio question have i picture
    comeWith? : string[] // There are some question that come together xD
}

export enum QuestionType{
    part1 = "Part 1",
    part2 = "Part 2",
    part3 = "Part 3",
    part4 = "part 4",
    part5 = "Part 5",
    part6 = "Part 6",
    part7 = "Part 7"
}
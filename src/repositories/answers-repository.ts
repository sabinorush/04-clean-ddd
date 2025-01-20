import { Answer } from "../domain/entities/answer";

export interface Answersrepository {
  create( answer: Answer): Promise<void>
}
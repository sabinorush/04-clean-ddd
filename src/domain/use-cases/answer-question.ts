import { UniqueEntityID } from "../../core/entities/unique-entity-id"
import { Answersrepository } from "../../repositories/answers-repository"
import { Answer } from "../entities/answer"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(
    private answersRepository: Answersrepository
  ) { }
  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId)
    })

    await this.answersRepository.create(answer)

    return answer
  }
}
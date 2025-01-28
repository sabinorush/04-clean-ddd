import { AnswersRepository } from '../repositories/answers-repository';

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

// eslint-disable-next-line
interface DeleteAnswerUseCaseResponse { }

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}
  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found.');
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not Allowed.');
    }

    await this.answerRepository.delete(answer);

    return {};
  }
}

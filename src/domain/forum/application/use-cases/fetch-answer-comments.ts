import { Either, right } from '@/core/either';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface FetchAnswercommentsUseCaseRequest {
  answerId: string;
  page: number;
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[];
  }
>;

export class FetchAnswercommentsUseCase {
  constructor(private answerCommentsRepositosy: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswercommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepositosy.findManyByAnswerId(answerId, {
        page,
      });

    return right({
      answerComments,
    });
  }
}

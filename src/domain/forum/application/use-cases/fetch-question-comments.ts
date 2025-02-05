import { Either, right } from '@/core/either';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface FetchQuestioncommentsUseCaseRequest {
  questionId: string;
  page: number;
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[];
  }
>;
export class FetchQuestioncommentsUseCase {
  constructor(private questionCommentsRepositosy: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestioncommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepositosy.findManyByQuestionId(questionId, {
        page,
      });

    return right({
      questionComments,
    });
  }
}

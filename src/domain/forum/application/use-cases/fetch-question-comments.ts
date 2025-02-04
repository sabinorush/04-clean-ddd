import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface FetchQuestioncommentsUseCaseRequest {
  questionId: string;
  page: number;
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[];
}

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

    return {
      questionComments,
    };
  }
}

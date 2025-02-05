import { Either, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/question-repository';

interface FetchRecentQuestionsBySlugUseCaseRequest {
  page: number;
}

type FetchRecentQuestionsBySlugUseCaseResponse = Either<
  null,
  {
    questions: Question[];
  }
>;

export class FetchRecentQuestionsBySlugUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsBySlugUseCaseRequest): Promise<FetchRecentQuestionsBySlugUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page });

    return right({
      questions,
    });
  }
}

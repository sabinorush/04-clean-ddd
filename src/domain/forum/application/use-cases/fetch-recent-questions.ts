import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/question-repository';

interface FetchRecentQuestionsBySlugUseCaseRequest {
  page: number;
}

interface FetchRecentQuestionsBySlugUseCaseResponse {
  questions: Question[];
}

export class FetchRecentQuestionsBySlugUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsBySlugUseCaseRequest): Promise<FetchRecentQuestionsBySlugUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page });

    return {
      questions,
    };
  }
}

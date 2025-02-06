import { QuestionAttachment } from '../../enterprise/question-attachment';

export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
}

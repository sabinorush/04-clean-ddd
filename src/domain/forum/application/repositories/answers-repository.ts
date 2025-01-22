import { Answer } from '@/domain/forum/enterprise/entities/answer'

export interface Answersrepository {
  create(answer: Answer): Promise<void>
}

import { AnswerQuestionUseCase } from './answer-question'
import { Answersrepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'

const fakeAnswersRepository: Answersrepository = {
  create: async (answer: Answer) => {},
}

it('should be able to create an answer', async () => {
  const AnswerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await AnswerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})

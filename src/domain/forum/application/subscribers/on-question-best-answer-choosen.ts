import { DomainEvents } from '@/core/events/domain-events';
import { EventHandler } from '@/core/events/event-handler';
import { AnswerCreatedEvent } from '../../enterprise/events/answer-created-event';
import { SendnotificationUseCase } from '@/domain/notification/application/use-cases/send-notification';
import { AnswersRepository } from '../repositories/answers-repository';
import { QuestionBestAnswerChoosenEvent } from '../../enterprise/events/question-best-answer-choosen-event';

export class OnQuestionBestionAnswerChoosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendnotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this), // Definindo a referencia para a classe OnAnswerCreated
      QuestionBestAnswerChoosenEvent.name
    );
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChoosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString()
    );
    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: 'Sua reposta foi escolhida',
        content: `A reposta que você enviou em "${question.title
          .substring(0, 20)
          .concat('...')}" foi escolhida pelo autor`,
      });
    }
  }
}

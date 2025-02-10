import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Either, right } from '@/core/either';
import { Notification } from '../../enterprise/entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface SendnotificationUseCaseRequest {
  recipientId: string;
  title: string;
  content: string;
}

type SendnotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification;
  }
>;

export class SendnotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}
  async execute({
    recipientId,
    title,
    content,
  }: SendnotificationUseCaseRequest): Promise<SendnotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    });

    await this.notificationRepository.create(notification);

    return right({
      notification,
    });
  }
}

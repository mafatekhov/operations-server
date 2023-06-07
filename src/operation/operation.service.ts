import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Operation } from 'src/entities/operation';
import { MessageGatewayService } from 'src/message-gateway/message-gateway.service';
import { CreateOperationDto } from 'src/models/operation.dto';
import { Status } from 'src/models/status';
import { Repository } from 'typeorm';

@Injectable()
export class OperationService {

    constructor(
        @InjectRepository(Operation)
        private operationRepository: Repository<Operation>,
        private messagesGateway: MessageGatewayService
    ) { }

    async addOperation({ name }: CreateOperationDto): Promise<Operation> {
        const operationEntity = new Operation()
        operationEntity.name = name
        operationEntity.status = Status.RUNNING
        await this.operationRepository.save(operationEntity)
        this.messagesGateway.jobWorking(operationEntity)
        return operationEntity
    }

    getOperations(): Promise<Operation[]> {
        return this.operationRepository.find()
    }

    removeOperation(id: number) {
        return this.operationRepository.delete(id)
    }
}

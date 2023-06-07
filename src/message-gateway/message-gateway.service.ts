import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
    WebSocketGateway
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Operation } from 'src/entities/operation';
import { Status } from 'src/models/status';
import { Repository } from 'typeorm';


@Injectable()
@WebSocketGateway({ cors: true })
export class MessageGatewayService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger(MessageGatewayService.name);

    @WebSocketServer() wss: Server;

    constructor(
        @InjectRepository(Operation)
        private operationRepository: Repository<Operation>
    ) { }

    afterInit(server: any) {
        this.logger.log('Initialized');
    }
    handleConnection(client: any, ...args: any[]) {
        this.logger.log(`Client Disconnected: ${client.id}`);
    }
    handleDisconnect(client: any) {
        this.logger.log(`Client Connected: ${client.id}`);
    }

    handleSendMessage(payload: Operation) {
        this.wss.emit('receiveMessage', payload);
    }

    jobWorking(operation: Operation) {
        const timer = setInterval(() => {
            this.handleSendMessage(operation);
        }, 1000);
        setTimeout(() => {
            clearInterval(timer)
            const tossedCoin = Math.round(Math.random())
            const newStatus = tossedCoin > 0.5 ? Status.READY : Status.FAILED
            operation.status = newStatus
            this.handleSendMessage(operation)
            this.operationRepository.save(operation)
        }, 5000)
    }
}


import { Module } from '@nestjs/common';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';
import { Operation } from 'src/entities/operation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageGatewayService } from 'src/message-gateway/message-gateway.service';

@Module({
  imports: [TypeOrmModule.forFeature([Operation])],
  controllers: [OperationController],
  providers: [OperationService, MessageGatewayService]
})
export class OperationModule { }

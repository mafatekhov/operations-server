import { Module } from '@nestjs/common';
import { MessageGatewayService } from './message-gateway.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from 'src/entities/operation';

@Module({
    imports: [TypeOrmModule.forFeature([Operation])],
    providers: [MessageGatewayService]
})
export class MessageGatewayModule { }

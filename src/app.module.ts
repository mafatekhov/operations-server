import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperationModule } from './operation/operation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageGatewayService } from './message-gateway/message-gateway.service';
import { MessageGatewayModule } from './message-gateway/message-gateway.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'sqljs',
        entities: [__dirname + '/entities/*{.ts,.js}'],
        synchronize: true,
      }
    ),
    OperationModule,
    MessageGatewayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

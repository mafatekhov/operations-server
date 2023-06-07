import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OperationService } from './operation.service';
import { Operation } from 'src/entities/operation';
import { CreateOperationDto } from 'src/models/operation.dto';

@Controller('operation')
export class OperationController {
    constructor(private operationService: OperationService) { }

    @Post()
    addOperation(@Body() operationDto: CreateOperationDto): Promise<Operation> {
        return this.operationService.addOperation(operationDto)
    }

    @Get()
    getAll(): Promise<Operation[]> {
        return this.operationService.getOperations();
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.operationService.removeOperation(id);
    }
}

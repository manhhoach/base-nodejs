import { Body, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BaseEntity } from 'typeorm';
import { BaseService } from './base.service';
import { customController } from '../custom-controller';

export abstract class BaseController<TEntity extends BaseEntity> {
  constructor(private readonly service: BaseService<TEntity>) {}

  @Get()
  getAll() {
    return customController(this.service.findAll(), HttpStatus.OK);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return customController(this.service.findById(id), HttpStatus.OK);
  }

  @Post()
  create(@Body() body) {
    return customController(this.service.create(body), HttpStatus.CREATED);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return customController(this.service.update(id, body), HttpStatus.OK);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return customController(this.service.delete(id), HttpStatus.OK);
  }
}

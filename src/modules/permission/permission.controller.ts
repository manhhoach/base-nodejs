import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { customController } from '../../common/custom-controller';
import { SkipAuth } from '../auth/skip.auth.decorator';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permissions')
@SkipAuth()
export class PermissionController{
  constructor(private permissionService: PermissionService) {
    
  }
  @Get()
  getAll() {
    return customController(this.permissionService.findAll(), HttpStatus.OK);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return customController(this.permissionService.findById(id), HttpStatus.OK);
  }

  @Post()
  create(@Body() body: CreatePermissionDto) {
    return customController(this.permissionService.create(body), HttpStatus.CREATED);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePermissionDto) {
    return customController(this.permissionService.update(id, body), HttpStatus.OK);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return customController(this.permissionService.delete(id), HttpStatus.OK);
  }
}

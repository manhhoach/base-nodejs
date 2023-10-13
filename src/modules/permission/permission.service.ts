import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { PermissionEntity } from './permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService extends BaseService<PermissionEntity>{
    constructor(@InjectRepository(PermissionEntity) private readonly permissionRepository: Repository<PermissionEntity>) {
        super(permissionRepository)
    }
}

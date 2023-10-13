import { Injectable } from '@nestjs/common';
import { RoleEntity } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService extends BaseService<RoleEntity>{
    constructor(@InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>) {
        super(roleRepository)
    }
}

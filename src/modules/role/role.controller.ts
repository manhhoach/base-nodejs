import { Controller, Post, UseGuards } from '@nestjs/common';
import { PermissionGuard } from '../auth/permission.guard';


@Controller('role')
export class RoleController {
    @UseGuards(PermissionGuard("ADD_PRODUCT"))
    @Post()
    create() {
        
    }
}

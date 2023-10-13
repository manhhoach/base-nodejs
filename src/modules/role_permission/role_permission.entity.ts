import { Entity, ManyToOne, PrimaryColumn, BaseEntity, JoinColumn } from "typeorm"
import { RoleEntity } from "./../role/role.entity"
import { PermissionEntity } from "./../permission/permission.entity"

@Entity({
    name: 'role_permissions',
})
export class RolePermissionEntity extends BaseEntity{

    @PrimaryColumn()
    role_id: number

    @PrimaryColumn()
    permission_id: number

    @ManyToOne(() => RoleEntity, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'role_id',
        referencedColumnName: 'id',
    })
    role: RoleEntity;

    @ManyToOne(() => PermissionEntity, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'permission_id',
        referencedColumnName: 'id',
    })
    permission: PermissionEntity;
}
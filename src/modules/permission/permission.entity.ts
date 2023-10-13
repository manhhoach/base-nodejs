import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolePermissionEntity } from '../role_permission/role_permission.entity';

@Entity({ name: 'permissions' })
export class PermissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_date: Date;

  @OneToMany(() => RolePermissionEntity, (role_permission)=> role_permission.permission)
  role_permissions: RolePermissionEntity[];
}

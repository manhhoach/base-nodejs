import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { RoleEntity } from '../role/role.entity';
import { RoleEnum } from '../role/role.enum';

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @CreateDateColumn()
  created_date: Date;

  @Column({ default: RoleEnum.USER })
  role_id: number;

  @ManyToOne(() => RoleEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({
    name: 'role_id',
    foreignKeyConstraintName: 'fk_user_role_id',
    referencedColumnName: 'id',
  })
  role: RoleEntity;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    if (this.password) {
      const salt = genSaltSync(10);
      this.password = hashSync(this.password, salt);
    }
  }

  comparePassword(password: string): boolean {
    return compareSync(password, this.password);
  }
}

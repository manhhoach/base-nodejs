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
import { Role } from '../role/role.entity';

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

  @Column({default: 1})
  role_id: number;

  @ManyToOne(() => Role, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({
    name: 'role_id',
    foreignKeyConstraintName: 'fk_user_role_id',
    referencedColumnName: 'id',
  })
  role: Role;

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

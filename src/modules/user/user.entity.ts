import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, BaseEntity } from 'typeorm';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

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

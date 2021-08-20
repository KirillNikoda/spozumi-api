import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'user' })
  role: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: null, nullable: true })
  salt: string;
}

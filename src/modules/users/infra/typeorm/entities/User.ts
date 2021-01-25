import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import Category from '@modules/categories/infra/typeorm/entities/Category';

@Entity('users')
export default class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string

  @OneToMany(() => Transaction, transaction => transaction.user)
  transaction: Transaction;

  @OneToMany(() => Category, category => category.user)
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}


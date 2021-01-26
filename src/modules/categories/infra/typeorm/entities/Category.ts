import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import Transaction from "@modules/transactions/infra/typeorm/entities/Transaction";
import User from "@modules/users/infra/typeorm/entities/User";


@Entity("categories")
class Category {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  icon: string;

  @Column()
  background_color_dark: string;

  @Column()
  background_color_light: string;

  @OneToMany(() => Transaction, transaction => transaction.category)
  transaction: Transaction;

  @ManyToOne(() => User, user => user.transaction, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Category;

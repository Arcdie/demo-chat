import {
  PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @Column('datetime')
  @UpdateDateColumn()
  @Index()
  updatedAt: Date;
}

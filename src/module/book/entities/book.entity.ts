import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  book_id: string;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column({ default: null })
  user_id: number;
}

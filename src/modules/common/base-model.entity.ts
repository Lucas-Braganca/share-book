import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}

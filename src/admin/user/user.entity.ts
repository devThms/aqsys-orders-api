import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

import { Status } from '../../common/status.enum';
import { Role } from '../role/role.entity';
import { Order } from '../../transactions/order/order.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_name', type: 'varchar', length: 25, nullable: false })
  userName: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  password: string;

  @Column({ name: 'device_token', type: 'varchar', length: 150, nullable: true })
  deviceToken: string;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @VersionColumn()
  version: number;

  @ManyToOne(
    type => Role,
    role => role.users,
    {
      nullable: false
    }
  )
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(
    type => Order,
    order => order.user
  )
  orders: Order[];

  
}

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne } from "typeorm";
import { Status } from '../../common/status.enum';

// Model-Relations
import { Customer } from '../customer/customer.entity';
import { Technical } from '../technical/technical.entity';

@Entity('bussiness_partners')
export class BussinessPartner extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'first_name', type: 'varchar', length: 150, nullable: false })
    firstName: string;

    @Column({ name: 'last_name', type: 'varchar', length: 150, nullable: false })
    lastName: string;

    @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
    nit: string;

    @Column({ type: 'varchar', length: 250, nullable: false })
    direction: string;

    @Column({ type: 'int', nullable: true })
    telephone: number;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    @OneToOne(
        type => Customer,
        customer => customer.bussinessPartner
    )
    customer: Customer;

    @OneToOne(
        type => Technical,
        technical => technical.bussinessPartner
    )
    technical: Technical;

}
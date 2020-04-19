import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Status } from '../../common/status.enum';

// Model-Relations
import { User } from '../../admin/user/user.entity';
import { Customer } from '../../catalogs/customer/customer.entity';
import { Technical } from '../../catalogs/technical/technical.entity';

@Entity('orders')
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'creation_date', type: 'date', nullable: false })
    creationDate: Date;

    @Column({ name: 'execution_date', type: 'date', nullable: false })
    executionDate: Date;

    @Column({ name: 'day_service', type: 'int', nullable: false })
    dayOfService: number;

    @Column({ name: 'theory_description', type: 'varchar', length: 250, nullable: false })
    theoryDescription: string;

    @Column({ name: 'real_description', type: 'varchar', length: 250, nullable: true })
    realDescription: string;

    @Column({ name: 'technical_observation', type: 'varchar', length: 250, nullable: true })
    technicalObservation: string;

    @Column({ name: 'customer_observation', type: 'varchar', length: 250, nullable: true })
    customerObservation: string;

    @Column({ type: 'decimal', nullable: true })
    ammount: number;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    @ManyToOne(
        type => User,
        user => user.orders,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(
        type => Customer,
        customer => customer.orders,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @ManyToOne(
        type => Technical,
        technical => technical.orders,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'technical_id' })
    technical: Technical;

    // TODO: Agregar la relacion con order-details
    // @OneToMany( type => orderDetails: OrderDetail[])


}
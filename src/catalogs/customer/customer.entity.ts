import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Status } from '../../common/status.enum';

// Model-Relations
import { BussinessPartner } from '../bussiness-partner/bussiness-partner.entity';
import { Order } from "../../transactions/order/order.entity";

@Entity('customers')
export class Customer extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'customer_id_company', type: 'varchar', length: 50, nullable: false })
    customerIdCompany: string;

    @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
    status: Status;
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    @OneToOne( 
        type => BussinessPartner, 
        bussinessPartner => bussinessPartner.customer,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'bussiness_partner_id' })
    bussinessPartner: BussinessPartner;

    @OneToMany(
        type => Order,
        order => order.customer
    )
    orders: Order[];

}
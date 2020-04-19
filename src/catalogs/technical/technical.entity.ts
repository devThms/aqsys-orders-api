import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { Status } from '../../common/status.enum';
import { BussinessPartner } from '../bussiness-partner/bussiness-partner.entity';
import { Order } from "../../transactions/order/order.entity";

@Entity('technicians')
export class Technical extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'technical_id_company', type: 'varchar', length: 50, nullable: false })
    technicalIdCompany: string;

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
        bussinessPartner => bussinessPartner.technical,
        {
            nullable: false
        }
    )
    @JoinColumn({ name: 'bussiness_partner_id' })
    bussinessPartner: BussinessPartner;

    @OneToMany(
        type => Order,
        order => order.technical
    )
    orders: Order[];

}
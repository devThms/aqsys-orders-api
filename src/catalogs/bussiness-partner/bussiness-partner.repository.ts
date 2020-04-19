import { Repository, EntityRepository } from "typeorm";
import { BussinessPartner } from './bussiness-partner.entity';

@EntityRepository(BussinessPartner)
export class BussinessPartnerRepository extends Repository<BussinessPartner> {

}
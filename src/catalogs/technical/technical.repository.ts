import { Repository, EntityRepository } from "typeorm";
import { Technical } from './technical.entity';

@EntityRepository(Technical)
export class TechnicalRepository extends Repository<Technical> {

}
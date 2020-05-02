import {MigrationInterface, QueryRunner} from "typeorm";

export class updateLengthPasswordToUserTable1588381367313 implements MigrationInterface {
    name = 'updateLengthPasswordToUserTable1588381367313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `orders` CHANGE `ammount` `ammount` decimal NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `password`", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `password` varchar(150) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `password`", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `password` varchar(25) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `orders` CHANGE `ammount` `ammount` decimal(10,0) NULL", undefined);
    }

}

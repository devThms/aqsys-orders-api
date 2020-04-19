import {MigrationInterface, QueryRunner} from "typeorm";

export class addEntityOrder1585873471333 implements MigrationInterface {
    name = 'addEntityOrder1585873471333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `orders` (`id` varchar(36) NOT NULL, `creation_date` date NOT NULL, `execution_date` date NOT NULL, `day_service` int NOT NULL, `theory_description` varchar(250) NOT NULL, `real_description` varchar(250) NULL, `technical_observation` varchar(250) NULL, `customer_observation` varchar(250) NULL, `ammount` decimal NULL, `status` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `user_id` varchar(36) NOT NULL, `customer_id` varchar(36) NOT NULL, `technical_id` varchar(36) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD `deleted_at` datetime(6) NULL", undefined);
        await queryRunner.query("ALTER TABLE `roles` ADD `deleted_at` datetime(6) NULL", undefined);
        await queryRunner.query("ALTER TABLE `technicians` DROP FOREIGN KEY `FK_f46f60dacacb259e9aac1ba2f2e`", undefined);
        await queryRunner.query("ALTER TABLE `technicians` CHANGE `bussiness_partner_id` `bussiness_partner_id` varchar(36) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `bussiness_partners` ADD UNIQUE INDEX `IDX_d3bfabfcba77693aa63a376d88` (`nit`)", undefined);
        await queryRunner.query("ALTER TABLE `customers` DROP FOREIGN KEY `FK_cc157cf3655b2ae9bcae9f511db`", undefined);
        await queryRunner.query("ALTER TABLE `customers` CHANGE `bussiness_partner_id` `bussiness_partner_id` varchar(36) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_a2cecd1a3531c0b041e29ba46e1`", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `role_id` `role_id` varchar(36) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `technicians` ADD CONSTRAINT `FK_f46f60dacacb259e9aac1ba2f2e` FOREIGN KEY (`bussiness_partner_id`) REFERENCES `bussiness_partners`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `customers` ADD CONSTRAINT `FK_cc157cf3655b2ae9bcae9f511db` FOREIGN KEY (`bussiness_partner_id`) REFERENCES `bussiness_partners`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_a922b820eeef29ac1c6800e826a` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_772d0ce0473ac2ccfa26060dbe9` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `orders` ADD CONSTRAINT `FK_7ed5e3a4a8e9553d7affe8f2683` FOREIGN KEY (`technical_id`) REFERENCES `technicians`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_a2cecd1a3531c0b041e29ba46e1` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_a2cecd1a3531c0b041e29ba46e1`", undefined);
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_7ed5e3a4a8e9553d7affe8f2683`", undefined);
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_772d0ce0473ac2ccfa26060dbe9`", undefined);
        await queryRunner.query("ALTER TABLE `orders` DROP FOREIGN KEY `FK_a922b820eeef29ac1c6800e826a`", undefined);
        await queryRunner.query("ALTER TABLE `customers` DROP FOREIGN KEY `FK_cc157cf3655b2ae9bcae9f511db`", undefined);
        await queryRunner.query("ALTER TABLE `technicians` DROP FOREIGN KEY `FK_f46f60dacacb259e9aac1ba2f2e`", undefined);
        await queryRunner.query("ALTER TABLE `users` CHANGE `role_id` `role_id` varchar(36) NULL", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_a2cecd1a3531c0b041e29ba46e1` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `customers` CHANGE `bussiness_partner_id` `bussiness_partner_id` varchar(36) NULL", undefined);
        await queryRunner.query("ALTER TABLE `customers` ADD CONSTRAINT `FK_cc157cf3655b2ae9bcae9f511db` FOREIGN KEY (`bussiness_partner_id`) REFERENCES `bussiness_partners`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `bussiness_partners` DROP INDEX `IDX_d3bfabfcba77693aa63a376d88`", undefined);
        await queryRunner.query("ALTER TABLE `technicians` CHANGE `bussiness_partner_id` `bussiness_partner_id` varchar(36) NULL", undefined);
        await queryRunner.query("ALTER TABLE `technicians` ADD CONSTRAINT `FK_f46f60dacacb259e9aac1ba2f2e` FOREIGN KEY (`bussiness_partner_id`) REFERENCES `bussiness_partners`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `roles` DROP COLUMN `deleted_at`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `deleted_at`", undefined);
        await queryRunner.query("DROP TABLE `orders`", undefined);
    }

}

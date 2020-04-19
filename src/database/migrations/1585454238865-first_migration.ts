import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1585454238865 implements MigrationInterface {
    name = 'firstMigration1585454238865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `first_name` varchar(150) NOT NULL, `last_name` varchar(150) NOT NULL, `user_name` varchar(25) NOT NULL, `password` varchar(25) NOT NULL, `status` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL, `role_id` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `roles` (`id` varchar(36) NOT NULL, `name` varchar(150) NOT NULL, `description` varchar(150) NOT NULL, `status` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `customers` (`id` varchar(36) NOT NULL, `customer_id_company` varchar(50) NOT NULL, `status` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `bussiness_partner_id` varchar(36) NOT NULL, UNIQUE INDEX `REL_cc157cf3655b2ae9bcae9f511d` (`bussiness_partner_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `technicians` (`id` varchar(36) NOT NULL, `technical_id_company` varchar(50) NOT NULL, `status` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `bussiness_partner_id` varchar(36) NOT NULL, UNIQUE INDEX `REL_f46f60dacacb259e9aac1ba2f2` (`bussiness_partner_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `bussiness_partners` (`id` varchar(36) NOT NULL, `first_name` varchar(150) NOT NULL, `last_name` varchar(150) NOT NULL, `nit` varchar(25) NOT NULL, `direction` varchar(250) NOT NULL, `telephone` int NULL, `status` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_a2cecd1a3531c0b041e29ba46e1` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `customers` ADD CONSTRAINT `FK_cc157cf3655b2ae9bcae9f511db` FOREIGN KEY (`bussiness_partner_id`) REFERENCES `bussiness_partners`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `technicians` ADD CONSTRAINT `FK_f46f60dacacb259e9aac1ba2f2e` FOREIGN KEY (`bussiness_partner_id`) REFERENCES `bussiness_partners`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `technicians` DROP FOREIGN KEY `FK_f46f60dacacb259e9aac1ba2f2e`", undefined);
        await queryRunner.query("ALTER TABLE `customers` DROP FOREIGN KEY `FK_cc157cf3655b2ae9bcae9f511db`", undefined);
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_a2cecd1a3531c0b041e29ba46e1`", undefined);
        await queryRunner.query("DROP TABLE `bussiness_partners`", undefined);
        await queryRunner.query("DROP INDEX `REL_f46f60dacacb259e9aac1ba2f2` ON `technicians`", undefined);
        await queryRunner.query("DROP TABLE `technicians`", undefined);
        await queryRunner.query("DROP INDEX `REL_cc157cf3655b2ae9bcae9f511d` ON `customers`", undefined);
        await queryRunner.query("DROP TABLE `customers`", undefined);
        await queryRunner.query("DROP TABLE `roles`", undefined);
        await queryRunner.query("DROP TABLE `users`", undefined);
    }

}

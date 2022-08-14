import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1660504702054 implements MigrationInterface {
    name = 'InitialMigration1660504702054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `transfer` (`id` varchar(255) NOT NULL, `blockNumber` int NOT NULL, `from` varchar(255) NOT NULL, `to` varchar(255) NOT NULL, `timestamp` timestamp NOT NULL, `tokenId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `trait` (`id` int NOT NULL AUTO_INCREMENT, `size` varchar(255) NULL, `top` tinyint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `token` (`id` int NOT NULL, `size` int NOT NULL DEFAULT '1', `balance` decimal(65,0) NOT NULL DEFAULT '0', `blockNumber` int NULL, `timestamp` timestamp NOT NULL, `traitId` int NULL, UNIQUE INDEX `REL_6212487f5bf91cfba6c69ae635` (`traitId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `transfer` ADD CONSTRAINT `FK_5f28b9dc449034d241ee12d64f8` FOREIGN KEY (`tokenId`) REFERENCES `token`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `token` ADD CONSTRAINT `FK_6212487f5bf91cfba6c69ae6359` FOREIGN KEY (`traitId`) REFERENCES `trait`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("CREATE TABLE `carbon`.`query-result-cache` (`id` int NOT NULL AUTO_INCREMENT, `identifier` varchar(255) NULL, `time` bigint NOT NULL, `duration` int NOT NULL, `query` text NOT NULL, `result` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `carbon`.`query-result-cache`");
        await queryRunner.query("ALTER TABLE `token` DROP FOREIGN KEY `FK_6212487f5bf91cfba6c69ae6359`");
        await queryRunner.query("ALTER TABLE `transfer` DROP FOREIGN KEY `FK_5f28b9dc449034d241ee12d64f8`");
        await queryRunner.query("DROP INDEX `REL_6212487f5bf91cfba6c69ae635` ON `token`");
        await queryRunner.query("DROP TABLE `token`");
        await queryRunner.query("DROP TABLE `trait`");
        await queryRunner.query("DROP TABLE `transfer`");
    }

}

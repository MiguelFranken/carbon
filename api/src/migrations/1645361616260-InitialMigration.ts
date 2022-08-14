import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1645361616260 implements MigrationInterface {
  name = 'InitialMigration1645361616260';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `transfer` (`id` varchar(255) NOT NULL, `blockNumber` int NOT NULL, `from` varchar(255) NOT NULL, `to` varchar(255) NOT NULL, `timestamp` timestamp NOT NULL, `tokenId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `trait` (`id` int NOT NULL AUTO_INCREMENT, `length` varchar(255) NULL, `background_color` varchar(255) NULL, `color` varchar(255) NULL, `vein` varchar(255) NULL, `pubic_hair` varchar(255) NULL, `condom` varchar(255) NULL, `condom_color` varchar(255) NULL, `glans_piercing` varchar(255) NULL, `glans_piercing_color` varchar(255) NULL, `silver_penis_ring` varchar(255) NULL, `golden_penis_ring` varchar(255) NULL, `mini_silver_penis_ring` varchar(255) NULL, `mini_golden_penis_ring` varchar(255) NULL, `ballsack_ring` varchar(255) NULL, `ballsack_sleeve` varchar(255) NULL, `glans_hat` varchar(255) NULL, `jizz` varchar(255) NULL, `aura` varchar(255) NULL, `laser_beam` varchar(255) NULL, `top` tinyint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      "CREATE TABLE `token` (`id` int NOT NULL, `length` int NOT NULL DEFAULT '1', `balance` decimal(65,0) NOT NULL DEFAULT '0', `blockNumber` int NULL, `timestamp` timestamp NOT NULL, `traitId` int NULL, UNIQUE INDEX `REL_6212487f5bf91cfba6c69ae635` (`traitId`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'ALTER TABLE `transfer` ADD CONSTRAINT `FK_5f28b9dc449034d241ee12d64f8` FOREIGN KEY (`tokenId`) REFERENCES `token`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `token` ADD CONSTRAINT `FK_6212487f5bf91cfba6c69ae6359` FOREIGN KEY (`traitId`) REFERENCES `trait`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `token` DROP FOREIGN KEY `FK_6212487f5bf91cfba6c69ae6359`',
    );
    await queryRunner.query(
      'ALTER TABLE `transfer` DROP FOREIGN KEY `FK_5f28b9dc449034d241ee12d64f8`',
    );
    await queryRunner.query(
      'DROP INDEX `REL_6212487f5bf91cfba6c69ae635` ON `token`',
    );
    await queryRunner.query('DROP TABLE `token`');
    await queryRunner.query('DROP TABLE `trait`');
    await queryRunner.query('DROP TABLE `transfer`');
  }
}

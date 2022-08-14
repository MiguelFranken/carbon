import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCache1645372754095 implements MigrationInterface {
  name = 'AddCache1645372754095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `transfer` CHANGE `timestamp` `timestamp` timestamp NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `token` CHANGE `timestamp` `timestamp` timestamp NOT NULL',
    );
    await queryRunner.query(
      'CREATE TABLE `carbon`.`query-result-cache` (`id` int NOT NULL AUTO_INCREMENT, `identifier` varchar(255) NULL, `time` bigint NOT NULL, `duration` int NOT NULL, `query` text NOT NULL, `result` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `carbon`.`query-result-cache`');
    await queryRunner.query(
      'ALTER TABLE `token` CHANGE `timestamp` `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()',
    );
    await queryRunner.query(
      'ALTER TABLE `transfer` CHANGE `timestamp` `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()',
    );
  }
}

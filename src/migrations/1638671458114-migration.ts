import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1638671458114 implements MigrationInterface {
    name = 'migration1638671458114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "state"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "city" character varying NOT NULL`);
    }

}

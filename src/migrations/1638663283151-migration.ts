import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1638663283151 implements MigrationInterface {
    name = 'migration1638663283151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."loans_request_status_enum" AS ENUM('Pendent', 'Rejected', 'Accepted')`);
        await queryRunner.query(`CREATE TYPE "public"."loans_status_enum" AS ENUM('Borrowed', 'Delivered', 'None')`);
        await queryRunner.query(`CREATE TABLE "loans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "owner_id" character varying NOT NULL, "borrowed_user_id" character varying NOT NULL, "request_status" "public"."loans_request_status_enum" NOT NULL DEFAULT 'Pendent', "status" "public"."loans_status_enum" NOT NULL DEFAULT 'None', "book_id" uuid, CONSTRAINT "PK_5c6942c1e13e4de135c5203ee61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "loans" ADD CONSTRAINT "FK_09b09d3d1b8e33c0f8dd4cafa48" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loans" DROP CONSTRAINT "FK_09b09d3d1b8e33c0f8dd4cafa48"`);
        await queryRunner.query(`DROP TABLE "loans"`);
        await queryRunner.query(`DROP TYPE "public"."loans_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."loans_request_status_enum"`);
    }

}

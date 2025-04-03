import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRole1743682190159 implements MigrationInterface {
    name = 'CreateRole1743682190159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "UQ_a6142dcc61f5f3fb2d6899fa264"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "roleName"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "role" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "role" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shift" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shift" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shift" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "shift" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "UQ_ae4578dcaed5adff96595e61660"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "roleName" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "UQ_a6142dcc61f5f3fb2d6899fa264" UNIQUE ("roleName")`);
    }

}

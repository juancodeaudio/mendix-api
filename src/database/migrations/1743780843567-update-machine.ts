import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMachine1743780843567 implements MigrationInterface {
    name = 'UpdateMachine1743780843567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "machine" DROP COLUMN "levelId"`);
        await queryRunner.query(`ALTER TABLE "machine" ADD "levelId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "machine" DROP COLUMN "levelId"`);
        await queryRunner.query(`ALTER TABLE "machine" ADD "levelId" character varying(100) NOT NULL`);
    }

}

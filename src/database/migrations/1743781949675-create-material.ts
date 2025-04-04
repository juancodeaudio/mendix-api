import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMaterial1743781949675 implements MigrationInterface {
    name = 'CreateMaterial1743781949675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "material" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "stock" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_f7e289dde0c4fdfba5bee2de40b" UNIQUE ("name"), CONSTRAINT "PK_0343d0d577f3effc2054cbaca7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "machine" DROP COLUMN "levelId"`);
        await queryRunner.query(`ALTER TABLE "machine" ADD "levelId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "machine" DROP COLUMN "levelId"`);
        await queryRunner.query(`ALTER TABLE "machine" ADD "levelId" character varying(100) NOT NULL`);
        await queryRunner.query(`DROP TABLE "material"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkorderStatus1743793706234 implements MigrationInterface {
    name = 'CreateWorkorderStatus1743793706234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "work_order_status" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_bbdd08939cc27c9802fff80990a" UNIQUE ("name"), CONSTRAINT "PK_2c04959b58a63909e7f9f90f743" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD "workOrderStatusId" integer`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD CONSTRAINT "FK_778a6a2b6d1aac94edc09997f92" FOREIGN KEY ("workOrderStatusId") REFERENCES "work_order_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order" DROP CONSTRAINT "FK_778a6a2b6d1aac94edc09997f92"`);
        await queryRunner.query(`ALTER TABLE "work_order" DROP COLUMN "workOrderStatusId"`);
        await queryRunner.query(`DROP TABLE "work_order_status"`);
    }

}

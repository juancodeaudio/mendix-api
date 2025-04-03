import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMachine1743709968730 implements MigrationInterface {
    name = 'UpdateMachine1743709968730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "machine" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "type" character varying(100) NOT NULL, "levelId" character varying(100) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "machineStatusId" integer, "locationId" integer, CONSTRAINT "PK_acc588900ffa841d96eb5fd566c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "machine" ADD CONSTRAINT "FK_871efee94198c0f065f151e813e" FOREIGN KEY ("machineStatusId") REFERENCES "machine_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "machine" ADD CONSTRAINT "FK_0da5d19e4662ae6674a45681109" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "machine" DROP CONSTRAINT "FK_0da5d19e4662ae6674a45681109"`);
        await queryRunner.query(`ALTER TABLE "machine" DROP CONSTRAINT "FK_871efee94198c0f065f151e813e"`);
        await queryRunner.query(`DROP TABLE "machine"`);
    }

}

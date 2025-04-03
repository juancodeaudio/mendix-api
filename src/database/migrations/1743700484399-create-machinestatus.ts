import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMachinestatus1743700484399 implements MigrationInterface {
    name = 'CreateMachinestatus1743700484399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "machine_status" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_ea390b0346b352e240520e1dfcc" UNIQUE ("name"), CONSTRAINT "PK_98f39e06afedd8a14cc5d2dbcde" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "machine_status"`);
    }

}

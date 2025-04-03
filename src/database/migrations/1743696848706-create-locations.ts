import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLocations1743696848706 implements MigrationInterface {
    name = 'CreateLocations1743696848706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, "parentLocation" character varying(100) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "location"`);
    }

}

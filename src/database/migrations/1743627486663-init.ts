import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1743627486663 implements MigrationInterface {
    name = 'Init1743627486663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(255) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shift" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, CONSTRAINT "PK_53071a6485a1e9dc75ec3db54b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "roleName" character varying(50) NOT NULL, CONSTRAINT "UQ_a6142dcc61f5f3fb2d6899fa264" UNIQUE ("roleName"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "shift"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

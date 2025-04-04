import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkorder1743791380472 implements MigrationInterface {
    name = 'CreateWorkorder1743791380472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "work_order" ("id" SERIAL NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_0730e63dd523d397530859cb6d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "work_order" ADD CONSTRAINT "FK_0967520a5843ce4e307fb1302ec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order" DROP CONSTRAINT "FK_0967520a5843ce4e307fb1302ec"`);
        await queryRunner.query(`DROP TABLE "work_order"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWorkorderHistory1744043535669 implements MigrationInterface {
    name = 'CreateWorkorderHistory1744043535669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "work_order_history" ("id" SERIAL NOT NULL, "event" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, "workOrderId" integer, CONSTRAINT "PK_73b0bfefcb47cc8ec4e1a4d0ee6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "work_order_history" ADD CONSTRAINT "FK_0b6da7b9bf44c16f1a4ad984e6c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_history" ADD CONSTRAINT "FK_1efa65daa5546da4ae9031a46b6" FOREIGN KEY ("workOrderId") REFERENCES "work_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order_history" DROP CONSTRAINT "FK_1efa65daa5546da4ae9031a46b6"`);
        await queryRunner.query(`ALTER TABLE "work_order_history" DROP CONSTRAINT "FK_0b6da7b9bf44c16f1a4ad984e6c"`);
        await queryRunner.query(`DROP TABLE "work_order_history"`);
    }

}

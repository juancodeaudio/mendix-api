import { MigrationInterface, QueryRunner } from "typeorm";

export class RelateWorkorderProduct1744040119952 implements MigrationInterface {
    name = 'RelateWorkorderProduct1744040119952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "work_order_product" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "workOrderId" integer, "productId" integer, CONSTRAINT "PK_9d1607839fe13ec80bddcd01567" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "work_order_product" ADD CONSTRAINT "FK_ba319761ed51b6ad1cb09e6934d" FOREIGN KEY ("workOrderId") REFERENCES "work_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_product" ADD CONSTRAINT "FK_4d65821264c8b760165c6a3d549" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order_product" DROP CONSTRAINT "FK_4d65821264c8b760165c6a3d549"`);
        await queryRunner.query(`ALTER TABLE "work_order_product" DROP CONSTRAINT "FK_ba319761ed51b6ad1cb09e6934d"`);
        await queryRunner.query(`DROP TABLE "work_order_product"`);
    }

}

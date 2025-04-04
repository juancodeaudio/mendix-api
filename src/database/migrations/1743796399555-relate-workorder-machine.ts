import { MigrationInterface, QueryRunner } from "typeorm";

export class RelateWorkorderMachine1743796399555 implements MigrationInterface {
    name = 'RelateWorkorderMachine1743796399555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "work_order_machines_machine" ("workOrderId" integer NOT NULL, "machineId" integer NOT NULL, CONSTRAINT "PK_3372e6f1121075d890008d7469c" PRIMARY KEY ("workOrderId", "machineId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_16c47bd6b625693f51a532b421" ON "work_order_machines_machine" ("workOrderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9bf8f31cc3d1bf463b1333aff1" ON "work_order_machines_machine" ("machineId") `);
        await queryRunner.query(`ALTER TABLE "work_order_machines_machine" ADD CONSTRAINT "FK_16c47bd6b625693f51a532b4219" FOREIGN KEY ("workOrderId") REFERENCES "work_order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "work_order_machines_machine" ADD CONSTRAINT "FK_9bf8f31cc3d1bf463b1333aff18" FOREIGN KEY ("machineId") REFERENCES "machine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_order_machines_machine" DROP CONSTRAINT "FK_9bf8f31cc3d1bf463b1333aff18"`);
        await queryRunner.query(`ALTER TABLE "work_order_machines_machine" DROP CONSTRAINT "FK_16c47bd6b625693f51a532b4219"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9bf8f31cc3d1bf463b1333aff1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_16c47bd6b625693f51a532b421"`);
        await queryRunner.query(`DROP TABLE "work_order_machines_machine"`);
    }

}

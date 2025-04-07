import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexes1744054085063 implements MigrationInterface {
    name = 'AddIndexes1744054085063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_user_email" ON "user" ("email") `);
        await queryRunner.query(`CREATE INDEX "idx_wo_history_work_order" ON "work_order_history" ("workOrderId") `);
        await queryRunner.query(`CREATE INDEX "idx_work_order_status" ON "work_order" ("workOrderStatusId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_work_order_status"`);
        await queryRunner.query(`DROP INDEX "public"."idx_wo_history_work_order"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_email"`);
    }

}

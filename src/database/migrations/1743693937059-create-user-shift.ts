import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserShift1743693937059 implements MigrationInterface {
    name = 'CreateUserShift1743693937059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "shiftId" integer`);
        await queryRunner.query(`ALTER TABLE "shift" ADD CONSTRAINT "UQ_d336a07a501e3a71abb7b695132" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_a54226f31d4d49cfdb6bced5d76" FOREIGN KEY ("shiftId") REFERENCES "shift"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_a54226f31d4d49cfdb6bced5d76"`);
        await queryRunner.query(`ALTER TABLE "shift" DROP CONSTRAINT "UQ_d336a07a501e3a71abb7b695132"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "shiftId"`);
    }

}

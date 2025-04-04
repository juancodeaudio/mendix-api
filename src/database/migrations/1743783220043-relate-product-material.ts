import { MigrationInterface, QueryRunner } from "typeorm";

export class RelateProductMaterial1743783220043 implements MigrationInterface {
    name = 'RelateProductMaterial1743783220043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_materials_material" ("productId" integer NOT NULL, "materialId" integer NOT NULL, CONSTRAINT "PK_917bf8c1dec8a86788b718a5039" PRIMARY KEY ("productId", "materialId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b880e7d98f8d76eda293ecafcd" ON "product_materials_material" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb060ce864867b3cb139d2b9be" ON "product_materials_material" ("materialId") `);
        await queryRunner.query(`ALTER TABLE "product_materials_material" ADD CONSTRAINT "FK_b880e7d98f8d76eda293ecafcd0" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_materials_material" ADD CONSTRAINT "FK_fb060ce864867b3cb139d2b9be9" FOREIGN KEY ("materialId") REFERENCES "material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_materials_material" DROP CONSTRAINT "FK_fb060ce864867b3cb139d2b9be9"`);
        await queryRunner.query(`ALTER TABLE "product_materials_material" DROP CONSTRAINT "FK_b880e7d98f8d76eda293ecafcd0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb060ce864867b3cb139d2b9be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b880e7d98f8d76eda293ecafcd"`);
        await queryRunner.query(`DROP TABLE "product_materials_material"`);
    }

}

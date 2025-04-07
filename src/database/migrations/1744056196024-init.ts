import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744056196024 implements MigrationInterface {
    name = 'Init1744056196024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shifts" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_3ef662f98036997809da8338d31" UNIQUE ("name"), CONSTRAINT "PK_84d692e367e4d6cdf045828768c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "role_id" integer, "shift_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_user_email" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "work_order_statuses" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_42c24a0b519a0eed80b79afc2fc" UNIQUE ("name"), CONSTRAINT "PK_bc559cac881df290b25d81deabf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locations" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, "parent_location" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "machine_statuses" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_a020e3f2c81e07ec3a8e0c2120d" UNIQUE ("name"), CONSTRAINT "PK_8804ce832b8358c1a8dcdeec63f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "machines" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "type" character varying(100) NOT NULL, "level_id" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "machine_status_id" integer, "location_id" integer, CONSTRAINT "PK_7b0817c674bb984650c5274e713" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "materials" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "stock" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_9b614bb357c5d8741a1a381385c" UNIQUE ("name"), CONSTRAINT "PK_2fd1a93ecb222a28bef28663fa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "code" character varying(50) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_order_products" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "work_order_id" integer, "product_id" integer, CONSTRAINT "PK_89075b7f8f93bfa97b84dbdf085" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_order_history" ("id" SERIAL NOT NULL, "event" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, "work_order_id" integer, CONSTRAINT "PK_73b0bfefcb47cc8ec4e1a4d0ee6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_wo_history_work_order" ON "work_order_history" ("work_order_id") `);
        await queryRunner.query(`CREATE TABLE "work_orders" ("id" SERIAL NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, "work_order_status_id" integer, CONSTRAINT "PK_29f6c1884082ee6f535aed93660" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_work_order_status" ON "work_orders" ("work_order_status_id") `);
        await queryRunner.query(`CREATE TABLE "products_materials" ("product_id" integer NOT NULL, "material_id" integer NOT NULL, CONSTRAINT "PK_897cadef4567d834a20b57352b6" PRIMARY KEY ("product_id", "material_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3517c47d2013c93e018433a165" ON "products_materials" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7fc9ba41acf9162fd598dff8d0" ON "products_materials" ("material_id") `);
        await queryRunner.query(`CREATE TABLE "work_orders_machines" ("work_order_id" integer NOT NULL, "machine_id" integer NOT NULL, CONSTRAINT "PK_ebdc772a05865a481735e211606" PRIMARY KEY ("work_order_id", "machine_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_30fb963496690a020207e9be53" ON "work_orders_machines" ("work_order_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f9198e8549e971f1f1ef90aeda" ON "work_orders_machines" ("machine_id") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_586a7696616297adaf104f78b21" FOREIGN KEY ("shift_id") REFERENCES "shifts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "machines" ADD CONSTRAINT "FK_63a1d30c65ab9ece95365f6cfa0" FOREIGN KEY ("machine_status_id") REFERENCES "machine_statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "machines" ADD CONSTRAINT "FK_7e163532e5a524fcd85693c699b" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_products" ADD CONSTRAINT "FK_c93814d8d3e28d021744b0fcc1b" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_products" ADD CONSTRAINT "FK_315b00714102f3cd2b2ff1244f8" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_history" ADD CONSTRAINT "FK_be56d97bdd167e9e3b62f25ae2b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_order_history" ADD CONSTRAINT "FK_b5a5eb6b71390a57c8594996583" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_orders" ADD CONSTRAINT "FK_c3013397350780ff9a3ba587f91" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_orders" ADD CONSTRAINT "FK_3c63a285201aff783ce3020e1d3" FOREIGN KEY ("work_order_status_id") REFERENCES "work_order_statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_materials" ADD CONSTRAINT "FK_3517c47d2013c93e018433a165e" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_materials" ADD CONSTRAINT "FK_7fc9ba41acf9162fd598dff8d0c" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_orders_machines" ADD CONSTRAINT "FK_30fb963496690a020207e9be533" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "work_orders_machines" ADD CONSTRAINT "FK_f9198e8549e971f1f1ef90aedac" FOREIGN KEY ("machine_id") REFERENCES "machines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_orders_machines" DROP CONSTRAINT "FK_f9198e8549e971f1f1ef90aedac"`);
        await queryRunner.query(`ALTER TABLE "work_orders_machines" DROP CONSTRAINT "FK_30fb963496690a020207e9be533"`);
        await queryRunner.query(`ALTER TABLE "products_materials" DROP CONSTRAINT "FK_7fc9ba41acf9162fd598dff8d0c"`);
        await queryRunner.query(`ALTER TABLE "products_materials" DROP CONSTRAINT "FK_3517c47d2013c93e018433a165e"`);
        await queryRunner.query(`ALTER TABLE "work_orders" DROP CONSTRAINT "FK_3c63a285201aff783ce3020e1d3"`);
        await queryRunner.query(`ALTER TABLE "work_orders" DROP CONSTRAINT "FK_c3013397350780ff9a3ba587f91"`);
        await queryRunner.query(`ALTER TABLE "work_order_history" DROP CONSTRAINT "FK_b5a5eb6b71390a57c8594996583"`);
        await queryRunner.query(`ALTER TABLE "work_order_history" DROP CONSTRAINT "FK_be56d97bdd167e9e3b62f25ae2b"`);
        await queryRunner.query(`ALTER TABLE "work_order_products" DROP CONSTRAINT "FK_315b00714102f3cd2b2ff1244f8"`);
        await queryRunner.query(`ALTER TABLE "work_order_products" DROP CONSTRAINT "FK_c93814d8d3e28d021744b0fcc1b"`);
        await queryRunner.query(`ALTER TABLE "machines" DROP CONSTRAINT "FK_7e163532e5a524fcd85693c699b"`);
        await queryRunner.query(`ALTER TABLE "machines" DROP CONSTRAINT "FK_63a1d30c65ab9ece95365f6cfa0"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_586a7696616297adaf104f78b21"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f9198e8549e971f1f1ef90aeda"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_30fb963496690a020207e9be53"`);
        await queryRunner.query(`DROP TABLE "work_orders_machines"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7fc9ba41acf9162fd598dff8d0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3517c47d2013c93e018433a165"`);
        await queryRunner.query(`DROP TABLE "products_materials"`);
        await queryRunner.query(`DROP INDEX "public"."idx_work_order_status"`);
        await queryRunner.query(`DROP TABLE "work_orders"`);
        await queryRunner.query(`DROP INDEX "public"."idx_wo_history_work_order"`);
        await queryRunner.query(`DROP TABLE "work_order_history"`);
        await queryRunner.query(`DROP TABLE "work_order_products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "materials"`);
        await queryRunner.query(`DROP TABLE "machines"`);
        await queryRunner.query(`DROP TABLE "machine_statuses"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TABLE "work_order_statuses"`);
        await queryRunner.query(`DROP INDEX "public"."idx_user_email"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "shifts"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}

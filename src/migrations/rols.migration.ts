import { MigrationInterface, QueryRunner } from "typeorm";

export class RolsMigration implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "rols" ( 
            "id" uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
            "name" varchar(50) UNIQUE NOT NULL,
            "description" text NULL,
            "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "rols`);
    }
}
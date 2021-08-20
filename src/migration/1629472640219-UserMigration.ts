import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1629472640219 implements MigrationInterface {
    name = 'UserMigration1629472640219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "salt" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "role" SET DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "salt"`);
    }

}

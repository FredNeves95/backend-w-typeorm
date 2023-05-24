import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1684968034817 implements MigrationInterface {
    name = 'Default1684968034817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" ADD "videos" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "videos"`);
    }

}

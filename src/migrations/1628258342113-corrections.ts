import {MigrationInterface, QueryRunner} from "typeorm";

export class corrections1628258342113 implements MigrationInterface {
    name = 'corrections1628258342113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professors" DROP CONSTRAINT "FK_67c73829cf515013583dcb0ce9e"`);
        await queryRunner.query(`ALTER TABLE "professors" ALTER COLUMN "disciplineId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_a59dc4db9bd3d8407148a9b214b"`);
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_3557744b71edc782e1882c84776"`);
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_aa8e7030d86946652556e32072b"`);
        await queryRunner.query(`ALTER TABLE "tests" ALTER COLUMN "categoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tests" ALTER COLUMN "professorId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tests" ALTER COLUMN "disciplineId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "professors" ADD CONSTRAINT "FK_67c73829cf515013583dcb0ce9e" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_a59dc4db9bd3d8407148a9b214b" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_3557744b71edc782e1882c84776" FOREIGN KEY ("professorId") REFERENCES "professors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_aa8e7030d86946652556e32072b" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_aa8e7030d86946652556e32072b"`);
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_3557744b71edc782e1882c84776"`);
        await queryRunner.query(`ALTER TABLE "tests" DROP CONSTRAINT "FK_a59dc4db9bd3d8407148a9b214b"`);
        await queryRunner.query(`ALTER TABLE "professors" DROP CONSTRAINT "FK_67c73829cf515013583dcb0ce9e"`);
        await queryRunner.query(`ALTER TABLE "tests" ALTER COLUMN "disciplineId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tests" ALTER COLUMN "professorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tests" ALTER COLUMN "categoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_aa8e7030d86946652556e32072b" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_3557744b71edc782e1882c84776" FOREIGN KEY ("professorId") REFERENCES "professors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tests" ADD CONSTRAINT "FK_a59dc4db9bd3d8407148a9b214b" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professors" ALTER COLUMN "disciplineId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "professors" ADD CONSTRAINT "FK_67c73829cf515013583dcb0ce9e" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

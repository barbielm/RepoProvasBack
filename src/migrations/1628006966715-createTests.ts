import {MigrationInterface, QueryRunner} from "typeorm";

export class createTests1628006966715 implements MigrationInterface {
    name = 'createTests1628006966715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "disciplines" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9b25ea6da0741577a73c9e90aad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "professors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "disciplineId" integer, CONSTRAINT "PK_6b249c6363a154820c909c45e27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tests" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "pdf" character varying NOT NULL, "categoryId" integer, "professorId" integer, "disciplineId" integer, CONSTRAINT "PK_4301ca51edf839623386860aed2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "tests"`);
        await queryRunner.query(`DROP TABLE "professors"`);
        await queryRunner.query(`DROP TABLE "disciplines"`);
    }

}

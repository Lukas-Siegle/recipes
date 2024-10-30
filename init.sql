-- Adminer 4.8.1 PostgreSQL 17.0 (Debian 17.0-1.pgdg120+1) dump

DROP TABLE IF EXISTS "recipes";
DROP SEQUENCE IF EXISTS recipes_id_seq;
CREATE SEQUENCE recipes_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."recipes" (
    "id" integer DEFAULT nextval('recipes_id_seq') NOT NULL,
    "name" character varying(50) NOT NULL,
    "description" character varying(255),
    "ingredients" text[] NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "image" character(255),
    "tags" text[] NOT NULL,
    "instructions" text[] NOT NULL,
    "carbohydrates" smallint,
    "fats" smallint,
    "proteins" smallint,
    "calories" smallint,
    "estimate" smallint,
    "portions" smallint,
    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


-- 2024-10-30 08:55:10.427069+00
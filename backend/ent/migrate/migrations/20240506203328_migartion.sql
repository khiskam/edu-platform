-- +goose Up
-- create "categories" table
CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT (uuid_generate_v4()), "name" character varying NOT NULL, PRIMARY KEY ("id"));
-- create index "categories_name_key" to table: "categories"
CREATE UNIQUE INDEX "categories_name_key" ON "categories" ("name");
-- create "lessons" table
CREATE TABLE "lessons" ("id" uuid NOT NULL DEFAULT (uuid_generate_v4()), "title" character varying NOT NULL, "description" character varying NOT NULL, "layout" character varying NOT NULL, "category_id" uuid NULL, PRIMARY KEY ("id"), CONSTRAINT "lessons_categories_lessons" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE CASCADE);
-- create "users" table
CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT (uuid_generate_v4()), "role" character varying NOT NULL DEFAULT 'user', "uid" character varying(128) NOT NULL, PRIMARY KEY ("id"));
-- create index "users_uid_key" to table: "users"
CREATE UNIQUE INDEX "users_uid_key" ON "users" ("uid");
-- create "completed_lessons" table
CREATE TABLE "completed_lessons" ("id" uuid NOT NULL DEFAULT (uuid_generate_v4()), "lesson_id" uuid NULL, "user_id" uuid NULL, PRIMARY KEY ("id"), CONSTRAINT "completed_lessons_lessons_completed_lessons" FOREIGN KEY ("lesson_id") REFERENCES "lessons" ("id") ON DELETE CASCADE, CONSTRAINT "completed_lessons_users_completed_lessons" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE);
-- create index "completedlesson_user_id_lesson_id" to table: "completed_lessons"
CREATE UNIQUE INDEX "completedlesson_user_id_lesson_id" ON "completed_lessons" ("user_id", "lesson_id");
-- create "tasks" table
CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT (uuid_generate_v4()), "title" character varying NOT NULL, "description" character varying NOT NULL, "layout" character varying NOT NULL, "answer" character varying NOT NULL, "category_id" uuid NULL, PRIMARY KEY ("id"), CONSTRAINT "tasks_categories_tasks" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE CASCADE);
-- create "completed_tasks" table
CREATE TABLE "completed_tasks" ("id" uuid NOT NULL DEFAULT (uuid_generate_v4()), "answer" character varying NOT NULL, "is_completed" boolean NOT NULL, "task_id" uuid NULL, "user_id" uuid NULL, PRIMARY KEY ("id"), CONSTRAINT "completed_tasks_tasks_completed_tasks" FOREIGN KEY ("task_id") REFERENCES "tasks" ("id") ON DELETE CASCADE, CONSTRAINT "completed_tasks_users_completed_tasks" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE);
-- create "lesson_uploaded_files" table
CREATE TABLE "lesson_uploaded_files" ("id" uuid NOT NULL DEFAULT (uuid_generate_v4()), "file_name" character varying NOT NULL, "content_type" character varying NOT NULL, "size" bigint NOT NULL, "lesson_id" uuid NULL, PRIMARY KEY ("id"), CONSTRAINT "lesson_uploaded_files_lessons_uploaded_files" FOREIGN KEY ("lesson_id") REFERENCES "lessons" ("id") ON DELETE CASCADE);
-- create "task_uploaded_files" table
CREATE TABLE "task_uploaded_files" ("id" uuid NOT NULL DEFAULT (uuid_generate_v4()), "file_name" character varying NOT NULL, "content_type" character varying NOT NULL, "size" bigint NOT NULL, "task_id" uuid NULL, PRIMARY KEY ("id"), CONSTRAINT "task_uploaded_files_tasks_uploaded_files" FOREIGN KEY ("task_id") REFERENCES "tasks" ("id") ON DELETE CASCADE);

-- +goose Down
-- reverse: create "task_uploaded_files" table
DROP TABLE "task_uploaded_files";
-- reverse: create "lesson_uploaded_files" table
DROP TABLE "lesson_uploaded_files";
-- reverse: create "completed_tasks" table
DROP TABLE "completed_tasks";
-- reverse: create "tasks" table
DROP TABLE "tasks";
-- reverse: create index "completedlesson_user_id_lesson_id" to table: "completed_lessons"
DROP INDEX "completedlesson_user_id_lesson_id";
-- reverse: create "completed_lessons" table
DROP TABLE "completed_lessons";
-- reverse: create index "users_uid_key" to table: "users"
DROP INDEX "users_uid_key";
-- reverse: create "users" table
DROP TABLE "users";
-- reverse: create "lessons" table
DROP TABLE "lessons";
-- reverse: create index "categories_name_key" to table: "categories"
DROP INDEX "categories_name_key";
-- reverse: create "categories" table
DROP TABLE "categories";

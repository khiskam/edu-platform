//go:build ignore

package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/khiskam/edu-platform/backend/ent/migrate"

	"ariga.io/atlas/sql/sqltool"
	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql/schema"
	"github.com/ilyakaznacheev/cleanenv"
	_ "github.com/lib/pq"
)

const MigrationsDir = "ent/migrate/migrations"

type DBConfig struct {
	User     string `env:"DB_USER" env-required:"true"`
	Password string `env:"DB_PASSWORD" env-required:"true"`
	Host     string `env:"DB_HOST" env-required:"true"`
	Port     string `env:"DB_PORT" env-required:"true"`
	Name     string `env:"DB_DATABASE" env-required:"true"`
}

func main() {
	config := DBConfig{}
	err := cleanenv.ReadConfig(".env", &config)

	if err != nil {
		log.Fatalf("failed to load environment variables: %v", err)
	}

	if _, err := os.Stat(MigrationsDir); os.IsNotExist(err) {
		if err := os.Mkdir(MigrationsDir, os.ModePerm); err != nil {
			log.Fatalf("failed to create migrations directory: %v", err)
		}
	}

	ctx := context.Background()
	dir, err := sqltool.NewGooseDir(MigrationsDir)

	if err != nil {
		log.Fatalf("failed creating atlas migration directory: %v", err)
	}
	opts := []schema.MigrateOption{
		schema.WithDir(dir),
		schema.WithMigrationMode(schema.ModeInspect),
		schema.WithDialect(dialect.Postgres),
		schema.WithDropColumn(true),
		schema.WithDropIndex(true),
	}

	if len(os.Args) != 2 {
		log.Fatalln("migration name is required. Use: 'go run -mod=mod ent/migrate/main.go <name>'")
	}

	dsn := fmt.Sprintf(
		"postgres://%v:%v@%v:%v/%v?sslmode=disable",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_DATABASE"),
	)

	log.Println(dsn)

	err = migrate.NamedDiff(ctx, dsn, os.Args[1], opts...)
	if err != nil {
		log.Fatalf("failed generating migration file: %v", err)
	}
}

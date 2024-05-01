include $(PWD)/.env
export

ENT_DIR := ent
MIGRATION_DIR := $(ENT_DIR)/migrate/migrations
DB_CONNECTION := postgres
DB_DSN := "user=$(DB_USER) password=$(DB_PASSWORD) host=$(DB_HOST) port=$(DB_PORT) dbname=$(DB_DATABASE) sslmode=$(SSLMODE)"

dev:
	@air

clean:
	@rm -rf tmp

ent-clean:
	@bash clean.sh

model-create:
	@go run -mod=mod entgo.io/ent/cmd/ent new $(names)

schema-generate:
	@go run -mod=mod entgo.io/ent/cmd/ent generate --feature sql/versioned-migration ./ent/schema

schema-compare:
	@go run -mod=mod ent/migrate/main.go "$(name)"

migrate-up:
	@cd $(MIGRATION_DIR) && \
	goose $(DB_CONNECTION) $(DB_DSN) up

migrate-down:
	@cd $(MIGRATION_DIR) && \
	goose $(DB_CONNECTION) $(DB_DSN) down

docker-up:
	@docker compose up

docker-down:
	@docker compose down
package main

import (
	"context"

	"github.com/khiskam/edu-platform/backend/internal/app"
	"github.com/khiskam/edu-platform/backend/internal/config/database"
	"github.com/khiskam/edu-platform/backend/internal/config/env"
	"github.com/khiskam/edu-platform/backend/internal/config/firebase"
	"github.com/khiskam/edu-platform/backend/internal/config/log"

	"go.uber.org/zap"
)

func main() {
	ctx := context.Background()

	cnf := env.Must(env.NewConfig())
	logger := zap.Must(log.NewLogger(cnf.Server.Env))
	fb := firebase.Must(firebase.NewConfig(ctx))
	conn := database.Must(database.Connect(&cnf.DB))

	defer conn.Close()
	defer logger.Sync()

	server := app.NewServer(cnf.Server, conn.Client, fb.Auth, logger)

	err := server.Run(cnf.Server.Host, cnf.Server.Port)
	if err != nil {
		logger.Fatal("server error", zap.Error(err))
	}
}

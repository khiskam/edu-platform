package log

import (
	"errors"
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func NewLogger(env string) (*zap.Logger, error) {
	var config zap.Config

	switch env {
	case "dev":
		config = zap.NewDevelopmentConfig()
	case "prod":
		config = zap.NewProductionConfig()
	default:
		return nil, errors.New("")
	}

	config.OutputPaths = []string{os.Stderr.Name(), ".log"}
	config.EncoderConfig.EncodeCaller = zapcore.FullCallerEncoder

	return config.Build()
}

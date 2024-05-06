package middleware

import (
	"github.com/gofiber/fiber/v2"
	"go.uber.org/zap"
)

func Logger(logger *zap.Logger) fiber.Handler {

	return func(c *fiber.Ctx) error {
		err := c.Next()

		logger.Info("request info",
			zap.Dict("request",
				zap.String("path", c.Path()),
				zap.String("query params", c.Request().URI().QueryArgs().String()),
				zap.String("method", c.Method()),
			),
			zap.Dict("response",
				zap.Int("status code", c.Response().StatusCode()),
			),
		)

		return err
	}
}

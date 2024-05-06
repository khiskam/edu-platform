package middleware

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/adaptor"
	"github.com/gookit/validate"
	"go.uber.org/zap"
)

type Rules func(v *validate.Validation)

func Validate(logger *zap.Logger, rules Rules) fiber.Handler {
	return func(c *fiber.Ctx) error {
		req, err := adaptor.ConvertRequest(c, false)
		if err != nil {
			logger.Info("convert request", zap.Error(err))
			c.SendStatus(fiber.StatusInternalServerError)
		}

		data, err := validate.FromRequest(req)
		if err != nil {
			logger.Info("validate request", zap.Error(err))
			c.SendStatus(fiber.StatusBadRequest)
		}

		v := data.Create()
		rules(v)

		if v.Validate() {
			return c.Next()
		}

		errorsMap := make(map[string]string, len(v.Errors))
		for k, v := range v.Errors {
			errorsMap[k] = v.One()
		}

		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errors": errorsMap,
		})
	}
}

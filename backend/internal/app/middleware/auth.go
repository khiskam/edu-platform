package middleware

import (
	"errors"
	"log"
	"strings"

	"firebase.google.com/go/v4/auth"
	"github.com/gofiber/fiber/v2"
	"github.com/khiskam/edu-platform/backend/ent"
	"github.com/khiskam/edu-platform/backend/internal/model"
	ur "github.com/khiskam/edu-platform/backend/internal/repository/user"
	"github.com/khiskam/edu-platform/backend/internal/service"
	us "github.com/khiskam/edu-platform/backend/internal/service/user"
	"go.uber.org/zap"
)

func CheckAuthHeader(auth *auth.Client, logger *zap.Logger) fiber.Handler {
	return func(c *fiber.Ctx) error {
		authHeader := c.Get("Authorization")
		authToken := strings.Replace(authHeader, "Bearer ", "", 1)

		token, err := auth.VerifyIDToken(c.Context(), authToken)
		if err != nil {
			logger.Info(err.Error())
			return c.SendStatus(fiber.StatusUnauthorized)
		}

		log.Println(token.UID)

		c.Locals("uid", token.UID)
		return c.Next()
	}
}

func CheckUserExist(client *ent.Client, logger *zap.Logger) fiber.Handler {
	userRepository := ur.NewUserRepository(client)
	userService := us.NewService(userRepository, logger)

	return func(c *fiber.Ctx) error {
		UID := c.Locals("uid").(string)

		user, err := userService.GetUserByUID(c.Context(), UID)

		if errors.Is(err, service.ErrUserNotFound) {
			return c.Status(fiber.StatusBadRequest).
				JSON(fiber.Map{"error": model.Errors["userNotExist"]})
		}

		if err != nil {
			return c.SendStatus(fiber.StatusUnauthorized)
		}

		c.Locals("role", user.Role)
		return c.Next()
	}
}

func IsAdmin(logger *zap.Logger) fiber.Handler {
	return func(c *fiber.Ctx) error {
		role := c.Locals("role").(string)

		if role != "admin" {
			logger.Info("forbidden role", zap.String("role", role))
			return c.SendStatus(fiber.StatusForbidden)
		}

		return c.Next()
	}
}

package handler

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func HealthCheck(c *fiber.Ctx) error {
	message := fmt.Sprintf("server started on: %v", c.BaseURL())

	return c.Status(fiber.StatusOK).SendString(message)
}

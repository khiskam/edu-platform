package user

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/khiskam/edu-platform/backend/internal/model"
	"github.com/khiskam/edu-platform/backend/internal/service"
)

type Handler struct {
	service service.User
	router  fiber.Router
}

func NewHandler(app fiber.Router, service service.User) *Handler {
	router := app.Group("/users")

	return &Handler{
		service: service,
		router:  router,
	}
}

type UserResponse struct {
	User *model.User `json:"user"`
}

func (h *Handler) SignUp() {
	h.router.Post("/signup", func(c *fiber.Ctx) error {
		UID := c.Locals("uid").(string)

		u, err := h.service.Register(c.Context(), UID)
		if err == nil {
			return c.Status(fiber.StatusCreated).JSON(UserResponse{User: u})
		}

		if errors.Is(err, service.ErrUserExists) {
			return c.Status(fiber.StatusBadRequest).
				JSON(fiber.Map{"error": model.Errors["userExists"]})
		}

		return c.SendStatus(fiber.StatusInternalServerError)
	})
}

func (h *Handler) SignIn() {
	h.router.Post("/signin", func(c *fiber.Ctx) error {
		UID := c.Locals("uid").(string)

		user, err := h.service.GetUserByUID(c.Context(), UID)

		if errors.Is(err, service.ErrUserNotFound) {
			return c.Status(fiber.StatusBadRequest).
				JSON(fiber.Map{"error": model.Errors["userNotExist"]})
		}

		if err != nil {
			return c.SendStatus(fiber.StatusUnauthorized)
		}

		return c.Status(fiber.StatusOK).JSON(UserResponse{User: user})
	})
}

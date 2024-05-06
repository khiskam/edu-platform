package category

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/khiskam/edu-platform/backend/internal/app/middleware"
	"github.com/khiskam/edu-platform/backend/internal/model"
	"github.com/khiskam/edu-platform/backend/internal/service"
)

type Handler struct {
	service service.Category
	router  fiber.Router
}

func NewHandler(app fiber.Router, service service.Category) *Handler {
	router := app.Group("/categories")

	return &Handler{
		service: service,
		router:  router,
	}
}

func (h *Handler) GetAll() {
	h.router.Get("", func(c *fiber.Ctx) error {
		limit := c.Query("limit")
		offset := c.Query("offset")

		categories, err := h.service.GetAll(c.Context(), limit, offset)
		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		count, err := h.service.Count(c.Context())
		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"categories": categories,
			"count":      count,
		})
	})
}

func (h *Handler) GetByID() {
	h.router.Get("/:id", func(c *fiber.Ctx) error {
		ID, err := uuid.Parse(c.Params("id"))
		if err != nil {
			return c.SendStatus(fiber.StatusNotFound)
		}

		category, err := h.service.GetByID(c.Context(), ID)

		if errors.Is(err, service.ErrCategoryNotFound) {
			return c.SendStatus(fiber.StatusNotFound)
		}

		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{"category": category})
	})
}

func (h *Handler) Create() {
	h.router.Post("", middleware.Validate(h.service.Logger(), Rules), func(c *fiber.Ctx) error {
		var payload model.Category
		if err := c.BodyParser(&payload); err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		category, err := h.service.Create(c.Context(), payload.Name)
		if errors.Is(err, service.ErrCategoryExist) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": model.Errors["categoryExists"],
			})
		}

		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"category": category,
		})
	})
}

func (h *Handler) Update() {
	h.router.Put("/:id", middleware.Validate(h.service.Logger(), Rules), func(c *fiber.Ctx) error {
		ID, err := uuid.Parse(c.Params("id"))
		if err != nil {
			return c.SendStatus(fiber.StatusNotFound)
		}

		var payload model.Category
		if err := c.BodyParser(&payload); err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		payload.ID = ID
		category, err := h.service.Update(c.Context(), &payload)

		if errors.Is(err, service.ErrCategoryNotFound) {
			return c.SendStatus(fiber.StatusNotFound)
		}

		if errors.Is(err, service.ErrCategoryExist) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": model.Errors["categoryExists"],
			})
		}

		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"category": category,
		})
	})
}

func (h *Handler) Delete() {
	h.router.Delete("/:id", func(c *fiber.Ctx) error {
		ID, err := uuid.Parse(c.Params("id"))
		if err != nil {
			return c.SendStatus(fiber.StatusNotFound)
		}

		err = h.service.Delete(c.Context(), ID)

		if errors.Is(err, service.ErrCategoryNotFound) {
			return c.SendStatus(fiber.StatusNotFound)
		}

		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		return c.SendStatus(fiber.StatusNoContent)
	})
}

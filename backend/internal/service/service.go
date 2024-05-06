package service

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"github.com/khiskam/edu-platform/backend/internal/model"
	"go.uber.org/zap"
)

var ErrUserExists = errors.New("user with UID already exists")
var ErrUserNotFound = errors.New("user not found")

type User interface {
	Register(ctx context.Context, UID string) (*model.User, error)
	GetUserByUID(ctx context.Context, UID string) (*model.User, error)
}

var ErrCategoryExist = errors.New("category with name already exists")
var ErrCategoryNotFound = errors.New("category not found")

type Category interface {
	GetAll(ctx context.Context, limit string, offset string) ([]*model.Category, error)
	GetByID(ctx context.Context, ID uuid.UUID) (*model.Category, error)
	Create(ctx context.Context, name string) (*model.Category, error)
	Update(ctx context.Context, category *model.Category) (*model.Category, error)
	Delete(ctx context.Context, ID uuid.UUID) error
	Count(ctx context.Context) (int, error)

	Logger() *zap.Logger
}

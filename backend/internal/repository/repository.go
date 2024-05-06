package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/khiskam/edu-platform/backend/internal/model"
)

type User interface {
	GetUserByUID(ctx context.Context, UID string) (*model.User, error)
	ExistByUID(ctx context.Context, UID string) (bool, error)
	Create(ctx context.Context, UID string) (*model.User, error)
}

type Category interface {
	GetAll(ctx context.Context, limit int, offset int) ([]*model.Category, error)
	GetByID(ctx context.Context, ID uuid.UUID) (*model.Category, error)
	Create(ctx context.Context, name string) (*model.Category, error)
	Update(ctx context.Context, category *model.Category) (*model.Category, error)
	Delete(ctx context.Context, ID uuid.UUID) error

	Count(ctx context.Context) (int, error)

	ExistByIDName(ctx context.Context, model *model.Category) (bool, error)
	ExistByName(ctx context.Context, name string) (bool, error)
}

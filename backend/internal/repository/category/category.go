package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/khiskam/edu-platform/backend/ent"
	"github.com/khiskam/edu-platform/backend/ent/category"
	"github.com/khiskam/edu-platform/backend/internal/model"
	"github.com/khiskam/edu-platform/backend/internal/repository"
	"github.com/khiskam/edu-platform/backend/internal/service"
)

var _ repository.Category = (*Repository)(nil)

type Repository struct {
	client *ent.Client
}

func NewCategoryRepository(client *ent.Client) *Repository {
	return &Repository{
		client: client,
	}
}

func FromRepoToService(c *ent.Category) *model.Category {
	return &model.Category{
		ID:   c.ID,
		Name: c.Name,
	}
}

func (r *Repository) GetAll(ctx context.Context, limit int, offset int) ([]*model.Category, error) {
	categories, err := r.client.Category.Query().Limit(limit).Offset(offset).All(ctx)
	if err != nil {
		return nil, err
	}

	result := make([]*model.Category, 0, len(categories))
	for _, v := range categories {
		result = append(result, FromRepoToService(v))
	}

	return result, nil
}

func (r *Repository) ExistByName(ctx context.Context, name string) (bool, error) {
	exist, err := r.client.Category.Query().Where(category.NameEQ(name)).Exist(ctx)

	if err != nil {
		return false, err
	}

	return exist, nil
}
func (r *Repository) ExistByIDName(ctx context.Context, model *model.Category) (bool, error) {
	exist, err := r.client.Category.Query().Where(category.NameEQ(model.Name), category.IDNEQ(model.ID)).Exist(ctx)

	if ent.IsNotFound(err) {
		return false, service.ErrCategoryNotFound
	}

	if err != nil {
		return false, err
	}

	return exist, nil
}

func (r *Repository) Create(ctx context.Context, name string) (*model.Category, error) {
	category, err := r.client.Category.Create().SetName(name).Save(ctx)

	if err != nil {
		return nil, err
	}

	result := FromRepoToService(category)
	return result, nil
}

func (r *Repository) Delete(ctx context.Context, ID uuid.UUID) error {
	err := r.client.Category.DeleteOneID(ID).Exec(ctx)

	if ent.IsNotFound(err) {
		return service.ErrCategoryNotFound
	}

	return err
}

// GetByID implements repository.Category.
func (r *Repository) GetByID(ctx context.Context, ID uuid.UUID) (*model.Category, error) {
	category, err := r.client.Category.Get(ctx, ID)

	if ent.IsNotFound(err) {
		return nil, service.ErrCategoryNotFound
	}

	if err != nil {
		return nil, err
	}

	result := FromRepoToService(category)
	return result, nil
}

func (r *Repository) Update(ctx context.Context, model *model.Category) (*model.Category, error) {
	category, err := r.client.Category.UpdateOneID(model.ID).SetName(model.Name).Save(ctx)
	if err != nil {
		return nil, err
	}

	result := FromRepoToService(category)
	return result, nil
}

func (r *Repository) Count(ctx context.Context) (int, error) {
	return r.client.Category.Query().Count(ctx)
}

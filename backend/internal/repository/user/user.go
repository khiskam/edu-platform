package user

import (
	"context"

	"github.com/khiskam/edu-platform/backend/ent"
	"github.com/khiskam/edu-platform/backend/ent/user"
	"github.com/khiskam/edu-platform/backend/internal/model"
	"github.com/khiskam/edu-platform/backend/internal/repository"
	"github.com/khiskam/edu-platform/backend/internal/service"
)

var _ repository.User = (*Repository)(nil)

type Repository struct {
	client *ent.Client
}

func NewUserRepository(client *ent.Client) *Repository {
	return &Repository{
		client: client,
	}
}

func FromRepoToService(u *ent.User) *model.User {
	return &model.User{
		ID:   u.ID,
		Role: string(u.Role),
		UID:  u.UID,
	}
}

func (r *Repository) GetUserByUID(ctx context.Context, UID string) (*model.User, error) {
	u, err := r.client.User.Query().Where(user.UIDEQ(UID)).First(ctx)

	if ent.IsNotFound(err) {
		return nil, service.ErrUserNotFound
	}

	if err != nil {
		return nil, err
	}

	result := FromRepoToService(u)
	return result, nil
}

func (r *Repository) ExistByUID(ctx context.Context, UID string) (bool, error) {
	exist, err := r.client.User.Query().Where(user.UIDEQ(UID)).Exist(ctx)

	if err != nil {
		return false, err
	}

	return exist, nil
}

func (ur *Repository) Create(ctx context.Context, UID string) (*model.User, error) {

	u, err := ur.client.User.Create().SetUID(UID).Save(ctx)

	if err != nil {
		return nil, err
	}

	result := FromRepoToService(u)
	return result, err
}

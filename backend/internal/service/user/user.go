package user

import (
	"context"

	"github.com/khiskam/edu-platform/backend/internal/model"
	"github.com/khiskam/edu-platform/backend/internal/repository"
	"github.com/khiskam/edu-platform/backend/internal/service"
	"go.uber.org/zap"
)

var _ service.User = (*Service)(nil)

type Service struct {
	repository repository.User
	logger     *zap.Logger
}

func NewService(repo repository.User, logger *zap.Logger) *Service {
	return &Service{
		repository: repo,
		logger:     logger,
	}
}

func (s *Service) Register(ctx context.Context, UID string) (*model.User, error) {
	exist, err := s.repository.ExistByUID(ctx, UID)
	if err != nil {
		s.logger.Info(err.Error())
		return nil, err
	}

	if exist {
		s.logger.Info(service.ErrUserExists.Error())
		return nil, service.ErrUserExists
	}

	user, err := s.repository.Create(ctx, UID)
	if err != nil {
		s.logger.Info(err.Error())
		return nil, err
	}

	return user, nil
}

func (s *Service) GetUserByUID(ctx context.Context, UID string) (*model.User, error) {
	model, err := s.repository.GetUserByUID(ctx, UID)

	if err != nil {
		s.logger.Info(err.Error())
		return nil, err
	}

	return model, nil
}

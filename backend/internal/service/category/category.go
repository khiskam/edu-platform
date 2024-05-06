package category

import (
	"context"
	"strconv"
	"strings"

	"github.com/google/uuid"
	"github.com/khiskam/edu-platform/backend/internal/model"
	"github.com/khiskam/edu-platform/backend/internal/repository"
	"github.com/khiskam/edu-platform/backend/internal/service"
	"go.uber.org/zap"
)

var _ service.Category = (*Service)(nil)

const limitDefault = 10
const offsetDefault = 0

type Service struct {
	repository repository.Category
	logger     *zap.Logger
}

func NewService(repo repository.Category, logger *zap.Logger) *Service {
	return &Service{
		repository: repo,
		logger:     logger,
	}
}

func stringToInt(value string, def int) int {
	result, err := strconv.Atoi(value)
	if err != nil {
		return def
	}

	return result
}

func (s *Service) GetAll(ctx context.Context, limit string, offset string) ([]*model.Category, error) {
	l := stringToInt(limit, limitDefault)
	o := stringToInt(offset, offsetDefault)

	categories, err := s.repository.GetAll(ctx, l, o)

	if err != nil {
		s.logger.Info("get all categories", zap.Error(err))
		return nil, err
	}

	return categories, err
}

func (s *Service) Create(ctx context.Context, name string) (*model.Category, error) {
	name = strings.ToLower(strings.Trim(name, " "))

	exist, err := s.repository.ExistByName(ctx, name)
	if err != nil {
		s.logger.Info("category exists query", zap.Error(err))
		return nil, err
	}

	if exist {
		s.logger.Info("category exists query", zap.Bool("exists", true))
		return nil, service.ErrCategoryExist
	}

	category, err := s.repository.Create(ctx, name)
	if err != nil {
		s.logger.Info("category create query", zap.Error(err))
		return nil, err
	}

	return category, nil
}

func (s *Service) Delete(ctx context.Context, ID uuid.UUID) error {
	return s.repository.Delete(ctx, ID)
}

// GetByID implements service.Category.
func (s *Service) GetByID(ctx context.Context, ID uuid.UUID) (*model.Category, error) {
	return s.repository.GetByID(ctx, ID)
}

// Update implements service.Category.
func (s *Service) Update(ctx context.Context, model *model.Category) (*model.Category, error) {
	model.Name = strings.ToLower(strings.Trim(model.Name, " "))

	exist, err := s.repository.ExistByIDName(ctx, model)
	if err != nil {
		s.logger.Info("category exists query", zap.Error(err))
		return nil, err
	}

	if exist {
		s.logger.Info("category exists query", zap.Bool("exists", true))
		return nil, service.ErrCategoryExist
	}

	category, err := s.repository.Update(ctx, model)
	if err != nil {
		s.logger.Info("category create query", zap.Error(err))
		return nil, err
	}

	return category, nil
}

func (s *Service) Count(ctx context.Context) (int, error) {
	count, err := s.repository.Count(ctx)
	if err != nil {
		s.logger.Info("get categories count", zap.Error(err))
		return 0, err
	}

	return count, nil
}

func (s *Service) Logger() *zap.Logger {
	return s.logger
}

package app

import (
	"fmt"

	"firebase.google.com/go/v4/auth"
	"github.com/gofiber/fiber/v2"
	"github.com/khiskam/edu-platform/backend/ent"
	"github.com/khiskam/edu-platform/backend/internal/app/handler"
	ch "github.com/khiskam/edu-platform/backend/internal/app/handler/category"
	uh "github.com/khiskam/edu-platform/backend/internal/app/handler/user"
	"github.com/khiskam/edu-platform/backend/internal/app/middleware"
	"github.com/khiskam/edu-platform/backend/internal/config/env"
	cr "github.com/khiskam/edu-platform/backend/internal/repository/category"
	ur "github.com/khiskam/edu-platform/backend/internal/repository/user"
	cs "github.com/khiskam/edu-platform/backend/internal/service/category"
	us "github.com/khiskam/edu-platform/backend/internal/service/user"
	"go.uber.org/zap"
)

var serverConfig = fiber.Config{
	EnablePrintRoutes: true,
}

type Server struct {
	app       *fiber.App
	apiRouter fiber.Router
	auth      *auth.Client
	conn      *ent.Client
	logger    *zap.Logger
}

func NewServer(srvConfig env.ServerConfig, conn *ent.Client, auth *auth.Client, logger *zap.Logger) *Server {
	app := fiber.New(serverConfig)
	s := &Server{
		app:       app,
		apiRouter: app.Group("/api"),
		auth:      auth,
		logger:    logger,
		conn:      conn,
	}

	s.apiRouter.Use(middleware.Logger(logger))
	s.apiRouter.Use(middleware.CORS(srvConfig.AllowOrigins))

	s.apiRouter.Get("/health-check", handler.HealthCheck)

	s.apiRouter.Use(middleware.CheckAuthHeader(auth, logger))
	s.InitUserRouter()

	s.apiRouter.Use(middleware.CheckUserExist(conn, logger))
	s.InitCategoriesRouter()

	return s
}

func (s *Server) Run(host string, port int) error {
	address := fmt.Sprintf("%v:%v", host, port)

	return s.app.Listen(address)
}

func (s *Server) InitUserRouter() {
	repository := ur.NewUserRepository(s.conn)
	service := us.NewService(repository, s.logger)
	handler := uh.NewHandler(s.apiRouter, service)

	handler.SignIn()
	handler.SignUp()
}

func (s *Server) InitCategoriesRouter() {
	repository := cr.NewCategoryRepository(s.conn)
	service := cs.NewService(repository, s.logger)
	handler := ch.NewHandler(s.apiRouter, service)

	handler.GetAll()
	handler.GetByID()
	handler.Create()
	handler.Update()
	handler.Delete()
}

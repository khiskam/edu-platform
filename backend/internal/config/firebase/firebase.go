package firebase

import (
	"context"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"google.golang.org/api/option"
)

type Config struct {
	App  *firebase.App
	Auth *auth.Client
}

func NewConfig(ctx context.Context) (*Config, error) {
	opt := option.WithCredentialsFile("firebaseCredentials.json")

	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		return nil, err
	}

	auth, err := app.Auth(ctx)
	if err != nil {
		return nil, err
	}

	config := &Config{App: app, Auth: auth}
	return config, err
}

func Must(cnf *Config, err error) *Config {
	if err != nil {
		panic(err)
	}

	return cnf
}

package env

import "github.com/ilyakaznacheev/cleanenv"

type DBConfig struct {
	User     string `env:"DB_USER" env-required:"true"`
	Password string `env:"DB_PASSWORD" env-required:"true"`
	Host     string `env:"DB_HOST" env-required:"true"`
	Port     int    `env:"DB_PORT" env-required:"true"`
	DBName   string `env:"DB_DATABASE" env-required:"true"`
	SSLMode  string `env:"SSLMODE" env-required:"true"`
	URL      string
}

type ServerConfig struct {
	Host         string `env:"HOST" env-required:"true"`
	Port         int    `env:"PORT" env-default:"3000"`
	AllowOrigins string `env:"ALLOW_ORIGINS" env-default:"*"`
	Env          string `env:"ENVIRONMENT" env-default:"dev"`
}

type Config struct {
	DB     DBConfig
	Server ServerConfig
}

func NewConfig() (*Config, error) {
	config := &Config{}

	err := cleanenv.ReadConfig(".env", config)
	if err != nil {
		return nil, err
	}

	return config, nil
}

func Must(cnf *Config, err error) *Config {
	if err != nil {
		panic(err)
	}

	return cnf
}

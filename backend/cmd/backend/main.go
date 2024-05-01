package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/ilyakaznacheev/cleanenv"
)

type DBConfig struct {
	User string `env:"DB_USER" env-required:"true"`
}

func main() {
	config := DBConfig{}
	err := cleanenv.ReadConfig(".env", &config)

	if err != nil {
		log.Fatal(err)
	}

	app := fiber.New()

	app.Listen(":3000")
}

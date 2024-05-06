package database

import (
	"fmt"

	"entgo.io/ent/dialect/sql"
	"github.com/khiskam/edu-platform/backend/ent"
	"github.com/khiskam/edu-platform/backend/internal/config/env"
	_ "github.com/lib/pq"
)

type Connection struct {
	driver *sql.Driver
	Client *ent.Client
}

func Must(conn *Connection, err error) *Connection {
	if err != nil {
		panic(err)
	}

	return conn
}

func getDSN(config *env.DBConfig) string {
	return fmt.Sprintf(
		"postgres://%v:%v@%v:%v/%v?sslmode=%v",
		config.User,
		config.Password,
		config.Host,
		config.Port,
		config.DBName,
		config.SSLMode,
	)
}

func Connect(config *env.DBConfig) (*Connection, error) {
	dsn := getDSN(config)
	driver, err := sql.Open("postgres", dsn)

	if err != nil {
		return nil, err
	}

	client := ent.NewClient(ent.Driver(driver))
	dbConn := &Connection{driver: driver, Client: client}

	return dbConn, err
}

func (c *Connection) Close() error {
	return c.driver.Close()
}

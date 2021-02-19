package database

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v4"
)

// InstanceType instance type
type InstanceType struct {
	connection *pgx.Conn
}

// Instance DB Instance
var Instance InstanceType

// Init database connection
func Init(addr, user, password, db string) error {
	connectionString := fmt.Sprintf("postgresql://%s:%s@%s/%s", user, password, addr, db)
	config, err := pgx.ParseConfig(connectionString)

	if err != nil {
		return err
	}

	conn, err := pgx.ConnectConfig(context.Background(), config)

	if err != nil {
		return err
	}

	err = precheckDatabase(conn)

	if err != nil {
		conn.Close(context.Background())
		return err
	}

	Instance.connection = conn

	return nil
}

// Close database connection
func Close() {
	Instance.connection.Close(context.Background())
}

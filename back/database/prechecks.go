package database

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v4"
)

func precheckDatabase(conn *pgx.Conn) error {
	err := precheckTable(conn)

	if err != nil {
		return err
	}

	return nil
}

func precheckTable(conn *pgx.Conn) error {
	var tableExists *string
	err := conn.QueryRow(context.Background(), fmt.Sprintf("SELECT to_regclass('%s.%s');", ipfsSchema, ipfsTable)).Scan(&tableExists)

	if err != nil {
		return err
	}

	if tableExists == nil {
		err = createTable(conn)

		if err != nil {
			return err
		}
	}

	return nil
}

const initSQL = `CREATE SCHEMA IF NOT EXISTS %s;
CREATE TABLE %s.%s (
	id SERIAL PRIMARY KEY NOT NULL,
	hash VARCHAR (255) UNIQUE NOT NULL,
	name VARCHAR (255) NOT NULL
);`

func createTable(conn *pgx.Conn) error {
	initSQLData := fmt.Sprintf(initSQL, ipfsSchema, ipfsSchema, ipfsTable)
	fmt.Println("Init database")
	_, err := conn.Exec(context.Background(), initSQLData)
	return err
}

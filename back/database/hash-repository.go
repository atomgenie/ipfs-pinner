package database

import (
	"context"
	"fmt"
)

// HashRepository repository
type HashRepository struct{}

// HashDB DB Type
type HashDB struct {
	ID   int
	Name string
	Hash string
}

// NewHashRepository new hash repository
func NewHashRepository() *HashRepository {
	return new(HashRepository)
}

// List list hashes
func (HashRepository) List() ([]HashDB, error) {
	query := fmt.Sprintf("SELECT id, hash, name FROM %s.%s", ipfsSchema, ipfsTable)
	rows, err := Instance.connection.Query(context.Background(), query)

	if err != nil {
		return nil, err
	}

	resp := []HashDB{}

	for rows.Next() {
		var id int
		var hash, name string

		err = rows.Scan(&id, &hash, &name)
		if err != nil {
			return nil, err
		}

		resp = append(resp, HashDB{
			ID:   id,
			Name: name,
			Hash: hash,
		})
	}

	return resp, nil
}

// GetByHash Get by hash
func (HashRepository) GetByHash(hash string) (HashDB, error) {
	query := fmt.Sprintf(`SELECT id, name FROM %s.%s WHERE hash=$1 LIMIT 1`, ipfsSchema, ipfsTable)
	var id int
	var name string
	err := Instance.connection.QueryRow(context.Background(), query, hash).Scan(&id, &name)
	ret := HashDB{}

	if err != nil {
		return ret, err
	}

	ret.Hash = hash
	ret.ID = id
	ret.Name = name

	return ret, nil
}

// Insert data
func (HashRepository) Insert(data HashDB) error {
	query := fmt.Sprintf(`INSERT INTO %s.%s (name, hash) VALUES ($1, $2)`, ipfsSchema, ipfsTable)
	_, err := Instance.connection.Exec(context.Background(), query, data.Name, data.Hash)
	return err
}

// DeleteByHash Delete item
func (HashRepository) DeleteByHash(hash string) error {
	query := fmt.Sprintf("DELETE FROM %s.%s WHERE hash=$1", ipfsSchema, ipfsTable)
	_, err := Instance.connection.Exec(context.Background(), query, hash)
	return err
}

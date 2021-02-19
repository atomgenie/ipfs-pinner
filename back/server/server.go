package server

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/atomgenie/ipfs-pinner/back/actions"
	"github.com/atomgenie/ipfs-pinner/back/database"
	iface "github.com/ipfs/interface-go-ipfs-core"
	"github.com/jackc/pgx/v4"
)

var instance *actions.Instance
var _token string

const startToken = "Bearer "

func isValidRequest(req *http.Request) bool {
	bearerToken := req.Header.Get("Authorization")

	if len(bearerToken) <= len(startToken) {
		return false
	}

	rawToken := bearerToken[len(startToken):]
	return rawToken == _token
}

func postAddPin(res http.ResponseWriter, req *http.Request) {
	if !isValidRequest(req) {
		res.WriteHeader(http.StatusUnauthorized)
		return
	}

	var query struct {
		Hash string `json:"hash"`
		Name string `json:"name"`
	}

	err := json.NewDecoder(req.Body).Decode(&query)

	if err != nil || query.Hash == "" {
		res.WriteHeader(http.StatusBadRequest)
		return
	}

	err = instance.Pin(query.Hash)

	if err != nil {
		fmt.Println(err)
		res.WriteHeader(http.StatusInternalServerError)
		return
	}

	repo := database.NewHashRepository()
	repo.Insert(database.HashDB{
		Name: query.Name,
		Hash: query.Hash,
	})

	fmt.Println("Pinned", query.Hash)
	res.WriteHeader(http.StatusOK)
}

type getListPinRes struct {
	Hash string `json:"hash"`
	Name string `json:"name"`
}

func getListPin(res http.ResponseWriter, req *http.Request) {

	if !isValidRequest(req) {
		res.WriteHeader(http.StatusUnauthorized)
		return
	}

	pins, err := instance.ListPins()

	if err != nil {
		res.WriteHeader(http.StatusInternalServerError)
		return
	}

	responseData := []getListPinRes{}
	chanResponse := make(chan getListPinRes)

	repo := database.NewHashRepository()
	for _, pin := range pins {

		go func(pin string) {
			query, err := repo.GetByHash(pin)

			if err == pgx.ErrNoRows {
				chanResponse <- getListPinRes{Hash: pin, Name: pin}
			} else {
				chanResponse <- getListPinRes{Hash: pin, Name: query.Name}
			}
		}(pin)

	}

	for range pins {
		responseData = append(responseData, <-chanResponse)
	}

	res.WriteHeader(http.StatusOK)
	json.NewEncoder(res).Encode(responseData)
}

func deletePin(res http.ResponseWriter, req *http.Request) {
	if !isValidRequest(req) {
		res.WriteHeader(http.StatusUnauthorized)
		return
	}

	if req.Method != "DELETE" {
		res.WriteHeader(http.StatusBadRequest)
		return
	}

	var query struct {
		Hash string `json:"hash"`
	}

	err := json.NewDecoder(req.Body).Decode(&query)

	if err != nil || query.Hash == "" {
		res.WriteHeader(http.StatusBadRequest)
		return
	}

	err = instance.RemovePin(query.Hash)

	if err != nil {
		res.WriteHeader(http.StatusInternalServerError)
		return
	}

	repo := database.NewHashRepository()
	repo.DeleteByHash(query.Hash)
	res.WriteHeader(http.StatusOK)
}

// Init Init server
func Init(ipfs iface.CoreAPI, addr string, token string) error {
	instance = actions.New(ipfs)
	_token = token
	http.HandleFunc("/add-pin", postAddPin)
	http.HandleFunc("/list-pin", getListPin)
	http.HandleFunc("/delete-pin", deletePin)
	fmt.Println("Listening on port", addr)
	http.ListenAndServe(addr, nil)
	return nil
}

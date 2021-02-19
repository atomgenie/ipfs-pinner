package main

import (
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/atomgenie/ipfs-pinner/back/database"
	"github.com/atomgenie/ipfs-pinner/back/ipfs"
	"github.com/atomgenie/ipfs-pinner/back/server"
)

func main() {
	token := os.Getenv("TOKEN")

	if token == "" {
		log.Fatalln("Missing TOKEN env")
	}

	port := flag.String("port", "8090", "Server port")
	flag.Parse()

	err := ipfs.Init()

	if err != nil {
		panic(err)
	}

	defer ipfs.Close()

	err = database.Init("localhost:5432", "admin", "abcdefg123", "ipfs-pinner")

	if err != nil {
		panic(err)
	}

	defer database.Close()

	go server.Init(ipfs.Client, ":"+*port, token)
	fmt.Println("IPFS Started")
	select {}
}

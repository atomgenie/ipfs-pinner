package main

import (
	"context"
	"fmt"
	"io/ioutil"

	"github.com/ipfs/go-ipfs/core"
	"github.com/ipfs/go-ipfs/core/bootstrap"
	"github.com/ipfs/go-ipfs/core/coreapi"
	"github.com/ipfs/go-ipfs/core/node"
	"github.com/ipfs/interface-go-ipfs-core/path"
)

func main() {
	node, err := core.NewNode(context.Background(), &node.BuildCfg{
		Online:    true,
		Permanent: true,
	})

	if err != nil {
		panic(err)
	}

	defer node.Close()

	err = node.Bootstrap(bootstrap.DefaultBootstrapConfig)

	if err != nil {
		panic(err)
	}

	ipfs, err := coreapi.NewCoreAPI(node)

	if err != nil {
		panic(err)
	}

	fmt.Println("Started")

	err = ipfs.Pin().Add(context.Background(), path.New("/ipfs/QmXqyiwgUmRGNhHH9rfxozqzfLHSNuXqWpafZDBTYctGjX"))

	if err != nil {
		panic(err)
	}

	pins, err := ipfs.Pin().Ls(context.Background())

	if err != nil {
		panic(err)
	}

	for pin := range pins {
		fmt.Println(pin.Path().String())
		reader, err := ipfs.Block().Get(context.Background(), pin.Path())

		if err != nil {
			fmt.Println("err", err)
			continue
		}

		toto, err := ioutil.ReadAll(reader)

		if err != nil {
			fmt.Println("err2", err)
			continue
		}

		fmt.Println(string(toto))

	}
}

package ipfs

import (
	"context"

	"github.com/ipfs/go-ipfs/core"
	"github.com/ipfs/go-ipfs/core/bootstrap"
	"github.com/ipfs/go-ipfs/core/coreapi"
	"github.com/ipfs/go-ipfs/core/node"
	iface "github.com/ipfs/interface-go-ipfs-core"
)

// Client IPFS client
var Client iface.CoreAPI
var globalNode *core.IpfsNode

// Init client
func Init() error {
	node, err := core.NewNode(context.Background(), &node.BuildCfg{
		Online:    true,
		Permanent: true,
	})

	if err != nil {
		return err
	}

	globalNode = node
	err = node.Bootstrap(bootstrap.DefaultBootstrapConfig)

	if err != nil {
		return err
	}

	ipfs, err := coreapi.NewCoreAPI(node)

	if err != nil {
		return err
	}

	Client = ipfs
	return nil
}

// Close ressources
func Close() {
	globalNode.Close()
}

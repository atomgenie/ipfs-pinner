package actions

import (
	"context"

	"github.com/ipfs/interface-go-ipfs-core/options"
	"github.com/ipfs/interface-go-ipfs-core/path"
)

// Pin a hash
func (i *Instance) Pin(hash string) error {
	err := i.ipfs.Pin().Add(context.Background(), path.New(hash), options.Pin.Recursive(true))
	return err
}

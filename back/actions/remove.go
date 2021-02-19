package actions

import (
	"context"

	"github.com/ipfs/interface-go-ipfs-core/options"
	"github.com/ipfs/interface-go-ipfs-core/path"
)

// RemovePin remove pin
func (i *Instance) RemovePin(hash string) error {
	return i.ipfs.Pin().Rm(context.Background(), path.New(hash), options.Pin.RmRecursive(true))
}

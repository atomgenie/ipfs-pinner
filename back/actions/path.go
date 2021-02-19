package actions

import "github.com/ipfs/interface-go-ipfs-core/path"

// GetPath get ipfs path
func (i *Instance) GetPath(hash string) path.Path {
	return path.New(hash)
}

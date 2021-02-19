package actions

import iface "github.com/ipfs/interface-go-ipfs-core"

// Instance instance of action
type Instance struct {
	ipfs iface.CoreAPI
}

// New Instance
func New(ipfs iface.CoreAPI) *Instance {
	i := new(Instance)
	i.ipfs = ipfs
	return i
}

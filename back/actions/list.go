package actions

import (
	"context"
)

// ListPins List pins
func (i *Instance) ListPins() ([]string, error) {
	out, err := i.ipfs.Pin().Ls(context.Background())

	if err != nil {
		return nil, err
	}

	toRet := []string{}

	for pin := range out {
		pinType := pin.Type()

		if pinType != "recursive" {
			continue
		}

		toRet = append(toRet, pin.Path().Cid().String())
	}

	return toRet, nil
}

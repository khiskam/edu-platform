package model

import "github.com/google/uuid"

type User struct {
	ID   uuid.UUID `json:"id"`
	Role string    `json:"role"`
	UID  string    `json:"uid"`
}

type Category struct {
	ID   uuid.UUID `json:"id"`
	Name string    `json:"name"`
}

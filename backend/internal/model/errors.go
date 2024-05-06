package model

type Message struct {
	Message string `json:"message"`
}

var Errors = map[string]Message{
	"userExists":     {Message: "Пользователь с таким uid уже существует"},
	"userNotExist":   {Message: "Пользователь с таким uid не существует"},
	"categoryExists": {Message: "Категория с таким названием уже существует"},
}

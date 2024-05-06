package category

import "github.com/gookit/validate"

func Rules(validator *validate.Validation) {
	validator.FilterRule("name", "trim|lower")
	validator.Trans().AddLabelMap(map[string]string{
		"name": "Имя",
	})

	validator.AddMessages(map[string]string{
		"required": "Поле {field} обязательно для заполнения",
	})

	validator.AddRule("name", "required")

}

package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Category holds the schema definition for the Category entity.
type Category struct {
	ent.Schema
}

// Fields of the Category.
func (Category) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Annotations(entsql.DefaultExpr("uuid_generate_v4()")),
		field.String("name").Unique(),
	}
}

// Edges of the Category.
func (Category) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("lessons", Lesson.Type).
			Annotations(entsql.OnDelete(entsql.Cascade)),
		edge.To("tasks", Task.Type).
			Annotations(entsql.OnDelete(entsql.Cascade)),
	}
}

package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Annotations(entsql.DefaultExpr("uuid_generate_v4()")),
		field.Enum("role").Values("user", "admin").Default("user"),
		field.String("uid").Unique().SchemaType(map[string]string{
			dialect.Postgres: "varchar(128)",
		}),
	}
}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("completed_lessons", CompletedLesson.Type).
			Annotations(entsql.OnDelete(entsql.Cascade)),
		edge.To("completed_tasks", CompletedTask.Type).
			Annotations(entsql.OnDelete(entsql.Cascade)),
	}
}

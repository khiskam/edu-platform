package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// CompletedTask holds the schema definition for the CompletedTask entity.
type CompletedTask struct {
	ent.Schema
}

// Fields of the CompletedTask.
func (CompletedTask) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Annotations(entsql.DefaultExpr("uuid_generate_v4()")),
		field.String("answer"),
		field.Bool("is_completed"),
		field.UUID("user_id", uuid.UUID{}).Optional(),
		field.UUID("task_id", uuid.UUID{}).Optional(),
	}
}

// Edges of the CompletedTask.
func (CompletedTask) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("author", User.Type).
			Ref("completed_tasks").
			Unique().
			Field("user_id"),

		edge.From("completed_task", Task.Type).
			Ref("completed_tasks").
			Unique().
			Field("task_id"),
	}
}

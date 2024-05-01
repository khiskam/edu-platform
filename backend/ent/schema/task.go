package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Task holds the schema definition for the Task entity.
type Task struct {
	ent.Schema
}

// Fields of the Task.
func (Task) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Annotations(entsql.DefaultExpr("uuid_generate_v4()")),
		field.String("title"),
		field.String("description"),
		field.String("answer"),
		field.UUID("uploaded_file_id", uuid.UUID{}).Optional(),
		field.UUID("category_id", uuid.UUID{}).Optional(),
	}
}

// Edges of the Task.
func (Task) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("task", Category.Type).
			Ref("tasks").
			Unique().
			Field("category_id"),

		edge.From("uploaded_file", UploadedFile.Type).
			Ref("tasks").
			Unique().
			Field("uploaded_file_id"),

		edge.To("completed_tasks", CompletedTask.Type).
			Annotations(entsql.OnDelete(entsql.Cascade)),
	}
}

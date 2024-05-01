package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// UploadedFile holds the schema definition for the UploadedFile entity.
type UploadedFile struct {
	ent.Schema
}

// Fields of the UploadedFile.
func (UploadedFile) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Annotations(entsql.DefaultExpr("uuid_generate_v4()")),
		field.String("file_name"),
		field.String("content_type"),
		field.Int64("size"),
	}
}

// Edges of the UploadedFile.
func (UploadedFile) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("tasks", Task.Type).
			Annotations(entsql.OnDelete(entsql.Cascade)),
	}
}

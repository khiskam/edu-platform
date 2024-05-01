package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Lesson holds the schema definition for the Lesson entity.
type Lesson struct {
	ent.Schema
}

// Fields of the Lesson.
func (Lesson) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Annotations(entsql.DefaultExpr("uuid_generate_v4()")),
		field.String("title"),
		field.String("description"),
		field.String("layout"),
		field.UUID("category_id", uuid.UUID{}).Optional(),
	}
}

// Edges of the Lesson.
func (Lesson) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("completed_lessons", CompletedLesson.Type).
			Annotations(entsql.OnDelete(entsql.Cascade)),

		edge.From("lesson", Category.Type).
			Ref("lessons").
			Unique().
			Field("category_id"),
	}
}

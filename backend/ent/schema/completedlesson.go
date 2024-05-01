package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// CompletedLesson holds the schema definition for the CompletedLesson entity.
type CompletedLesson struct {
	ent.Schema
}

// Fields of the CompletedLesson.
func (CompletedLesson) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Annotations(entsql.DefaultExpr("uuid_generate_v4()")),
		field.UUID("user_id", uuid.UUID{}).Optional(),
		field.UUID("lesson_id", uuid.UUID{}).Optional(),
	}
}

// Edges of the CompletedLesson.
func (CompletedLesson) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("author", User.Type).
			Ref("completed_lessons").
			Unique().
			Field("user_id"),

		edge.From("completed_lesson", Lesson.Type).
			Ref("completed_lessons").
			Unique().
			Field("lesson_id"),
	}
}

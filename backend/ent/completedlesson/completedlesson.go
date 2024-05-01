// Code generated by ent, DO NOT EDIT.

package completedlesson

import (
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
)

const (
	// Label holds the string label denoting the completedlesson type in the database.
	Label = "completed_lesson"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldUserID holds the string denoting the user_id field in the database.
	FieldUserID = "user_id"
	// FieldLessonID holds the string denoting the lesson_id field in the database.
	FieldLessonID = "lesson_id"
	// EdgeAuthor holds the string denoting the author edge name in mutations.
	EdgeAuthor = "author"
	// EdgeCompletedLesson holds the string denoting the completed_lesson edge name in mutations.
	EdgeCompletedLesson = "completed_lesson"
	// Table holds the table name of the completedlesson in the database.
	Table = "completed_lessons"
	// AuthorTable is the table that holds the author relation/edge.
	AuthorTable = "completed_lessons"
	// AuthorInverseTable is the table name for the User entity.
	// It exists in this package in order to avoid circular dependency with the "user" package.
	AuthorInverseTable = "users"
	// AuthorColumn is the table column denoting the author relation/edge.
	AuthorColumn = "user_id"
	// CompletedLessonTable is the table that holds the completed_lesson relation/edge.
	CompletedLessonTable = "completed_lessons"
	// CompletedLessonInverseTable is the table name for the Lesson entity.
	// It exists in this package in order to avoid circular dependency with the "lesson" package.
	CompletedLessonInverseTable = "lessons"
	// CompletedLessonColumn is the table column denoting the completed_lesson relation/edge.
	CompletedLessonColumn = "lesson_id"
)

// Columns holds all SQL columns for completedlesson fields.
var Columns = []string{
	FieldID,
	FieldUserID,
	FieldLessonID,
}

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	return false
}

// OrderOption defines the ordering options for the CompletedLesson queries.
type OrderOption func(*sql.Selector)

// ByID orders the results by the id field.
func ByID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldID, opts...).ToFunc()
}

// ByUserID orders the results by the user_id field.
func ByUserID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldUserID, opts...).ToFunc()
}

// ByLessonID orders the results by the lesson_id field.
func ByLessonID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldLessonID, opts...).ToFunc()
}

// ByAuthorField orders the results by author field.
func ByAuthorField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newAuthorStep(), sql.OrderByField(field, opts...))
	}
}

// ByCompletedLessonField orders the results by completed_lesson field.
func ByCompletedLessonField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newCompletedLessonStep(), sql.OrderByField(field, opts...))
	}
}
func newAuthorStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(AuthorInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, AuthorTable, AuthorColumn),
	)
}
func newCompletedLessonStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(CompletedLessonInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, CompletedLessonTable, CompletedLessonColumn),
	)
}

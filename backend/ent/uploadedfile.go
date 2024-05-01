// Code generated by ent, DO NOT EDIT.

package ent

import (
	"fmt"
	"strings"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"github.com/google/uuid"
	"github.com/khiskam/edu-platform/backend/ent/uploadedfile"
)

// UploadedFile is the model entity for the UploadedFile schema.
type UploadedFile struct {
	config `json:"-"`
	// ID of the ent.
	ID uuid.UUID `json:"id,omitempty"`
	// FileName holds the value of the "file_name" field.
	FileName string `json:"file_name,omitempty"`
	// ContentType holds the value of the "content_type" field.
	ContentType string `json:"content_type,omitempty"`
	// Size holds the value of the "size" field.
	Size int64 `json:"size,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the UploadedFileQuery when eager-loading is set.
	Edges        UploadedFileEdges `json:"edges"`
	selectValues sql.SelectValues
}

// UploadedFileEdges holds the relations/edges for other nodes in the graph.
type UploadedFileEdges struct {
	// Tasks holds the value of the tasks edge.
	Tasks []*Task `json:"tasks,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [1]bool
}

// TasksOrErr returns the Tasks value or an error if the edge
// was not loaded in eager-loading.
func (e UploadedFileEdges) TasksOrErr() ([]*Task, error) {
	if e.loadedTypes[0] {
		return e.Tasks, nil
	}
	return nil, &NotLoadedError{edge: "tasks"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*UploadedFile) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case uploadedfile.FieldSize:
			values[i] = new(sql.NullInt64)
		case uploadedfile.FieldFileName, uploadedfile.FieldContentType:
			values[i] = new(sql.NullString)
		case uploadedfile.FieldID:
			values[i] = new(uuid.UUID)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the UploadedFile fields.
func (uf *UploadedFile) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case uploadedfile.FieldID:
			if value, ok := values[i].(*uuid.UUID); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value != nil {
				uf.ID = *value
			}
		case uploadedfile.FieldFileName:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field file_name", values[i])
			} else if value.Valid {
				uf.FileName = value.String
			}
		case uploadedfile.FieldContentType:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field content_type", values[i])
			} else if value.Valid {
				uf.ContentType = value.String
			}
		case uploadedfile.FieldSize:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for field size", values[i])
			} else if value.Valid {
				uf.Size = value.Int64
			}
		default:
			uf.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the UploadedFile.
// This includes values selected through modifiers, order, etc.
func (uf *UploadedFile) Value(name string) (ent.Value, error) {
	return uf.selectValues.Get(name)
}

// QueryTasks queries the "tasks" edge of the UploadedFile entity.
func (uf *UploadedFile) QueryTasks() *TaskQuery {
	return NewUploadedFileClient(uf.config).QueryTasks(uf)
}

// Update returns a builder for updating this UploadedFile.
// Note that you need to call UploadedFile.Unwrap() before calling this method if this UploadedFile
// was returned from a transaction, and the transaction was committed or rolled back.
func (uf *UploadedFile) Update() *UploadedFileUpdateOne {
	return NewUploadedFileClient(uf.config).UpdateOne(uf)
}

// Unwrap unwraps the UploadedFile entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (uf *UploadedFile) Unwrap() *UploadedFile {
	_tx, ok := uf.config.driver.(*txDriver)
	if !ok {
		panic("ent: UploadedFile is not a transactional entity")
	}
	uf.config.driver = _tx.drv
	return uf
}

// String implements the fmt.Stringer.
func (uf *UploadedFile) String() string {
	var builder strings.Builder
	builder.WriteString("UploadedFile(")
	builder.WriteString(fmt.Sprintf("id=%v, ", uf.ID))
	builder.WriteString("file_name=")
	builder.WriteString(uf.FileName)
	builder.WriteString(", ")
	builder.WriteString("content_type=")
	builder.WriteString(uf.ContentType)
	builder.WriteString(", ")
	builder.WriteString("size=")
	builder.WriteString(fmt.Sprintf("%v", uf.Size))
	builder.WriteByte(')')
	return builder.String()
}

// UploadedFiles is a parsable slice of UploadedFile.
type UploadedFiles []*UploadedFile

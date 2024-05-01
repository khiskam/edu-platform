// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"

	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
	"github.com/khiskam/edu-platform/backend/ent/task"
	"github.com/khiskam/edu-platform/backend/ent/uploadedfile"
)

// UploadedFileCreate is the builder for creating a UploadedFile entity.
type UploadedFileCreate struct {
	config
	mutation *UploadedFileMutation
	hooks    []Hook
}

// SetFileName sets the "file_name" field.
func (ufc *UploadedFileCreate) SetFileName(s string) *UploadedFileCreate {
	ufc.mutation.SetFileName(s)
	return ufc
}

// SetContentType sets the "content_type" field.
func (ufc *UploadedFileCreate) SetContentType(s string) *UploadedFileCreate {
	ufc.mutation.SetContentType(s)
	return ufc
}

// SetSize sets the "size" field.
func (ufc *UploadedFileCreate) SetSize(i int64) *UploadedFileCreate {
	ufc.mutation.SetSize(i)
	return ufc
}

// SetID sets the "id" field.
func (ufc *UploadedFileCreate) SetID(u uuid.UUID) *UploadedFileCreate {
	ufc.mutation.SetID(u)
	return ufc
}

// AddTaskIDs adds the "tasks" edge to the Task entity by IDs.
func (ufc *UploadedFileCreate) AddTaskIDs(ids ...uuid.UUID) *UploadedFileCreate {
	ufc.mutation.AddTaskIDs(ids...)
	return ufc
}

// AddTasks adds the "tasks" edges to the Task entity.
func (ufc *UploadedFileCreate) AddTasks(t ...*Task) *UploadedFileCreate {
	ids := make([]uuid.UUID, len(t))
	for i := range t {
		ids[i] = t[i].ID
	}
	return ufc.AddTaskIDs(ids...)
}

// Mutation returns the UploadedFileMutation object of the builder.
func (ufc *UploadedFileCreate) Mutation() *UploadedFileMutation {
	return ufc.mutation
}

// Save creates the UploadedFile in the database.
func (ufc *UploadedFileCreate) Save(ctx context.Context) (*UploadedFile, error) {
	return withHooks(ctx, ufc.sqlSave, ufc.mutation, ufc.hooks)
}

// SaveX calls Save and panics if Save returns an error.
func (ufc *UploadedFileCreate) SaveX(ctx context.Context) *UploadedFile {
	v, err := ufc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ufc *UploadedFileCreate) Exec(ctx context.Context) error {
	_, err := ufc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ufc *UploadedFileCreate) ExecX(ctx context.Context) {
	if err := ufc.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ufc *UploadedFileCreate) check() error {
	if _, ok := ufc.mutation.FileName(); !ok {
		return &ValidationError{Name: "file_name", err: errors.New(`ent: missing required field "UploadedFile.file_name"`)}
	}
	if _, ok := ufc.mutation.ContentType(); !ok {
		return &ValidationError{Name: "content_type", err: errors.New(`ent: missing required field "UploadedFile.content_type"`)}
	}
	if _, ok := ufc.mutation.Size(); !ok {
		return &ValidationError{Name: "size", err: errors.New(`ent: missing required field "UploadedFile.size"`)}
	}
	return nil
}

func (ufc *UploadedFileCreate) sqlSave(ctx context.Context) (*UploadedFile, error) {
	if err := ufc.check(); err != nil {
		return nil, err
	}
	_node, _spec := ufc.createSpec()
	if err := sqlgraph.CreateNode(ctx, ufc.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	if _spec.ID.Value != nil {
		if id, ok := _spec.ID.Value.(*uuid.UUID); ok {
			_node.ID = *id
		} else if err := _node.ID.Scan(_spec.ID.Value); err != nil {
			return nil, err
		}
	}
	ufc.mutation.id = &_node.ID
	ufc.mutation.done = true
	return _node, nil
}

func (ufc *UploadedFileCreate) createSpec() (*UploadedFile, *sqlgraph.CreateSpec) {
	var (
		_node = &UploadedFile{config: ufc.config}
		_spec = sqlgraph.NewCreateSpec(uploadedfile.Table, sqlgraph.NewFieldSpec(uploadedfile.FieldID, field.TypeUUID))
	)
	if id, ok := ufc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = &id
	}
	if value, ok := ufc.mutation.FileName(); ok {
		_spec.SetField(uploadedfile.FieldFileName, field.TypeString, value)
		_node.FileName = value
	}
	if value, ok := ufc.mutation.ContentType(); ok {
		_spec.SetField(uploadedfile.FieldContentType, field.TypeString, value)
		_node.ContentType = value
	}
	if value, ok := ufc.mutation.Size(); ok {
		_spec.SetField(uploadedfile.FieldSize, field.TypeInt64, value)
		_node.Size = value
	}
	if nodes := ufc.mutation.TasksIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   uploadedfile.TasksTable,
			Columns: []string{uploadedfile.TasksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(task.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// UploadedFileCreateBulk is the builder for creating many UploadedFile entities in bulk.
type UploadedFileCreateBulk struct {
	config
	err      error
	builders []*UploadedFileCreate
}

// Save creates the UploadedFile entities in the database.
func (ufcb *UploadedFileCreateBulk) Save(ctx context.Context) ([]*UploadedFile, error) {
	if ufcb.err != nil {
		return nil, ufcb.err
	}
	specs := make([]*sqlgraph.CreateSpec, len(ufcb.builders))
	nodes := make([]*UploadedFile, len(ufcb.builders))
	mutators := make([]Mutator, len(ufcb.builders))
	for i := range ufcb.builders {
		func(i int, root context.Context) {
			builder := ufcb.builders[i]
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*UploadedFileMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				var err error
				nodes[i], specs[i] = builder.createSpec()
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, ufcb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, ufcb.driver, spec); err != nil {
						if sqlgraph.IsConstraintError(err) {
							err = &ConstraintError{msg: err.Error(), wrap: err}
						}
					}
				}
				if err != nil {
					return nil, err
				}
				mutation.id = &nodes[i].ID
				mutation.done = true
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, ufcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (ufcb *UploadedFileCreateBulk) SaveX(ctx context.Context) []*UploadedFile {
	v, err := ufcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ufcb *UploadedFileCreateBulk) Exec(ctx context.Context) error {
	_, err := ufcb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ufcb *UploadedFileCreateBulk) ExecX(ctx context.Context) {
	if err := ufcb.Exec(ctx); err != nil {
		panic(err)
	}
}

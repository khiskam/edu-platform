// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"

	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
	"github.com/khiskam/edu-platform/backend/ent/category"
	"github.com/khiskam/edu-platform/backend/ent/completedtask"
	"github.com/khiskam/edu-platform/backend/ent/task"
	"github.com/khiskam/edu-platform/backend/ent/uploadedfile"
)

// TaskCreate is the builder for creating a Task entity.
type TaskCreate struct {
	config
	mutation *TaskMutation
	hooks    []Hook
}

// SetTitle sets the "title" field.
func (tc *TaskCreate) SetTitle(s string) *TaskCreate {
	tc.mutation.SetTitle(s)
	return tc
}

// SetDescription sets the "description" field.
func (tc *TaskCreate) SetDescription(s string) *TaskCreate {
	tc.mutation.SetDescription(s)
	return tc
}

// SetAnswer sets the "answer" field.
func (tc *TaskCreate) SetAnswer(s string) *TaskCreate {
	tc.mutation.SetAnswer(s)
	return tc
}

// SetUploadedFileID sets the "uploaded_file_id" field.
func (tc *TaskCreate) SetUploadedFileID(u uuid.UUID) *TaskCreate {
	tc.mutation.SetUploadedFileID(u)
	return tc
}

// SetNillableUploadedFileID sets the "uploaded_file_id" field if the given value is not nil.
func (tc *TaskCreate) SetNillableUploadedFileID(u *uuid.UUID) *TaskCreate {
	if u != nil {
		tc.SetUploadedFileID(*u)
	}
	return tc
}

// SetCategoryID sets the "category_id" field.
func (tc *TaskCreate) SetCategoryID(u uuid.UUID) *TaskCreate {
	tc.mutation.SetCategoryID(u)
	return tc
}

// SetNillableCategoryID sets the "category_id" field if the given value is not nil.
func (tc *TaskCreate) SetNillableCategoryID(u *uuid.UUID) *TaskCreate {
	if u != nil {
		tc.SetCategoryID(*u)
	}
	return tc
}

// SetID sets the "id" field.
func (tc *TaskCreate) SetID(u uuid.UUID) *TaskCreate {
	tc.mutation.SetID(u)
	return tc
}

// SetTaskID sets the "task" edge to the Category entity by ID.
func (tc *TaskCreate) SetTaskID(id uuid.UUID) *TaskCreate {
	tc.mutation.SetTaskID(id)
	return tc
}

// SetNillableTaskID sets the "task" edge to the Category entity by ID if the given value is not nil.
func (tc *TaskCreate) SetNillableTaskID(id *uuid.UUID) *TaskCreate {
	if id != nil {
		tc = tc.SetTaskID(*id)
	}
	return tc
}

// SetTask sets the "task" edge to the Category entity.
func (tc *TaskCreate) SetTask(c *Category) *TaskCreate {
	return tc.SetTaskID(c.ID)
}

// SetUploadedFile sets the "uploaded_file" edge to the UploadedFile entity.
func (tc *TaskCreate) SetUploadedFile(u *UploadedFile) *TaskCreate {
	return tc.SetUploadedFileID(u.ID)
}

// AddCompletedTaskIDs adds the "completed_tasks" edge to the CompletedTask entity by IDs.
func (tc *TaskCreate) AddCompletedTaskIDs(ids ...uuid.UUID) *TaskCreate {
	tc.mutation.AddCompletedTaskIDs(ids...)
	return tc
}

// AddCompletedTasks adds the "completed_tasks" edges to the CompletedTask entity.
func (tc *TaskCreate) AddCompletedTasks(c ...*CompletedTask) *TaskCreate {
	ids := make([]uuid.UUID, len(c))
	for i := range c {
		ids[i] = c[i].ID
	}
	return tc.AddCompletedTaskIDs(ids...)
}

// Mutation returns the TaskMutation object of the builder.
func (tc *TaskCreate) Mutation() *TaskMutation {
	return tc.mutation
}

// Save creates the Task in the database.
func (tc *TaskCreate) Save(ctx context.Context) (*Task, error) {
	return withHooks(ctx, tc.sqlSave, tc.mutation, tc.hooks)
}

// SaveX calls Save and panics if Save returns an error.
func (tc *TaskCreate) SaveX(ctx context.Context) *Task {
	v, err := tc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (tc *TaskCreate) Exec(ctx context.Context) error {
	_, err := tc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (tc *TaskCreate) ExecX(ctx context.Context) {
	if err := tc.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (tc *TaskCreate) check() error {
	if _, ok := tc.mutation.Title(); !ok {
		return &ValidationError{Name: "title", err: errors.New(`ent: missing required field "Task.title"`)}
	}
	if _, ok := tc.mutation.Description(); !ok {
		return &ValidationError{Name: "description", err: errors.New(`ent: missing required field "Task.description"`)}
	}
	if _, ok := tc.mutation.Answer(); !ok {
		return &ValidationError{Name: "answer", err: errors.New(`ent: missing required field "Task.answer"`)}
	}
	return nil
}

func (tc *TaskCreate) sqlSave(ctx context.Context) (*Task, error) {
	if err := tc.check(); err != nil {
		return nil, err
	}
	_node, _spec := tc.createSpec()
	if err := sqlgraph.CreateNode(ctx, tc.driver, _spec); err != nil {
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
	tc.mutation.id = &_node.ID
	tc.mutation.done = true
	return _node, nil
}

func (tc *TaskCreate) createSpec() (*Task, *sqlgraph.CreateSpec) {
	var (
		_node = &Task{config: tc.config}
		_spec = sqlgraph.NewCreateSpec(task.Table, sqlgraph.NewFieldSpec(task.FieldID, field.TypeUUID))
	)
	if id, ok := tc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = &id
	}
	if value, ok := tc.mutation.Title(); ok {
		_spec.SetField(task.FieldTitle, field.TypeString, value)
		_node.Title = value
	}
	if value, ok := tc.mutation.Description(); ok {
		_spec.SetField(task.FieldDescription, field.TypeString, value)
		_node.Description = value
	}
	if value, ok := tc.mutation.Answer(); ok {
		_spec.SetField(task.FieldAnswer, field.TypeString, value)
		_node.Answer = value
	}
	if nodes := tc.mutation.TaskIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   task.TaskTable,
			Columns: []string{task.TaskColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(category.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.CategoryID = nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := tc.mutation.UploadedFileIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   task.UploadedFileTable,
			Columns: []string{task.UploadedFileColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(uploadedfile.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.UploadedFileID = nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := tc.mutation.CompletedTasksIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   task.CompletedTasksTable,
			Columns: []string{task.CompletedTasksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(completedtask.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// TaskCreateBulk is the builder for creating many Task entities in bulk.
type TaskCreateBulk struct {
	config
	err      error
	builders []*TaskCreate
}

// Save creates the Task entities in the database.
func (tcb *TaskCreateBulk) Save(ctx context.Context) ([]*Task, error) {
	if tcb.err != nil {
		return nil, tcb.err
	}
	specs := make([]*sqlgraph.CreateSpec, len(tcb.builders))
	nodes := make([]*Task, len(tcb.builders))
	mutators := make([]Mutator, len(tcb.builders))
	for i := range tcb.builders {
		func(i int, root context.Context) {
			builder := tcb.builders[i]
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*TaskMutation)
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
					_, err = mutators[i+1].Mutate(root, tcb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, tcb.driver, spec); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, tcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (tcb *TaskCreateBulk) SaveX(ctx context.Context) []*Task {
	v, err := tcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (tcb *TaskCreateBulk) Exec(ctx context.Context) error {
	_, err := tcb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (tcb *TaskCreateBulk) ExecX(ctx context.Context) {
	if err := tcb.Exec(ctx); err != nil {
		panic(err)
	}
}
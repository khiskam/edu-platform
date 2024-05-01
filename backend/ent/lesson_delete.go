// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/khiskam/edu-platform/backend/ent/lesson"
	"github.com/khiskam/edu-platform/backend/ent/predicate"
)

// LessonDelete is the builder for deleting a Lesson entity.
type LessonDelete struct {
	config
	hooks    []Hook
	mutation *LessonMutation
}

// Where appends a list predicates to the LessonDelete builder.
func (ld *LessonDelete) Where(ps ...predicate.Lesson) *LessonDelete {
	ld.mutation.Where(ps...)
	return ld
}

// Exec executes the deletion query and returns how many vertices were deleted.
func (ld *LessonDelete) Exec(ctx context.Context) (int, error) {
	return withHooks(ctx, ld.sqlExec, ld.mutation, ld.hooks)
}

// ExecX is like Exec, but panics if an error occurs.
func (ld *LessonDelete) ExecX(ctx context.Context) int {
	n, err := ld.Exec(ctx)
	if err != nil {
		panic(err)
	}
	return n
}

func (ld *LessonDelete) sqlExec(ctx context.Context) (int, error) {
	_spec := sqlgraph.NewDeleteSpec(lesson.Table, sqlgraph.NewFieldSpec(lesson.FieldID, field.TypeUUID))
	if ps := ld.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	affected, err := sqlgraph.DeleteNodes(ctx, ld.driver, _spec)
	if err != nil && sqlgraph.IsConstraintError(err) {
		err = &ConstraintError{msg: err.Error(), wrap: err}
	}
	ld.mutation.done = true
	return affected, err
}

// LessonDeleteOne is the builder for deleting a single Lesson entity.
type LessonDeleteOne struct {
	ld *LessonDelete
}

// Where appends a list predicates to the LessonDelete builder.
func (ldo *LessonDeleteOne) Where(ps ...predicate.Lesson) *LessonDeleteOne {
	ldo.ld.mutation.Where(ps...)
	return ldo
}

// Exec executes the deletion query.
func (ldo *LessonDeleteOne) Exec(ctx context.Context) error {
	n, err := ldo.ld.Exec(ctx)
	switch {
	case err != nil:
		return err
	case n == 0:
		return &NotFoundError{lesson.Label}
	default:
		return nil
	}
}

// ExecX is like Exec, but panics if an error occurs.
func (ldo *LessonDeleteOne) ExecX(ctx context.Context) {
	if err := ldo.Exec(ctx); err != nil {
		panic(err)
	}
}

import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args/status.args';
import { AggregationsType } from './types/aggregations.type';

@Resolver( () => Todo )
export class TodoResolver {
    constructor(
        private readonly todoService: TodoService
    ) {}

    @Query( () => [Todo], { name: 'todos' } )
    findAll( @Args() status: StatusArgs ): Todo[] {
        return this.todoService.findAll( status );
    }

    @Query( () => Todo, { name: 'todo' } )
    findOne( @Args('id', { type: () => Int }) id: number ): Todo {
        return this.todoService.findOne( id );
    }

    @Mutation( () => Todo, { name: 'createTodo' } )
    createTodo( @Args('createTodoInput') createTodoInput: CreateTodoInput ): Todo {
        return this.todoService.create( createTodoInput );
    }

    @Mutation( () => Todo, { name: 'updateTodo' } )
    updateTodo( @Args('updateTodoInput') updateTodoInput: UpdateTodoInput ): Todo {
        return this.todoService.update( updateTodoInput );
    }

    @Mutation( () => Boolean )
    removeTodo( @Args('id', { type: () => Int }) id: number ) {
        return this.todoService.delete( id );
    }

    @Query( () => Int, { name: 'allTodos' } )
    allTodos(): number {
        return this.todoService.totalTodos;
    }

    @Query( () => Int, { name: 'completedTodos' } )
    completedTodo(): number {
        return this.todoService.totalTodosCompleted;
    }

    @Query( () => Int, { name: 'pendingTodos' } )
    pendingTodos(): number {
        return this.todoService.totalTodosPending;
    }

    @Query( () => AggregationsType )
    aggreation(): AggregationsType {
        return {
            completed: this.todoService.totalTodosCompleted,
            pending: this.todoService.totalTodosPending,
            total: this.todoService.totalTodos,
            totalTodosCompleted: this.todoService.totalTodosCompleted
        }
    }
}

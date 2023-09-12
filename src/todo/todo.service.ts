import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';

@Injectable()
export class TodoService {
    private todos: Todo[] = [
        { id: 1, description: 'Gema del Alma', done: false },
        { id: 2, description: 'Gema de la Mente', done: false },
        { id: 3, description: 'Gema del Poder', done: false },
    ];

    findAll(): Todo[] {
        return this.todos;
    }

    findOne( id: number ): Todo {
        const todo = this.todos.find( todo => todo.id === id );

        if( !todo ) throw new NotFoundException(`La tarea con el id ${ id } no fue encontrado.`);

        return todo;
    }

    create( createTodoInput: CreateTodoInput ): Todo {
        const todo = new Todo();
        todo.description = createTodoInput.description;
        todo.id = Math.max( ...this.todos.map( todo => todo.id ), 0 ) + 1;

        this.todos.push( todo );

        return todo;
    }

    update( updateTodoInput: UpdateTodoInput ): Todo {
        const { id, description, done } = updateTodoInput;
        const todoUpdate = this.findOne( id );

        if( description ) todoUpdate.description = description;
        if( done !== undefined ) todoUpdate.done = done;

        this.todos = this.todos.map( todo => {
            if( todo.id === id ) {
                return todoUpdate;
            }

            return todo
        });

        return todoUpdate;
    }

    delete( id: number ) {
        const todo = this.findOne( id );

        this.todos = this.todos.filter( todo => todo.id !== id );

        return true;
    }
}

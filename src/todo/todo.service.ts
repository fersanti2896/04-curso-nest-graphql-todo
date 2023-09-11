import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';

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
}

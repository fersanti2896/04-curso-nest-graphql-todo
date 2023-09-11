import { Injectable } from '@nestjs/common';
import { Todo } from './entity/todo.entity';

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
}

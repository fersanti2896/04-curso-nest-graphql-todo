import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
    @Field( () => String, { description: 'Descripción de la tarea.' } )
    description: string;
}
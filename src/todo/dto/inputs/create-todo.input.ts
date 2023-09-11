import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @Field( () => String, { description: 'Descripción de la tarea.' } )
    description: string;
}
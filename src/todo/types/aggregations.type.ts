import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Tarea agregaciones' })
export class AggregationsType {
    @Field( () => Int )
    total: number;

    @Field( () => Int )
    pending: number;

    @Field( () => Int )
    completed: number;

    @Field( () => Int, { deprecationReason: 'No usar totalTodosCompleted - Obsoleto' } )
    totalTodosCompleted: number;
}
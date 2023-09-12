import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MaxLength, IsInt, Min, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class UpdateTodoInput {
    @Field( () => Int )
    @IsInt()
    @Min(1)
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @IsOptional()
    @Field( () => String, { description: 'Descripción de la tarea.', nullable: true } )
    description?: string;
    
    @Field( () => Boolean, { nullable: true } )
    @IsOptional()
    @IsBoolean()
    done?: boolean;
}
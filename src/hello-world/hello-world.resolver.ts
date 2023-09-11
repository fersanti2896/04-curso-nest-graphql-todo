import { Args, Int, Float, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
    @Query( () => String, { name: 'hello', description: 'Hola mundo es lo que retorna.' } )
    helloWorld(): string {
        return 'Hola mundo';
    }

    @Query( () => Float, { name: 'random', description: 'Devuelve un número aleatorio.' } )
    getRandomNumber(): number {
        return Math.random() * 100;
    }

    @Query( () => Int, { name: 'randomFromZeroTo', description: 'Devuelve un número hasta el rango o por defecto 10.' } )
    getRandomFromZeroTo( 
        @Args('to', { type: () => Int, nullable: true }) to: number = 10 
    ): number {
        return Math.floor(Math.random() * to);
    }
}

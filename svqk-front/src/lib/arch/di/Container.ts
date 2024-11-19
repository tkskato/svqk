import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import '$lib/arch/di/di.config';

let container: Container | null = null;

export const getContainer = () => {
    container = new Container();
    container.load(buildProviderModule());

    return container
}

import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import 'reflect-metadata'

export const initContainer = () => {
    const container = new Container();
    container.load(buildProviderModule());
    return container
}

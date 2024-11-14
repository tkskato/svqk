import { Container } from 'inversify';
import 'reflect-metadata';
import { MasterStore } from '$lib/arch/MasterStore';
import { TYPES } from '$lib/types';

const container = new Container();
container.bind<MasterStore>(TYPES.MasterStore).to(MasterStore);

export { container };

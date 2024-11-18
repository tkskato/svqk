import { provide } from 'inversify-binding-decorators';
import { TYPES } from '$lib/arch/types';
import { MasterStoreBase } from './MasterStoreBase';
import { multiInject } from 'inversify';

type Fetch = typeof fetch;

@provide(TYPES.LoadExecutor)
export class LoadExecutor {
  masterStores: MasterStoreBase<unknown>[];

  constructor(@multiInject(TYPES.MasterStore) stores: MasterStoreBase<unknown>[]) {
    this.masterStores = stores;
  }

  async execute(fetch: Fetch) {
    // FIXME
    console.log('executed: LoadExecutor#execute');

    await Promise.all(this.masterStores.map((m) => m.load(fetch)));
  }
}

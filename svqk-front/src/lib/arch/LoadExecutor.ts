import { TYPES } from '$lib/arch/di/types';
import { MasterStoreBase } from '$lib/arch/MasterStoreBase';
import { multiInject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

type Fetch = typeof fetch;

@provide(TYPES.LoadExecutor)
export class LoadExecutor {
  masterStores: MasterStoreBase<unknown>[];

  constructor(@multiInject(TYPES.MasterStore) stores: MasterStoreBase<unknown>[]) {
    this.masterStores = stores;
  }

  async loadAll(fetch: Fetch) {
    // FIXME
    console.log('executed: LoadExecutor#execute');

    await Promise.all(this.masterStores.map((m) => m.load(fetch)));
  }
}

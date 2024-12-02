import { multiInject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { TYPES } from '$lib/arch/di/types';
import { MasterStoreBase } from '$lib/arch/MasterStoreBase';

type Fetch = typeof fetch;

@provide(TYPES.LoadExecutor)
export class LoadExecutor {
  constructor(@multiInject(TYPES.MasterStore) private readonly stores: MasterStoreBase<unknown>[]) { }

  async loadAll(fetch: Fetch) {
    // FIXME
    console.log('executed: LoadExecutor#execute');

    await Promise.all(this.stores.map((m) => m.load(fetch)));
  }
}

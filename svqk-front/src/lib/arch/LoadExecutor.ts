import { provide } from 'inversify-binding-decorators';
// import 'reflect-metadata';
import { TYPES } from '$lib/arch/types';
import { MasterStoreBase } from './MasterStoreBase';
import { multiInject } from 'inversify';
// FIXME
import { TrackerMasterStore } from '$lib/domain/issue/TrackerMasterStore';
import { IssueStatusMasterStore } from '$lib/domain/issue/IssueStatusMasterStore';

type Fetch = typeof fetch;

@provide(TYPES.LoadExecutor)
export class LoadExecutor {
  stores: MasterStoreBase<any>[];

  constructor(@multiInject(TYPES.MasterStore) stores: MasterStoreBase<any>[]) {
    this.stores = stores;
  }

  async execute(fetch: Fetch) {
    // FIXME
    console.log('LoadExecutor...');

    await Promise.all(this.stores.map((m) => m.createIndStore(fetch)));
  }
}

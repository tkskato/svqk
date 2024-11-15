import { provide } from 'inversify-binding-decorators';
import { TYPES } from '$lib/arch/types';
import { MasterStoreBase } from '$lib/arch/MasterStoreBase';
import type { TrackerModel } from '$lib/arch/api/Api';
import { readable } from 'svelte/store';

type Fetch = typeof fetch;

export let trackers = readable([] as TrackerModel[]);

@provide(TYPES.MasterStore)
export class TrackerMasterStore extends MasterStoreBase<TrackerModel> {
  override async createIndStore(fetch: Fetch) {
    // FIXME
    console.log('TrackerMasterStore.....');

    await super.createStore(fetch, (api) => api.tracker.trackerList());
    trackers = this.store;
  }
}

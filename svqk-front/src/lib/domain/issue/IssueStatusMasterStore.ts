import { provide } from 'inversify-binding-decorators';
import { TYPES } from '$lib/arch/types';
import { MasterStoreBase } from '$lib/arch/MasterStoreBase';
import type { IssueStatusModel } from '$lib/arch/api/Api';
import { readable } from 'svelte/store';

type Fetch = typeof fetch;

export let issueStatuses = readable([] as IssueStatusModel[]);

@provide(TYPES.MasterStore)
export class IssueStatusMasterStore extends MasterStoreBase<IssueStatusModel> {
  override async createIndStore(fetch: Fetch) {
    // FIXME
    console.log('IssueStatusMasterStore.....');

    await super.createStore(fetch, (api) => api.issueStatuses.issueStatusesList());
    issueStatuses = this.store;
  }
}

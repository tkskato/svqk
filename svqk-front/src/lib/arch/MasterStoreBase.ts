import { readable, readonly, writable, type Writable } from 'svelte/store';
import { provide } from 'inversify-binding-decorators';
import { TYPES } from '$lib/arch/types';
import ApiHandler from '$lib/arch/api/ApiHandler';
import type { Api, HttpResponse } from './api/Api';

type Fetch = typeof fetch;

@provide(TYPES.MasterStore)
export class MasterStoreBase<T> {
  protected storeW: Writable<T[]>;
  protected store = readable([] as T[]);

  constructor() {
    this.storeW = writable([] as T[]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createIndStore(fetch: Fetch) {
    // FIXME
    console.log('MasterStoreBase.....');
  }

  async createStore(
    fetch: Fetch,
    apiCall: (api: Api<unknown>) => Promise<HttpResponse<T[], unknown>>
  ) {
    const response = (await ApiHandler.handle<T[]>(fetch, apiCall))!;

    this.storeW.set(response);
    this.store = readonly(this.storeW);
  }
}

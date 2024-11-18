import { readable, readonly, writable, type Writable } from 'svelte/store';
import { provide } from 'inversify-binding-decorators';
import { TYPES } from '$lib/arch/types';
import type { Api, HttpResponse } from '$lib/arch/api/Api';
import ApiHandler from '$lib/arch/api/ApiHandler';

type Fetch = typeof fetch;
type ApiCallFactory<T> = (api: Api<unknown>) => Promise<HttpResponse<T, unknown>>;

@provide(TYPES.MasterStore)
export class MasterStoreBase<T> {
  protected apiCall: ApiCallFactory<T>;
  protected storeW: Writable<T>;
  protected store = readable([] as T);

  constructor(apiCall: ApiCallFactory<T>) {
    this.apiCall = apiCall;
    this.storeW = writable([] as T);
  }
  
  async load(fetch: Fetch) {
    // FIXME
    console.log('executed: MasterStoreBase#load');

    if (!this.apiCall) return;

    const response = (await ApiHandler.handle<T>(fetch, this.apiCall))!;

    this.storeW.set(response);
    this.store = readonly(this.storeW);
  }
}

import { readable } from 'svelte/store';
import { provide } from 'inversify-binding-decorators';
import { TYPES } from '$lib/arch/di/types';
import type { Api, HttpResponse } from '$lib/arch/api/Api';
import ApiHandler from '$lib/arch/api/ApiHandler';

type Fetch = typeof fetch;
type ApiCall<T> = (api: Api<unknown>) => Promise<HttpResponse<T, unknown>>;

@provide(TYPES.MasterStore)
export class MasterStoreBase<T> {
  private readonly apiCall: ApiCall<T>;
  protected store = readable([] as T);

  constructor(apiCall: ApiCall<T>) {
    this.apiCall = apiCall;
  }
  
  async load(fetch: Fetch) {
    // FIXME
    console.log('executed: MasterStoreBase#load');

    if (!this.apiCall) return;

    const response = (await ApiHandler.handle<T>(fetch, this.apiCall))!;

    this.store = readable(response);
  }
}
import { injectable } from 'inversify';
import { writable } from 'svelte/store';

type Fetch = typeof fetch;

interface MasterBaseModel {}

const modelW = writable([] as MasterBaseModel[]);

@injectable()
export class MasterStore {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async loadAll(fetch: Fetch) {
    modelW.set([]);
  }
}

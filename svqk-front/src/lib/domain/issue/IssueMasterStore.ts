import { injectable } from 'inversify';
import { MasterStore } from '$lib/arch/MasterStore';
import type { IssueStatusModel, TrackerModel } from '$lib/arch/api/Api';
import ApiHandler from '$lib/arch/api/ApiHandler';
import { readonly, writable } from 'svelte/store';

type Fetch = typeof fetch;

const issueStatusesW = writable([] as IssueStatusModel[]);
export const issueStatuses = readonly(issueStatusesW);

const trackersW = writable([] as TrackerModel[]);
export const trackers = readonly(trackersW);

@injectable()
export class IssueStoreMaster extends MasterStore {
  async loadAll(fetch: Fetch) {
    Promise.all([this.loadIssueStatuses(fetch), this.loadTrackers(fetch)]);
  }

  private async loadIssueStatuses(fetch: Fetch) {
    const response = (await ApiHandler.handle<IssueStatusModel[]>(fetch, (api) =>
      api.issueStatuses.issueStatusesList()
    ))!;

    issueStatusesW.set(response);
  }

  private async loadTrackers(fetch: Fetch) {
    const response = (await ApiHandler.handle<TrackerModel[]>(fetch, (api) =>
      api.tracker.trackerList()
    ))!;

    trackersW.set(response);
  }
}

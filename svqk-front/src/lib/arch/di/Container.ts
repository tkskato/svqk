import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import 'reflect-metadata'
import { TrackerMasterStore } from '$lib/domain/issue/TrackerMasterStore';
import { IssueStatusMasterStore } from '$lib/domain/issue/IssueStatusMasterStore';

let container: Container | null = null;

export const getContainer = () => {
    container = new Container();
    container.load(buildProviderModule());

    return container
}

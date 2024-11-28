import 'reflect-metadata';
import type { LayoutLoad } from './$types';
import { loadTranslations } from '$lib/translations';
import { getContainer } from '$lib/arch/di/Container';
import { LoadExecutor } from '$lib/arch/LoadExecutor';
import { TYPES } from '$lib/arch/di/types';
import { autoProvide } from 'inversify-binding-decorators';
import * as diEntries from '$lib/di.entries';

export const ssr = false;

export const load: LayoutLoad = async ({ fetch }) => {
  const userLang = navigator.language;
  await loadTranslations(userLang);

  const container = getContainer();
  // autoProvide(container, diEntries);
  const loadExecutor = container.get<LoadExecutor>(TYPES.LoadExecutor);
  await loadExecutor.loadAll(fetch);
};

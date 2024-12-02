import 'reflect-metadata';
import type { LayoutLoad } from './$types';
import { loadTranslations } from '$lib/translations';
import { LoadExecutor } from '$lib/arch/LoadExecutor';
import { TYPES } from '$lib/arch/di/types';
import { DIContainer } from '$lib/arch/di/Container';

export const ssr = false;

export const load: LayoutLoad = async ({ fetch }) => {
  const userLang = navigator.language;
  await loadTranslations(userLang);

  const container = DIContainer.getInstance();
  const loadExecutor = container.get<LoadExecutor>(TYPES.LoadExecutor);
  await loadExecutor.loadAll(fetch);
};

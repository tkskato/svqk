import { loadTranslations } from '$lib/translations';
import type { LayoutLoad } from './$types';
import 'reflect-metadata';
import { TYPES } from '$lib/arch/types';
import { initContainer } from '$lib/arch/di/Container';
import { LoadExecutor } from '$lib/arch/LoadExecutor';

export const load: LayoutLoad = async ({ fetch }) => {
  const userLang = navigator.language;
  await loadTranslations(userLang);

  const container = initContainer();
  const loadExecutor = container.get<LoadExecutor>(TYPES.LoadExecutor);
  await loadExecutor.execute(fetch);

  return {};
};

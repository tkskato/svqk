import type { LayoutLoad } from './$types';
import { loadTranslations } from '$lib/translations';
import { getContainer } from '$lib/arch/di/Container';
import { LoadExecutor } from '$lib/arch/LoadExecutor';
import { TYPES } from '$lib/arch/di/types';

export const load: LayoutLoad = async ({ fetch }) => {
  const userLang = navigator.language;
  await loadTranslations(userLang);

  const container = getContainer();
  const loadExecutor = container.get<LoadExecutor>(TYPES.LoadExecutor);
  await loadExecutor.execute(fetch);

  return {};
};

import { container } from '$lib/inversify.config';
import { MasterStore } from '$lib/arch/MasterStore';
import { TYPES } from '$lib/types';
import { loadTranslations } from '$lib/translations';
import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = async ({ fetch }) => {
  const userLang = navigator.language;
  await loadTranslations(userLang);

  const masterStore = container.get<MasterStore>(TYPES.MasterStore);
  await masterStore.loadAll(fetch);

  return {};
};

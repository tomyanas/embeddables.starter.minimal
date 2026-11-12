import { analytics } from '@embeddables/analytics/react';
import { forms } from '@embeddables/forms/react';
import type { EmbeddablesReactModule } from '@embeddables/core/react';

export const modules: readonly EmbeddablesReactModule[] = [analytics({ recordSessionReplay: true }), forms()];

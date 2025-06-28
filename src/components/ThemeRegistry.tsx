'use client';

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const emotionCache = React.useRef(createEmotionCache()).current;

  return (
    <CacheProvider value={emotionCache}>
      {children}
    </CacheProvider>
  );
}

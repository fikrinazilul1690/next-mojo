'use client';

import { NextUIProvider } from '@nextui-org/react';

export function NextUILibProvider({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

'use client';

import { Toaster as ReactHotToaster } from 'react-hot-toast';

export default function Toaster() {
  return (
    <ReactHotToaster
      containerStyle={{
        top: 70,
        left: 20,
        bottom: 20,
        right: 20,
      }}
    />
  );
}

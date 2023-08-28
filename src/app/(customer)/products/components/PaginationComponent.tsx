'use client';

import { Pagination } from '@nextui-org/react';

type Props = {
  className: string;
};

export default function PaginationComponent(props: Props) {
  return (
    <Pagination
      variant='light'
      total={10}
      initialPage={1}
      showControls
      color='default'
      {...props}
    />
  );
}

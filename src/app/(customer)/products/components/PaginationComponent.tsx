'use client';

import { Pagination } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  className: string;
  metadata: MojoMetadata;
};

export default function PaginationComponent({ className, metadata }: Props) {
  const offset: number = metadata.offset || 0;
  const limit: number = metadata.limit || 0;
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Pagination
      variant='light'
      total={metadata.page_count}
      initialPage={Math.ceil(offset / limit) + 1}
      showControls
      color='default'
      className={className}
      onChange={(page) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        current.set('page', page.toString());
        router.push('/products?' + current);
      }}
    />
  );
}

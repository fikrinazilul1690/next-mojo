'use client';

import { SearchIcon } from './SearchIcon';
import { Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

type Props = {
  className: string;
};

export default function Search(props: Props) {
  const searchParams = useSearchParams();

  const search = searchParams.get('search');

  const [searchValue, setSearchValue] = useState<string>(search || '');

  useEffect(() => {
    setSearchValue(search || '');

    return () => {
      setSearchValue('');
    };
  }, [search]);

  return (
    <Input
      id='search'
      label='Search'
      isClearable
      variant='bordered'
      radius='lg'
      {...props}
      autoFocus={!!search}
      placeholder='Type to search...'
      value={searchValue}
      onClear={() => setSearchValue('')}
      onChange={(e) => setSearchValue(e.target.value)}
      startContent={
        <SearchIcon className='text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0' />
      }
    />
  );
}

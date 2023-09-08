'use client';
import { filterFeaturedProduct, useDispatch } from '@/lib/redux';
import { RadioGroup } from '@nextui-org/react';
import { CustomRadio } from './CustomRadio';
import { useState, useEffect } from 'react';

type Props = {
  categories: Category[];
};

export default function CategoryFilter({ categories }: Props) {
  const dispatch = useDispatch();
  // if necessary change with redux
  const [selected, setSelected] = useState<string>('');
  useEffect(() => {
    console.log(selected);
    dispatch(
      filterFeaturedProduct({
        category: selected,
        limit: 6,
        offset: 0,
      })
    );
  }, [selected]);

  return (
    <RadioGroup
      className='gap-1 max-w-md'
      orientation='horizontal'
      value={selected}
      onValueChange={setSelected}
    >
      <CustomRadio value=''>all</CustomRadio>
      {categories.map((val) => (
        <CustomRadio key={val.name} value={val.name}>
          {val.name}
        </CustomRadio>
      ))}
    </RadioGroup>
  );
}

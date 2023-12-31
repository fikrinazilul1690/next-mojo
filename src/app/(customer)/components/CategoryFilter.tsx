'use client';

import { RadioGroup } from '@nextui-org/react';
import { CustomRadio } from './CustomRadio';

type Props = {
  categories: Category[];
  onValueChange: (params: string) => void;
  currentValue: string;
  defaultValue: string;
  labelDefaultValue: string;
};

// Todo: integrate with rtk query and revalidate

export default function CategoryFilter({
  categories,
  onValueChange,
  defaultValue,
  labelDefaultValue,
  currentValue,
}: Props) {
  return (
    <RadioGroup
      className='gap-1 max-sm:w-40 justify-center'
      classNames={{
        wrapper:
          'max-sm:justify-start flex-nowrap max-sm:overflow-x-scroll overflow-hidden',
      }}
      orientation='horizontal'
      value={currentValue}
      onValueChange={onValueChange}
    >
      <CustomRadio value={defaultValue}>{labelDefaultValue}</CustomRadio>
      {categories.map((val) => (
        <CustomRadio key={val.name} value={val.name}>
          {val.name}
        </CustomRadio>
      ))}
    </RadioGroup>
  );
}

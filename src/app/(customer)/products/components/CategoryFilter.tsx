'use client';
import { RadioGroup, Radio } from '@nextui-org/react';

type Props = {
  className?: string;
};

export default function CategoryFilter(props: Props) {
  return (
    <RadioGroup color='default' label='Kategori' {...props}>
      <Radio value='buenos-aires'>Meja</Radio>
      <Radio value='sydney'>Kursi</Radio>
      <Radio value='san-francisco'>Lemari</Radio>
      <Radio value='london'>Sofa</Radio>
      <Radio value='tokyo'>Spring bed</Radio>
    </RadioGroup>
  );
}

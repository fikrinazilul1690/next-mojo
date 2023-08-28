'use client';

import SwitchInput from '../../components/SwitchInput';
import CustomInput from '../../components/CustomInput';
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Input,
} from '@nextui-org/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState, useMemo } from 'react';

export default function TambahProduk() {
  const [optionFields, setOptionFields] = useState<Option[] | undefined>(
    undefined
  );
  const [variantFields, setVariantFields] = useState<Selection[] | undefined>(
    undefined
  );
  const [selectedKeys, setSelectedKeys] = useState(new Set(['']));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  );
  return (
    <div className='bg-[#eaeaea] text-left ml-9'>
      <h1 className='font-bold text-xl my-5'>Tambah Produk</h1>
      <div className='bg-white rounded-lg max-w-6xl px-2 py-3 grid gap-3'>
        <div className='grid gap-y-4 gap-x-11 grid-cols-2 grid-rows-3'>
          <CustomInput id='productName' label='Nama Product' />
          <CustomInput id='category' label='Kategory' />
          <CustomInput
            id='weight'
            label='Berat (Kg)'
            placeholder='Berat'
            type='number'
          />
          <CustomInput
            id='length'
            label='Panjang (Cm)'
            placeholder='Panjang'
            type='number'
          />
          <CustomInput
            id='width'
            label='Lebar (Cm)'
            placeholder='Lebar'
            type='number'
          />
          <CustomInput
            id='height'
            label='Tinggi (Cm)'
            placeholder='Tinggi'
            type='number'
          />
        </div>
        <div className='grid grid-cols-4 gap-11'>
          <SwitchInput id='available' label='Available' />
          <SwitchInput id='fetured' label='Unggulan' />
          <SwitchInput id='customizable' label='Kustom' />
        </div>
        <div>
          <Button
            className='font-bold'
            variant='bordered'
            endContent={<AiOutlinePlus size={18} />}
          >
            Tambah Variant
          </Button>
        </div>
        <div className='grid grid-cols-12 items-center'>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant='flat'
                className='capitalize bg-transparent font-semibold col-span-2'
              >
                {selectedValue || 'Variant'}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label='Single selection actions'
              variant='flat'
              disallowEmptySelection
              selectionMode='single'
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys as any}
            >
              <DropdownItem key='Warna' value='color'>
                Warna
              </DropdownItem>
              <DropdownItem key='Bahan' value='material'>
                Bahan
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Input
            variant='bordered'
            className='col-start-4 col-end-12 bg-transparent'
            size='sm'
            type='text'
            label={selectedValue || 'Variant Options'}
          />
        </div>
        <div className='grid gap-y-4 gap-x-11 grid-cols-2'>
          <CustomInput id='stock' type='number' label='Stok' />
          <CustomInput id='price' type='number' label='Harga' />
        </div>
      </div>
    </div>
  );
}

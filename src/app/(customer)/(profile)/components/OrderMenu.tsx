'use client';

import {
  TbCurrencyDollarOff,
  TbProgress,
  TbTruckDelivery,
  TbCheck,
} from 'react-icons/tb';

import { ImCancelCircle } from 'react-icons/im';

import { Accordion, AccordionItem } from '@nextui-org/react';

const defaultContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export default function OrderMenu() {
  return (
    <Accordion variant='splitted'>
      <AccordionItem
        key='1'
        aria-label='Belum Bayar'
        startContent={<TbCurrencyDollarOff size={20} />}
        title='Belum Bayar'
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key='2'
        aria-label='Sedang diproses'
        startContent={<TbProgress size={20} />}
        title='Sedang diproses'
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key='3'
        aria-label='Sedang dikirim'
        startContent={<TbTruckDelivery size={20} />}
        title='Sedang dikirim'
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key='4'
        aria-label='Selesai'
        classNames={{ subtitle: 'text-danger' }}
        startContent={<TbCheck size={20} />}
        title='Selesai'
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key='4'
        aria-label='Batal'
        classNames={{ subtitle: 'text-danger' }}
        startContent={<ImCancelCircle size={20} />}
        title='Batal'
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
}

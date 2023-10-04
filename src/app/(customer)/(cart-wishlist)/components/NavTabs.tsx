'use client';
import { Tabs, Tab } from '@nextui-org/tabs';

export default function NavTabs() {
  return (
    <Tabs variant='underlined' size='lg' aria-label='Tabs variants'>
      <Tab key='cart' title='Cart' />
      <Tab key='wishlist' title='Wishlist' />
    </Tabs>
  );
}

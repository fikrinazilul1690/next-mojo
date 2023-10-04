'use client';
import { Card, CardBody } from '@nextui-org/card';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/modal';
import { cn, useDisclosure } from '@nextui-org/react';
import Image from 'next/image';
import { useCheckout } from '@/app/store/CheckoutContext';
import useStore from '@/lib/hooks/useStore';

type Props = {
  icon: JSX.Element;
};

const listBank: Array<{
  code: Bank;
  name: string;
  imageUrl: string;
}> = [
  {
    code: 'bca',
    name: 'Bank BCA',
    imageUrl: '/bca.png',
  },
  {
    code: 'bni',
    name: 'Bank BNI',
    imageUrl: '/bni.png',
  },
  {
    code: 'bri',
    name: 'Bank BRI',
    imageUrl: '/bri.png',
  },
  {
    code: 'permata',
    name: 'Bank Permata',
    imageUrl: '/permata_bank.png',
  },
];

export default function BankCard({ icon }: Props) {
  const checkout = useCheckout();
  const setBankToStorage = checkout((state) => state.setBank);
  const { data: bank, isLoading } = useStore(checkout, (state) => state.bank);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card shadow='none' onClick={onOpen} isPressable isHoverable fullWidth>
        <CardBody className='flex-row justify-between items-center'>
          {!!bank ? (
            <Image
              alt={bank}
              src={listBank.find((val) => val.code === bank)?.imageUrl ?? ''}
              width={120}
              height={100}
            />
          ) : (
            <span>Pilih Bank</span>
          )}
          {icon}
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Select Address
              </ModalHeader>
              <ModalBody>
                <RadioGroup
                  value={bank}
                  onValueChange={(v) => setBankToStorage(v as Bank)}
                >
                  {listBank.map((bank) => (
                    <Radio
                      classNames={{
                        base: cn(
                          'inline-flex max-w-md m-0 w-full bg-content1 hover:bg-content2 items-center justify-between',
                          'flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
                          'data-[selected=true]:border-primary'
                        ),
                      }}
                      value={bank.code}
                      key={bank.code}
                    >
                      <Image
                        alt={bank.name}
                        src={bank.imageUrl}
                        width={120}
                        height={100}
                      />
                    </Radio>
                  ))}
                </RadioGroup>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

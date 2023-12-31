'use client';
import { Card, CardBody } from '@nextui-org/card';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/modal';
import { cn, useDisclosure } from '@nextui-org/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import getAddresses from '@/lib/getAddresses';
import { useCheckout } from '@/app/store/CheckoutContext';
import { useSession } from 'next-auth/react';

type Props = {
  icon: JSX.Element;
};

export default function AddressCard({ icon }: Props) {
  const checkout = useCheckout();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const address = checkout((state) => state.address);
  const setAddress = checkout((state) => state.setAddress);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: res } = useQuery({
    queryKey: ['addresses', session?.accessToken],
    queryFn: async ({ signal }) => {
      const accessToken = session?.accessToken ?? '';
      const data = await getAddresses(accessToken, { signal });
      return data;
    },
    initialData: () => {
      return queryClient.getQueryData(['address']);
    },
    enabled: !!session?.accessToken,
  });

  return (
    <>
      <Card shadow='none' onClick={onOpen} isPressable isHoverable fullWidth>
        <CardBody className='flex-row justify-between items-center'>
          {!!address ? (
            <div className='flex flex-col items-start gap-0'>
              <div className='flex gap-1 items-center'>
                <h4 className='text-base font-bold'>{address?.contact_name}</h4>
                <p className='text-sm tracking-wide'>{`+${address?.contact_phone}`}</p>
              </div>
              <p className='text-sm'>{address?.address}</p>
              <span className='font-bold text-xs flex gap-2'>
                note: <p className='font-normal'>{address.note || '-'}</p>
              </span>
            </div>
          ) : (
            <span>Pilih Alamat</span>
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
                  defaultValue={address?.id.toString()}
                  onValueChange={(v) => {
                    const selected = res?.data.find(
                      (address) => address.id === Number(v)
                    );
                    if (selected) {
                      setAddress(selected);
                    }
                  }}
                >
                  {res?.data.map((address) => (
                    <Radio
                      classNames={{
                        base: cn(
                          'inline-flex max-w-md m-0 w-full bg-content1 hover:bg-content2 items-center justify-between',
                          'flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
                          'data-[selected=true]:border-primary'
                        ),
                      }}
                      value={address.id.toString()}
                      key={address.id}
                    >
                      <div className='flex flex-col items-start gap-0'>
                        <div className='flex gap-1 items-center'>
                          <h4 className='text-base font-bold'>
                            {address.contact_name}
                          </h4>
                          <p className='text-sm tracking-wide'>
                            {`(+${address.contact_phone})`}
                          </p>
                        </div>
                        <p className='text-sm'>{address.address}</p>
                        <span className='font-bold text-xs flex gap-2'>
                          note:{' '}
                          <p className='font-normal'>{address.note || '-'}</p>
                        </span>
                      </div>
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

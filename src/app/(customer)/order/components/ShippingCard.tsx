'use client';
import { Card, CardBody } from '@nextui-org/card';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/modal';
import { cn, useDisclosure } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import getPricing from '@/lib/getPricing';
import { formatIDR } from '@/lib/formatIDR';
import { useCheckout } from '@/app/store/CheckoutContext';
import { useSession } from 'next-auth/react';

type Props = {
  icon: JSX.Element;
};

export default function ShippingCard({ icon }: Props) {
  const checkout = useCheckout();
  const { data: session } = useSession();
  const address = checkout((state) => state.address);
  const items = checkout((state) => state.items);
  const courierService = checkout((state) => state.courierService);
  const setCourier = checkout((state) => state.setCourier);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: res } = useQuery({
    queryKey: ['shipping', session?.accessToken, address?.id],
    queryFn: async ({ signal }) => {
      const accessToken = session?.accessToken ?? '';
      const data = await getPricing(
        {
          accessToken,
          payload: {
            address_id: address?.id ?? 0,
            items:
              items?.map<Item>((item) => ({
                sku: item.sku,
                quantity: item.quantity,
              })) ?? [],
          },
        },
        { signal }
      );

      return data;
    },
    enabled: !!session?.accessToken && items?.length !== 0 && !!address,
  });

  return (
    <>
      <Card shadow='none' onClick={onOpen} isPressable isHoverable fullWidth>
        <CardBody className='flex-row justify-between items-center'>
          {!!courierService ? (
            <div className='flex flex-col items-start gap-0'>
              <div className='flex gap-1 items-center'>
                <h4 className='text-base font-bold'>
                  {courierService.courier_name}
                </h4>
                <p className='text-sm tracking-wide'>
                  {courierService.courier_service_name}
                </p>
              </div>
              <p className='text-sm'>{courierService.duration}</p>
              <span className='font-bold text-lg'>
                {formatIDR(courierService.price, {
                  maximumSignificantDigits: 3,
                })}
              </span>
            </div>
          ) : (
            <span>Pilih Pengiriman</span>
          )}
          {icon}
        </CardBody>
      </Card>
      <Modal
        isOpen={isOpen}
        scrollBehavior='inside'
        onOpenChange={onOpenChange}
        placement='top'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Select Courier Service
              </ModalHeader>
              <ModalBody>
                <RadioGroup
                  value={`${courierService?.courier_code}-${courierService?.courier_service_code}`}
                  onValueChange={(v) => {
                    const value = v.split('-');
                    const selected = res?.data.pricing.find(
                      (pricing) =>
                        pricing.courier_code === value[0] &&
                        pricing.courier_service_code === value[1]
                    );
                    if (selected) {
                      setCourier(selected);
                    }
                  }}
                >
                  {res?.data.pricing.map((pricing) => (
                    <Radio
                      classNames={{
                        base: cn(
                          'inline-flex max-w-md m-0 w-full bg-content1 hover:bg-content2 items-center justify-between',
                          'flex-row-reverse cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
                          'data-[selected=true]:border-primary'
                        ),
                      }}
                      value={`${pricing.courier_code}-${pricing.courier_service_code}`}
                      key={`${pricing.courier_code}-${pricing.courier_service_code}`}
                    >
                      <div className='flex flex-col items-start gap-0'>
                        <div className='flex gap-1 items-center'>
                          <h4 className='text-base font-bold'>
                            {pricing.courier_name}
                          </h4>
                          <p className='text-sm tracking-wide'>
                            {pricing.courier_service_name}
                          </p>
                        </div>
                        <p className='text-sm'>{pricing.duration}</p>
                        <span className='font-bold text-lg'>
                          {formatIDR(pricing.price, {
                            maximumSignificantDigits: 3,
                          })}
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

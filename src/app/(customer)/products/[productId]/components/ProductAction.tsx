'use client';
import toast from 'react-hot-toast';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Button, ButtonGroup } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { TbShoppingCartPlus } from 'react-icons/tb';
import { IoBagOutline } from 'react-icons/io5';
import { Select, SelectItem } from '@nextui-org/select';
import { ChangeEvent, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { formatIDR } from '@/lib/formatIDR';
import { useCheckout } from '@/app/store/CheckoutContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import addToCart from '@/lib/addToCart';

type Props = {
  product: Product;
  selectedVariant: Variant;
  onVariantChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export default function ProductAction({
  product,
  selectedVariant,
  onVariantChange,
}: Props) {
  const queryClient = useQueryClient();
  const [qty, setQty] = useState<number>(1);
  const router = useRouter();
  const { data: session, status } = useSession();
  const setItems = useCheckout()((state) => state.setItems);
  const pathname = usePathname();
  const searchParams = new URLSearchParams();
  searchParams.set('callbackUrl', pathname);

  const maxQty = useMemo(
    () =>
      selectedVariant.stock
        ? selectedVariant.stock > 3
          ? 3
          : selectedVariant.stock
        : 3,
    [selectedVariant.stock]
  );

  const addToCartMutation = useMutation<
    MojoResponse<{ message: string }>,
    MojoResponse<undefined>,
    {
      accessToken: string;
      body: {
        sku: string;
        quantity: number;
      };
    }
  >({
    mutationFn: ({ accessToken, body }) => {
      return addToCart({ accessToken, body });
    },
    onSuccess: () => {
      alert('success');
      queryClient.invalidateQueries(['cart']);
    },
    onError: (error, variables, context) => {
      if (error.code === 409) {
        toast.success('product is already on the cart');
        return;
      }
      if (error.errors.message) {
        toast.error(error.errors.message);
        return;
      }
    },
  });

  return (
    <Card shadow='none'>
      <CardHeader className='flex-col p-0 items-start'>
        <h1 className='text-2xl font-bold'>Quantity</h1>
      </CardHeader>
      <CardBody className='px-0 items-center gap-5'>
        <div className='flex w-full justify-between items-center'>
          {!!selectedVariant.stock && (
            <span className='self-start'>Stock: {selectedVariant.stock}</span>
          )}
          <span className='self-start text-danger'>Max: {maxQty}</span>
        </div>
        {product.customizable && (
          <Select
            variant='underlined'
            label='Product Variant'
            placeholder='Select variant'
            className='max-w-xs'
            defaultSelectedKeys={[selectedVariant.sku]}
            onChange={onVariantChange}
          >
            {product?.variant.map((val) => (
              <SelectItem key={val.sku} value={val.sku}>
                {val.variant_name.replace('_', '-')}
              </SelectItem>
            ))}
          </Select>
        )}
        <ButtonGroup>
          <Button
            isDisabled={qty <= 1}
            variant='bordered'
            onClick={() => {
              if (qty > 1) setQty(qty - 1);
            }}
          >
            <AiOutlineMinus size={18} />
          </Button>
          <Input
            isDisabled={qty > maxQty}
            classNames={{
              input: 'text-center',
            }}
            type='text'
            variant='bordered'
            className='w-16'
            radius='none'
            value={qty.toString()}
            onChange={(e) => {
              const result = e.target.value.replace(/\D/g, '');
              const numQty = Number(result);

              if (!!!numQty) {
                setQty(0);
                return;
              }

              if (numQty <= maxQty) {
                setQty(numQty);
              }
            }}
            onBlur={(e) => {
              if (qty === 0) {
                setQty(1);
              }
            }}
          />
          <Button
            variant='bordered'
            isDisabled={qty === maxQty}
            onClick={() => setQty(qty + 1)}
          >
            <AiOutlinePlus size={18} />
          </Button>
        </ButtonGroup>
      </CardBody>
      <CardFooter className='px-0 flex-col gap-3'>
        <span className='text-xl font-bold self-start'>
          Total:{' '}
          {formatIDR(selectedVariant.price * (Number(qty) || 1), {
            maximumSignificantDigits: 3,
          })}
        </span>
        <Button
          isDisabled={status === 'loading'}
          fullWidth
          variant='solid'
          color='primary'
          onClick={() => {
            if (status === 'unauthenticated') {
              router.push(`/login?${searchParams}`);
              return;
            }
            if (session && qty <= maxQty) {
              addToCartMutation.mutate({
                accessToken: session.accessToken,
                body: {
                  sku: selectedVariant.sku,
                  quantity: qty,
                },
              });
              return;
            }
          }}
          className='hover:bg-primary/80'
          startContent={<TbShoppingCartPlus size={24} />}
        >
          Add to Cart
        </Button>
        <Button
          isDisabled={status === 'loading'}
          fullWidth
          variant='ghost'
          startContent={<IoBagOutline size={24} />}
          onClick={() => {
            if (status === 'unauthenticated') {
              router.push(`/login?${searchParams}`);
              return;
            }
            if (qty <= maxQty) {
              setItems([
                {
                  sku: selectedVariant.sku,
                  image: product.images[0].url,
                  name: product.name,
                  price: selectedVariant.price,
                  quantity: qty,
                },
              ]);
              router.push('/order');
              return;
            }
          }}
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}

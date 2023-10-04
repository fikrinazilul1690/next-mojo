'use client';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import { User } from '@nextui-org/user';
import DeleteButton from '../../components/DeleteButton';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getCart from '@/lib/getCart';
import { formatIDR } from '@/lib/formatIDR';
import { useEffect, useMemo, useState } from 'react';
import deleteCart from '@/lib/deleteCart';
import { getSession } from 'next-auth/react';
import updateCartQuantity from '@/lib/updateCartQuantity';
import { debounce } from 'lodash';
import toast from 'react-hot-toast';
import EmptyCart from './EmptyCart';
import CartCheckout from './CartCheckout';
import { useRouter } from 'next/navigation';
import { useCheckout } from '@/app/store/CheckoutContext';

type Props = {
  carts: CartItem[];
};

const columns = [
  {
    name: 'Products',
    uid: 'products',
  },
  {
    name: 'Price',
    uid: 'price',
  },
  {
    name: 'Quantity',
    uid: 'quantity',
  },
  {
    name: 'Sub Total',
    uid: 'subTotal',
  },
  {
    name: 'Action',
    uid: 'action',
  },
];

export default function TableCart({ carts: initialCart }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [listCart, setListCart] = useState<CartItem[]>(initialCart);
  const setItems = useCheckout()((state) => state.setItems);
  const { data: carts } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const session = await getSession();
      const res = await getCart({ accessToken: session?.accessToken ?? '' });

      return res.data;
    },
    initialData: initialCart,
  });

  const { mutate: cartMutate } = useMutation<
    MojoResponse<{ message: string }>,
    ErrorResponse,
    {
      sku: string;
      quantity: number;
    }
  >({
    mutationFn: async ({ sku: productSku, quantity }) => {
      const session = await getSession();
      const accessToken = session?.accessToken ?? '';
      const data = updateCartQuantity({ accessToken, productSku, quantity });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
    onError: (error, variables, context) => {
      toast.error(error.message ?? 'error occurs');
    },
  });

  const debounceCartMutate = useMemo(
    () => debounce(cartMutate, 300),
    [cartMutate]
  );

  const updateQty = useMemo(
    () => (sku: string, quantity: number) => {
      const newCart = listCart.map((cart) => {
        if (cart.sku === sku) {
          if (quantity !== 0) {
            debounceCartMutate({ sku, quantity });
          }
          return {
            ...cart,
            quantity,
          };
        }
        return cart;
      });

      setListCart(newCart);
    },
    [listCart, debounceCartMutate]
  );

  useEffect(() => {
    setListCart(carts);
  }, [carts, setListCart]);

  const checoutData = useMemo(
    () =>
      carts.map<CheckoutItem>((state) => ({
        image: state.image.url,
        name: state.name,
        price: state.price,
        quantity: state.quantity,
        sku: state.sku,
      })),
    [carts]
  );

  const delteCartMutation = useMutation<
    MojoResponse<{ message: string }>,
    ErrorResponse,
    {
      sku: string;
    }
  >({
    mutationFn: async ({ sku: productSku }) => {
      const session = await getSession();
      const accessToken = session?.accessToken ?? '';
      return deleteCart({ accessToken, productSku });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });

  return (
    <Table
      removeWrapper
      classNames={{
        th: [
          'bg-transparent',
          'text-default-500',
          'border-b',
          'border-divider',
          'text-center',
          'text-base',
          'font-semibold',
        ],
        td: ['border-b', 'border-divider', 'text-center', 'first:text-start'],
      }}
      aria-label='Example static collection table'
      layout='fixed'
      bottomContent={
        <CartCheckout
          cart={listCart}
          onClick={() => {
            setItems(checoutData);
            router.push('/order');
          }}
        />
      }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn align='center' key={column.uid}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={<EmptyCart />}>
        {listCart.map((cart) => (
          <TableRow key={cart.sku}>
            <TableCell>
              <User
                name={cart.name}
                description={cart.sku}
                avatarProps={{
                  radius: 'none',
                  src: cart.image.url,
                  size: 'lg',
                }}
              />
            </TableCell>
            <TableCell>
              {formatIDR(cart.price, { maximumSignificantDigits: 3 })}
            </TableCell>
            <TableCell>
              <input
                className='py-3 w-[70px] text-center [&::-webkit-inner-spin-button]:opacity-100 [&::-webkit-inner-spin-button]:h-10 [&::-webkit-outer-spin-button]:opacity-100 [&::-webkit-outer-spin-button]:h-10'
                type='number'
                value={cart.quantity.toString()}
                onBlur={(e) => {
                  if (cart.quantity === 0) {
                    updateQty(cart.sku, 1);
                  }
                }}
                onChange={(e) => {
                  const result = e.target.value.replace(/\D/g, '');
                  const numQty = Number(result);

                  if (!!!numQty) {
                    updateQty(cart.sku, 0);
                    return;
                  }
                  updateQty(cart.sku, numQty);
                }}
              />
            </TableCell>
            <TableCell>
              {formatIDR(cart.quantity * cart.price, {
                maximumSignificantDigits: 3,
              })}
            </TableCell>
            <TableCell>
              <DeleteButton
                ariaLabel='delete from cart'
                onClick={() => {
                  delteCartMutation.mutate({ sku: cart.sku });
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

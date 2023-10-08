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
import { useSession } from 'next-auth/react';
import updateCartQuantity from '@/lib/updateCartQuantity';
import { debounce } from 'lodash';
import toast from 'react-hot-toast';
import EmptyCart from './EmptyCart';
import CartCheckout from './CartCheckout';
import { useRouter } from 'next/navigation';
import { useCheckout } from '@/app/store/CheckoutContext';
import { Spinner } from '@nextui-org/spinner';

type Props = {
  cart: CartItem[];
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

export default function TableCart({ cart: initialCart }: Props) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [listItems, setListItems] = useState<CartItem[]>(
    initialCart.sort(
      (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
    )
  );
  const setItems = useCheckout()((state) => state.setItems);
  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart', session?.accessToken],
    queryFn: async ({ signal }) => {
      const res = await getCart(session?.accessToken ?? '', { signal });

      return res.data;
    },
    initialData: initialCart,
    enabled: !!session?.accessToken,
  });

  const { mutate: cartMutate, isError } = useMutation<
    MojoResponse<{ message: string }> | undefined,
    MojoResponse<undefined>,
    {
      accessToken: string;
      sku: string;
      quantity: number;
    },
    { previousCart: CartItem[] | undefined }
  >({
    mutationKey: ['cart', { type: 'update' }],
    mutationFn: async ({ accessToken, sku: productSku, quantity }) => {
      const data = updateCartQuantity({
        accessToken,
        productSku,
        quantity,
      });
      return data;
    },
    onMutate: async ({ accessToken, sku, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData<CartItem[]>([
        'cart',
        accessToken,
      ]);

      if (previousCart) {
        queryClient.setQueryData<CartItem[]>(
          ['cart', accessToken],
          previousCart.map((item) => {
            if (item.sku === sku) {
              item.quantity = quantity;
            }
            return item;
          })
        );
      }

      return { previousCart };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData<CartItem[]>(
          ['cart', variables.accessToken],
          context.previousCart
        );
      }
      if (err.code === 400) {
        if (variables.quantity === 0) {
          toast.error(
            `Minimal pembelian produk (${variables.sku}) tidak terpenuhi`,
            {
              duration: 3000,
            }
          );
          return;
        }
        toast.error(`Stok produk (${variables.sku}) tidak cukup`, {
          duration: 3000,
        });
        return;
      }
      toast.error(err.errors.message ?? 'error occurs');
    },
  });

  const debounceCartMutate = useMemo(
    () => debounce(cartMutate, 300),
    [cartMutate]
  );

  const updateQty = useMemo(
    () => (accessToken: string, sku: string, quantity: number) => {
      queryClient.cancelQueries({ queryKey: ['cart'] });
      debounceCartMutate({ accessToken, sku, quantity });
      setListItems((items) =>
        items.map((item) => {
          if (item.sku === sku) {
            return {
              ...item,
              quantity,
            };
          }
          return item;
        })
      );
    },
    [debounceCartMutate, queryClient]
  );

  useEffect(() => {
    setListItems(
      cart.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
    );
  }, [cart]);

  const checoutData = useMemo(
    () =>
      cart.map<CheckoutItem>((item) => ({
        image: item.image.url,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        sku: item.sku,
      })),
    [cart]
  );

  const deleteCartMutation = useMutation<
    MojoResponse<{ message: string }>,
    ErrorResponse,
    {
      accessToken: string;
      sku: string;
    }
  >({
    mutationFn: async ({ accessToken, sku: productSku }) => {
      return deleteCart({ accessToken, productSku });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
    onError: (_error, variables, _context) => {
      toast.error(
        `Delete failed, unable to remove produk (${variables.sku}) from cart`
      );
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
          isDisabled={isError}
          cart={cart}
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
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner label='Loading...' />}
        emptyContent={<EmptyCart />}
      >
        {listItems.map((item) => (
          <TableRow key={item.sku}>
            <TableCell>
              <User
                name={item.name}
                description={item.sku}
                avatarProps={{
                  radius: 'none',
                  src: item.image.url,
                  size: 'lg',
                }}
              />
            </TableCell>
            <TableCell>
              {formatIDR(item.price, { maximumSignificantDigits: 3 })}
            </TableCell>
            <TableCell>
              <input
                min='0'
                className='py-3 w-[70px] text-center [&::-webkit-inner-spin-button]:opacity-100 [&::-webkit-inner-spin-button]:h-10 [&::-webkit-outer-spin-button]:opacity-100 [&::-webkit-outer-spin-button]:h-10'
                type='number'
                value={item.quantity.toString()}
                onChange={(e) => {
                  e.preventDefault();
                  const val = e.currentTarget.value || String(0);
                  const NumVal = Number(val);
                  if (!Number.isNaN(NumVal)) {
                    updateQty(session?.accessToken ?? '', item.sku, NumVal);
                  }
                }}
              />
            </TableCell>
            <TableCell>
              {formatIDR(item.quantity * item.price, {
                maximumSignificantDigits: 3,
              })}
            </TableCell>
            <TableCell>
              <DeleteButton
                ariaLabel='delete from cart'
                onClick={() => {
                  deleteCartMutation.mutate({
                    accessToken: session?.accessToken ?? '',
                    sku: item.sku,
                  });
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

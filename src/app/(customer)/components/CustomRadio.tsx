'use client';
import { useRadio, Chip, VisuallyHidden, tv } from '@nextui-org/react';
import { ReactNode } from 'react';

const checkbox = tv({
  slots: {
    base: 'border-default hover:bg-default-200',
    content: 'text-default-500',
  },
  variants: {
    isSelected: {
      true: {
        base: 'border-primary bg-primary hover:bg-primary-500 hover:border-primary-500',
        content: 'text-primary-foreground',
      },
    },
    isFocusVisible: {
      true: {
        base: 'outline-none ring-2 ring-focus ring-offset-2 ring-offset-background',
      },
    },
  },
});

type Props = {
  children: ReactNode;
  value: string;
};

export const CustomRadio = (props: Props) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useRadio({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });
  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color='primary'
        variant='faded'
        {...getLabelProps()}
      >
        {children ? children : isSelected ? 'Enabled' : 'Disabled'}
      </Chip>
    </label>
  );
};

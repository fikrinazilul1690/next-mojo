import { Switch, cn } from '@nextui-org/react';

type Props = {
  className?: string;
  placeholder?: string;
  label: string;
  id: string;
};

export default function SwitchInput({
  label,
  id,
  placeholder,
  className,
}: Props) {
  return (
    <div className={`flex justify-start gap-5 items-center ${className}`}>
      <Switch
        classNames={{
          base: cn('inline-flex flex-row-reverse justify-between gap-3'),
          label: cn('text-lg font-semibold'),
        }}
        id={id}
        name={id}
      >
        {label}
      </Switch>
    </div>
  );
}

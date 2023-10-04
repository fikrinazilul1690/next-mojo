import { Button } from '@nextui-org/button';
import { RxCross2 } from 'react-icons/rx';

type Props = {
  onClick: () => void;
  ariaLabel: string;
};

export default function DeleteButton({ onClick, ariaLabel }: Props) {
  return (
    <Button isIconOnly variant='light' aria-label={ariaLabel} onClick={onClick}>
      <RxCross2 size={18} />
    </Button>
  );
}

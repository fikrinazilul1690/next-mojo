'use client';
import { useReducer } from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
import { Image } from '@nextui-org/image';

type Props = {
  product: Product;
};

type SelectedState = FileResponse;
type SelectedAction = {
  type: SelectedActionKind;
  payload: FileResponse;
};

enum SelectedActionKind {
  SetImage = 'SET_IMAGE',
}

function reducer(state: SelectedState, action: SelectedAction) {
  const { type, payload } = action;
  switch (type) {
    case SelectedActionKind.SetImage:
      return payload;
    default:
      return state;
  }
}

export default function ProductImages({ product: { images } }: Props) {
  const initialState: FileResponse = images.filter(
    (image) => image.order === 0
  )[0];
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Card
      className='gap-3 w-[240px] max-sm:w-[180px] xl:w-[348px]'
      shadow='none'
      radius='none'
    >
      <CardBody className='p-0'>
        <Image
          alt={state.name}
          className='object-cover rounded-xl'
          src={state.url}
          width={348}
        />
      </CardBody>
      <CardFooter className='p-0 justify-between'>
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => {
              dispatch({ type: SelectedActionKind.SetImage, payload: image });
            }}
            className={`w-[32%] cursor-pointer ${
              image.id === state.id ? 'border-2 border-default' : ''
            }`}
          >
            <Image
              radius='none'
              alt={image.name}
              className='object-cover'
              src={image.url}
              width={348}
            />
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}

'use client';
import { useReducer } from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/card';
// import { Image } from '@nextui-org/image';
import Image from 'next/image';

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
      className='gap-3 w-[240px] max-sm:w-[180px] h-full xl:w-[348px]'
      shadow='none'
      radius='none'
    >
      <CardBody className='p-0 w-full h-1/2 relative bg-foreground-200 rounded-xl'>
        <Image
          alt={state.name}
          className='object-contain'
          src={state.url}
          fill
        />
      </CardBody>
      <CardFooter className='p-0 justify-start justify-self-end gap-2'>
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => {
              dispatch({ type: SelectedActionKind.SetImage, payload: image });
            }}
            className={`w-[32%] h-20 relative cursor-pointer ${
              image.id === state.id ? 'border-2 border-default' : ''
            }`}
          >
            <Image
              alt={image.name}
              className='object-contain'
              src={image.url}
              fill
            />
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}

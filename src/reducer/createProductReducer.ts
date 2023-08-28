export default function createProductReducer(
  state: CreateProductRequest,
  action: any
): CreateProductRequest | undefined {
  switch (action.type) {
    case 'name':
      return {
        ...state,
        name: action.payload.name,
      };

    case 'description':
      return {
        ...state,
        description: action.payload.description,
      };

    case 'category':
      return {
        ...state,
        category: action.payload.category,
      };

    case 'length':
      return {
        ...state,
        dimension: {
          ...state.dimension,
          length: action.payload.dimension.length,
        },
      };

    case 'width':
      return {
        ...state,
        dimension: {
          ...state.dimension,
          width: action.payload.dimension.width,
        },
      };

    case 'height':
      return {
        ...state,
        dimension: {
          ...state.dimension,
          height: action.payload.dimension.height,
        },
      };

    case 'weight':
      return {
        ...state,
        weight: {
          value: action.payload.weight,
        },
      };

    case 'available':
      return {
        ...state,
        available: action.payload.available,
      };

    case 'featured':
      return {
        ...state,
        featured: action.payload.featured,
      };

    case 'customizable':
      return {
        ...state,
        customizable: action.payload.customizable,
        stock: action.payload.customizable ? undefined : state.stock,
        price: action.payload.customizable ? undefined : state.price,
        selections: action.payload.customizable ? state.selections : undefined,
        variants: action.payload.customizable ? state.variants : undefined,
      };

    case 'price':
      return {
        ...state,
        price: action.payload.price,
      };

    case 'stock':
      return {
        ...state,
        stock: action.payload.stock,
      };

    case 'model':
      return {
        ...state,
        model: {
          upload_id: action.payload.model.upload_id,
        },
      };

    case 'selections':
      const index = action.payload.index;
      const selections = state.selections || [];
      selections.splice(index, 0, {
        name: action.payload.name || selections[index].name,
        options: [...selections[index].options, action.payload.option],
      });
      return {
        ...state,
        selections: [...selections],
      };

    case 'variants':
      const variants = state.variants || [];
      variants.splice(action.payload.index, 0, action.payload.variant);
      return {
        ...state,
        variants: [...variants],
      };

    default:
      break;
  }
}

type MojoResponse<Type> = {
  code: number;
  status: string;
  metadata?: MojoMetadata;
  data: Type;
  errors: ErrorResponse;
};

type ErrorResponse = {
  message?: string;
  [key: string]: Array<string>;
};

type MojoMetadata = {
  offset: number | null;
  limit: number | null;
  page_count: number;
  total_count: number;
};

type CheckoutItem = {
  sku: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type UploadResponse = {
  id: string;
  size: number;
  file_name: string;
  image_url: string;
  content_type: string;
  uploaded_at: Date;
};

type LoginResponse = {
  session_id: string;
  access_token: string;
  access_token_expires_at: string;
  refresh_token: string;
  refresh_token_expires_at: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    birthdate?: string;
    profile_picture?: {
      name: string;
      url: string;
      uploaded_at: string;
    };
    gender?: string;
    created_at: string;
    password_changed_at?: string;
  };
};

type UploadImageRequest = {
  upload_id: string;
};

type Option = {
  value: string;
  hex_code?: string;
};

type VariantSelection = {
  name: string;
  options: Option[];
};

type Variant = {
  sku: string;
  stock?: number;
  variant_name: string;
  price: number;
};

type CreateProductRequest = {
  name?: string;
  description?: string;
  category?: string;
  dimension?: {
    length?: number;
    width?: number;
    height?: number;
    unit?: 'cm' | 'dm';
  };
  weight?: {
    value?: number;
    unit?: 'kg' | 'gr';
  };
  available?: boolean;
  featured?: boolean;
  customizable?: boolean;
  price?: number;
  stock?: number;
  images?: UploadImageRequest[];
  model?: {
    upload_id?: string;
  };
  selections?: VariantSelection[];
  variants?: Variant[];
};

type RegisterRequest = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
};

type SelectionProduct = {
  name: string;
  options: Option[];
};

type Option = {
  value: string;
  hex_code?: string;
};

type Variant = {
  sku: string;
  variant_name?: string | null;
  price: number;
};

type FileResponse = {
  id: string;
  name: string;
  order?: number;
  url: string;
  uploaded_at: string;
};

type Category = {
  name: string;
};

type Product = {
  id: number;
  name: string;
  description?: string;
  category: string;
  dimension: {
    width: number;
    length: number;
    height: number;
    unit: string;
  };
  weight: {
    value: number;
    unit: string;
  };
  available: boolean;
  featured: boolean;
  customizable: boolean;
  min_price?: number;
  selections?: SelectionProduct[];
  variant: Variant[];
  images: FileResponse[];
  model?: FileResponse;
};

type ProductFilter = {
  featured?: boolean;
  customizable?: boolean;
  available?: boolean;
  category?: string;
  offset?: number;
  limit?: number;
  search?: string;
};

type CustomerAddress = {
  id: number;
  label: string;
  is_primary: boolean;
  contact_name: string;
  contact_phone: string;
  address: string;
  area_id: string;
  province: string;
  city: string;
  district: string;
  postal_code: string;
  note?: string;
};

type ListAddresses = Array<CustomerAddress>;

type StoreInformation = {
  name: string;
  phone: string;
  email: string;
  owner: string;
  address: {
    full_address: string;
    area_id: string;
    province: string;
    city: string;
    distruct: string;
    postal_code: string;
    address_note: string;
  };
};

type Item = {
  sku: string;
  quantity: number;
};

type PricingRatePayload = {
  address_id: number;
  items: Array<Item>;
};

type Pricing = {
  company: string;
  courier_name: string;
  courier_code: string;
  courier_service_name: string;
  courier_service_code: string;
  type: string;
  description: string;
  duration: string;
  shipment_duration_range: string;
  shipment_duration_unit: string;
  service_type: string;
  shipping_type: string;
  price: number;
};

type RateResponse = {
  pricing: Array<Pricing>;
};

type CartItem = {
  sku: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image: {
    id: string;
    name: string;
    order: number;
    url: string;
    uploaded_at: string;
  };
  created_at: string;
};

type Bank = 'bca' | 'bni' | 'permata' | 'bri';

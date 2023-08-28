type MojoResponse<Type> = {
  code: number;
  status: string;
  data: Type;
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
  variant_name: string;
  price: string;
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

export function formatIDR(
  num: number,
  config?: { maximumSignificantDigits: number }
): string {
  return new Intl.NumberFormat('id-ID', {
    ...config,
    style: 'currency',
    currency: 'IDR',
  }).format(num);
}

export interface PocketBasePaginatedResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: any[];
}
export interface PocketBasePaginated<T> {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: T[];
}

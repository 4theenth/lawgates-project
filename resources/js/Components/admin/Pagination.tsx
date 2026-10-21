import React from 'react';
import {
  Pagination as CommonPagination,
  PaginationProps as CommonPaginationProps,
} from '@/Components/common/Pagination';

export type PaginationProps = CommonPaginationProps;

export function Pagination(props: PaginationProps) {
  return <CommonPagination variant="admin" {...props} />;
}

export default Pagination;

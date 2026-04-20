import ReactPaginate from 'react-paginate';
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  perPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({currentPage, perPage, totalPages, setCurrentPage} : PaginationProps) {

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={perPage}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setCurrentPage(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
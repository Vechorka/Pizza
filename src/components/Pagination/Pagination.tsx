import React from "react";
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'

type PaginationProps = {
    onChangePage: (page:number) => void
}

export const Pagination = ({ onChangePage}:PaginationProps) => {
  return(
      <div>
          <ReactPaginate
              className={styles.root}
              breakLabel="..."
              nextLabel=">"
              onPageChange={(e)=> onChangePage(e.selected + 1)}
              pageRangeDisplayed={4}
              pageCount={3}
              previousLabel="<"
              renderOnZeroPageCount={null}
          />
      </div>
  )
}
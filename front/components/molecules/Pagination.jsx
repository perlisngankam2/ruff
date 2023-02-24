import React,{ useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";


function Pagination(props) {

const usersPerPage = 10;
const [pageNumber, setPageNumber] = useState(0);

const pageCount = Math.ceil(props.length / usersPerPage);

const changePage = ({ selected }) => {
    setPageNumber(selected);
};

  return (
    <>
        <ReactPaginate 
        breakLabel="..."
        previousLabel={"<<"}
        nextLabel={">>"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        renderOnZeroPageCount={null}
        />
    </>
  )
}

export default Pagination
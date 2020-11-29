import React, { useState, useEffect } from "react";
import "./Pagination.scss";
import { selectProducts } from "./../../redux/productSlice";
import { useSelector } from "react-redux";

function Pagination({ totalPages, changePage }) {
  const { page } = useSelector(selectProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const activePageIndex =
    currentPage <= 4
      ? currentPage
      : currentPage > totalPages - 3
      ? 7 - (totalPages - currentPage)
      : 4;
  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const changePageToLeft = () => {
    setCurrentPage((prevPage) => (prevPage === 1 ? 1 : prevPage - 1));
  };

  const changePageToRight = () => {
    setCurrentPage((prevPage) =>
      prevPage === totalPages ? totalPages : prevPage + 1
    );
  };

  const setPage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="pagination">
      {totalPages > 0 && (
        <>
          <button onClick={changePageToLeft}>&lt;</button>

          {totalPages <= 7 ? (
            [...Array(totalPages)].map((x, num) => (
              <PaginationButton
                key={num}
                index={num + 1}
                activePageIndex={activePageIndex}
                text={num + 1}
                setPage={setPage}
              />
            ))
          ) : (
            <>
              <PaginationButton
                index={1}
                activePageIndex={activePageIndex}
                text={1}
                setPage={setPage}
              />
              <PaginationButton
                index={2}
                activePageIndex={activePageIndex}
                text={currentPage >= 5 ? "..." : 2}
                setPage={setPage}
              />
              <PaginationButton
                index={3}
                activePageIndex={activePageIndex}
                text={
                  currentPage <= 4
                    ? 3
                    : currentPage >= totalPages - 3
                    ? totalPages - 4
                    : currentPage - 1
                }
                setPage={setPage}
              />
              <PaginationButton
                index={4}
                activePageIndex={activePageIndex}
                text={
                  currentPage >= 5
                    ? currentPage >= totalPages - 2
                      ? totalPages - 3
                      : currentPage
                    : 4
                }
                setPage={setPage}
              />
              <PaginationButton
                index={5}
                activePageIndex={activePageIndex}
                text={
                  currentPage < 5
                    ? 5
                    : currentPage >= totalPages - 2
                    ? totalPages - 2
                    : currentPage + 1
                }
                setPage={setPage}
              />
              <PaginationButton
                index={6}
                activePageIndex={activePageIndex}
                text={currentPage >= totalPages - 3 ? totalPages - 1 : "..."}
                setPage={setPage}
              />
              <PaginationButton
                index={7}
                activePageIndex={activePageIndex}
                text={totalPages}
                setPage={setPage}
              />
            </>
          )}
          <button onClick={changePageToRight}>&gt;</button>
        </>
      )}
    </div>
  );
}

const PaginationButton = ({ index, activePageIndex, text, setPage }) => {
  return (
    <button
      className={`${index === activePageIndex ? "button--active" : ""} ${
        !Number(text) ? "button--disabled" : ""
      }`}
      onClick={() => setPage(text)}
    >
      {text}
    </button>
  );
};

export default Pagination;

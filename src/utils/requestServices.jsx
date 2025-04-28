import { Pagination } from "react-bootstrap";

export const renderPaginationItems = (
  handlePageChange,
  currentPage,
  totalPages
) => {
  let items = [];

  // First and Previous buttons
  items.push(
    <Pagination.First
      key="first"
      onClick={() => handlePageChange(1)}
      disabled={currentPage === 1}
    />,
    <Pagination.Prev
      key="prev"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    />
  );

  // Add page numbers
  const addPageNumbers = () => {
    let pageNumbers = [];

    // Always show first page
    if (currentPage > 3) {
      pageNumbers.push(
        <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>
      );

      if (currentPage > 4) {
        pageNumbers.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }
    }

    // Surrounding pages
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let number = startPage; number <= endPage; number++) {
      pageNumbers.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    // Always show last page
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pageNumbers.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }

      pageNumbers.push(
        <Pagination.Item
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return pageNumbers;
  };

  // Add page number items
  items.push(...addPageNumbers());

  // Next and Last buttons
  items.push(
    <Pagination.Next
      key="next"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    />,
    <Pagination.Last
      key="last"
      onClick={() => handlePageChange(totalPages)}
      disabled={currentPage === totalPages}
    />
  );

  return items;
};

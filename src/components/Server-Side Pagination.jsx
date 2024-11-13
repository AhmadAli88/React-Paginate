import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const ServerSidePaginatedItems = ({ itemsPerPage }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${currentPage + 1}&_limit=${itemsPerPage}`
        );
        const data = await response.json();
        const totalCount = response.headers.get('x-total-count'); // Total items from header

        setItems(data);
        setTotalItems(Number(totalCount));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [currentPage, itemsPerPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <h2>Server-Side Pagination with JSONPlaceholder</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};


ServerSidePaginatedItems.propTypes  = {
    itemsPerPage: PropTypes.number.isRequired,
};


export default ServerSidePaginatedItems;

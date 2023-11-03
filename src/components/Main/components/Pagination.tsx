import '../../index.css';

function Pagination(props: {
  totalProducts: number;
  cardsPerPage: number;
  paginate: (page: number) => void;
}) {
  const { totalProducts, cardsPerPage, paginate } = props;
  const pageNumber = [];

  for (let i = 1; i <= totalProducts / cardsPerPage + 1; i += 1) {
    pageNumber.push(i);
  }
  return (
    <ul className="pagination">
      {pageNumber.map((page) => (
        <li key={page} className="pagination_page">
          <button
            type="button"
            onClick={() => paginate(page)}
            className="page-link"
          >
            {page}
          </button>
        </li>
      ))}
      ;
    </ul>
  );
}

export default Pagination;

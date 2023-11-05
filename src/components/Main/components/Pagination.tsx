import '../../index.css';

function Pagination(props: {
  currentPage: number;
  totalProducts: number;
  cardsPerPage: number;
  paginate: (page: number) => void;
  prev: () => void;
  next: () => void;
}) {
  const {
    currentPage,
    totalProducts,
    cardsPerPage,
    paginate,
    prev,
    next,
  } = props;
  const pageNumber = [];

  for (let i = 1; i <= totalProducts / cardsPerPage + 1; i += 1) {
    pageNumber.push(i);
  }
  return (
    <div className="pagination">
      <button
        type="button"
        className="page-link"
        disabled={currentPage <= 1}
        onClick={prev}
      >
        PREV
      </button>
      {pageNumber.map((page) => (
        <button
          type="button"
          onClick={() => {
            paginate(page)
          }}
          className={currentPage === page ? 'page-active' : 'page-link'}
          key={page}
        >
          {page}
        </button>
      ))}
      ;
      <button
        type="button"
        disabled={currentPage === pageNumber.length}
        className="page-link"
        onClick={next}
      >
        NEXT
      </button>
    </div>
  );
}

export default Pagination;

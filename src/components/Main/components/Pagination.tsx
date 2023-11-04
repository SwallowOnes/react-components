import '../../index.css';

function Pagination(props: {
  currentPage: number;
  totalProducts: number;
  cardsPerPage: number;
  paginate: (page: number) => void;
  select: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  prev: () => void;
  next: () => void;
}) {
  const { currentPage, totalProducts, cardsPerPage, paginate, select, prev, next } = props;
  const pageNumber = [];

  for (let i = 1; i <= totalProducts / cardsPerPage + 1; i += 1) {
    pageNumber.push(i);
  }

  const options: number[] = [3, 5, 10];

  console.log(currentPage);
  return (
    <div className="pagination">
      <button
        type="button"
        className='page-link'
        disabled={(currentPage <= 1)}
        onClick={prev}
      >
        PREV
      </button>
      {pageNumber.map((page) => (
          <button
            type="button"
            onClick={() => paginate(page)}
            className={currentPage === page ? 'page-active' : 'page-link'}
          >
            {page}
          </button>
      ))};
      <button
        type="button"
        disabled={(currentPage === pageNumber.length)}
        className='page-link'
        onClick={next}
      >
        NEXT
      </button>
      <div>
        Items per Page
      </div>
      <select value={cardsPerPage} onChange={select}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
      </select>
    </div>
  );
}

export default Pagination;

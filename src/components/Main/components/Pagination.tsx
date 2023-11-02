import '../../index.css';

function Pagination(props: {
  catalogCurrentPage: number;
  totalProducts: number;
  cardsPerPage: number;
}) {
  const { catalogCurrentPage, totalProducts, cardsPerPage } = props;
  const pageNumber = [];

  for (let i = 1; i <= (totalProducts / cardsPerPage) +1 ; i += 1) {
    pageNumber.push(i);
  }
  console.log(catalogCurrentPage);
  return(
  <ul className='pagination'>
    {pageNumber.map((page) => (
       <li key={page} className="pagination_page">
         <a href={`page${page}`} className="page-link">
           {page}
         </a>
       </li>
     ))};
  </ul>

  )
}

export default Pagination;

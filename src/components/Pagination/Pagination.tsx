import { PageData } from '../../interface/PageData';
import './Pagintation.css';

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }: PageData) {
    const pageNumbers = [];

    //* Creating array of needed page numbers
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    //* Handling click on page number
    const handleClick = (event: any, number: number) => {
        //* preventing reloading
        event.preventDefault();
        //* Change current page to desired
        paginate(number);
    };

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`page-item ${currentPage === number ? 'active' : ''}`}
                    >
                        <a
                            onClick={(e) => handleClick(e, number)}
                            href="!#"
                            className="page-link"
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;
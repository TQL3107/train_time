import _ from 'lodash';

const Pagination = ({ items, pageSize, currentPage, onPageChange} : any) => {
    const pagesCount = Math.ceil(items / pageSize);

    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) => {
                    return (
                        <>
                            <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
                                <a  style={{cursor: 'pointer'}}
                                    onClick={() => onPageChange(page)} className="page-link"
                                >
                                    {page}
                                </a>
                            </li>
                        </>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Pagination
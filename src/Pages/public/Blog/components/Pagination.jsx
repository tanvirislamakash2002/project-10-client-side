import React from 'react';

const Pagination = ({ props }) => {
    const { indexOfFirstPost, indexOfLastPost, filteredAndSortedPosts, currentPage, setCurrentPage, totalPages, postsPerPage, setPostsPerPage } = props;
    return (
        <div className="card bg-base-100 dark:bg-base-200 shadow-lg">
            <div className="card-body">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-text-muted dark:text-text-muted">
                        Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredAndSortedPosts.length)} of {filteredAndSortedPosts.length} articles
                    </div>

                    <div className="join">
                        <button
                            className="join-item btn btn-sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            «
                        </button>
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            // Show first, last, current, and adjacent pages
                            if (
                                pageNumber === 1 ||
                                pageNumber === totalPages ||
                                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                            ) {
                                return (
                                    <button
                                        key={pageNumber}
                                        className={`join-item btn btn-sm ${currentPage === pageNumber ? 'btn-primary' : ''
                                            }`}
                                        onClick={() => setCurrentPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            } else if (
                                pageNumber === currentPage - 2 ||
                                pageNumber === currentPage + 2
                            ) {
                                return <span key={pageNumber} className="join-item btn btn-sm btn-disabled">...</span>;
                            }
                            return null;
                        })}
                        <button
                            className="join-item btn btn-sm"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            »
                        </button>
                    </div>

                    <select
                        className="select select-bordered select-sm bg-base-100 dark:bg-base-300"
                        value={postsPerPage}
                        onChange={(e) => {
                            setPostsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        <option value={6}>6 per page</option>
                        <option value={9}>9 per page</option>
                        <option value={12}>12 per page</option>
                        <option value={24}>24 per page</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
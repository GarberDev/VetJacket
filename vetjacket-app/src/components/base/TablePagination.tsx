import { useState } from 'react';

export interface MetaDetails {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export default function TablePagination({
  meta,
  onPageChange,
}: {
  meta: MetaDetails;
  onPageChange: (page: number) => void;
}) {
  // Determine start and end pages based on the current page
  let startPage = Math.max(1, meta.current_page - 5); // Ensure it doesn't go below 1
  let endPage = meta.current_page + 4;

  // Adjust if current page is near the start
  if (meta.current_page <= 5) {
    startPage = 1;
    endPage = Math.min(10, meta.last_page); // Ensure it doesn't exceed last_page
  }

  // Adjust if current page is near the end
  if (meta.current_page > meta.last_page - 5) {
    startPage = Math.max(1, meta.last_page - 9); // Ensure it doesn't go below 1
    endPage = meta.last_page;
  }

  return (
    <div className="flex items-center justify-between space-x-4">
      <div>
        <button
          className={`px-4 py-2 ${
            meta.current_page === 1
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-200'
          }`}
          onClick={() =>
            meta.current_page > 1 && onPageChange(meta.current_page - 1)
          }
          disabled={meta.current_page === 1}
        >
          Previous
        </button>

        {Array.from({ length: endPage - startPage + 1 }).map((_, idx) => {
          const pageNumber = startPage + idx;
          return (
            <button
              key={pageNumber}
              className={`mx-1 px-2 py-1 ${
                meta.current_page === pageNumber
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200'
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className={`px-4 py-2 ${
            meta.current_page === meta.last_page
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-200'
          }`}
          onClick={() =>
            meta.current_page < meta.last_page &&
            onPageChange(meta.current_page + 1)
          }
          disabled={meta.current_page === meta.last_page}
        >
          Next
        </button>
      </div>

      <div>
        <span>
          Page {meta.current_page} of {meta.last_page}
        </span>
      </div>
    </div>
  );
}

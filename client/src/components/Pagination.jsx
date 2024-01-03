import { useLoaderData, useLocation, useNavigate } from "react-router-dom/dist";

const Pagination = () => {
  const { numOfPages, params } = useLoaderData();

  // params 拿到的都是 string 記得要 convert type
  const page = parseInt(params?.page) || 1;

  // conditional rendering (總頁數小於 2 時，不會出現 pagination)
  if (numOfPages < 2) return null;

  // get information about current page
  const location = useLocation();
  const { pathname, search } = location;
  //console.log(pathname);
  //console.log(search);

  const navigate = useNavigate();

  // click page button
  const pageChangeHandler = (number) => {
    const searchParams = new URLSearchParams(search);
    // 有重複的 key 會覆蓋並更新，沒有重複的話就新增
    searchParams.set("page", number);
    // 導航
    // returns a string containing a query string suitable for use in a URL. Does not include the question mark
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  // make single page button
  const pageButton = ({ pageNumber, isActive }) => {
    return (
      <button
        key={pageNumber}
        className={`btn btn-neutral btn-sm lg:btn-md join-item ${
          isActive && "btn-active"
        }`}
        onClick={() => pageChangeHandler(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  // make all page buttons (array of objects)
  const allPageButtons = () => {
    const pageButtons = [];

    // first page button
    pageButtons.push(pageButton({ pageNumber: 1, isActive: page === 1 }));

    // ... button
    if (page > 2) {
      pageButtons.push(
        <button
          key="dot-1"
          className="btn btn-neutral btn-sm lg:btn-md join-item"
        >
          ...
        </button>
      );
    }

    // other page button
    if (page !== 1 && page !== numOfPages) {
      pageButtons.push(pageButton({ pageNumber: page, isActive: true }));
    }

    // ... button
    if (page < numOfPages - 1) {
      pageButtons.push(
        <button
          key="dot-2"
          className="btn btn-neutral btn-sm lg:btn-md join-item"
        >
          ...
        </button>
      );
    }

    // last page button
    pageButtons.push(
      pageButton({ pageNumber: numOfPages, isActive: page === numOfPages })
    );

    return pageButtons;
  };

  return (
    <section className="mt-12 flex justify-center">
      <div className="join">
        {/* prev button */}
        <button
          className="btn btn-neutral btn-sm lg:btn-md join-item"
          onClick={() => {
            if (page === 1) {
              pageChangeHandler(numOfPages);
            } else {
              pageChangeHandler(page - 1);
            }
          }}
        >
          prev
        </button>

        {/* render all page buttons */}
        {allPageButtons()}

        {/* next button */}
        <button
          className="btn btn-neutral btn-sm lg:btn-md join-item"
          onClick={() => {
            if (page === numOfPages) {
              pageChangeHandler(1);
            } else {
              pageChangeHandler(page + 1);
            }
          }}
        >
          next
        </button>
      </div>
    </section>
  );
};

export default Pagination;

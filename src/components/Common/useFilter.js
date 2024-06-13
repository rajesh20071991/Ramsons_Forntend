// useFilter.js
import { useEffect, useState } from "react";

const useFilter = (filterKey) => {
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    const storedFilter = localStorage.getItem(filterKey);
    const storedPage = localStorage.getItem(`${filterKey}Page`);
    if (storedFilter) {
      setFilter(JSON.parse(storedFilter));
    }
    if (storedPage) {
      setPage(parseInt(storedPage));
    }
  }, [filterKey]);

  useEffect(() => {
    localStorage.setItem(filterKey, JSON.stringify(filter));
  }, [filter, filterKey]);

  useEffect(() => {
    localStorage.setItem(`${filterKey}Page`, page.toString());
  }, [page, filterKey]);

  const clearFilter = () => {
    setFilter({});
    setPage(1);
    localStorage.removeItem(filterKey);
    localStorage.removeItem(`${filterKey}Page`);
  };

  return { filter, setFilter, page, setPage, clearFilter };
};

export default useFilter;

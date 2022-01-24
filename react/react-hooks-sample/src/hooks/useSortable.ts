import _orderBy from "lodash/orderBy";
import { useState, useCallback, useMemo } from "react";

const SORT_ASC = "ascending";
const SORT_DES = "descending";

export type Direction = "ascending" | "descending";

const f = (o: any, sortBy: string) =>
  typeof o[sortBy] === "string" ? o[sortBy].toLowerCase() : o[sortBy];

const useSortable = (initialData: any[], initialSortBy: string) => {
  const [currentColumn, setCurrentColumn] = useState<string>(initialSortBy);
  const [direction, setDirection] = useState<Direction>(SORT_ASC);

  const data = useMemo(() => {
    if (!initialData || !initialData.length) {
      return [];
    }
    return _orderBy(
      initialData,
      [o => f(o, currentColumn)],
      direction === SORT_ASC ? "asc" : "desc"
    );
  }, [initialData, currentColumn, direction]);

  const toggleSort = useCallback(
    (column: string) => {
      if (column !== currentColumn) {
        setCurrentColumn(column);
        setDirection(SORT_ASC);
      } else {
        setDirection(direction === SORT_ASC ? SORT_DES : SORT_ASC);
      }
    },
    [currentColumn, direction]
  );

  return { data, toggleSort, currentColumn, direction };
};

export default useSortable;

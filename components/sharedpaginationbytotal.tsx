import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginacaoByTotal(props: {
  total: number | undefined;
  activePage: number;
  setPage: (page: number) => void;
}) {
  const { total, activePage, setPage } = props;

  if (!total) return null;
  if (total <= 1) return null;

  const renderPaginationLinks = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, index) => (
      <PaginationLink
        className={
          activePage === start + index
            ? "cursor-pointer text-white bg-blue-400 rounded-xl hover:bg-blue-500 hover:text-white dark:text-white dark:bg-slate-900 dark:hover:text-blue-400"
            : "cursor-pointer"
        }
        key={start + index}
        onClick={() => setPage(start + index)}
      >
        {start + index}
      </PaginationLink>
    ));
  };

  const renderEllipsis = (key: string) => (
    <PaginationItem key={key}>
      <PaginationEllipsis />
    </PaginationItem>
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="text-white bg-blue-400 cursor-pointer rounded-xl md:text-blue-500 md:bg-white dark:text-white dark:bg-slate-900 dark:hover:text-blue-400"
            onClick={() => {
              if (activePage > 1) {
                setPage(activePage - 1);
              }
            }}
          />
        </PaginationItem>
        <PaginationItem className="hidden md:gap-2 md:flex">
          <PaginationLink
            className={
              activePage === 1
                ? "cursor-pointer text-white bg-blue-400 rounded-xl hover:bg-blue-500 hover:text-white dark:text-white dark:bg-slate-900 dark:hover:text-blue-400"
                : "cursor-pointer"
            }
            key={1}
            onClick={() => setPage(1)}
          >
            1
          </PaginationLink>
          {activePage > 4 && renderEllipsis("ellipsis-start")}
          {total <= 8
            ? renderPaginationLinks(2, total - 1)
            : activePage <= 4
              ? renderPaginationLinks(2, 5)
              : activePage > 4 && activePage < total - 3
                ? renderPaginationLinks(activePage - 1, activePage + 1)
                : renderPaginationLinks(total - 4, total - 1)}
          {activePage < total - 3 && renderEllipsis("ellipsis-end")}
          <PaginationLink
            className={
              activePage === total
                ? "cursor-pointer text-white bg-blue-400 rounded-xl hover:bg-blue-500 hover:text-white dark:text-white dark:bg-slate-900 dark:hover:text-blue-400"
                : "cursor-pointer"
            }
            key={total}
            onClick={() => setPage(total)}
          >
            {total}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className="text-white bg-blue-400 cursor-pointer rounded-xl md:text-blue-500 md:bg-white dark:text-white dark:bg-slate-900 dark:hover:text-blue-400"
            onClick={() => {
              if (activePage < total) {
                setPage(activePage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

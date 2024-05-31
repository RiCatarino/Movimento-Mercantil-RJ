import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function Paginacao(props: {
  chunked: any[];
  activePage: number;
  setPage: (page: number) => void;
}) {
  const { chunked, activePage, setPage } = props;

  if (chunked.length <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className='text-white bg-blue-400 cursor-pointer rounded-xl md:text-blue-500 md:bg-white dark:text-white dark:bg-slate-900 dark:hover:text-blue-400'
            onClick={() => {
              if (activePage > 1) {
                setPage(activePage - 1);
              }
            }}
          />
        </PaginationItem>
        <PaginationItem className='hidden md:gap-2 md:flex'>
          {chunked.length <= 8
            ? chunked.map((_, index) => (
                <PaginationLink
                  className={
                    activePage == index + 1
                      ? 'cursor-pointer text-white bg-blue-400 rounded-xl hover:bg-blue-500 hover:text-white dark:text-white dark:bg-slate-900 dark:hover:text-blue-400'
                      : 'cursor-pointer '
                  }
                  key={index}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              ))
            : chunked.length >= 6 && activePage < 6
            ? chunked.slice(0, activePage + 1).map((_, index) => (
                <PaginationLink
                  className={
                    activePage == index + 1
                      ? 'cursor-pointer text-white bg-blue-400 rounded-xl hover:bg-blue-500 hover:text-white dark:text-white dark:bg-slate-900 dark:hover:text-blue-400'
                      : 'cursor-pointer '
                  }
                  key={index}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              ))
            : chunked.slice(0, 2).map((_, index) => (
                <PaginationLink
                  className={
                    activePage == index + 1
                      ? 'cursor-pointer text-white bg-blue-400 rounded-xl hover:bg-blue-500 hover:text-white dark:text-white dark:bg-slate-900 dark:hover:text-blue-400'
                      : 'cursor-pointer '
                  }
                  key={index}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              ))}
        </PaginationItem>
        {activePage >= 6 && activePage < chunked.length - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem className='hidden md:gap-2 md:flex'>
          {activePage >= 6 &&
            activePage < chunked.length - 2 &&
            chunked.slice(activePage - 2, activePage + 1).map((_, index) => (
              <PaginationLink
                className={
                  activePage - activePage + 1 == index
                    ? 'cursor-pointer text-white bg-blue-400 rounded-xl hover:bg-blue-500 hover:text-white dark:text-white dark:bg-slate-900 dark:hover:text-blue-400'
                    : 'cursor-pointer '
                }
                key={index}
                onClick={() => setPage(activePage - 1 + index)}
              >
                {activePage - 1 + index}
              </PaginationLink>
            ))}
        </PaginationItem>
        {chunked.length >= 9 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem className='hidden md:gap-2 md:flex'>
          {chunked.length >= 9 && activePage < chunked.length - 2
            ? chunked.slice(-1).map((_, index) => (
                <PaginationLink
                  className={
                    activePage == chunked.length
                      ? 'cursor-pointer text-white bg-blue-400 rounded-xl hover:bg-blue-500 hover:text-white dark:text-white dark:bg-slate-900 dark:hover:text-blue-400'
                      : 'cursor-pointer '
                  }
                  key={index}
                  onClick={() => setPage(chunked.length)}
                >
                  {chunked.length}
                </PaginationLink>
              ))
            : chunked.length >= 8 &&
              chunked.slice(-3).map((_, index) => (
                <PaginationLink
                  className={
                    activePage == chunked.length - 2 + index
                      ? 'cursor-pointer text-white bg-blue-400 rounded-xl hover:bg-blue-500 hover:text-white dark:text-white dark:bg-slate-900 dark:hover:text-blue-400'
                      : 'cursor-pointer'
                  }
                  key={index}
                  onClick={() => setPage(chunked.length - 2 + index)}
                >
                  {chunked.length - 2 + index}
                </PaginationLink>
              ))}
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            className='text-white bg-blue-400 cursor-pointer rounded-xl md:text-blue-500 md:bg-white dark:text-white dark:bg-slate-900 dark:hover:text-blue-400'
            onClick={() => {
              if (activePage < chunked.length) {
                setPage(activePage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

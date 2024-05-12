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

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className='cursor-pointer text-blue-500'
            onClick={() => {
              if (activePage > 1) {
                setPage(activePage - 1);
              }
            }}
          />
        </PaginationItem>
        <PaginationItem className='flex gap-2'>
          {chunked.length <= 8
            ? chunked.map((_, index) => (
                <PaginationLink
                  className={
                    activePage == index + 1
                      ? 'cursor-pointer text-white bg-blue-400 rounded-xl hover:bg-blue-500 hover:text-white'
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
                      ? 'cursor-pointer text-white bg-blue-400 rounded-xl hover:bg-blue-500 hover:text-white'
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
                      ? 'cursor-pointer text-white bg-blue-400 rounded-xl hover:bg-blue-500 hover:text-white'
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

        <PaginationItem>
          {activePage >= 6 &&
            activePage < chunked.length - 2 &&
            chunked.slice(activePage - 2, activePage + 1).map((_, index) => (
              <PaginationLink
                className={
                  activePage - activePage + 1 == index
                    ? 'cursor-pointer text-white bg-blue-400 rounded-xl hover:bg-blue-500 hover:text-white'
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
        <PaginationItem>
          {chunked.length >= 9 && activePage < chunked.length - 2
            ? chunked.slice(-1).map((_, index) => (
                <PaginationLink
                  className={
                    activePage == chunked.length
                      ? 'cursor-pointer text-white bg-blue-400 rounded-xl hover:bg-blue-500 hover:text-white'
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
                      ? 'cursor-pointer text-white bg-blue-400 rounded-xl hover:bg-blue-500 hover:text-white'
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
            className='cursor-pointer text-blue-500'
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

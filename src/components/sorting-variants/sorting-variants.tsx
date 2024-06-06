import { useState } from 'react';
import { SortBy, sortingText } from './const';

export function SortingVariants({sorting, setSorting}: SortingVariantsProps) {
  const [opened, setOpened] = useState(false);

  function renderSortingVariants() {
    const result = new Array<React.ReactNode>();
    for (const [sortBy, text] of sortingText.entries()) {
      result.push(
        <li
          key={sortBy}
          className={`places__option${sortBy === sorting ? ' places__option--active' : ''}`}
          style={{userSelect: 'none'}}
          tabIndex={0}
          onClick={() => {
            setSorting(sortBy);
            setOpened(false);
          }}
        >
          {text}
        </li>
      );
    }
    return result;
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption" style={{userSelect: 'none'}}>Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setOpened((o) => !o)} style={{userSelect: 'none'}}>
        { sortingText.get(sorting) }
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom${opened ? ' places__options--opened' : ''}`}>
        { renderSortingVariants() }
      </ul>
    </form>
  );
}

type SortingVariantsProps = {
  sorting: SortBy;
  setSorting: React.Dispatch<React.SetStateAction<SortBy>>;
}

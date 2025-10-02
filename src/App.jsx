import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_BY_ABC = 'abc';
const SORT_BY_LEN = 'length';
const REVERSE = 'reverse';

function getPreparedGoods(goods, sortBy, isReversed) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((a, b) => {
      switch (sortBy) {
        case SORT_BY_ABC:
          return a.localeCompare(b);
        case SORT_BY_LEN:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortBy, isReversed);

  const isOriginalOrder = arraysEqual(visibleGoods, goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortBy(SORT_BY_ABC);
          }}
          type="button"
          className={`button is-info ${sortBy === SORT_BY_ABC ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortBy(SORT_BY_LEN);
          }}
          type="button"
          className={`button is-info ${sortBy === SORT_BY_LEN ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() =>
            setIsReversed(prev => (prev === REVERSE ? '' : REVERSE))
          }
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            onClick={() => {
              setSortBy('');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

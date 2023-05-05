import useCSVData from './useCSVData';

export default function TopPicks() {
  const data = useCSVData('/Users/noorsangha/2800-202310-BBY29-5/winedata1.csv');

  return (
    <div>
      <h1>Top Picks page</h1>
      <ul>
        {data.map((row, index) => (
          <li key={index}>
            {row.fixedacidity} - {row.volatile} - {row.acidity}
          </li>
        ))}
      </ul>
    </div>
  );
}

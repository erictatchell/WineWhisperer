// pages/index.js
import Head from 'next/head';
import { getWineData } from '../lib/wine_data';

export async function getStaticProps() {
  const wineData = getWineData();

  return {
    props: {
      wineData,
    },
  };
}

export default function Home({ wineData }) {
  return (
    <div>
      <Head>
        <title>Wine Data</title>
      </Head>
      
      {/* Render your wine data here */}
      <h1>Wine Data</h1>
      <ul>
        {wineData.map((wine, index) => (
          <li key={index}>
            {wine.Id}: {wine.quality}
          </li>
        ))}
      </ul>
    </div>
  );
}

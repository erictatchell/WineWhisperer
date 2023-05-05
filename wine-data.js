import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export function getWineData() {
  const wineDataPath = path.join(process.cwd(), 'public', 'wine_data.csv');
  const wineDataCSV = fs.readFileSync(wineDataPath, 'utf-8');
  
  const { data, errors, meta } = Papa.parse(wineDataCSV, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  if (errors.length > 0) {
    console.error(errors);
    return [];
  }

  return data;
}

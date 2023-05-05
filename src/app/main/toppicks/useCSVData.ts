import { useState, useEffect } from 'react';
import Papa, { ParseResult } from 'papaparse';
import useSWR from 'swr';

const useCSVData = (csvFile: string) => {
  const [data, setData] = useState<Array<Record<string, string>>>([]);
  const { data: csvData } = useSWR(csvFile, async (url) => {
    const response = await fetch(url);
    
    if (response.body === null) {
      throw new Error('The response body is null.');
    }
    
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csvString = decoder.decode(result.value);
    return csvString;
  });

  useEffect(() => {
    if (csvData) {
      Papa.parse(csvData, {
        header: true,
        complete: (results: ParseResult<Record<string, string>>) => {
          setData(results.data);
        },
      });
    }
  }, [csvData]);

  return data;
};

export default useCSVData;

import { useState, useEffect } from 'react';
import commaifyNumber from '../app/helpers/NumberBeautifier';

import axios from 'axios';
import Link from 'next/link';

import colors from '../resources/colors.json';


function SubdivisionTable({ title, subdivisions, ignoreColumns }) {
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Log from SubdivisionTable.js:');
    console.log(subdivisions);
    if (subdivisions != null) {
      // Filter out the ignored columns for headers
      const filteredKeys = Object.keys(subdivisions[0]).filter(
        key => !ignoreColumns.includes(key)
      );
      setHeaders(filteredKeys);
    }
  }, [subdivisions, ignoreColumns]);

  if (!subdivisions) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="min-h-screen px-2 sm:px-2 md:px-4 lg:px-8" style={{ color: 'black', paddingTop: '10vh'}}>
        <h1 style={{ display: 'flex', width: '100%', justifyContent: 'center', padding: '32px 0px' }}>{title}</h1>
        <div style={{
        '@media (max-width: 768px)': {
            maxHeight: '100vh',
            overflowY: 'auto',
        },
        }}>
        <table className="w-full table-auto">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-2" style={{position: 'sticky', top: 0, backgroundColor: colors.white}}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subdivisions.map((subdivision, index) => (
              <tr key={index}>
                {headers.map((key, i) => (
                  <td key={i} className="border px-4 py-2">
                    {key === 'name'
                      ? <Link href={subdivision.link}>{subdivision[key]}</Link>
                      : typeof subdivision[key] === 'object' && subdivision[key] !== null
                        ? `${subdivision[key].name} (${commaifyNumber(subdivision[key].population)})`
                        : !isNaN(subdivision[key])
                          ? commaifyNumber(subdivision[key])
                          : typeof subdivision[key] === 'string' && subdivision[key].toLowerCase().endsWith('.png')
                            ? <img src={subdivision[key]} alt="" style={{ width: '50px', height: 'auto' }} />
                            : subdivision[key]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
}

export default SubdivisionTable;

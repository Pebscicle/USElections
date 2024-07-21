import { useState, useEffect } from 'react';
import commaifyNumber from '../app/helpers/NumberBeautifier';
import {capitalizeFirstLetter, fromCamelCase} from '../app/helpers/WordBeautifier';

import axios from 'axios';
import Link from 'next/link';

import colors from '../resources/colors.json';


function SubdivisionTable({ title, subdivisions, ignoreColumns }) {
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState(null);

  const [sortedSubdivisions, setSortedSubdivisions] = useState([]); // Copy subdivisions to manage separately
  const [sortField, setSortField] = useState(null); // Field to sort by
  const [sortDirection, setSortDirection] = useState('asc'); // Initial sort direction



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
    setSortedSubdivisions(subdivisions);
  }, [subdivisions, ignoreColumns]);

  // Sorting function
  const sortData = (field, direction) => {
    const sorted = [...sortedSubdivisions];
    sorted.sort((a, b) => {
      if (a[field] < b[field]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setSortedSubdivisions(sorted);
    setSortField(field);
    setSortDirection(direction);
  };

  // Event handler for sorting
  const handleSortClick = (header) => {
    console.log('Clicked Header: ' + header); 
    if (sortField === header) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(header);
      setSortDirection('asc');
    }
    
  };

  useEffect(() => {
    sortData(sortField, sortDirection);
  }, [sortDirection]);




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
                <th key={index} onClick={() => handleSortClick(header)} className="px-4 py-2" style={{position: 'sticky', top: 0, backgroundColor: 'lightgray', border: '1px solid white', cursor: 'pointer'}}>
                {header.length <= 3 
                    ? header.toUpperCase() 
                    : fromCamelCase(capitalizeFirstLetter(header))
                }
                </th>
            ))}
            </tr>
            </thead>
          <tbody>
            {sortedSubdivisions.map((subdivision, index) => (
                <tr key={index}>
                {headers.map((key, i) => (
                    <td key={i} className="border px-4 py-2">
                    {key === 'name'
                        ? <Link href={subdivision.link}>{subdivision[key]}</Link>
                        : typeof subdivision[key] === 'object' && subdivision[key] !== null
                        ? `${subdivision[key].name} (${typeof subdivision[key].population === 'number' && Number.isInteger(subdivision[key].population) ? commaifyNumber(subdivision[key].population) : subdivision[key].population})`
                        : !isNaN(subdivision[key])
                            ? typeof subdivision[key] === 'number' && Number.isInteger(subdivision[key]) ? commaifyNumber(subdivision[key]) : subdivision[key]
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

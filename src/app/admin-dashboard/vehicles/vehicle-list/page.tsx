"use client" 
import ReusableStickyTable, { Column } from '@/components/ui/Table'
import Image from 'next/image';
import React from 'react'

interface CountryData {
  name: string;
  test: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  test: string,
  code: string,
  population: number,
  size: number
): CountryData {
  const density = population / size;
  return { name,test, code, population, size, density };
}

const rows: CountryData[] = [
  createData('India','https://res.cloudinary.com/dbcawcvu6/image/upload/v1752247112/vehuname_Bus_1752247110437.jpg', 'IN', 1324171354, 3287263),
  createData('China','test2', 'CN', 1403500365, 9596961),
  createData('Italy','test3', 'IT', 60483973, 301340),
  // ... more rows
];

const columns: readonly Column<CountryData>[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
{
  id: 'test',
  label: 'Flag',
  minWidth: 100,
  align: 'center',
  renderCell: (value) => {
    if (typeof value === 'string' && value.startsWith('http')) {
      return (
        <Image
          src={value}
          alt="flag"
          width={60}
          height={25}
          style={{ objectFit: 'cover', borderRadius: 4 }}
        />
      );
    }
    return <span style={{ color: 'gray' }}>No Image</span>;
  },
}
,
  { id: 'code', label: 'ISO Code', minWidth: 100 },
  
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size (km²)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

const page = () => {
  return (
    <div>
      <ReusableStickyTable columns={columns} rows={rows} />
    </div>
  )
}

export default page
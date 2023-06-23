import React, { useState } from 'react';
import { snacks } from '../data/data';

const Table = () => {
  const [inputValue, setInputValue] = useState('');
  const [tableData, setTableData] = useState(snacks);
  const [sort, setSort] = useState({ field: '', asc: true });

  const searchValueHandler = (e) => {
    setInputValue(e.target.value);
    const filteredTableData = snacks.filter(({ product_name, ingredients }) =>
      product_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      ingredients.some((ingredient) => ingredient.toLowerCase().includes(e.target.value.toLowerCase()))
    );
    setTableData(filteredTableData);
  };

  const sortHandler = (field) => {
    const asc = sort.field === field ? !sort.asc : true;
    setSort({ field, asc });

    const sortedData = [...tableData].sort((a, b) => {
      const valueA = getFieldData(a, field);
      const valueB = getFieldData(b, field);
      if (isNumericField(field)) {
        return asc ? valueA - valueB : valueB - valueA;
      } else {
        return asc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
    });

    setTableData(sortedData);
  };
  const isNumericField = (field) => {
    return ['id', 'weight', 'price', 'calories'].includes(field);
  };


  const getFieldData = (data, field) => {
    switch (field) {
      case 'id':
        return data.id;
      case 'name':
        return data.product_name;
      case 'weight':
        return data.product_weight;
      case 'price':
        return data.price;
      case 'calories':
        return data.calories;
      case 'ingredients':
        return data.ingredients.join(', ');
      default:
        return '';
    }
  };

  return (
    <div className=''>
      <input
        type="text"
        placeholder='Search with products or ingredients...'
        className='border-gray-500 border w-80 p-2'
        value={inputValue}
        onChange={searchValueHandler}
      />
      <table className='border-black border table-auto'>
        <thead>
          <tr className='border border-black'>
            <th
              className='border border-black cursor-pointer'
              onClick={() => sortHandler('id')}
            >
              ID
            </th>
            <th
              className='border border-black cursor-pointer'
              onClick={() => sortHandler('name')}
            >
              Product Name
            </th>
            <th
              className='border border-black cursor-pointer'
              onClick={() => sortHandler('weight')}
            >
              Product Weight
            </th>
            <th
              className='border border-black cursor-pointer'
              onClick={() => sortHandler('price')}
            >
              Price (INR)
            </th>
            <th
              className='border border-black cursor-pointer'
              onClick={() => sortHandler('calories')}
            >
              Calories
            </th>
            <th
              className='border border-black cursor-pointer'
              onClick={() => sortHandler('ingredients')}
            >
              Ingredients
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((snack, i) => {
            const { id, product_name, product_weight, price, calories, ingredients } = snack;
            return (
              <tr className='border-black border p-4' key={id}>
                <td className='border border-black px-10'>{id}</td>
                <td className='border border-black px-10'>{product_name}</td>
                <td className='border border-black px-10'>{product_weight}</td>
                <td className='border border-black px-10'>{price}</td>
                <td className='border border-black px-10'>{calories}</td>
                <td className='border border-black px-10'>{ingredients.join(', ')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

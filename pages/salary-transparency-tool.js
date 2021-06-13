import PropTypes from 'prop-types'
import submittedSalaries from 'data/mockSalaryData.json'
import { useTable } from 'react-table'
import React from 'react'

const Header = () => {
  return (
    <section className='container max-w-screen-xl mx-auto align-middle sm:max-w-screen-lg'>
      <div className='mx-auto mb-12 text-center'>
        <h1 className='text-2xl tracking-tight text-blue-900 leading sm:leading-10'>
          Salary Transparency Tool
        </h1>
      </div>
    </section>
  )
}

const Table = ({columns, data}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return submittedSalaries && submittedSalaries.salaries && (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const SalaryTransparencyTool = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Salary Data',
        columns: [
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Salary',
            accessor: 'salary',
          },
          {
            Header: 'Experience',
            accessor: 'experience',
          },
          {
            Header: 'Country',
            accessor: 'country',
          },
          {
            Header: 'Region',
            accessor: 'region',
          },
          {
            Header: 'Company Type',
            accessor: 'company_type',
          },
          {
            Header: 'Posted On',
            accessor: 'posted',
          },
        ],
      },
    ],
    []
  )

  return (
    <div>
      <Header/>
      <Table columns={columns} data={submittedSalaries.salaries} />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      salaryTransparencyTool: submittedSalaries,
    },
  }
}

export default SalaryTransparencyTool

import PropTypes from 'prop-types'
import { useState, useMemo } from 'react'

const AppTable = ({
  columns = [],
  data = [],
  emptyMessage = 'No data found',
  showFooter = true,
  footerLabel = 'Total items',
  className = 'table-container',
  enableSorting = true,
  enablePagination = true,
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50]
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  // Fonction pour gérer le tri
  const handleSort = columnKey => {
    if (!enableSorting) return

    let direction = 'asc'
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key: columnKey, direction })
    setCurrentPage(1) // Retour à la première page lors du tri
  }

  // Fonction pour changer la page
  const handlePageChange = page => {
    setCurrentPage(page)
  }

  // Fonction pour changer la taille de page
  const handlePageSizeChange = newSize => {
    setPageSize(Number(newSize))
    setCurrentPage(1) // Retour à la première page
  }

  // Données triées
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !enableSorting) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      // Gestion des valeurs null/undefined
      if (aValue == null) return 1
      if (bValue == null) return -1

      // Gestion des nombres
      if (!isNaN(aValue) && !isNaN(bValue)) {
        return sortConfig.direction === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue)
      }

      // Gestion des chaînes de caractères
      const aString = String(aValue).toLowerCase()
      const bString = String(bValue).toLowerCase()

      if (sortConfig.direction === 'asc') {
        return aString.localeCompare(bString)
      } else {
        return bString.localeCompare(aString)
      }
    })
  }, [data, sortConfig, enableSorting])

  // Données paginées
  const paginatedData = useMemo(() => {
    if (!enablePagination) return sortedData

    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return sortedData.slice(startIndex, endIndex)
  }, [sortedData, currentPage, pageSize, enablePagination])

  // Calcul du nombre total de pages
  const totalPages = useMemo(() => {
    if (!enablePagination) return 1
    return Math.ceil(sortedData.length / pageSize)
  }, [sortedData.length, pageSize, enablePagination])

  // Fonction pour obtenir l'icône de tri
  const getSortIcon = columnKey => {
    if (!enableSorting) return ''
    if (sortConfig.key !== columnKey) return '↕️'
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  if (data.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-lg text-gray-600 mb-4'>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className='table-wrapper'>
        <table className='table'>
          <thead className='table-header'>
            <tr>
              {columns.map(column => (
                <th
                  key={column.key}
                  className={`table-th ${enableSorting ? 'table-th-sortable' : ''}`}
                  onClick={() => handleSort(column.key)}
                  style={{ cursor: enableSorting ? 'pointer' : 'default' }}
                >
                  <span className='table-header-th-content'>
                    <span>{column.label}</span>
                    <span className='sort-icon'>{getSortIcon(column.key)}</span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='table-body'>
            {paginatedData.map((row, index) => (
              <tr key={row.id || index} className={`table-row ${index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}`}>
                {columns.map(column => (
                  <td key={`${row.id || index}-${column.key}`} className='table-td'>
                    {column.render ? column.render(row[column.key], row, index) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {enablePagination && totalPages > 1 && (
        <div className='pagination-container'>
          <div className='pagination-info'>
            <span>
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
            </span>
          </div>

          <div className='pagination-controls'>
            <div className='page-size-selector'>
              <label htmlFor='pageSize'>Show: </label>
              <select id='pageSize' value={pageSize} onChange={e => handlePageSizeChange(e.target.value)} className='page-size-select'>
                {pageSizeOptions.map(size => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span> entries</span>
            </div>

            <div className='page-navigation'>
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className='pagination-btn'>
                Previous
              </button>

              <div className='page-numbers'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button key={page} onClick={() => handlePageChange(page)} className={`pagination-btn ${page === currentPage ? 'active' : ''}`}>
                    {page}
                  </button>
                ))}
              </div>

              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className='pagination-btn'>
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {showFooter && !enablePagination && (
        <div className='table-footer'>
          <p className='table-footer-text'>
            {footerLabel}: <span className='table-count'>{sortedData.length}</span>
          </p>
        </div>
      )}
    </div>
  )
}

AppTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func // Fonction optionnelle pour personnaliser le rendu de la cellule
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyMessage: PropTypes.string,
  showFooter: PropTypes.bool,
  footerLabel: PropTypes.string,
  className: PropTypes.string,
  enableSorting: PropTypes.bool,
  enablePagination: PropTypes.bool,
  defaultPageSize: PropTypes.number,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number)
}

export default AppTable

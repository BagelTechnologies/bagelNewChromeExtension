import { saveAs } from 'file-saver'; // You may need to install file-saver: npm install file-saver
import { ExpandableTableColumn } from '../Components/ExpandableTable/ExpandableRowsTable';

interface RecordType {
  [key: string]: any;
}

export const exportToCSV = (columns: ExpandableTableColumn[], records: RecordType[], fileName?: string) => {
  const filteredColumns = columns.filter(column => !column.hidden || (column.hidden && column.csvRender !== undefined));

  console.log({ filteredColumns, columns });

  const header = filteredColumns
    .map(column => {
      return typeof column.title === 'string' && column.title !== ''
        ? column.title
        : column.csvAccessor || column.accessor; // Fallback to accessor if title is not a simple string
    })
    .join(',');

  const rows = records.map(record => {
    return filteredColumns
      .map(column => {
        const value = column.csvRender ? column.csvRender(record) : record[column.accessor];
        return `"${value !== null && value !== undefined ? value : '-'}"`;
      })
      .join(',');
  });

  const csvContent = [header, ...rows].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  saveAs(blob, `${fileName}.csv` || 'data_export.csv');
};

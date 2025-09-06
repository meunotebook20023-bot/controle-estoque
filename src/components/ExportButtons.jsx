import * as XLSX from &quot;xlsx&quot;;
import Papa from &quot;papaparse&quot;;

export default function ExportButtons({ filename = &quot;dados&quot;, data = [] }) {
  const onExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, &quot;Planilha&quot;);
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const onExportCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: &quot;text/csv;charset=utf-8;&quot; });
    const url = URL.createObjectURL(blob);
    const a = document.createElement(&quot;a&quot;);
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className=&quot;flex gap-2&quot;>
      <button onClick={onExportExcel} className=&quot;btn btn-success&quot;>Exportar Excel</button>
      <button onClick={onExportCSV} className=&quot;btn btn-primary&quot;>Exportar CSV</button>
    </div>
  );
}

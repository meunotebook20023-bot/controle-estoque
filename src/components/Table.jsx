export default function Table({ columns = [], data = [] }) {
  return (
    <div className=&quot;overflow-x-auto card&quot;>
      <table className=&quot;min-w-full text-sm&quot;>
        <thead>
          <tr className=&quot;text-left text-slate-500&quot;>
            {columns.map((c) => (
              <th key={c.key} className=&quot;py-2 px-3&quot;>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className=&quot;border-t&quot;>
              {columns.map((c) => (
                <td key={c.key} className=&quot;py-2 px-3&quot;>{row[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

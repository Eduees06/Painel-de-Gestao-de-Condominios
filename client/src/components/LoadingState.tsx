export function LoadingState() {
  return (
    <div className="condominium-table-wrap" role="status" aria-live="polite">
      <table className="condominium-table condominium-table--loading">
        <thead>
          <tr>
            <th>Condomínio</th>
            <th>Moradores</th>
            <th>Porte</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, i) => (
            <tr key={i}>
              <td>
                <div className="skeleton-line skeleton-title" />
              </td>
              <td>
                <div className="skeleton-line skeleton-subtitle" />
              </td>
              <td>
                <div className="skeleton-line skeleton-badge" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

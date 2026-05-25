interface ErrorStateProps {
  message: string
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="error-state" role="alert">
      <strong>Não foi possível carregar os dados</strong>
      {message}
    </div>
  )
}

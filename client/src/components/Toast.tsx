import { X } from 'lucide-react'

interface ToastProps {
  message: string
  onClose: () => void
}

export function Toast({ message, onClose }: ToastProps) {
  return (
    <div className="toast-overlay" role="presentation">
      <div className="toast" role="alertdialog" aria-live="assertive">
        <button
          type="button"
          className="toast-close"
          onClick={onClose}
          aria-label="Fechar notificação"
        >
          <X size={18} />
        </button>
        <p className="toast-message">{message}</p>
      </div>
    </div>
  )
}

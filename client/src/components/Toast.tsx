import { X } from 'lucide-react'

interface ToastProps {
  message: string
  closing?: boolean
  onClose: () => void
}

export function Toast({ message, closing, onClose }: ToastProps) {
  return (
    <div className="toast-overlay" role="presentation">
      <div className={`toast ${closing ? 'toast--closing' : ''}`} role="alertdialog" aria-live="assertive">
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

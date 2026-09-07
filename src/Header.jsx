import { ClipboardList, ShoppingBag } from 'lucide-react'

export default function Header({ view, onToggleLog }) {
  return (
    <div className="app-header">
      <div className="brand-row">
        <div className="brand-badge">SA</div>
        <div>
          <p className="brand-name">ShivAnkita's</p>
          <div className="brand-sub">TASTY DELIGHT</div>
        </div>
      </div>
      <button className="icon-btn" onClick={onToggleLog} aria-label="Today's orders">
        {view === 'log' ? <ShoppingBag size={18} /> : <ClipboardList size={18} />}
      </button>
    </div>
  )
}

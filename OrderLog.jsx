import { ArrowLeft } from 'lucide-react'

export default function OrderLog({ orders, onBack, onToggleDelivered, onClearLog }) {
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

  const handleClear = () => {
    if (orders.length === 0) return
    if (window.confirm("Clear today's order log? This can't be undone.")) {
      onClearLog()
    }
  }

  return (
    <div className="screen">
      <div className="screen-title-row">
        <button onClick={onBack} aria-label="Back to menu"><ArrowLeft size={19} /></button>
        <h2 className="screen-title">Today's orders</h2>
      </div>

      <div className="log-summary-bar">
        <span>{orders.length} orders</span>
        <span>₹{totalRevenue} total</span>
      </div>

      {orders.length === 0 && <div className="empty-note">No orders yet today.</div>}

      {[...orders].reverse().map((o) => (
        <div className="log-entry" key={o.orderNo}>
          <div className="log-entry-head">
            <span className="log-order-no">Order #{o.orderNo}</span>
            <span className="log-time">{o.time}</span>
          </div>
          <div className="log-customer">
            {o.name || 'Walk-in'}{o.phone ? ` · ${o.phone}` : ''}
          </div>
          <div className="log-items">
            {o.lines.map((l, i) => (
              <div key={i}>
                {l.item.name} x{l.qty}{l.withIceCream ? ' (+ ice cream)' : ''}
              </div>
            ))}
          </div>
          <div className="log-total-row">
            <span>Total</span>
            <span>₹{o.total}</span>
          </div>
          <label className="delivered-toggle">
            <input
              type="checkbox"
              checked={o.delivered || false}
              onChange={(e) => onToggleDelivered(o.orderNo, e.target.checked)}
            />
            Delivered
          </label>
        </div>
      ))}

      <button className="clear-log-btn" onClick={handleClear}>Clear today's log</button>
    </div>
  )
}

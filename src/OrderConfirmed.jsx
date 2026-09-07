import { CheckCircle2 } from 'lucide-react'

export default function OrderConfirmed({ order, onNewOrder }) {
  return (
    <div className="screen done-screen">
      <CheckCircle2 size={40} className="done-icon" />
      <div className="done-title">Order #{order.orderNo} placed</div>
      <div className="done-sub">{order.name ? `For ${order.name}` : 'Walk-in order'}</div>
      <div className="done-sub">Pay cash at pickup.</div>
      <button className="ghost-btn" onClick={onNewOrder}>Start new order</button>
    </div>
  )
}

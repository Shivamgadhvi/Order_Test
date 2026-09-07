import { ShoppingCart } from 'lucide-react'

export default function CartBar({ count, total, onOpen }) {
  return (
    <div className="cart-bar" onClick={onOpen}>
      <div>{count} items · ₹{total}</div>
      <div className="view-cart">View cart <ShoppingCart size={15} /></div>
    </div>
  )
}

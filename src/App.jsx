import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import CategoryTabs from './components/CategoryTabs.jsx'
import ItemCard from './components/ItemCard.jsx'
import CartBar from './components/CartBar.jsx'
import CartView from './components/CartView.jsx'
import OrderConfirmed from './components/OrderConfirmed.jsx'
import OrderLog from './components/OrderLog.jsx'
import { categories, ICE_CREAM_PRICE } from './data/menuItems.js'

const STORAGE_KEY = 'shivankitas-pos-orders'
const DATE_KEY = 'shivankitas-pos-orders-date'

function todayString() {
  return new Date().toDateString()
}

function loadOrders() {
  try {
    const savedDate = localStorage.getItem(DATE_KEY)
    if (savedDate !== todayString()) {
      // New day — start with a clean log automatically.
      return []
    }
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function App() {
  const [view, setView] = useState('menu') // menu | cart | done | log
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const [cart, setCart] = useState({})
  const [orders, setOrders] = useState(loadOrders)
  const [lastOrder, setLastOrder] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
    localStorage.setItem(DATE_KEY, todayString())
  }, [orders])

  const allItems = useMemo(() => {
    const map = {}
    categories.forEach((c) => c.items.forEach((it) => { map[it.id] = it }))
    return map
  }, [])

  const activeCategoryData = categories.find((c) => c.id === activeCategory)

  const lines = useMemo(() => {
    return Object.entries(cart)
      .filter(([, v]) => v.qty > 0)
      .map(([id, v]) => {
        const item = allItems[id]
        const lineTotal = v.qty * item.price + (v.withIceCream ? v.qty * ICE_CREAM_PRICE : 0)
        return { key: id, item, qty: v.qty, withIceCream: v.withIceCream, lineTotal }
      })
  }, [cart, allItems])

  const cartCount = lines.reduce((sum, l) => sum + l.qty, 0)
  const cartTotal = lines.reduce((sum, l) => sum + l.lineTotal, 0)

  const handleAdd = (id) => {
    setCart((prev) => ({ ...prev, [id]: { qty: 1, withIceCream: prev[id]?.withIceCream || false } }))
  }

  const handleChangeQty = (id, delta) => {
    setCart((prev) => {
      const current = prev[id] || { qty: 0, withIceCream: false }
      const nextQty = Math.max(0, current.qty + delta)
      if (nextQty === 0) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: { ...current, qty: nextQty } }
    })
  }

  const handleToggleIceCream = (id, checked) => {
    setCart((prev) => ({ ...prev, [id]: { ...prev[id], withIceCream: checked } }))
  }

  const handleConfirm = ({ name, phone }) => {
    const orderNo = Math.floor(100 + Math.random() * 900)
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const order = { orderNo, time, name, phone, lines, total: cartTotal, delivered: false }
    setOrders((prev) => [...prev, order])
    setLastOrder(order)
    setCart({})
    setView('done')
  }

  const handleNewOrder = () => {
    setLastOrder(null)
    setView('menu')
  }

  const handleToggleDelivered = (orderNo, delivered) => {
    setOrders((prev) => prev.map((o) => (o.orderNo === orderNo ? { ...o, delivered } : o)))
  }

  const handleClearLog = () => {
    setOrders([])
  }

  return (
    <div className="app-shell">
      <Header view={view} onToggleLog={() => setView(view === 'log' ? 'menu' : 'log')} />

      {view === 'menu' && (
        <>
          <CategoryTabs categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />
          <div className="item-list">
            {activeCategoryData.items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                categoryIcon={activeCategoryData.icon}
                cartEntry={cart[item.id]}
                onAdd={handleAdd}
                onChangeQty={handleChangeQty}
                onToggleIceCream={handleToggleIceCream}
              />
            ))}
          </div>
          <CartBar count={cartCount} total={cartTotal} onOpen={() => cartCount > 0 && setView('cart')} />
        </>
      )}

      {view === 'cart' && (
        <CartView lines={lines} total={cartTotal} onBack={() => setView('menu')} onConfirm={handleConfirm} />
      )}

      {view === 'done' && lastOrder && (
        <OrderConfirmed order={lastOrder} onNewOrder={handleNewOrder} />
      )}

      {view === 'log' && (
        <OrderLog
          orders={orders}
          onBack={() => setView('menu')}
          onToggleDelivered={handleToggleDelivered}
          onClearLog={handleClearLog}
        />
      )}
    </div>
  )
}

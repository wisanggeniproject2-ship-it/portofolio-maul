export default function Badge({ children }) {
  return (
    <li className="rounded-full border border-line bg-night/60 px-2.5 py-1 text-xs font-medium text-ice">
      {children}
    </li>
  )
}

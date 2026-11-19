import { asset } from '../utils/asset'

export default function Logo({ showText = true, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={asset('images/logo.png')}
        alt=""
        width="30"
        height="30"
        className="h-[30px] w-[30px] object-contain"
      />
      {showText && <span className="text-lg font-bold tracking-tight text-ink">Wisanggeni</span>}
    </span>
  )
}
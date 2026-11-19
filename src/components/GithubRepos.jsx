import { useEffect, useState } from 'react'
import { ArrowUpRight, Star } from 'lucide-react'
import { GitHubIcon } from './Icons'
import { contact } from '../data/profile'
import { trackPointer } from '../utils/spotlight'

// The username comes from the GitHub link in data/profile.js.
const username = (() => {
  try {
    return new URL(contact.github).pathname.split('/').filter(Boolean)[0] ?? null
  } catch {
    return null
  }
})()

const formatDate = (value) =>
  new Date(value).toLocaleDateString('id', { month: 'short', year: 'numeric' })

// Loads public repositories straight from the GitHub API in the visitor's browser.
export default function GithubRepos() {
  const [state, setState] = useState({ status: 'loading', repos: [] })

  useEffect(() => {
    if (!username) {
      setState({ status: 'error', repos: [] })
      return undefined
    }
    const controller = new AbortController()
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub answered ${response.status}`)
        return response.json()
      })
      .then((data) => {
        const repos = data
          .filter((repo) => !repo.fork)
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
          .slice(0, 6)
        setState({ status: 'ok', repos })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ status: 'error', repos: [] })
      })
    return () => controller.abort()
  }, [])

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-extrabold text-ink md:text-3xl">Lainnya di GitHub</h3>
          <p className="mt-1 text-base text-muted">Repositori publik, dimuat langsung agar daftar ini selalu terbaru.</p>
        </div>
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:border-soft hover:text-ice"
        >
          <GitHubIcon width={16} height={16} />
          Semua di GitHub
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>

      <div role="status" aria-live="polite" className="mt-8">
        {state.status === 'loading' && (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Memuat repositori">
            {[0, 1, 2].map((n) => (
              <li key={n} className="h-36 animate-pulse rounded-2xl border border-line bg-card/70" />
            ))}
          </ul>
        )}

        {state.status === 'error' && (
          <p className="rounded-2xl border border-line bg-card p-6 text-base text-muted">
            Daftar repositori belum bisa dimuat saat ini. Kamu tetap bisa melihat semuanya di{' '}
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="font-semibold text-soft underline underline-offset-4">
              GitHub
            </a>
            .
          </p>
        )}

        {state.status === 'ok' && state.repos.length === 0 && (
          <p className="rounded-2xl border border-line bg-card p-6 text-base text-muted">
            Belum ada repositori publik. Repositori akan muncul di sini begitu dipublikasikan.
          </p>
        )}

        {state.status === 'ok' && state.repos.length > 0 && (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {state.repos.map((repo) => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerMove={trackPointer}
                  className="spotlight group flex h-full flex-col rounded-2xl border border-line bg-card p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="break-all text-base font-semibold text-ink">{repo.name}</span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-muted transition-colors duration-200 group-hover:text-soft"
                    />
                  </span>
                  <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                    {repo.description || 'Belum ada deskripsi.'}
                  </span>
                  <span className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 text-xs text-muted">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={13} aria-hidden="true" />
                      {repo.stargazers_count}
                    </span>
                    <span>Diperbarui {formatDate(repo.pushed_at)}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

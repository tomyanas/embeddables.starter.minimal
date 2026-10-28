import { useEmbeddables } from '@embeddables/core/react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

export function ForcePage() {
  const embeddables = useEmbeddables()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (embeddables == null || embeddables.isError) return
    // * The dashboard opens `?force_page=<id>`. The route is the path declared for that id.
    const { page } = embeddables.resolveForcePage(window.location.href)
    if (page == null) return
    const path = page.path.startsWith('/') ? page.path : `/${page.path}`
    if (location.pathname === path) return
    navigate(path, { replace: true })
  }, [embeddables, location.pathname, location.search, navigate])

  return null
}

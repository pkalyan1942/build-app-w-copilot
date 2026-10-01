export function displayReference(value) {
  if (!value) return '—'
  if (typeof value === 'object') return value.username || value.name || value._id || value.id || '—'
  return String(value)
}
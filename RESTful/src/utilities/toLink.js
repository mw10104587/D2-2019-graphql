export function toLink(req, type, id) {
  return `http://${req.headers.host}/${type}/${id}`
}
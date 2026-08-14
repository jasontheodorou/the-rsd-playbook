import type { Access, FieldAccess } from 'payload'

export type Role = 'admin' | 'publisher' | 'editor'

type UserWithRole = { role?: Role } & Record<string, unknown>

function hasRole(user: unknown, ...allowed: Role[]): boolean {
  if (!user || typeof user !== 'object') return false
  const role = (user as UserWithRole).role
  return role !== undefined && allowed.includes(role)
}

export const isAdmin: Access = ({ req }) => hasRole(req.user, 'admin')
export const isPublisher: Access = ({ req }) => hasRole(req.user, 'admin', 'publisher')
export const isEditor: Access = ({ req }) => hasRole(req.user, 'admin', 'publisher', 'editor')

export const isAdminField: FieldAccess = ({ req }) => hasRole(req.user, 'admin')

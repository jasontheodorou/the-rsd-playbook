import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminField } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role'],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Publisher (Managing Editor)', value: 'publisher' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        update: isAdminField,
      },
    },
  ],
}

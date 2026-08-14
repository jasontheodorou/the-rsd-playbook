import type { GlobalConfig } from 'payload'
import { isEditor, isPublisher } from '../access/roles'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    description: 'One-off editable text used across the site — nav labels, footer, gate copy.',
  },
  access: {
    read: () => true,
    update: isEditor,
  },
  versions: {
    drafts: true,
    max: 20,
  },
  fields: [
    { name: 'navHomeLabel', type: 'text' },
    { name: 'navPracticeLabel', type: 'text' },
    { name: 'footerText', type: 'textarea' },
    { name: 'gatePrompt', type: 'text' },
  ],
}

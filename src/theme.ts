// Transform brand — Mantine v7 theme.
//
// Drop this file into your React project and pass `transformTheme` to
// `<MantineProvider>`. Open Sans loads via your global CSS:
//
//   @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap');
//
// import { MantineProvider } from '@mantine/core';
// import '@mantine/core/styles.css';
// import { transformTheme } from './theme';
//
// <MantineProvider theme={transformTheme} defaultColorScheme="light">…</MantineProvider>
//
// The orange palette is included for the OrangeCircle primitive and the
// Ghost-link button (`<Button variant="subtle" color="transformOrange">`).
// Never use orange as a fill or border on any rectangular shape.
// See SKILL.md for the full brand rules.

import {
  createTheme,
  Button,
  Card,
  Modal,
  TextInput,
  Tabs,
  Tooltip,
  Notification,
  type MantineColorsTuple,
} from '@mantine/core';

const grey: MantineColorsTuple = [
  '#FAFAFA', '#F5F3F0', '#E6E3DF', '#CCC8C4', '#8A8583',
  '#5C5C5C', '#4A4A4A', '#333333', '#1F1F1F', '#0F0F0F',
];

const navy: MantineColorsTuple = [
  '#EFF4F8', '#D6E2EC', '#A5BFD3', '#7299B6', '#4D7CA1',
  '#356993', '#2A5C84', '#213D59', '#172C45', '#0E1C2E',
];

const orange: MantineColorsTuple = [
  '#FDF1EA', '#FAD9C4', '#F6BA94', '#F19663', '#EE7D40',
  '#EC671B', '#D85910', '#C75514', '#A8480F', '#7A340A',
];

const teal: MantineColorsTuple = [
  '#EBF1F1', '#CFDDDD', '#A8C0C0', '#80A2A2', '#5C8585',
  '#3E7070', '#326060', '#284F4F', '#1F3F3F', '#152C2C',
];

const purple: MantineColorsTuple = [
  '#F2EBF6', '#DCC9E5', '#C3A4D2', '#A87FBF', '#8E5CAB',
  '#793F95', '#673D8A', '#553373', '#42295C', '#2D1B40',
];

const sky: MantineColorsTuple = [
  '#EEF4F8', '#D2E1EB', '#AEC8DA', '#88AEC8', '#6EA0BF',
  '#619CBA', '#4F87A5', '#406F89', '#33586E', '#223D4D',
];

const yellow: MantineColorsTuple = [
  '#FBF6E3', '#F7EAB6', '#F4DD89', '#F2D573', '#F1D46E',
  '#E0BD49', '#B89730', '#8B6914', '#5F4910', '#3E2F0A',
];

const errorRed: MantineColorsTuple = [
  '#FBEDEB', '#F4CCC6', '#E89E92', '#DC715F', '#D14E39',
  '#C0392B', '#A93226', '#8E2A20', '#6F2218', '#4F1812',
];

export const transformTheme = createTheme({
  fontFamily: '"Open Sans", -apple-system, "Segoe UI", sans-serif',
  fontFamilyMonospace: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',

  // Primary Grey #333333 lives at index 7 of the grey tuple, so primaryShade=7
  // makes the default <Button>, focus rings on grey, etc. resolve to #333333.
  primaryColor: 'transformGrey',
  primaryShade: 7,

  colors: {
    transformGrey: grey,
    transformNavy: navy,
    transformOrange: orange,
    transformTeal: teal,
    transformPurple: purple,
    transformSky: sky,
    transformYellow: yellow,
    // Override Mantine's built-in red so destructive actions land on Transform's error.
    red: errorRed,
    // Alias 'dark' to grey so `color="dark"` on outline buttons matches Primary Grey.
    dark: grey,
  },

  white: '#FFFFFF',
  black: '#333333',

  fontSizes: {
    xs: '11px',
    sm: '13px',
    md: '15px',
    lg: '18px',
    xl: '24px',
  },

  lineHeights: {
    xs: '1.5',
    sm: '1.5',
    md: '1.6',
    lg: '1.6',
    xl: '1.3',
  },

  headings: {
    fontFamily: '"Open Sans", -apple-system, "Segoe UI", sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: '42px', lineHeight: '1.2',  fontWeight: '700' },
      h2: { fontSize: '32px', lineHeight: '1.25', fontWeight: '700' },
      h3: { fontSize: '24px', lineHeight: '1.3',  fontWeight: '700' },
      h4: { fontSize: '18px', lineHeight: '1.4',  fontWeight: '700' },
      h5: { fontSize: '15px', lineHeight: '1.5',  fontWeight: '600' },
      h6: { fontSize: '13px', lineHeight: '1.5',  fontWeight: '600' },
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '999px', // pill — buttons use this by default
  },
  defaultRadius: 'sm',

  shadows: {
    xs: '0 1px 2px rgba(51, 51, 51, 0.06)',
    sm: '0 1px 2px rgba(51, 51, 51, 0.06)',
    md: '0 4px 12px rgba(51, 51, 51, 0.08)',
    lg: '0 12px 32px rgba(51, 51, 51, 0.10)',
    xl: '0 24px 48px rgba(51, 51, 51, 0.12)',
  },

  cursorType: 'pointer',
  focusRing: 'auto',

  components: {
    Button: Button.extend({
      defaultProps: {
        radius: 'xl', // pill
        size: 'md',
      },
    }),
    Card: Card.extend({
      defaultProps: {
        radius: 'md',
        withBorder: true,
        padding: 'lg',
        shadow: undefined, // shadow appears on hover via styles, not at rest
      },
    }),
    Modal: Modal.extend({
      defaultProps: {
        radius: 'md',
        centered: true,
        overlayProps: { backgroundOpacity: 0.4, color: '#333333' },
        transitionProps: { transition: 'fade', duration: 200 },
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        radius: 'sm',
        size: 'md',
      },
    }),
    Tabs: Tabs.extend({
      defaultProps: {
        color: 'transformNavy', // Navy indicator. NEVER orange.
      },
    }),
    Tooltip: Tooltip.extend({
      defaultProps: {
        color: 'dark',
        radius: 'sm',
        openDelay: 300,
        closeDelay: 100,
      },
    }),
    Notification: Notification.extend({
      defaultProps: {
        radius: 'sm',
        withBorder: false,
        // Set color="transformTeal" | "red" | "transformYellow" | "transformSky" per type.
        // NEVER color="transformOrange".
      },
    }),
  },

  other: {
    // Transform-specific values not covered by Mantine's theme schema.
    fg: {
      primary: '#333333',
      secondary: '#5C5C5C',
      muted: '#8A8583',      // ≥13px only
      onDark: '#FFFFFF',
      onDarkMuted: '#C9C7C5', // ≥13px only
    },
    surface: {
      default: '#FFFFFF',
      offWhite: '#FAF8F6',
      cardAlt: '#F5F3F0',
      dark: '#333333', // never pure black
    },
    accent: {
      brand: '#EC671B',       // ORANGE — circles + headline underline ONLY
      brandBright: '#F26B43',
      brandDark: '#C75514',
    },
    // Soft accent tints — preferred for content-context tinted callouts (lessons,
    // documentation, app surfaces). The full-strength Sky Mist / Blush / Yellow stay
    // correct for display contexts (slides, dashboards, posters). See SKILL.md.
    softAccent: {
      mist: '#E5EDEE',    // lightened Sky Mist — cool/technical content
      blush: '#F2E2D6',   // lightened Blush — warm/human content
      yellow: '#F9F0CE',  // lightened Yellow — highlight / tips
    },
    dataVizSequence: ['#213D59', '#3E7070', '#619CBA', '#673D8A', '#F1D46E', '#D8B4A3'],
    motion: {
      fast: '120ms',
      base: '220ms',
      slow: '360ms',
      ease: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    },
    layout: {
      maxContentWidth: 1200,
      formMaxWidth: 640,
      contentMaxWidth: 720,
      sidebarWidth: 240,
    },
  },
});

export type TransformTheme = typeof transformTheme;

// Single source of truth for every wedding detail shown on the invitation
// and used by the /admin link generator.

export const WEDDING = {
  groom: {
    firstName: 'Sachintha',
    fullName: 'Sachintha Lakshan',
    parents: 'Son of Mr. & Mrs. K.M.D. Karunanayake',
  },
  bride: {
    firstName: 'Chathushka',
    fullName: 'Chathushka Sanjani',
    parents: 'Daughter of Mr. & Mrs. W.U. Chamara Perera',
  },

  // Friday, 04 December 2026 (Sri Lanka time, UTC+05:30)
  dateISO: '2026-12-04T08:45:00+05:30',
  weekday: 'Friday',
  dateLong: 'Friday, 04 December 2026',
  dateShort: '04 . 12 . 2026',
  dayMonth: 'Friday, December 04',
  yearInWords: 'The Year Two Thousand Twenty Six',
  monthYear: 'December 2026',
  footerDate: 'December 04, 2026',

  poruwaTime: '08:45 AM',
  receptionStart: '10:30 AM',
  receptionEnd: '03:30 PM',

  venue: {
    name: 'Ramrich Hotel',
    area: 'Ekala',
    city: 'Ja-Ela',
    mapsLink: 'https://maps.app.goo.gl/amqBD72AUFrZEt3eA?g_st=iw',
    embedUrl:
      'https://maps.google.com/maps?q=Ramrich+Hotel+Ekala&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
} as const;

/** Google Apps Script Web App URL (code.ts deployed as a Web App). */
export const GOOGLE_SCRIPT_URL: string =
  'https://script.google.com/macros/s/AKfycbzNwRjb6ERXRc1MAMjYClAWCwFefiBgUORS9CKw2SbuD1VwqyUz_zIUJwgkIUiieMGE/exec';

export const isScriptConfigured = () => GOOGLE_SCRIPT_URL.startsWith('https://script.google.com/');

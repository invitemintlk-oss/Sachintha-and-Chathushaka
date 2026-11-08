// Guest personalisation helpers shared by the invitation and the /admin page.

export const PREFIXES = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'] as const;
export type Prefix = (typeof PREFIXES)[number];

/**
 * Combines prefix + name into the name shown to the guest.
 * "Dear" is a message-style option only — it never becomes part of the name,
 * because the greeting itself already starts with "Dear".
 */
export function buildDisplayName(prefix: Prefix, rawName: string): string {
  const name = rawName.trim().replace(/\s+/g, ' ');
  if (!name) return '';

  switch (prefix) {
    case 'Family':
      return `${name} and Family`;
    case 'Dear':
      return name;
    default:
      return `${prefix} ${name}`;
  }
}

/** "Dear {displayName} ❤️" — the single place where "Dear" is added. */
export function buildGreeting(displayName: string): string {
  return `Dear ${displayName} ❤️`;
}

/** {baseURL}/{displayName}, safely URL-encoded (spaces, &, unicode, etc.). */
export function buildInviteLink(baseUrl: string, displayName: string): string {
  return `${baseUrl.replace(/\/+$/, '')}/${encodeURIComponent(displayName)}`;
}

const RESERVED_PATHS = new Set(['admin', 'index.html']);

/**
 * Reads the guest's display name from the current URL.
 * Supports the new path format (/Mr.%20Sanjaya) and the old
 * query format (?prefix=Mr.&name=Sanjaya) so older links keep working.
 */
export function getGuestDisplayName(): string {
  const params = new URLSearchParams(window.location.search);
  const legacyName = params.get('name');
  if (legacyName) {
    const legacyPrefix = params.get('prefix');
    return [legacyPrefix, legacyName].filter(Boolean).join(' ').trim();
  }

  const segment = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (!segment || RESERVED_PATHS.has(segment.toLowerCase())) return '';

  try {
    return decodeURIComponent(segment).replace(/\s+/g, ' ').trim();
  } catch {
    return '';
  }
}

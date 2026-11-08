import React, { useState } from 'react';
import { Copy, Link as LinkIcon, MessageCircle, Heart } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { PREFIXES, Prefix, buildDisplayName, buildGreeting, buildInviteLink } from './guest';
import { WEDDING } from './weddingConfig';

function buildMessage(displayName: string, link: string): string {
  return `${buildGreeting(displayName)}

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${WEDDING.groom.firstName} & ${WEDDING.bride.firstName}`;
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for non-secure contexts / older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }
}

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-brand-beige focus:ring-2 focus:ring-brand-beige-deep focus:border-transparent outline-none transition-all bg-white font-sans';

export function AdminPage() {
  const [prefix, setPrefix] = useState<Prefix>('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generated, setGenerated] = useState<{ displayName: string; link: string } | null>(null);

  const handleGenerate = (e?: React.FormEvent) => {
    e?.preventDefault();
    const displayName = buildDisplayName(prefix, guestName);
    if (!displayName) {
      toast.error('Please enter a guest name');
      return;
    }
    setGenerated({ displayName, link: buildInviteLink(window.location.origin, displayName) });
  };

  // Inputs stay as-is after generating; editing them invalidates the old link
  const onPrefixChange = (v: Prefix) => { setPrefix(v); setGenerated(null); };
  const onNameChange = (v: string) => { setGuestName(v); setGenerated(null); };

  const message = generated ? buildMessage(generated.displayName, generated.link) : '';

  const handleCopy = async (text: string, label: string) => {
    if (!text) return;
    if (await copyText(text)) toast.success(label);
    else toast.error('Could not copy — please copy manually');
  };

  return (
    <div className="min-h-screen bg-brand-ivory py-12 px-4 sm:px-6 font-sans text-stone-800 flex items-start sm:items-center justify-center">
      <Toaster position="top-center" richColors />
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-[0_8px_30px_rgba(176,137,104,0.15)] border border-brand-beige/50 px-6 py-8 sm:px-10">
        <div className="text-center mb-8">
          <Heart className="w-6 h-6 mx-auto mb-3 text-brand-beige-deep fill-brand-beige/20" />
          <h2 className="text-3xl font-display tracking-wide mb-1 text-stone-800">Invitation Link Generator</h2>
          <p className="text-stone-500 text-xs uppercase tracking-[0.2em]">
            {WEDDING.groom.firstName} & {WEDDING.bride.firstName} · {WEDDING.footerDate}
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-5">
          <div>
            <label htmlFor="prefix" className="block text-sm font-medium text-stone-700 mb-1">Select Prefix</label>
            <select id="prefix" value={prefix} onChange={(e) => onPrefixChange(e.target.value as Prefix)} className={inputClass}>
              {PREFIXES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="guestName" className="block text-sm font-medium text-stone-700 mb-1">Guest Name</label>
            <input
              id="guestName"
              type="text"
              value={guestName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="e.g. Sanjaya"
              autoComplete="off"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={!guestName.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-beige-deep text-white text-sm tracking-[0.2em] uppercase shadow-lg hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LinkIcon className="w-4 h-4" /> Generate Link
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <button
            onClick={() => handleCopy(generated?.link ?? '', 'Link copied!')}
            disabled={!generated}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-brand-beige-deep text-brand-beige-deep text-xs tracking-[0.15em] uppercase hover:bg-brand-beige/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Copy className="w-4 h-4" /> Copy Link Only
          </button>
          <button
            onClick={() => handleCopy(message, 'Message copied!')}
            disabled={!generated}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-stone-800 text-white text-xs tracking-[0.15em] uppercase hover:bg-stone-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <MessageCircle className="w-4 h-4" /> Copy Full Message
          </button>
        </div>

        {generated && (
          <div className="mt-8 space-y-5">
            <div className="p-4 bg-brand-ivory rounded-xl border border-brand-beige/50">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-1">Greeting</p>
              <p className="text-lg font-serif text-stone-800">{buildGreeting(generated.displayName)}</p>
              <p className="text-sm text-stone-500 italic mt-1">
                Website: “We cordially invite <b className="not-italic text-brand-beige-deep">{generated.displayName}</b> to celebrate our special day with us.”
              </p>
            </div>

            <div className="p-4 bg-brand-ivory rounded-xl border border-brand-beige/50">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2">Generated Link</p>
              <a href={generated.link} target="_blank" rel="noopener noreferrer" className="block break-all text-sm text-brand-beige-deep underline underline-offset-2">
                {generated.link}
              </a>
            </div>

            <div className="p-4 bg-brand-ivory rounded-xl border border-brand-beige/50">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2">WhatsApp Message Preview</p>
              <pre className="whitespace-pre-wrap break-words font-sans text-sm text-stone-700 leading-relaxed">{message}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

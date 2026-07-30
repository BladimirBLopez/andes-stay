export function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        d="M15.5 12.5h-2v7h-3v-7h-1.5v-2.6H10.5V8.2c0-1.5.9-2.8 3.2-2.8h2v2.5h-1.4c-.3 0-.6.2-.6.7v1.5h2.1l-.3 2.6Z"
        fill="#fff"
      />
    </svg>
  );
}

export function TiktokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#000000" />
      <path
        d="M15.8 6.2c.4 1.4 1.4 2.5 2.8 2.8v2.2c-1-.1-2-.4-2.8-1v4.7c0 2.4-1.9 4.3-4.3 4.3S7.2 17.3 7.2 14.9s1.9-4.3 4.3-4.3c.2 0 .4 0 .6.1v2.2c-.2-.1-.4-.1-.6-.1-1.1 0-1.9.9-1.9 2s.9 2 1.9 2 2-.9 2-2V4.5h2.1c.1.6.1 1.1.2 1.7Z"
        fill="#fff"
      />
    </svg>
  );
}

export function ThreadsIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#000000" />
      <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#fff">@</text>
    </svg>
  );
}

export function WhatsappIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        d="M12.02 5.5c-3.6 0-6.52 2.92-6.52 6.52 0 1.15.3 2.27.87 3.25l-.92 3.35 3.43-.9c.95.52 2.02.79 3.14.79h.01c3.6 0 6.52-2.92 6.52-6.52S15.62 5.5 12.02 5.5Zm3.83 9.32c-.16.45-.8.83-1.31.94-.35.07-.81.13-2.36-.51-1.98-.82-3.26-2.83-3.36-2.96-.1-.13-.81-1.08-.81-2.06s.5-1.46.68-1.66c.18-.2.4-.25.53-.25h.38c.13 0 .29-.05.45.34.16.4.55 1.35.6 1.45.05.1.08.21.02.34-.07.13-.1.21-.2.32-.09.12-.2.26-.29.35-.1.1-.2.2-.09.4.11.2.5.81 1.06 1.32.73.65 1.34.85 1.54.95.2.1.31.08.42-.05.12-.13.49-.57.62-.76.13-.2.26-.16.44-.1s1.14.54 1.33.64c.2.1.32.15.37.23.05.08.05.47-.11.92Z"
        fill="#fff"
      />
    </svg>
  );
}

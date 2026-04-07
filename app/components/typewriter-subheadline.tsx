'use client';

import { useEffect, useState } from 'react';

interface TypewriterSubheadlineProps {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TypewriterSubheadline({
  phrases,
  className,
  typingSpeed = 55,
  deletingSpeed = 35,
  pauseDuration = 1500,
}: TypewriterSubheadlineProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) {
      return;
    }

    const currentPhrase = phrases[phraseIndex % phrases.length];

    const timeout = setTimeout(
      () => {
        if (!isDeleting && typedText.length < currentPhrase.length) {
          setTypedText(currentPhrase.slice(0, typedText.length + 1));
          return;
        }

        if (!isDeleting && typedText.length === currentPhrase.length) {
          setIsDeleting(true);
          return;
        }

        if (isDeleting && typedText.length > 0) {
          setTypedText(currentPhrase.slice(0, typedText.length - 1));
          return;
        }

        if (isDeleting && typedText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((value) => (value + 1) % phrases.length);
        }
      },
      !isDeleting && typedText.length === currentPhrase.length
        ? pauseDuration
        : isDeleting
          ? deletingSpeed
          : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [deletingSpeed, isDeleting, pauseDuration, phraseIndex, phrases, typedText, typingSpeed]);

  return (
    <p className={className} aria-live="polite">
      {typedText}
      <span className="typewriter-caret" aria-hidden="true">
        |
      </span>
    </p>
  );
}

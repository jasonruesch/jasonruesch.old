import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';

import { ChevronRightIcon } from '@heroicons/react/outline';
import gsap from 'gsap';

import { useOnScreen } from '../hooks';

export function Index() {
  const tl = useRef<gsap.core.Timeline>(null);
  const el = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(el);

  const handlePointerEnter = useCallback(() => {
    tl.current.pause();
  }, []);

  const handlePointerLeave = useCallback(() => {
    tl.current.play();
  }, []);

  useEffect(() => {
    tl.current = gsap
      .timeline({
        repeat: -1,
        repeatDelay: 0.7,
        delay: 0.7,
      })
      .to(el.current, { x: -24, ease: 'back.out', duration: 0.3 })
      .to(el.current, { x: 24, duration: 0.1 })
      .to(el.current, { x: 0, ease: 'back.out(5)' });

    return () => {
      tl.current.kill();
    };
  }, []);

  useEffect(() => {
    if (isOnScreen && !tl.current.isActive()) {
      tl.current.restart(true);
    } else {
      tl.current.pause();
    }
  }, [isOnScreen]);

  return (
    <div className="space-y-4">
      <h1 className="text-center font-heading text-3xl font-bold sm:text-4xl">
        Hi! I&apos;m
        <br />
        <span className="text-primary">Jason Ruesch</span>
        <br />
        and I am a<br />
        <span className="text-secondary">Software Engineer</span>
        <br />
        focusing on
        <br />
        Web Development and Design
      </h1>

      <Link href="/about">
        <a
          className="text-link hover:text-link-hover mx-auto flex w-24 justify-end text-sm font-medium sm-max-h:hidden"
          aria-label="Learn more about me"
          onPointerEnter={() => handlePointerEnter()}
          onPointerLeave={() => handlePointerLeave()}
        >
          <div className="w-12 -translate-x-6" ref={el}>
            <ChevronRightIcon className="h-12 w-12" aria-hidden="true" />
          </div>
        </a>
      </Link>
    </div>
  );
}

export default Index;

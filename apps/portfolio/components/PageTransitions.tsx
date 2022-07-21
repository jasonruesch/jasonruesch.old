/// <reference types="styled-jsx" />
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Beams } from './Beams';

export function PageTransitions({ className, children }) {
  const router = useRouter();
  const exitDuration = 1000; // How long the exit transition takes to complete
  const enterDuration = 1000; // How long the enter transition takes to complete
  const enterDelay = 500; // Set to zero to overlap enter and exit transitions without any delay
  const timeout = Math.max(exitDuration, enterDuration + enterDelay); // Total time for enter and exit transitions to complete

  const [routingPageOffset, setRoutingPageOffset] = useState(0);
  useEffect(() => {
    const pageChange = () => {
      setRoutingPageOffset(window.scrollY);
    };
    router.events.on('routeChangeStart', pageChange);

    return () => {
      router.events.off('routeChangeStart', pageChange);
    };
  }, [router.events]);

  return (
    <>
      <TransitionGroup component={null}>
        <CSSTransition key={router.route} timeout={timeout} classNames="page">
          <div className={clsx('page', className)}>
            <Beams className="print:hidden" />
            <main className="mx-auto w-full max-w-screen-xl">{children}</main>
          </div>
        </CSSTransition>
      </TransitionGroup>

      <style jsx>{`
        @keyframes slideRightOut {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
            border-radius: 0;
            width: 100%;
            border: none;
          }
          25% {
            transform: translateX(25%) scale(0.5);
            border-radius: 9999px;
            width: 100vh;
            border: none;
          }
          30% {
            border: solid 2px #d4d4d4;
          }
          100% {
            opacity: 0;
            transform: translateX(100%) scale(0);
            border-radius: 9999px;
            width: 100vh;
            border: solid 2px #d4d4d4;
          }
        }

        @keyframes slideRightIn {
          0% {
            opacity: 0;
            transform: translateX(-100%) scale(0);
            border-radius: 9999px;
            width: 100vh;
            border: solid 2px #d4d4d4;
          }
          75% {
            transform: translateX(25%) scale(0.5);
            border-radius: 9999px;
            width: 100vh;
            border: solid 2px #d4d4d4;
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
            border-radius: 0;
            width: 100%;
            border: none;
          }
        }

        .page.page-enter-active,
        .page.page-exit-active {
          display: flex;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        .page.page-enter-active {
          animation-delay: ${enterDelay}ms;
          animation-duration: ${enterDuration}ms;
          animation-name: slideRightIn;
          animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
          animation-fill-mode: both;
        }

        .page.page-exit-active {
          animation-duration: ${exitDuration}ms;
          animation-name: slideRightOut;
          animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
          animation-fill-mode: both;
        }

        .page.page-exit-active main {
          transform: translateY(-${routingPageOffset}px);
        }
      `}</style>
    </>
  );
}

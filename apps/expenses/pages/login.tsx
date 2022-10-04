import { useRouter } from 'next/router';
import { useCallback } from 'react';

export function Login() {
  const router = useRouter();
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();

      const res = await fetch('/api/v1.0/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'user@test.tld',
          password: 'password',
        }),
      });
      if (res.status === 200) {
        const { accessToken } = await res.json();
        localStorage.setItem('token', accessToken);

        const redirect = router.query.redirect;
        if (redirect) {
          const url = Array.isArray(redirect) ? redirect[0] : redirect;
          router.push(url);
        }
      }
    },
    [router]
  );

  return (
    <>
      <h1 className="bold pb-4 text-4xl">Expenses</h1>

      <div className="rounded-md border bg-white ring-1 ring-black">
        <form className="p-4" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="mb-2 block" htmlFor="email">
              Email
            </label>
            <input
              className="w-full rounded-md border border-black p-2"
              id="email"
              type="email"
              value="user@test.tld"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block" htmlFor="password">
              Password
            </label>
            <input
              className="w-full rounded-md border border-black p-2"
              id="password"
              type="password"
              value="password"
            />
          </div>
          <div className="mb-4">
            <button
              className="rounded-md border border-black p-2"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;

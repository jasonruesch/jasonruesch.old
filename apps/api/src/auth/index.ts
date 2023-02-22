/**
 * NextAuth.js API Routes
 * https://next-auth.js.org/getting-started/rest-api
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function authRoutes(app) {
  app.get('/api/auth/signin', (req, res) => {
    res.send(
      `<html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>:root{--border-width:1px;--border-radius:0.5rem;--color-error:#c94b4b;--color-info:#157efb;--color-info-text:#fff}.__next-auth-theme-auto,.__next-auth-theme-light{--color-background:#ececec;--color-background-card:#fff;--color-text:#000;--color-primary:#444;--color-control-border:#bbb;--color-button-active-background:#f9f9f9;--color-button-active-border:#aaa;--color-seperator:#ccc}.__next-auth-theme-dark{--color-background:#161b22;--color-background-card:#0d1117;--color-text:#fff;--color-primary:#ccc;--color-control-border:#555;--color-button-active-background:#060606;--color-button-active-border:#666;--color-seperator:#444}@media (prefers-color-scheme:dark){.__next-auth-theme-auto{--color-background:#161b22;--color-background-card:#0d1117;--color-text:#fff;--color-primary:#ccc;--color-control-border:#555;--color-button-active-background:#060606;--color-button-active-border:#666;--color-seperator:#444}}body{background-color:var(--color-background);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;margin:0;padding:0}h1{font-weight:400;margin-bottom:1.5rem;padding:0 1rem}h1,p{color:var(--color-text)}form{margin:0;padding:0}label{font-weight:500;margin-bottom:.25rem;text-align:left}input[type],label{color:var(--color-text);display:block}input[type]{background:var(--color-background-card);border:var(--border-width) solid var(--color-control-border);border-radius:var(--border-radius);box-sizing:border-box;font-size:1rem;padding:.5rem 1rem;width:100%}input[type]:focus{box-shadow:none}p{font-size:1.1rem;line-height:2rem;margin:0 0 1.5rem;padding:0 1rem}a.button{line-height:1rem;text-decoration:none}a.button:link,a.button:visited{background-color:var(--color-background);color:var(--color-primary)}button span{flex-grow:1}a.button,button{align-items:center;background-color:var(--provider-bg,var(--color-background-card));border-color:rgba(0,0,0,.1);border-radius:var(--border-radius);color:var(--provider-color,var(--color-primary));display:flex;font-size:1.1rem;font-weight:500;justify-content:center;margin:0 0 .75rem;min-height:62px;padding:.75rem 1rem;position:relative;transition:all .1s ease-in-out}@media (max-width:450px){a.button,button{font-size:.9rem}}a.button:active,a.button:hover,button:active,button:hover{cursor:pointer}a.button #provider-logo,button #provider-logo{display:block;width:25px}a.button #provider-logo-dark,button #provider-logo-dark{display:none}#submitButton{background-color:var(--brand-color,var(--color-info));color:var(--button-text-color,var(--color-info-text));width:100%}@media (prefers-color-scheme:dark){a.button,button{background-color:var(--provider-dark-bg,var(--color-background));color:var(--provider-dark-color,var(--color-primary))}#provider-logo{display:none!important}#provider-logo-dark{display:block!important;width:25px}}a.site{color:var(--color-primary);font-size:1rem;line-height:2rem;text-decoration:none}a.site:hover{text-decoration:underline}.page{display:grid;height:100%;margin:0;padding:0;place-items:center;position:absolute;width:100%}.page>div{text-align:center}.error a.button{display:inline-block;margin-top:.5rem;padding-left:2rem;padding-right:2rem}.error .message{margin-bottom:1.5rem}.signin input[type=text]{display:block;margin-left:auto;margin-right:auto}.signin hr{border:0;border-top:1px solid var(--color-seperator);display:block;margin:2rem auto 1rem;overflow:visible}.signin hr:before{background:var(--color-background-card);color:#888;content:"or";padding:0 .4rem;position:relative;top:-.7rem}.signin .error{background:#f5f5f5;background:var(--color-error);border-radius:.3rem;font-weight:500}.signin .error p{color:var(--color-info-text);font-size:.9rem;line-height:1.2rem;padding:.5rem 1rem;text-align:left}.signin form,.signin>div{display:block}.signin form input[type],.signin>div input[type]{margin-bottom:.5rem}.signin form button,.signin>div button{width:100%}.signin form,.signin>div{max-width:300px}.logo{display:inline-block;margin-bottom:25px;margin-top:20px;max-height:70px;max-width:150px}@media screen and (min-width:450px){.card{width:350px}}@media screen and (max-width:450px){.card{width:200px}}.card{background-color:var(--color-background-card);border-radius:30px;margin:20px 0;padding:20px 50px}.card .header{color:var(--color-primary)}.section-header{color:var(--color-text)}</style><title>Sign In</title></head><body class="__next-auth-theme-auto"><div class="page"><div class="signin"><div class="card"><div class="provider"><form action="http://localhost:4201/api/auth/signin/github" method="POST"><input type="hidden" name="csrfToken" value="d72e3794fbfacf3c87fe3fb6298a324a4120672e20cb5acfcd7fd443173e3ad9"><input type="hidden" name="callbackUrl" value="http://localhost:4201"><button type="submit" class="button" style="--provider-bg: #fff; --provider-dark-bg: #000; --provider-color: #000; --provider-dark-color: #fff;"><img loading="lazy" height="24" width="24" id="provider-logo" src="https://authjs.dev/img/providers/github.svg"><img loading="lazy" height="24" width="24" id="provider-logo-dark" src="https://authjs.dev/img/providers/github-dark.svg"><span>Sign in with GitHub</span></button></form></div><div class="provider"><form action="http://localhost:4201/api/auth/signin/google" method="POST"><input type="hidden" name="csrfToken" value="d72e3794fbfacf3c87fe3fb6298a324a4120672e20cb5acfcd7fd443173e3ad9"><input type="hidden" name="callbackUrl" value="http://localhost:4201"><button type="submit" class="button" style="--provider-bg: #fff; --provider-dark-bg: #fff; --provider-color: #000; --provider-dark-color: #000;"><img loading="lazy" height="24" width="24" id="provider-logo" src="https://authjs.dev/img/providers/google.svg"><img loading="lazy" height="24" width="24" id="provider-logo-dark" src="https://authjs.dev/img/providers/google.svg"><span>Sign in with Google</span></button></form></div></div></div></div></body></html>`
    );
  });

  app.post('/api/auth/signin/:provider', (req, res) => {
    // res.send('signin');
  });

  app
    .route('/api/auth/callback/:provider')
    .get((req, res) => {
      // res.send('callback');
    })
    .post((req, res) => {
      // res.send('callback');
    });

  app
    .route('/api/auth/signout')
    .get((req, res) => {
      // res.send('signout');
    })
    .post((req, res) => {
      // res.send('signout');
    });

  app.get('/api/auth/session', (req, res) => {
    // Not authenticated
    // res.json({});

    // Authenticated
    res.json({
      user: {
        name: 'Jason Ruesch',
        email: 'jason.ruesch@me.com',
        image: 'https://avatars.githubusercontent.com/u/1501490?v=4',
      },
      expires: '2023-03-23T23:00:55.426Z',
    });
  });

  app.get('/api/auth/csrf', (req, res) => {
    // res.send('csrf');
  });

  app.get('/api/auth/providers', (req, res) => {
    // res.send('providers');
  });
}

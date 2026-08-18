// The site stays on GitHub Pages (anselmi.at); only these API endpoints run
// on Cloudflare Pages under their own *.pages.dev domain, which makes every
// call cross-origin from the browser's point of view.
export const ALLOWED_ORIGINS = ['https://anselmi.at', 'https://www.anselmi.at'];

export function corsHeaders(request) {
  const origin = request.headers.get('Origin');
  const allowOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin'
  };
}

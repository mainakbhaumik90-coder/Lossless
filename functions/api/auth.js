export async function onRequest(context) {
  const { env } = context;
  const clientId = env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return new Response("Error: GITHUB_CLIENT_ID is not configured in Cloudflare Environment Variables.", { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }

  const state = Math.random().toString(36).substring(2, 15);
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=public_repo&state=${state}`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectUrl,
      'Set-Cookie': `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`
    }
  });
}

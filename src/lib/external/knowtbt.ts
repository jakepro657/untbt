const KNOWTBT_HOST = process.env.KNOWTBT_HOST || 'https://www.KnowTBT.kr';

function base64Encode(str: string): string {
  return Buffer.from(str).toString('base64');
}

async function getToken(): Promise<string> {
  const clientId = process.env.KNOWTBT_CLIENT_ID!;
  const clientSecret = process.env.KNOWTBT_CLIENT_SECRET!;
  const username = process.env.KNOWTBT_USERNAME!;
  const password = process.env.KNOWTBT_PASSWORD!;

  const body = new URLSearchParams({
    grant_type: 'password',
    scope: 'read',
    username,
    password,
  });

  const auth = base64Encode(`${clientId}:${clientSecret}`);

  const response = await fetch(`${KNOWTBT_HOST}/oauth/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to get KnowTBT access token');
  }

  const data = await response.json();
  return data.access_token;
}

export async function fetchTbtInfo() {
  const token = await getToken();

  const response = await fetch(`${KNOWTBT_HOST}/api/v1/tbtInfo`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch KnowTBT data');
  }

  return response.json();
}

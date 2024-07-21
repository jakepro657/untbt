import https from 'https';
import { URLSearchParams } from 'url';

const host = 'https://www.KnowTBT.kr';

function base64Encode(str: string) {
    return Buffer.from(str).toString('base64');
}

function fetch(url: string, options: any) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const reqOptions = {
            hostname: urlObj.hostname,
            path: urlObj.pathname + urlObj.search,
            method: options.method,
            headers: options.headers,
        };

        const req = https.request(reqOptions, res => {
            let responseString = '';

            res.on('data', chunk => {
                responseString += chunk;
            });

            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    json: () => Promise.resolve(JSON.parse(responseString)),
                    text: () => Promise.resolve(responseString),
                });
            });
        });

        req.on('error', e => {
            reject(e);
        });

        if (options.body) {
            req.write(options.body);
        }

        req.end();
    }) as any;
}

async function getToken() {
    const clientId = 'jellycup64';
    const clientSecret = 'API_8D86CF75D128403AA0B63DCBB3AA670C';
    const grantType = 'password';
    const scope = 'read';
    const username = 'jellycup64';
    const password = 'Kimt641242!';

    const data = new URLSearchParams({
        grant_type: grantType,
        scope: scope,
        username: username,
        password: password,
    });

    const auth = `${clientId}:${clientSecret}`;
    const authHeaderValue = 'Basic ' + base64Encode(auth);

    const response = await fetch(`${host}/oauth/token`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: authHeaderValue,
        },
        body: data.toString(),
    });

    if (response.status === 200) {
        const responseJson = await response.json();
        return responseJson.access_token;
    } else {
        throw new Error('Failed to get access token');
    }
}

async function getData(token: string) {
    const response = await fetch(`${host}/api/v1/tbtInfo`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 200) {
        return response.json();
    } else {
        throw new Error('Failed to get data');
    }
}

export async function GET(request: Request) {
    try {
        const token = await getToken();
        const data = await getData(token);
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error: any) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

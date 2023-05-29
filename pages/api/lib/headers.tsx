import type { NextApiRequest } from 'next';

function extractRequestId(req: NextApiRequest): string {
  const xRequestId = req.headers['x-request-id'];

  if (!xRequestId) {
    return '';
  }

  if (xRequestId instanceof Array) {
    return xRequestId[0];
  }

  return xRequestId;
}

export { extractRequestId };

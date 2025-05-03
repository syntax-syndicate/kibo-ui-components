'use client';

import { QRCode } from '@repo/qr-code';

const Example = () => (
  <QRCode
    data="https://www.haydenbleasel.com/"
    className="size-48 rounded border bg-white p-4 shadow-xs"
  />
);

export default Example;

import { QRCode } from '@repo/qr-code/server';

const Example = () => (
  <QRCode
    data="https://www.haydenbleasel.com/"
    foreground="#111"
    background="#eee"
  />
);

export default Example;

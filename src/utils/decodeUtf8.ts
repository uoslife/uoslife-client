import base64 from 'base-64';
import utf8 from 'utf8';

const decodeUtf8 = (bytes: string) => {
  const encoded = base64.decode(bytes);
  const text = utf8.decode(encoded);
  return text;
};

export default decodeUtf8;

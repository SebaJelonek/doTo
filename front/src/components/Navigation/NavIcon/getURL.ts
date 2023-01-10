function getURL(src: string) {
  return src.split('/')[4].split('.')[0];
}

export default getURL;

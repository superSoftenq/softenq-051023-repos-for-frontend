export function driveIdToLink(id) {
  const googleLink = 'https://drive.google.com/u/0/uc?id=';
  const googleLink2 = 'https://drive.google.com/thumbnail?id=';

  const urlRight = '&export=download';
  const urlRight2 = '&sz=w1000';

  let dima = 'https://drive.google.com/thumbnail?id=0B6wwyazyzml-OGQ3VUo0Z2thdmc&sz=w1000';
  console.log('google link: ', googleLink2 + id + urlRight2);
  return googleLink2 + id + urlRight2;
}

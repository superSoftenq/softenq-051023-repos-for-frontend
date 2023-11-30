export function driveIdToLink(id){
    const googleLink = "https://drive.google.com/u/0/uc?id=";
    const urlRight = "&export=download";
    return googleLink + id + urlRight;
}
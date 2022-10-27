export default function uploadPhoto(url, file, fileType = "jpeg") {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": `image/${fileType}`,
    },
    body: file,
  }).then((response) => {
    return true;
  });
}

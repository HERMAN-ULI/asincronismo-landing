const content = null || document.getElementById('content');
const url =
  'https://youtube-v31.p.rapidapi.com/search?channelId=UCWI2X2x3KASrvEZXdBVNxkA&part=snippet%2Cid&order=date&maxResults=10';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'f6588ff38emsh2ac69ca417a9844p1ae037jsn390f011605e7',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const video = await fetchData(url);
    let view = `
    ${video.items
      .map(
        (video) => `
    <div class="group relative">
                    <div
                        class="w-full bg-blue-700 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${video.snippet.title}
                        </h3>
                    </div>
                </div>
                `
      )
      .slice(0, 4)
      .join('')};
 `;
    content.innerHTML = view;
  } catch (error) {
    console.error('Ha ocurrido un error:', error);
    // Aquí puedes mostrar el error al usuario de alguna manera, como en una interfaz gráfica o mediante un mensaje en la consola del navegador.
  }
})();

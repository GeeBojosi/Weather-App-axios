const searchForm = document.querySelector('#searchForm');
const input = document.querySelector('#searchInput');
const time = document.querySelector('#time-zone');

const date = setInterval(() => {
  time.innerHTML = new Date().toLocaleTimeString();
}, 1000);

async function getData(location) {
  const config = {
    params: {
      q: location,
      appid: 'c8add47e47aff6a67c033828ff8df90a',
      units: 'metric',
    },
  };
  const res = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    config
  );
  return res.data;
}

async function render(e) {
  e.preventDefault();
  const data = await getData(input.value);
  console.log(data);
  const div = document.createElement('div');
  div.innerHTML = `
    <h3>${data.name}, ${data.sys.country}</h3>
  `;
  document.querySelector('#target').appendChild(div);
}

searchForm.addEventListener('submit', render);

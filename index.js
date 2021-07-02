const time = document.querySelector('#time-zone');

const m_names = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const d_names = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const date = setInterval(() => {
  time.innerHTML = new Date().toLocaleTimeString();
}, 1000);

const getData = async location => {
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
};
const root = document.querySelector('.container');

root.innerHTML = `
  <div class="form-container">
    <form id="searchForm" class="form">
      <input
        type="text"
        id="searchInput"
        name="searchInput"
        placeholder="Search City..."
        required
      />
      <button>Search</button>
    </form>
    <button class="toggle-btn" id="toggle-btn">
      <span>°C</span> /
      <span>°F</span>
    </button>
  </div>
  <div id="target" class="contents"></div>
`;

const searchForm = document.querySelector('#searchForm');
const input = document.querySelector('#searchInput');
const content = document.querySelector('#target');
const toggle = document.querySelector('#toggle-btn');

const render = async e => {
  e.preventDefault();
  const data = await getData(input.value);
  const time = new Date();

  content.innerHTML = '';
  console.log(data.cod);
  const div = document.createElement('div');
  div.innerHTML = `
    <span class="date">${d_names[time.getDay()]}, ${time.getDate()} ${
    m_names[time.getMonth()]
  }</span>
    <h3 class="location">${data.name}, ${data.sys.country}</h3>
    <h4 class="temperature">${data.main.temp_max} &#8451;</h4>
    <p class="temperature-2">Feels like: ${data.main.feels_like} &#8451;, ${
    data.weather[0].description
  }</p>
    <p class="geo-info">Wind: ${data.wind.speed} m/s Visibility: ${parseFloat(
    data.visibility / Math.pow(10, 3)
  ).toFixed(1)} km</p>
  `;
  content.appendChild(div);
  input.value = '';
};

toggle.addEventListener('click', e => {
  console.log('clicked');
});

searchForm.addEventListener('submit', render);

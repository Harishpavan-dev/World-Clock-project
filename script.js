let timezones = [];
let intervalId = null;

// Fetch all timezones once
fetch('https://worldtimeapi.org/api/timezone')
  .then(res => res.json())
  .then(data => timezones = data)
  .catch(err => console.error(err));

const cityInput = document.getElementById('cityInput');
const suggestions = document.getElementById('suggestions');
const result = document.getElementById('result');
const getTimeBtn = document.getElementById('getTimeBtn');

// Autocomplete
cityInput.addEventListener('input', () => {
  const query = cityInput.value.toLowerCase();
  suggestions.innerHTML = '';

  if (!query) {
    suggestions.classList.remove('show');
    return;
  }

  // Filter timezones using partial match on any part
  const matches = timezones.filter(tz => {
    const parts = tz.toLowerCase().split('/');
    return parts.some(p => p.includes(query));
  }).slice(0, 10);

  matches.forEach(match => {
    const div = document.createElement('div');
    div.textContent = match;
    div.classList.add('suggestion-item');
    div.addEventListener('click', () => {
      cityInput.value = match;
      suggestions.innerHTML = '';
      suggestions.classList.remove('show');
      startClock(match);
    });
    suggestions.appendChild(div);
  });

  if (matches.length) {
    suggestions.classList.add('show');
  } else {
    suggestions.classList.remove('show');
  }
});

// Button click
getTimeBtn.addEventListener('click', () => {
  const query = cityInput.value.trim().toLowerCase();
  if (!query) {
    alert('Please enter a city name');
    return;
  }

  // Find timezone by partial match
  const timezone = timezones.find(tz => tz.toLowerCase().split('/').some(p => p.includes(query)));
  if (!timezone) {
    result.textContent = 'City not found';
    result.classList.add('show');
    return;
  }
  startClock(timezone);
});

// Start live clock
function startClock(timezone) {
  if (intervalId) clearInterval(intervalId);

  function updateTime() {
    fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)
      .then(res => res.json())
      .then(data => {
        result.textContent = `${timezone} : ${data.datetime.slice(11,19)}`;
        result.classList.add('show');
      })
      .catch(err => {
        result.textContent = 'Error fetching time';
        result.classList.add('show');
        console.error(err);
      });
  }

  updateTime(); // initial call
  intervalId = setInterval(updateTime, 1000); // update every second
}

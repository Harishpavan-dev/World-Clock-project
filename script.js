let timezones = [];

// Fetch all timezones once
fetch('https://worldtimeapi.org/api/timezone')
  .then(res => res.json())
  .then(data => timezones = data)
  .catch(err => console.error(err));

const cityInput = document.getElementById('cityInput');
const suggestions = document.getElementById('suggestions');
const result = document.getElementById('result');

cityInput.addEventListener('input', () => {
  const query = cityInput.value.toLowerCase();
  suggestions.innerHTML = '';

  if (!query) {
    suggestions.classList.remove('show');
    return;
  }

  const matches = timezones.filter(tz => tz.toLowerCase().includes(query)).slice(0, 10);
  matches.forEach(match => {
    const div = document.createElement('div');
    div.textContent = match;
    div.classList.add('suggestion-item');
    div.addEventListener('click', () => {
      cityInput.value = match;
      suggestions.innerHTML = '';
      suggestions.classList.remove('show');
      getTime(match);
    });
    suggestions.appendChild(div);
  });

  if (matches.length) {
    suggestions.classList.add('show');
  } else {
    suggestions.classList.remove('show');
  }
});

function getTime(timezone) {
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

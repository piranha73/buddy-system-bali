const onlineMatches = await(await fetch('./online_matches.json')).json()
const onsiteMatches = await(await fetch('./onsite_matches.json')).json()

console.log('online', onlineMatches);
console.log('onsite', onsiteMatches);

const countIndex = date => {
  const firstDay = new Date(2023, 1, 7)
  const msInDay = 86400000
  let dayGap = Math.trunc((date - firstDay) / msInDay)
  console.log(dayGap);
  let extra = 0
  if (dayGap % 7 === 4) extra = 1
  else if (dayGap % 7 === 5) extra = 2
  return dayGap - Math.trunc(dayGap / 7) * 2 - extra
}

const displayImage = user => `
  <img
    src=https://avatars.githubusercontent.com/${user.github_username}
    heigth=100px
    width=100px
    alt=${user.name}
  >
`

const displayName = user => `<p>${user.name}</p>`

const displayBuddy = user => `<div class=student>${displayImage(user)}${displayName(user)}</div>`

const displayBuddies = (buddies, place) => {
  const list = document.getElementById(`${place}-buddies-grid`)
  buddies.forEach(couple => {
    list.insertAdjacentHTML('beforeend',
      `<div class=couple>
        ${displayBuddy(couple[0] || {name: '42', github: '42'})}
        <i class="fa-solid fa-arrows-left-right"></i>
        ${displayBuddy(couple[1] || {name: '42', github: '42'})}
      </div>`
    )
  });
}

const displayDate = (date) => {
  const dateHeader = document.getElementById("date-header");
  dateHeader.innerText = date;
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let currentDay = urlParams.has('date') ? new Date(urlParams.get('date')) : new Date();

displayDate(currentDay.toDateString())
displayBuddies(onsiteMatches[countIndex(currentDay) % onsiteMatches.length], 'onsite')
displayBuddies(onlineMatches[countIndex(currentDay) % onlineMatches.length], 'online')

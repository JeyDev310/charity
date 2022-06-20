const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./test.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  // console.log('Connected to the database.');
})

const timeLimit = 5;
// it will be different per each user.

// of course, we can make the channel names and need times per channel as a table, but here only the test, I made it static map
const channel_count = 3;
const channel_names = ["email", "LinkedIn", "Instagram"];
const needTimePerChannel = [4, 2, 1];

const getDonorsByChannel = async (channel) => {
  return new Promise((resolve, reject) => {
    try {
      db.all(`SELECT * FROM donor WHERE preferred_channel = '${channel}' ORDER BY expected_donation DESC`, function (err, _data) {
        resolve(_data);
      });
    } catch (e) {
      reject(e);
    }
  });
}
let data = [];

const calcDonation = (schedule) => {
  let donation = 0;
  for (let i = 0; i < channel_count; i++) {
    for (let j = 0; j < schedule[i]; j++) {
      donation += data[i][j].expected_donation;
    }
  }
  return donation;
}

const getBestSchedule = (schedule, timeLimit) => {
  if (schedule.length == channel_count - 1) {
    let _schedule = schedule.slice();
    let available = Math.floor(timeLimit / needTimePerChannel[channel_count - 1]);
    if (available > data[channel_count - 1].length) {
      available = data[channel_count - 1].length;
    }

    return {
      schedule: [..._schedule, available],
      donation: calcDonation([..._schedule, available])
    };
  } else {
    let bestDonation = calcDonation(schedule);
    let bestSchedule = schedule.slice();
    let available = Math.floor(timeLimit / needTimePerChannel[schedule.length])
    if (available > data[schedule.length].length) {
      available = data[schedule.length].length;
    }
    for (let i = 0; i <= available; i++) {
      
      let result = getBestSchedule([...schedule, i], timeLimit - i * needTimePerChannel[schedule.length]);
      if (result.donation > bestDonation) {
        bestDonation = result.donation;
        bestSchedule = result.schedule.slice();
      }
    }
    return {
      schedule: bestSchedule,
      donation: bestDonation
    }
  }
}

const main = async () => {
  for (const channel_name of channel_names) {
    data.push(await getDonorsByChannel(channel_name));
  }
  const bestSchedule = getBestSchedule([], timeLimit);
  console.log("Best Schedule ---------------------------------");
  console.log("Total danation: ", bestSchedule.donation);
  console.log("Donators: ");
  for (let i = 0; i < channel_count; i++) {
    for (let j = 0; j < bestSchedule.schedule[i]; j++) {
      console.log(`full_name: ${data[i][j].full_name}, ssn: ${data[i][j].ssn}, preferred_channel: ${data[i][j].preferred_channel}, expected_donation: ${data[i][j].expected_donation}`)
    }
  }

  // close db ----------------
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    // console.log('Close the database connection.')
  })

}

main();





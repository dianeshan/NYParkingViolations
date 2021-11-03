const router = require('express').Router();
const JSONDATA = require('../data.js');

router.route('/data/timeviolations').get((req, res) => {
  const resultsPerPage = 16;

  //////////////////////////////////////////////////////////////////
  // Start of Code
  //////////////////////////////////////////////////////////////////

  // total is the max number of violations
  // final is the list of violation codes, their respective occurences and their respective percent of the total
  var total = 0;
  let final = [];

  /*
    Find the correct time the violation occured, putting any unknown time in a
    variable called unknown, and then add their respective count of violations in
    a list
    */
  for (var i = 0; i < JSONDATA.length; i++) {
    var time = JSONDATA[i]['Violation Time'];
    if (time.length > 5) {
      code = 'Unknown Time';
    } else if (Number(time[1]) == 0 && Number(time[0]) != 1) {
      code = 'Unknown Time';
    } else if (Number(time[0]) != 0 && Number(time[0]) != 1) {
      code = 'Unknown Time';
    } else if (Number(time[0]) == 1 && Number(time[1]) > 2) {
      code = 'Unknown Time';
    } else {
      code = time[0] + time[1] + time[4] + 'M';
    }
    var found = false;
    if (final.length > 0) {
      for (var j = 0; j < final.length; j++) {
        if (final[j].Time == code) {
          final[j].Violations += 1;
          found = true;
          break;
        }
      }
    }
    var line = { Time: code, Violations: 1, Percentage: 0.0 };
    if (!found) {
      final.push(line);
    }
    total++;
  }

  // Testing variable to check the percentages
  //var totalp = 0;

  /*
    Read through the final array and calculate the percentages based on 
    the amount of violations certain times recieved over the total number of violations
    */
  for (var i = 0; i < final.length; i++) {
    final[i].Percentage = parseFloat(((final[i].Violations / total) * 100).toFixed(3));
    //totalp += final[i].Percentage;
  }
  //console.log(totalp);
  //////////////////////////////////////////////////////////////////

  res.send(final);
});

module.exports = router;
module.exports = vote = (technicianInfo, aptitude, voteStar, userID) => {
  var amountStar = 0;
  var aptitudeVoted = 0;
  var success = true;
  var sumStar = 0;
  technicianInfo.aptitude.forEach((element) => {
    if (element.aptitude === aptitude) {
      if (element.voteID === undefined) element.voteID = {};
      if (element.voteID[userID] === undefined) {
        element.voteID[userID] = { userID: userID, star: voteStar };
        element.star =
          (element.star * element.amountOfvoteStar + voteStar) /
          (element.amountOfvoteStar + 1);
        element.amountOfvoteStar += 1;
        amountStar = element.star;
        technicianInfo.amount += 1;
      } else {
        element.star =
          (element.star * element.amountOfvoteStar -
            element.voteID[userID].star +
            voteStar) /
          element.amountOfvoteStar;
        element.voteID[userID].star = voteStar;
        amountStar = element.star;
      }
    }
    if (element.voteID !== undefined) {
      if (Object.keys(element.voteID).length > 0) {
        aptitudeVoted += 1;
        sumStar += element.star;
      }
    }
  });
  if (success === false) return false;
  if (aptitudeVoted === 1) {
    technicianInfo.star = amountStar;
  } else {
    technicianInfo.star = sumStar / aptitudeVoted;
  }
  return technicianInfo;
};

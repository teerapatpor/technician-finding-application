import { GOOGLE_API } from '@env';
export const getLocationDescription = async (lat, lng) => {
    const google_api = GOOGLE_API;

    let ApiURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&keyword=cruise&key=${google_api}`;

    //   let params = `origins=${Location1Str}&destinations=${Location2Str}&key=${google_api}`; // you need to get a key
    //   let finalApiURL = `${ApiURL}${encodeURI(params)}`;

    let fetchResult = await fetch(ApiURL); // call API
    let Result = await fetchResult.json(); // extract json
    return JSON.stringify(Result.results[0].vicinity)
    //   return Result.rows[0].elements[0].distance.value;
};

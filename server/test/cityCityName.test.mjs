import * as chai from 'chai';
import request from 'supertest';
import app from '../app.mjs';
import cityData from '../db/utils/data/city_data.mjs';

const expect = chai.expect;

// Expected structure:
// cityName {
//   Province,
//   Population,
//   AreaKm2,
//   GeoLocation: [lat, lon]
// }
// - GET route: `/api/city/:city_name` returns city information.
describe('GET /api/city/:city_name', () => {
  // Act + Assert
  it('should return the city info for Toronto when "toronto"', async () => {
    const res = await request(app).get('/api/city/toronto');

    // Assert
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.deep.equal(cityData.toronto);

    // structure
    expect(res.body).to.have.property('Province', 'Ontario');
    expect(res.body).to.have.property('Population').that.is.a('number');
    expect(res.body).to.have.property('AreaKm2').that.is.a('number');

    // geo location field check
    expect(res.body).to.have.property('Geolocation');
    expect(res.body.Geolocation).to.be.an('array').with.lengthOf(2);
    expect(res.body.Geolocation[0]).to.be.a('number');
    expect(res.body.Geolocation[1]).to.be.a('number');
  });

  it('should return 404 for an unknown city', async () => {
    const res = await request(app).get('/api/city/unknowncity');

    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property('error');
  });
});

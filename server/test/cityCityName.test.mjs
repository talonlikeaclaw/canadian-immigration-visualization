import * as chai from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import app from '../app.mjs';
import { db } from '../db/db.mjs';

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
  let setCollectionStub;
  let findStub;

  // Arrange
  beforeEach(() => {
    setCollectionStub = sinon.stub(db, 'setCollection').resolves();

    findStub = sinon.stub(db, 'find').callsFake(async (query) => {
      if (/toronto/i.test(query.City.$regex)) {
        return [
          {
            City: 'Toronto (CMA), Ont.',
            Province: 'Ontario',
            Population: 5928040,
            AreaKm2: 630.2,
            GeoLocation: [43.65107, -79.347015],
          }
        ];
      }
      return [];
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  // Act + Assert
  it.skip('should return the city info for Toronto when "toronto"', async () => {
    const res = await request(app)
      .get('/api/city/toronto');

    // Assert
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('object');

    // structure
    expect(res.body).to.have.property('City', 'Toronto (CMA), Ont.');
    expect(res.body).to.have.property('Province', 'Ontario');
    expect(res.body).to.have.property('Population').that.is.a('number');
    expect(res.body).to.have.property('AreaKm2').that.is.a('number');

    // geo location field check
    expect(res.body).to.have.property('GeoLocation');
    expect(res.body.GeoLocation).to.be.an('array').with.lengthOf(2);
    expect(res.body.GeoLocation[0]).to.be.a('number');
    expect(res.body.GeoLocation[1]).to.be.a('number');

    // stub assertions
    expect(findStub.calledOnce).to.be.true;
    expect(setCollectionStub.calledWith('cities')).to.be.true;
  });

  it.skip('should return 400 for an unknown city', async () => {
    const res = await request(app)
      .get('/api/city/unknowncity');

    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.property('error');
    expect(findStub.calledOnce).to.be.true;
  });
});

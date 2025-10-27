// Import testing libraries
import * as chai from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import app from '../app.mjs';
import { db } from '../db/db.mjs';

const expect = chai.expect;

// GET /api/city/:city/profile
// returns a combined city profile: basic info, languages spoken,
//   and immigration origins (by period)


/*
{
  City: "Toronto (CMA), Ont.",
  Province: "Ontario",
  Population: 5928040,
  AreaKm2: 630.2,
  GeoLocation: [43.65107, -79.347015],
  Languages: [
    { Language: "English", Count: 3700000 },
    { Language: "French", Count: 150000 }
  ],
  ImmigrationOrigins: [
    { Period: "2011-2016", Country: "India", Count: 90000 },
    { Period: "2016-2021", Country: "China", Count: 85000 }
  ]
}
*/

describe('GET /api/city/:city/profile', () => {
  let setCollectionStub;
  let findStub;

  // ------------------------------------------------------------
  // Arrange (Mocha hook)
  // Before each test, replace real DB calls with Sinon stubs.
  // ------------------------------------------------------------
  beforeEach(() => {
    // simulate setting a collection name in the database
    setCollectionStub = sinon.stub(db, 'setCollection').callsFake((collection) => {
      // which collection is active
      db._currentCollection = collection;
      // mimic async behavior
      return Promise.resolve();
    });

    // stub the db.find method to return mock data for different collections
    findStub = sinon.stub(db, 'find').callsFake(async (query) => {
      // which collection the app is querying
      const collection = db._currentCollection;

      // return fake data depending on which collection is active
      if (/toronto/i.test(query.City?.$regex)) {
       
        // 1 languages data
        if (collection === 'languages') {
          return [
            { City: 'Toronto (CMA), Ont.', Language: 'English', Count: 3700000 },
            { City: 'Toronto (CMA), Ont.', Language: 'French', Count: 150000 },
            { City: 'Toronto (CMA), Ont.', Language: 'Mandarin', Count: 120000 },
          ];
        }

        // 2 immigration data
        if (collection === 'immigration') {
          return [
            { City: 'Toronto (CMA), Ont.', Period: '2011-2016', Country: 'India', Count: 90000 },
            { City: 'Toronto (CMA), Ont.', Period: '2016-2021', Country: 'China', Count: 85000 },
          ];
        }
      }

      return [];
    });
  });

  // clean up 
  afterEach(() => {
    sinon.restore();
  });

  // city profile should combine info, languages, and immigration
  it.skip('should return a combined city profile for Toronto', async () => {
    // simulate a GET request to the API
    const res = await request(app)
      .get('/api/city/toronto/profile');

    // verify structure and data
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('object');

    // general city info
    expect(res.body).to.have.property('City').that.includes('Toronto');
    expect(res.body).to.have.property('Province', 'Ontario');
    expect(res.body).to.have.property('Population').that.is.a('number');
    expect(res.body).to.have.property('GeoLocation').that.is.an('array').with.lengthOf(2);

    // aanguages section
    expect(res.body).to.have.property('Languages').that.is.an('array');
    expect(res.body.Languages[0]).to.have.property('Language');
    expect(res.body.Languages[0]).to.have.property('Count');

    // immigration section
    expect(res.body).to.have.property('ImmigrationOrigins').that.is.an('array');
    expect(res.body.ImmigrationOrigins[0]).to.have.property('Period');
    expect(res.body.ImmigrationOrigins[0]).to.have.property('Country');
    expect(res.body.ImmigrationOrigins[0]).to.have.property('Count');

    // verify the DB methods were called for each collection
    expect(setCollectionStub.callTwice).to.be.true;
    expect(findStub.calledTwice).to.be.true;
  });

  it.skip('should return 404 if city not found', async () => {
    // simulate request for a non-existent city
    const res = await request(app)
      .get('/api/city/unknowncity/profile');

    // verify correct error response
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property('error');
    expect(findStub.callCount).to.be.true;
  });
});

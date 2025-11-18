import * as chai from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import app from '../app.mjs';
import { db } from '../db/db.mjs';

const expect = chai.expect;

// Test Driven Development
// These tests are intentionally skipped
describe('GET /api/cities/comparison?cities=City1,City2', () => {
  let setCollectionStub;
  let findStub;

  beforeEach(() => {
    setCollectionStub = sinon.stub(db, 'setCollection').resolves();

    // Stub find to return mock immigration and language data
    // We will need to implement a db.currentCollection method for testing
    findStub = sinon.stub(db, 'find').callsFake(async query => {
      // Immigration data simulation
      if (/immigration/i.test(db.currentCollection)) {
        if (/Montréal/i.test(query.City.$regex)) {
          return [
            {
              City: 'Montréal (CMA), Que.',
              Country: 'Somalia',
              Period: '1980 to 1990',
              Count: 25
            },
            {
              City: 'Montréal (CMA), Que.',
              Country: 'Somalia',
              Period: '1991 to 2000',
              Count: 255
            }
          ];
        }
        if (/Vancouver/i.test(query.City.$regex)) {
          return [
            {
              City: 'Vancouver',
              Country: 'Somalia',
              Period: '1980 to 1990',
              Count: 25
            },
            {
              City: 'Vancouver',
              Country: 'Somalia',
              Period: '1991 to 2000',
              Count: 255
            }
          ];
        }
      }

      // Language data simulation
      if (/languages/i.test(db.currentCollection)) {
        if (/Montréal/i.test(query.City.$regex)) {
          return [
            { City: 'Montréal', Language: 'French', Count: 2708435 },
            { City: 'Montréal', Language: 'English', Count: 693340 }
          ];
        }
        if (/Vancouver/i.test(query.City.$regex)) {
          return [
            { City: 'Vancouver', Language: 'English', Count: 1500000 },
            { City: 'Vancouver', Language: 'French', Count: 70000 }
          ];
        }
      }

      return [];
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it.skip('should return immigration and language data for two cities', async () => {
    const res = await request(app).get(
      '/api/cities/comparison?cities=Montréal,Vancouver'
    );

    // Validate the output of the response
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length(2);

    // Validate the internal structure
    for (const cityData of res.body) {
      expect(cityData).to.have.all.keys(
        'city',
        'immigration',
        'languages'
      );
      expect(cityData.immigration).to.be.an('array');
      expect(cityData.languages).to.be.an('array');
    }

    // Validate the process
    expect(setCollectionStub.calledTwice).to.be.true;
    expect(findStub.calledCount(4)).to.be.true;
  });

  it.skip('should return 404 for an unknown city', async () => {
    const res = await request(app).get(
      '/api/cities/comparison?cities=Montréal,unknownCity'
    );

    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property('error');
  });
});

// Expected Output:
// [
//   {
//     "city": "Montréal",
//     "immigration": [
//       {
//         City: 'Montréal (CMA), Que.',
//         Country: 'Somalia',
//         Period: '1980 to 1990',
//         Count: 25
//       },
//       {
//         City: 'Montréal (CMA), Que.',
//         Country: 'Somalia',
//         Period: '1991 to 2000',
//         Count: 255
//       }
//     ],
//     "languages": [
//       { "Language": "French", "Count": 2708435 },
//       { "Language": "English", "Count": 693340 }
//     ]
//   },
//   {
//     "city": "Vancouver",
//     "immigration": [
//       {
//         City: 'Vancouver',
//         Country: 'Somalia',
//         Period: '1980 to 1990',
//         Count: 10
//       },
//       {
//         City: 'Vancouver',
//         Country: 'Somalia',
//         Period: '1991 to 2000',
//         Count: 200
//       }
//     ],
//     "languages": [
//       { City: 'Vancouver', Language: 'English', Count: 1500000 },
//       { City: 'Vancouver', Language: 'French', Count: 70000 }
//     ]
//   }
// ]

import * as chai from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import app from '../app.mjs';
import { db } from '../db/db.mjs';

const expect = chai.expect;

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

import * as chai from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import app from '../app.mjs';
import { db } from '../db/db.mjs';

describe('GET /api/cities/comparison?cities=City1,City2', () => {
  beforeEach(() => {
    setCollectionStub = sinon.stub(db, 'setCollection').resolves();

    findImmigrationCityOneStub = sinon
      .stub(db, 'find')
      .callsFake(async query => {
        // Fake db query getting immigration data for city one
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
        return [];
      });

    findImmigrationCityTwoStub = sinon
      .stub(db, 'find')
      .callsFake(async query => {
        // Fake db query getting immigration data for city two
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
        return [];
      });

    findLanguageCityOneStub = sinon
      .stub(db, 'find')
      .callsFake(async query => {
        // Fake db query getting language data
        if (/Montréal/i.test(query.City.$regex)) {
          return [
            {
              City: 'Montréal',
              Language: 'French',
              Count: 2708435
            },
            {
              City: 'Montréal',
              Language: 'English',
              Count: 693340
            }
          ];
        }
        return [];
      });

    findLanguageCityTwoStub = sinon
      .stub(db, 'find')
      .callsFake(async query => {
        // Fake db query getting language data
        if (/Vancouver/.i.test(query.City.$regex)) {
          return [
            {
              City: 'Vancouver',
              Language: 'French',
              Count: 2708435
            },
            {
              City: 'Vancouver',
              Language: 'English',
              Count: 693340
            }
          ];
        }
        return [];
      });
  });

  afterEach(() => {
    sinon.restore();
  });

  it.skip('should return ', () => {});
});

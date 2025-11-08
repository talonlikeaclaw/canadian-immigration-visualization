import * as chai from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import app from '../app.mjs';
import { db } from '../db/db.mjs';

const expect = chai.expect;

describe('GET /api/languages/:cityName', () => {
  let setCollectionStub;
  let aggregateStub;

  // AAA pattern
  // Arrange
  // mocha hook runs beforeEach test

  beforeEach(() => {
    // stub (replace) db call with a fake call
    setCollectionStub = sinon.stub(db, 'setCollection').resolves();
    // stub db.find => simulate fake data
    aggregateStub = sinon
      .stub(db, 'aggregate')
      .callsFake(async pipeline => {
        const regex = pipeline[0].$match.City;
        // acting as db returns a query response
        if (/Montréal/i.test(regex)) {
          return [
            {
              City: 'Montréal (CMA), Que.',
              Language: 'French',
              Count: 2708435
            },
            {
              City: 'Montréal (CMA), Que.',
              Language: 'English',
              Count: 693340
            }
          ];
        }
        return [];
      });
  });
  // mocha hook => clean sinon stubs after each test

  afterEach(() => {
    sinon.restore();
  });

  // Act => supertest

  it('should return languages for montréal when "montreal"', async () => {
    const res = await request(app).get('/api/languages/montreal');

    // assert  => chai
    // response structure
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
    // object properties
    expect(res.body[0]).to.have.property('City');
    expect(res.body[0]).to.have.property('Language');
    // stub behavior
    expect(aggregateStub.calledOnce).to.be.true;
    expect(setCollectionStub.calledWith('languages')).to.be.true;
  });

  // act

  it('should return 404 for an unknown city', async () => {
    const res = await request(app).get('/api/languages/unknownCity');
    // assert
    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property('error');
    expect(aggregateStub.calledOnce).to.be.true;
  });
});

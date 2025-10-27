import * as chai from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import app from '../app.mjs';
import { db } from '../db/db.mjs';

const expect = chai.expect;

describe('GET /:city', ()=>{
  let setCollectionStub;
  let findStub;

  beforeEach(()=>{
    // stub db call with fake call
    setCollectionStub = sinon.stub(db, 'setCollection').resolves();

    // stub db.find
    // by default will return empty array (no data)
    findStub = sinon.stub(db, 'find').resolves([]);
  });

  afterEach(() => {
    sinon.restore();
  });

  // Act
  it('Should return num of immigrants by country for given city, when valid city passed', async()=>{
    const mockImmigrationData = [
      {
        '_id': {
          '$oid': '68fce6a8a27b1de7e01e6505'
        },
        'City': 'Halifax (CMA), N.S.',
        'Country': 'United States of America',
        'Period': 'Before 1980',
        'Count': 1340
      },
      {
        '_id': {
          '$oid': '68fce6a8a27b1de7e01e6506'
        },
        'City': 'Halifax (CMA), N.S.',
        'Country': 'United States of America',
        'Period': '1980 to 1990',
        'Count': 460
      },
      {
        '_id': {
          '$oid': '68fce6a8a27b1de7e01e6507'
        },
        'City': 'Halifax (CMA), N.S.',
        'Country': 'United States of America',
        'Period': '1991 to 2000',
        'Count': 305
      }
    ];
    // resolve to correct, expected data
    findStub.resolves(mockImmigrationData);
    const response = await request(app).get('/api/immigration/halifax');

    // response structure 
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('object');

    // response object properties
    expect(response.body).to.have.property('city');
    expect(response.body).to.have.property('period');
    expect(response.body).to.have.property('totalImmigrants');
    expect(response.body).to.have.property('countries');
    expect(Object.keys(response.body.countries).length).to.be.greaterThan(0);

    // stub behavious
    expect(findStub.calledOnce).to.be.true;
    expect(setCollectionStub.calledWith('immigration')).to.be.true;
  });
});
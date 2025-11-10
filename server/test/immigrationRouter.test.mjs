import * as chai from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import app from '../app.mjs';
import { db } from '../db/db.mjs';

const expect = chai.expect;

describe('GET /api/immigration/:city', () => {
  let setCollectionStub;
  let aggregateStub;

  beforeEach(() => {
    // stub db call with fake call
    setCollectionStub = sinon.stub(db, 'setCollection').resolves();

    // stub db.aggregate
    // by default will return empty array (no data)
    aggregateStub = sinon.stub(db, 'aggregate').resolves([]);
  });

  afterEach(() => {
    sinon.restore();
  });

  // Act
  it('Should return num of immigrants by country for given city, valid city passed', async () => {
    // resolve to correct, expected data
    aggregateStub.resolves([
      {
        totalImmigrants: 50315,
        countries: {
          'United Kingdom': 6590,
          India: 4815,
          China: 3745,
          'United States of America': 3680
        }
      }
    ]);

    const response = await request(app).get('/api/immigration/halifax');

    // response structure
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('object');

    // response object properties
    expect(response.body).to.have.property('city');
    expect(response.body).to.have.property('period');
    expect(response.body).to.have.property('totalImmigrants');
    expect(response.body).to.have.property('countries');
    expect(Object.keys(response.body.countries).length).to.be.greaterThan(
      0
    );

    // stub behavious
    expect(aggregateStub.calledOnce).to.be.true;
    expect(setCollectionStub.calledWith('immigration')).to.be.true;
  });

  it('Should return 400 - Bad request for invalid city name', async () => {
    const response = await request(app).get(
      '/api/immigration/Halifax123!'
    );

    // Assert
    expect(response.statusCode).to.equal(400);
    expect(response.body)
      .to.have.property('error')
      .equal('Invalid city name');
    expect(aggregateStub.called).to.be.false;
  });

  it('Should return 404 - Not Found if no data is returned from DB', async () => {
    // findStub is already configured to return [] by default in beforeEach()
    const response = await request(app).get(
      '/api/immigration/nonExistingCity'
    );

    // Assert
    expect(response.statusCode).to.equal(404);
    expect(response.body)
      .to.have.property('error')
      .include('City not found or immigration data non existant.');
    expect(aggregateStub.calledOnce).to.be.true;
  });
});

describe('GET /api/immigration/:city/period/:end', () => {
  let setCollectionStub;
  let aggregateStub;

  beforeEach(() => {
    // stub db call with fake call
    setCollectionStub = sinon.stub(db, 'setCollection').resolves();

    // stub db.aggregate
    // by default will return empty array (no data)
    aggregateStub = sinon.stub(db, 'aggregate').resolves([]);
  });

  afterEach(() => {
    sinon.restore();
  });

  // Act
  it('Should return num of immigrants by country for given city, valid city passed', async () => {
    // resolve to correct, expected data
    aggregateStub.resolves([
      {
        totalImmigrants: 2105,
        countries: { 'United States of America': 2105 }
      }
    ]);
    const response = await request(app).get(
      '/api/immigration/halifax/period/1980'
    );

    // response structure
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('object');

    // response object properties
    expect(response.body).to.have.property('city');
    expect(response.body).to.have.property('period');
    expect(response.body).to.have.property('totalImmigrants');
    expect(response.body).to.have.property('countries');
    expect(Object.keys(response.body.countries).length).to.be.greaterThan(
      0
    );

    // stub behavious
    expect(aggregateStub.calledOnce).to.be.true;
    expect(setCollectionStub.calledWith('immigration')).to.be.true;
  });

  it('Should return 400 - Bad request for invalid city name', async () => {
    const response = await request(app).get(
      '/api/immigration/Halifax123/period/1980'
    );

    // Assert
    expect(response.statusCode).to.equal(400);
    expect(response.body)
      .to.have.property('error')
      .equal('Invalid city name');
    expect(aggregateStub.called).to.be.false;
  });

  it('Should return 400 - Bad Request for an invalid ending year', async () => {
    const response = await request(app).get(
      '/api/immigration/Halifax/period/2000a'
    );
    // Assert
    expect(response.statusCode).to.equal(400);
    expect(response.body)
      .to.have.property('error')
      .equal('Invalid ending year');
    expect(aggregateStub.called).to.be.false;
  });

  it('Should return 404 - Not Found if no data is returned from DB', async () => {
    // findStub is already configured to return [] by default in beforeEach()
    const response = await request(app).get(
      '/api/immigration/halifax/period/1234'
    );

    // Assert
    expect(response.statusCode).to.equal(404);
    expect(response.body)
      .to.have.property('error')
      .include(
        'No immigration data found for halifax in period Before 1234.'
      );
    expect(aggregateStub.calledOnce).to.be.true;
  });
});

describe('GET /api/immigration/:city/period/:start/:end', () => {
  let setCollectionStub;
  let aggregateStub;

  beforeEach(() => {
    // stub db call with fake call
    setCollectionStub = sinon.stub(db, 'setCollection').resolves();

    // stub db.aggregate
    // by default will return empty array (no data)
    aggregateStub = sinon.stub(db, 'aggregate').resolves([]);
  });

  afterEach(() => {
    sinon.restore();
  });

  // Act
  it('Should return num of immigrants by country for city, when valid period passed', async () => {
    // resolve to correct, expected data
    aggregateStub.resolves([
      {
        totalImmigrants: 2105,
        countries: { 'United States of America': 2105 }
      }
    ]);
    const response = await request(app).get(
      '/api/immigration/halifax/period/2001/2005'
    );

    // response structure
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('object');

    // response object properties
    expect(response.body).to.have.property('city');
    expect(response.body).to.have.property('period');
    expect(response.body).to.have.property('totalImmigrants');
    expect(response.body).to.have.property('countries');
    expect(Object.keys(response.body.countries).length).to.be.greaterThan(
      0
    );

    // stub behavious
    expect(aggregateStub.calledOnce).to.be.true;
    expect(setCollectionStub.calledWith('immigration')).to.be.true;
  });

  it('Should return 400 - Bad request for invalid city name', async () => {
    const response = await request(app).get(
      '/api/immigration/halifax123/period/2001/2005'
    );

    // Assert
    expect(response.statusCode).to.equal(400);
    expect(response.body)
      .to.have.property('error')
      .equal('Invalid city name');
    expect(aggregateStub.called).to.be.false;
  });

  it('Should return 400 - Bad Request for an invalid starting year', async () => {
    const response = await request(app).get(
      '/api/immigration/halifax/period/2002a/2005'
    );
    // Assert
    expect(response.statusCode).to.equal(400);
    expect(response.body)
      .to.have.property('error')
      .equal('Invalid starting year');
    expect(aggregateStub.called).to.be.false;
  });

  it('Should return 400 - Bad Request for an invalid ending year', async () => {
    const response = await request(app).get(
      '/api/immigration/halifax/period/2001/abc'
    );
    // Assert
    expect(response.statusCode).to.equal(400);
    expect(response.body)
      .to.have.property('error')
      .equal('Invalid ending year');
    expect(aggregateStub.called).to.be.false;
  });

  it('Should return 404 - Not Found if no data is returned from DB', async () => {
    // findStub is already configured to return [] by default in beforeEach()
    const response = await request(app).get(
      '/api/immigration/halifax/period/2002/2005'
    );

    // Assert
    expect(response.statusCode).to.equal(404);
    expect(response.body)
      .to.have.property('error')
      .include(
        'No immigration data found for halifax in period 2002 to 2005.'
      );
    expect(aggregateStub.calledOnce).to.be.true;
  });
});

describe(' placeholder immigration routes', ()=> {

  // /api/immigration/:city/country/:country
  it('should return a message for /:city/country/:country', async () => {
    const response = await request(app).get(
      '/api/immigration/montreal/country/france'
    );
    
    expect(response.statusCode).to.equal(200);
    expect(response.body)
      .to.have.property('message')
      .that.include('Specific immigration pattern of france into montreal city');
  });

  it('should retrun a message for /:city/top-country', async () => {
    // request => supertest
    const response = await request(app).get(
      '/api/immigration/montreal/top/-countries'
    );

    expect(response.statusCode).to.equal(200);
    expect(response.body)
      .to.have.property('message')
      .that.include('Most countries emmigrating towards montreal city');
  });

  it('should return a message for /:city/summary', async ()=> {
    const response = await request(app).get(
      '/api/immigration/montreal/summary'
    );

    expect(response.statusCode).to.equal(200);
    expect(response.body)
      .to.have.property('message')
      .that.include('Summary of stats for montreal city');
  });

});
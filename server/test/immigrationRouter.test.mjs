import * as chai from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import app from '../app.mjs';
import { db } from '../db/db.mjs';

const expect = chai.expect;

describe('GET /:city', ()=>{
  beforeEach(()=>{

  });

  afterEach(() => {
    sinon.restore();
  });

  // Act
  it('Should return num of immigrants by country for given city, when valid city passed', async()=>{
    const response = await request(app).get('/api/immigration/halifax');

    // response structure 
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an(Object);
    expect(response.body.length).to.be.greaterThan(0);

    // response object properties
    expect(response.body).to.have.property('city');
    expect(response.body).to.have.property('period');
    expect(response.body).to.have.property('totalImmigrants');
    expect(response.body).to.have.property('countries');
    expect(response.body[3].length).to.be.greaterThan(0);
  });
});
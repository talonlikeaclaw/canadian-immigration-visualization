import {expect} from 'chai';
import request from 'supertest';
import app from '../app.mjs';

describe('Get /api/languages/:cityName', () => {
    it('should return languages for montréal when "montreal"', async ()=>{
        
    const res = await request(app)
        .get('api/languages/montreal')
        .expect('content-Type', /json/)
        .expect(200);
    
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
    

    })
});
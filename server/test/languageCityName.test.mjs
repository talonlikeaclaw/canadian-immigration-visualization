import * as chai from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import app from '../app.mjs';
import {db} from '../db/db.mjs'

const  expext = chai.expect;

describe('Get /api/languages/:cityName', () => {
    it('should return languages for montréal when "montreal"', async ()=>{
        
    // AAA pattern

    before(()=>{
        sinon.stub(db, 'setCollection').resolves();
        sinon.stub(db, 'find').callsFake( async (query) => {
        // act
        if (/Montréal/i.test(query.City.$regex)){
            return [
                { City: 'Montréal (CMA), Que.', Language: 'French', Count: 2708435 },
                { City: 'Montréal (CMA), Que.', Language: 'English', Count: 693340 }
            ];
        } 
        return [];
        });
    });
    
        const res = await request(app)
        .get('api/languages/montreal')
        .expect('content-Type', /json/)
        .expect(200);
    
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
    expect(res.body[0]).to.have.property('City');
    expect(res.body[0]).to.have.property('Languages');
    });

    it('should return 404 for an unknown city', async () => {
        const res = await request(app)
            .get('/api/languages/unknownCity')
            .expect(404);

        expect(res.body).to.have.property('error');
    });
});
import * as chai from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import app from '../app.mjs';
import { db } from '../db/db.mjs'

const expect = chai.expect;

describe('GET /api/languages/:cityName', () => {
    let setCollectionStub, findStub;

    // AAA pattern
    beforeEach(() => {
        setCollectionStub = sinon.stub(db, 'setCollection').resolves();
        findStub = sinon.stub(db, 'find').callsFake(async (query) => {

            if (/Montréal/i.test(query.City.$regex)) {
                return [
                    { City: 'Montréal (CMA), Que.', Language: 'French', Count: 2708435 },
                    { City: 'Montréal (CMA), Que.', Language: 'English', Count: 693340 }
                ];
            }
            return [];
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return languages for montréal when "montreal"', async () => {

        const res = await request(app)
            .get('/api/languages/montreal');

        // assert    
        // expect('content-Type', /json/)
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
        expect(res.body[0]).to.have.property('City');
        expect(res.body[0]).to.have.property('Language');
        expect(findStub.calledOnce).to.be.true;
        expect(setCollectionStub.calledWith('languages')).to.be.true;
    });

    it('should return 404 for an unknown city', async () => {

        const res = await request(app)
            .get('/api/languages/unknownCity')

        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('error');
        expect(findStub.calledOnce).to.be.true;
    });
});
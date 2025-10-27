import * as chai from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import app from '../app.mjs';
import { db } from '../db/db.mjs';

//GET route: `/api/city/:city/profile` 
//returns a combined city profile: immigration origins (by period) and languages spoken

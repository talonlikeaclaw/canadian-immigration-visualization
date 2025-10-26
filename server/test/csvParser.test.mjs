import { expect } from 'chai';
import sinon from 'sinon';
import * as csvParser from '../db/utils/csvParser.mjs';

describe('CSV Parser Module', () => {
  let readFileStub;

  beforeEach(() => {
    readFileStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });
});

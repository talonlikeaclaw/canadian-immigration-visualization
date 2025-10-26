import { expect } from 'chai';
import sinon from 'sinon';
import { seedDatabase } from '../db/utils/seed.mjs';

describe('seedDatabase', () => {
  let dbStub;
  let parseImmigrationCSVStub;
  let parseLanguageCSVStub;
  let consoleLogStub;
  let consoleErrorStub;

  // Arrange
  beforeEach(() => {
    // Stub the db object
    dbStub = {
      connect: sinon.stub().resolves(),
      setCollection: sinon.stub().resolves(),
      dropAndSeed: sinon.stub().resolves(),
      close: sinon.stub().resolves()
    };

    // Stub the CSV parsers
    parseImmigrationCSVStub = sinon.stub().resolves([
      {
        City: 'Montréal',
        Country: 'France',
        Period: '1991 to 2000',
        Count: 1000
      },
      {
        City: 'Montréal',
        Country: 'France',
        Period: '2001 to 2005',
        Count: 2000
      }
    ]);

    parseLanguageCSVStub = sinon.stub().resolves([
      {
        City: 'Montréal',
        Language: 'English',
        Count: 693340
      },
      {
        City: 'Montréal',
        Language: 'French',
        Count: 2708435
      }
    ]);

    // Stub console methods to keep test output clean
    consoleLogStub = sinon.stub(console, 'log');
    consoleErrorStub = sinon.stub(console, 'error');

    // Set environment variable
    process.env.DB_NAME = 'test_db';
  });

  // Tear down
  afterEach(() => {
    sinon.restore();
    delete process.env.DB_NAME;
  });
});

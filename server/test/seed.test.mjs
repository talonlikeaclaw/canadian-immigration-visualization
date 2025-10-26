import { expect } from 'chai';
import sinon from 'sinon';
import { seedDatabase } from '../db/utils/seed.mjs';

describe('Database Seeding Script', () => {
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

  it('should seed both collections successfully', async () => {
    // Inject testing dependencies
    await seedDatabase({
      db: dbStub,
      parseImmigrationCSV: parseImmigrationCSVStub,
      parseLanguageCSV: parseLanguageCSVStub
    });

    // DB connection and collection setup
    expect(dbStub.connect.calledOnceWith('test_db')).to.be.true;
    expect(dbStub.setCollection.calledWith('immigration')).to.be.true;
    expect(dbStub.setCollection.calledWith('languages')).to.be.true;

    // Parsing and seeding
    expect(parseImmigrationCSVStub.calledOnce).to.be.true;
    expect(parseLanguageCSVStub.calledOnce).to.be.true;
    expect(dbStub.dropAndSeed.calledTwice).to.be.true;

    // Cleanup and logs
    expect(dbStub.close.calledOnce).to.be.true;
    expect(consoleLogStub.calledWith('[DB] Starting database seeding...'))
      .to.be.true;
  });

  it('should throw an error if DB_NAME is missing', async () => {
    // Delete DB_NAME environment variable for test
    delete process.env.DB_NAME;

    try {
      await seedDatabase({
        db: dbStub,
        parseImmigrationCSV: parseImmigrationCSVStub,
        parseLanguageCSV: parseLanguageCSVStub
      });
    } catch (e) {
      expect(e.message).to.equal('Missing DB_NAME environment variable.');
    }
  });

  it('should log an error if immigration parsing fails', async () => {
    parseImmigrationCSVStub.rejects(new Error('parse fail'));

    try {
      await seedDatabase({
        db: dbStub,
        parseImmigrationCSV: parseImmigrationCSVStub,
        parseLanguageCSV: parseLanguageCSVStub
      });
    } catch (error) {
      expect(consoleErrorStub.called).to.be.true;
      expect(error.message).to.equal('parse fail');
    }
  });

  it('should log an error if language parsing fails', async () => {
    parseLanguageCSVStub.rejects(new Error('parse fail'));

    try {
      await seedDatabase({
        db: dbStub,
        parseImmigrationCSV: parseImmigrationCSVStub,
        parseLanguageCSV: parseLanguageCSVStub
      });
    } catch (error) {
      expect(consoleErrorStub.called).to.be.true;
      expect(error.message).to.equal('parse fail');
    }
  });
});

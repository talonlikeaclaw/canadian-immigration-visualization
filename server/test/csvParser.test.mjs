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

  it('should correctly parse simplified immigration CSV rows', async () => {
    const fakeCSV = `
line1
line2
line3
line4
line5
line6
line7
line8
"Geography","Age (15C)","Gender","Stats","Place of birth","Period of immigration (8)","2021"
"Halifax (CMA), N.S. i12","Total","Total","2021 Counts",
,,,,"United States of America","Total immigrant population 5 6","3680"
,,,,,"Before 1980","1340"
,,,,,"1980 to 1990","460"
,,,,,"2016 to 2021 7","555"
`.trim();

    readFileStub.resolves(fakeCSV);

    const result = await csvParser.parseImmigrationCSV(readFileStub);

    // Validate process
    expect(readFileStub.calledOnce).to.be.true;
    expect(result).to.be.an('array').that.is.not.empty;

    // Validate result
    const last = result[result.length - 1];
    expect(last).to.deep.equal({
      City: 'Halifax (CMA), N.S.',
      Country: 'United States of America',
      Period: '2016 to 2021',
      Count: 555
    });
  });
});

const {generateUniqueId} = require('../../src/utils');
describe('Generate Unique ID',() => {
  it('should generate Unique ID', () => {
    const id = generateUniqueId();
    expect(id).toHaveLength(8);
  })
});
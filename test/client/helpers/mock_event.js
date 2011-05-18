function mockEvent () {
  return { 
    updateDOM: sinon.stub(),
    serialize: sinon.stub().returns('{"type":"stub"}')
  };
};
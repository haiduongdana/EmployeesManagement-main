const sinon = require("sinon");

const mockResponse = () => {
  let res = {
    status: function (status) {
      this.status = status;
      return this;
    },
    json: function (body) {
      this.body = body;
      return this;
    },
  };

  return res;
};

const mockRequest = (query = {}, params = {}, body = {}, files = []) => {
  return {
    query,
    params,
    body,
    files,
  };
};

module.exports = {
  mockRequest,
  mockResponse,
};

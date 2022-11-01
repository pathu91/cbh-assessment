const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Should always return a string type", () => {
    const trivialKey = deterministicPartitionKey(123412);
    expect(typeof trivialKey).toBe("string");
  });
  it("Should always return 128 bytes", () => {
    const trivialKey = deterministicPartitionKey(
      "hello i am converting to bytes"
    );
    const blob = new Blob([trivialKey]);
    const asBytes = blob.size;
    expect(asBytes).toBe(128);
  });
});

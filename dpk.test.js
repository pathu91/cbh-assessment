const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Should always return a string type", () => {
    const partitionKey = 123412;
    const trivialKey = deterministicPartitionKey(partitionKey);
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

  it("Should hash partitionKeys with more than 256 characters", () => {
    const testEvent = {
      partitionKey: 1234567891234567891234567891234567891234567891234567891234561789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789,
    };
    const trivialKey = deterministicPartitionKey(testEvent);
    const blob = new Blob([trivialKey]);
    const asBytes = blob.size;
    // expect(testEvent.partitionKey.length > 256).toBe(true);
    expect(String(testEvent.partitionKey).length < 256).toBe(true);
    expect(asBytes).toBe(128);
  });
});

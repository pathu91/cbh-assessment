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
    // const testEvent = {
    //   partitionKey: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //   Aenean turpis nunc, lobortis quis sagittis a, tempus molestie mauris.
    //   Maecenas est nunc, maximus a lacus malesuada, eleifend porttitor dui.
    //   In hac habitasse platea dictumst. Aliquam erat volutpat.
    //   Cras sed vehicula nunc, eget consectetur tortor.`,
    // };
    const testEvent = {
      partitionKey: 89173647182346891273491411234567891823746128934672389744912345678918237461289346723897412634789136498713468917364718234689127349141123456789182374612893467238974491234567891823746128934672389741263478913649871346891736471823468912734914112345678918237461289346723897449,
    };
    const trivialKey = deterministicPartitionKey(testEvent);
    const blob = new Blob([trivialKey]);
    const asBytes = blob.size;
    expect(Math.log(testEvent.partitionKey) >= 256).toBe(true);
    expect(asBytes).toBe(128);
  });
});

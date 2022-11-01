const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = JSON.stringify(event.partitionKey);
      console.log(candidate);
    } else {
      candidate = JSON.stringify(event);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
    return candidate;
  }

  candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");

  return candidate;
};

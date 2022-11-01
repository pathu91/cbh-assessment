// const crypto = require("crypto");

// exports.deterministicPartitionKey = (event) => {
//   const TRIVIAL_PARTITION_KEY = "0";
//   const MAX_PARTITION_KEY_LENGTH = 256;
//   let candidate;

//   if (event) {
//     if (event.partitionKey) {
//       candidate = event.partitionKey;
//     } else {
//       const data = JSON.stringify(event);
//       candidate = crypto.createHash("sha3-512").update(data).digest("hex");
//     }
//   }

//   if (candidate) {
//     if (typeof candidate !== "string") {
//       candidate = JSON.stringify(candidate);
//     }
//   } else {
//     candidate = TRIVIAL_PARTITION_KEY;
//   }
//   if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
//     candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
//   }
//   return candidate;
// };

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

const testEvent = {
  partitionKey: 89173647182346891273491411234567891823746128934672389744912345678918237461289346723897412634789136498713468917364718234689127349141123456789182374612893467238974491234567891823746128934672389741263478913649871346891736471823468912734914112345678918237461289346723897449,
};

console.log(this.deterministicPartitionKey(testEvent));

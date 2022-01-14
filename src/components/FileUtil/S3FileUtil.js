import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./S3Client."

// export const bucketParams = {
//     Bucket: "BUCKET_NAME",
//     Key: "KEY",
// };

export  async function  downloadS3File(bucketname,key){
    try {
      console.log("Downloading file from S3")
      const bucketParams={
            Bucket: bucketname,
            Key: "key",
        };
      const streamToString = (stream) =>
        new Promise((resolve, reject) => {
          const chunks = [];
          stream.on("data", (chunk) => chunks.push(chunk));
          stream.on("error", reject);
          stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        });
  
      const data = await s3Client.send(new GetObjectCommand(bucketParams));
      const bodyContents = await streamToString(data.Body);
      console.log(bodyContents);
        return bodyContents;
    } catch (err) {
      console.log("Error", err);
    }
  }

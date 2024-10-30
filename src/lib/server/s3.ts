import * as Minio from 'minio'
import { S3_ENDPOINT, S3_SECRET, S3_KEY } from '$env/static/private'
import { v4 as uuidv4 } from 'uuid'

const minioClient = new Minio.Client({
  endPoint: S3_ENDPOINT,
  port: 9000,
  useSSL: false, 
  accessKey: S3_KEY,
  secretKey: S3_SECRET,
})

export async function UploadImage(image: File ) {
  const bucket = "recipes"
  const bucketExists = await minioClient.bucketExists(bucket)

  if (!bucketExists) {
    console.error(`Bucket ${bucket} does not exist.`)
    return null
  }

  const fileExtension = image.name.split('.').pop()  
  const fileName = `${uuidv4()}.${fileExtension}`   
  const metaData = {
    'Content-Type': image.type,
  }

  const buffer = await image.arrayBuffer().then((buf) => Buffer.from(buf))

  try {
    await minioClient.putObject(bucket, fileName, buffer, buffer.length, metaData)  
    const filePath = `${bucket}/${fileName}`  
    console.log(`Image uploaded successfully: ${filePath}`)
    return filePath
  } catch (error) {
    console.error('Error uploading image:', error)
    return null
  }
}

export async function GetImage(path: string): Promise<Buffer | null> {
  console.log(path)
  let [bucket, objectName] = path.split("/", 2); 
  bucket = "recipes"
  objectName = "4134325b-9809-4797-b8a0-42eba6dcde69.jpeg"
  try {
    const stream = await minioClient.getObject(bucket, objectName); 
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    
    return Buffer.concat(chunks); 
  } catch (error) {
    console.error("Error retrieving image:", error);
    return null;
  }
}

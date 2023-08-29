const moment = require("moment");

const db = require("../models");

const AWS = require('aws-sdk');

const { ACCESS_KEY, SECRET_ACCESS_KEY, REGION, S3_BUCKET } = require('../common')

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
});
const s3 = new AWS.S3();

exports.uploadsImg = async (req, res)=>{
    const file = req.file;

    const params = {
        Bucket: S3_BUCKET,
        Key: file.originalname,
        Body: file.buffer,
    };
    try {
        const response = await s3.upload(params).promise();
        console.log(response)
        console.log('Image uploaded to S3:', response.Location);
        console.log('Image uploaded to S3:', response);
        res.status(200).json({ message: 'Success', url : response.Location });
    } catch (error) {
        console.error('Error uploading to S3:', error);
        res.status(500).json({ error: 'Error uploading image' });
    }
}
exports.deleteImg = async (req, res)=>{
    const objectKey = req.params.objectKey;
    console.log(objectKey)
    const params = { 
        Bucket: S3_BUCKET,
        Key: objectKey 
    }

    try {
        const response = await s3.deleteObject(params).promise();
        console.log('Object deleted successfully:', response);
        res.status(200).json({ message: 'Deleted' });
    } catch (error) {
        console.error('Error deleting object:', error);
        res.status(500).json({ error: 'Error deleting object' });
    }
}
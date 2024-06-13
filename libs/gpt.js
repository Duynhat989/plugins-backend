const fs = require('fs');
const axios = require('axios');
const { pipeline, Readable } = require('stream');

const createAudio = async () => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            "model": "tts-1",
            "voice": "alloy",
            "speed": 1,
            "input": "xin chào bạn nhé , tôi tên là hoang"
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.ttsopenai.com/api/v1/public/text-to-speech-stream',
            headers: {
                'Origin': 'https://ttsopenai.com',
                'Referer': 'https://ttsopenai.com/',
                'Sec-Ch-Ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Sec-Fetch-Site': 'same-site',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then(response => {
                const writer = fs.createWriteStream('output.mp3');

                // Create a Readable stream from the response data
                const readableStream = Readable.from(response.data);

                // Pipe the response data to the file
                pipeline(readableStream, writer, (err) => {
                    if (err) {
                        console.error('Pipeline failed.', err);
                    } else {
                        console.log('Pipeline succeeded.');
                    }
                });
                resolve(true);
            })
            .catch(error => {
                reject(error);
            });
    });
};

module.exports = {
    createAudio
};

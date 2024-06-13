const axios = require('axios')

exports.showImage = (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                headers: {
                    'Referer': url
                },
                responseType: 'arraybuffer'
            };

            axios.get(url, config)
                .then((response) => {
                    return resolve(response.data);
                })
                .catch((error) => {
                    return reject(error);
                });
        } catch (error) {
            return reject(error);
        }
    });
}
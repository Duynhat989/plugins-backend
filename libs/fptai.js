const createAudio = async (text, token, voice = "banmaiace") => {
    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        const urlencoded = new URLSearchParams();
        urlencoded.append("text", text);
        urlencoded.append("voice", voice);
        urlencoded.append("speed", "0");
        urlencoded.append("token", token);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow"
        };
        fetch("https://demo.fpt.ai/hmi/tts", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            });
    })
}
module.exports = {
    createAudio
}
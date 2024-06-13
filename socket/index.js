module.exports = function (server,router) {
    const socketIO = require('socket.io');
    // const member = require('../model/user')
    let extension_onlines = {}
    let user_onlines = {}
    // Cấu hình CORS cho socket.io
    const io = socketIO(server, {
        cors: {
            origin: '*', //
            methods: ['GET', 'POST'],
            allowedHeaders: ['my-custom-header'],
            credentials: true
        }
    });
    // Lắng nghe kết nối từ các clients
    io.on('connection', async (socket) => {
        socket.join(socket.id)
        io.to(socket.id).emit('connected');
        // Kết nối từ user_id 
        socket.on('info_connection', async (res) => {
            try {
                // Phần kiểm tra online
                if(res.name  != undefined){
                    var name  = res.name
                    socket.join(name)
                    if (!extension_onlines[name]) {
                        extension_onlines[name] = {
                            name:name,
                            socketId: socket.id,
                            status:false
                        }
                    }
                    thongbaoonextension()
                }else{
                    var token  = res.token
                    socket.join(token)
                    if (!user_onlines[token]) {
                        user_onlines[token] = {
                            token:token,
                            socketId: socket.id
                        }
                    }
                    thongbaoonline()
                }
                
            } catch (error) {
                console.log("______error_____", error)
            }
        });
        // Lắng nghe sự kiện "message" từ client
        socket.on('download', (res) => {
            // console.log('Nhận tin nhắn từ client: ', res);
            var api_token  = res.token
            var url_tiktok = res.url_tiktok
            // 
            for(let i = 0 ;i < Object.keys(extension_onlines).length;i++){
                var key = Object.keys(extension_onlines)[i]
                var extension = extension_onlines[key]
                if(extension.status == false){
                    extension.status = true
                    io.to(extension.name).emit('download', {
                        url_tiktok: url_tiktok,
                        robot:extension.name,
                        api_token:api_token
                    });
                    break
                }
            }
            console.log(extension_onlines)
        });
        socket.on('received', (res) => {
            io.to(res.api_token).emit('loadding', {
                robot:res.name
            });
        });
        socket.on('finish', (res) => {
            var name  = res.name
            Object.keys(extension_onlines).forEach((roomId) => {
                const extension = extension_onlines[roomId];
                if(extension.status == true){
                    if(extension.name == name){
                        extension.status = false
                    }
                }
            });
            const list_video = filter_videos(res.videos)
            io.to(res.api_token).emit('received', {
                videos: list_video,
                robot:name
            });
            console.log(extension_onlines)
        });
        // Lắng nghe sự kiện ngắt kết nối từ client
        socket.on('disconnect', () => {
            try {
                Object.keys(extension_onlines).forEach((roomId) => {
                    const room = extension_onlines[roomId];
                    if (room.socketId == socket.id) {
                        console.log(`${room.name} offline`);
                        delete extension_onlines[roomId]
                    }
                });
                thongbaoonextension()
            } catch (error) {
                console.log("______error_____", error)
            }
            try {
                Object.keys(user_onlines).forEach((roomId) => {
                    const room = user_onlines[roomId];
                    if (room.socketId == socket.id) {
                        console.log(`${room.name} offline`);
                        delete user_onlines[roomId]
                    }
                });
                thongbaoonline()
            } catch (error) {
                console.log("______error_____", error)
            }
        });
    });
    const filter_videos = (videos) =>{
        const list = []
        for(const link of  videos){
            if(!list.includes(link)){
                list.push(link)
            }
        }
        return list
    }
    const thongbaoonextension = () => {
        console.log(`Đang có ${Object.keys(extension_onlines).length} extension.`)
        io.to("adminRoom").emit('online', {
            count: Object.keys(extension_onlines).length,
            list: extension_onlines
        });
    }
    const thongbaoonline = () => {
        console.log(`Đang có ${Object.keys(user_onlines).length} member.`)
        io.to("adminRoom").emit('online', {
            count: Object.keys(user_onlines).length,
            list: user_onlines
        });
    }
    // Trả về các hàm hoặc giá trị mà bạn muốn xuất ra từ file index
    return {
        // Ví dụ:
        thongbaoonline: thongbaoonline
    };
};

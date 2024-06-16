const path = require('path')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
// Import router từ file index.js
const user = require('./routes/user.routes')
const setup = require('./routes/setup.routes')

const genres = require('./routes/genres.routes')

//admin router
const admin_comic = require('./routes/admin/comic.routes')
const admin_chap = require('./routes/admin/chap.routes')
const admin_image = require('./routes/admin/image.routes')
const admin_imgbb = require('./routes/admin/imgbb.routes')
const imgbb = require('./routes/imgbb.routes')
const chat = require('./routes/chat.routes')
const assistants = require('./routes/assistants.routes')
const mp3 = require('./routes/mp3.routes')
const prompt = require('./routes/prompt.routes')
// Sử dụng router với prefix /api

const comic = require('./routes/comic.routes')
const chap = require('./routes/chap.routes')

const app = express();
const server = http.createServer(app);
// ewr
require('./socket/index')(server)
// app.use(express.static(path.join(__dirname, 'public')));
// Phân tích nội dung yêu cầu từ dạng JSON
app.use(cors());
// Phân tích nội dung yêu cầu từ dạng x-www-form-urlencoded
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/api/user', user);
// app.use('/api/setup', setup);
// app.use('/api/genres', genres);
// app.use('/api/admin/comic', admin_comic);
// app.use('/api/admin/chap', admin_chap);
// app.use('/api/admin/image', admin_image);
// app.use('/api/admin/imgbb', admin_imgbb);
// app.use('/api/image', imgbb);
// app.use('/api/comic', comic);
// app.use('/api/chap', chap);
app.use('/api/chat', chat);
app.use('/api/assistants', assistants);
app.use('/api/mp3', mp3);
app.use('/api/prompt', prompt);
// app.use('/api/read', read);
// app.use('/api/store', store);
// app.use('/api/staff', staff);
// app.use('/api/menu', menu);
// build mới 
const db = require("./utils/db");
var sequelize = db.sequelize
sequelize.sync({ force: false }).then(() => {
    console.log('Bảng đã được tạo hoặc cập nhật.');
  });


// Khi có một kết nối mới được thiết lập
const PORT = 2099;

server.listen(PORT, () => console.log(`Server running on port localhost:${PORT}`));

const comics = require("../../models/comic.model");
const chaps = require("../../models/chap.model");

let debug = true;
exports.register = async (req, res) => {
  try {
    const { title, slug, description, src, avata,id_category } = req.body;
      var contains = await comics.findContains(slug)
      if (contains) {
        res.send({
          status: true,
          data: contains,
          msg: 'contains',
          last_chap:await chaps.getLast(contains.id)
        });
  
      } else {
        var newStaff = await comics.register(title, slug, description, src, avata,id_category);
        if (newStaff != null) {
          res.send({
            status: true,
            data: newStaff,
            last_chap: null,
            msg: 'new'
          });
        } else {
          res.send({
            status: false,
            data: null,
          });
        }
      }
  } catch (error) {
    if (debug) {
      res.send({
        status: false,
        user: null,
        error: error,
      });
    } else {
      res.send({
        status: false,
        user: null
      });
    }
  }
};
exports.list = async (req, res) => {
 
  try {
    const { limit,type,page } = req.body
    if(!limit){
      limit = 12
    }
    var Staffs = await comics.list(limit,page,type);
    res.send({
      status: true,
      data: Staffs.comics,
      count: Staffs.totalCount
    });
  } catch (error) {
    res.send({
      status: false,
      user: null,
      error: error,
    });
  }
};
exports.comic_timeout = async (req, res) => {
  try {
    var Staffs = await comics.comic_timeout();
    if (Staffs) {
      update_time_Checker(Staffs.id)
      res.send({
        status: true,
        data: Staffs,
      });
    }else{
      res.send({
        status: false,
        user: null,
      });
    }
  } catch (error) {
    res.send({
      status: false,
      user: null,
      error: error,
    });
  }
};
exports.detroy = async (req, res) => {
  try {
    const { id } = req.body;
    var Staffs = await genres.detroy(id);
    res.send({
      status: true,
      staffs: Staffs,
    });
  } catch (error) {
    res.send({
      status: false,
      user: null,
      error: error,
    });
  }
};
exports.findOne = async (req, res) => {
  try {
    const { slug } = req.body
    var Staffs = await comics.find(slug);
    //----------------------------------\
    
    res.send({
      status: true,
      data: Staffs
    });
  } catch (error) {
    res.send({
      status: false,
      user: null, 
      error: error,
    });
  }
};
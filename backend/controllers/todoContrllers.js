const db = require("../db");




// GET TODO
const getTodos=(req,res)=>{
   

    const userid = req.user.id;

    db.query(
        "SELECT * FROM todos WHERE user_id= ?",
        [userid],
        (err,result)=>{
            if(err){
                return res.status(500).json(err);
            }

            res.json(result);
        }
    )
}



// ADD TODO
const addTodo = (req, res) => {
   


  const { title } = req.body;
  const userId = req.user.id;

  db.query(
    "INSERT INTO todos(title, user_id) VALUES(?, ?)",
    [title, userId],
    (err, result) => {
      

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Todo Added Successfully"
      });

    }
  );
};


// DELETE TODO
const deleteTodo = (req, res) => {

  const { id } = req.params;
  const userId = req.user.id;

  db.query(
    "DELETE FROM todos WHERE id = ? AND user_id = ?",
    [id, userId],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Todo not found"
        });
      }

      res.json({
        message: "Todo Deleted Successfully"
      });

    }
  );
};



// UPDATE TODO
const updateTodo = (req, res) => {

  const { id } = req.params;
  const { title } = req.body;
  const userId = req.user.id;

  db.query(
    "UPDATE todos SET title = ? WHERE id = ? AND user_id = ?",
    [title, id, userId],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Todo not found"
        });
      }

      res.json({
        message: "Todo Updated Successfully"
      });

    }
  );
};



const toggleTodo=(req,res)=>{

  const {id} =req.params;
  const userId =req.user.id;

  db.query(
    "UPDATE todos SET completed = NOT completed WHERE id = ? AND user_id = ?",
    [id, userId],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Todo Status Updated"
      });
    }
  )
}


module.exports = {getTodos,addTodo,deleteTodo,updateTodo,toggleTodo};
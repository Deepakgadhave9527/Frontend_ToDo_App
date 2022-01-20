import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddEdit from './AddEdit';
import Swal from "sweetalert2";
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TodoService from '../services/TodoService';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    editIcon: {
        color: "green",
        cursor: "pointer",
        marginRight: "12px"

    },
    deleteIcon: {
        color: "red",
        cursor: "pointer",
    },
}));

const PostList = () => {
    const [posts, setPost] = useState();
    const [initialPost, setInitialPost] = useState({});
    const [opertion, setOpertion] = useState();
    const [open, setOpen] = useState(false);
    const classes = useStyles()

    const handleClose = () => {
        setOpen(false)
    }
    const addPost = () => {
        setInitialPost({
            title: "",
            author: "",
            body: ""
        });
        setOpen(true);
        setOpertion("add")

    }
    const onHandleEdit = (post) => {
        setInitialPost(post);
        setOpen(true);
        setOpertion("edit")

    }


    const loadPost = () => {
        // axios.get("http://localhost:3001/posts").then((res) => {
        //     setPost(res.data.reverse())
        TodoService.fetchAllTask().then((res) => {
            setPost(res.data.result.reverse())

        }).catch((err) => {
        }
        )
    }

    useEffect(() => {
        loadPost()


    }, [])

    const onHandleDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this post!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (result.isConfirmed) {
                // axios.delete(`http://localhost:3001/posts/${id}`).then((response) => 

                TodoService.deleteTask(id).then((response) => {

                    Swal.fire("Deleted!", "Your post has been deleted.", "success");
                    loadPost()

                })
                    .catch((err) => {
                        Swal.fire("Error!", "Your post has not been deleted.", "error");
                    });
            }
        });


    }


    const columns = [
        {
            label: "ID",
            name: "id",
            options: {
                customBodyRenderLite: (dataIndex) => {
                    return <>
                        {dataIndex + 1}
                    </>
                }
            }


        },

        {
            label: "Title",
            name: "title"
        },
        {
            label: "Description",
            name: "author"
        },
        {
            label: "Stage",
            name: "body",
        },
        {
            label: "Action",
            name: "Action",
            options: {
                customBodyRenderLite: (dataIndex) => {
                    return <>
                        <span className={classes.editIcon} onClick={() => onHandleEdit(posts[dataIndex])}> <EditIcon /></span>
                        <span className={classes.deleteIcon} onClick={() => {


                            onHandleDelete(posts[dataIndex]._id)



                        }


                        }> <DeleteIcon /></span>

                    </>
                }
            }
        }

    ]



    return (<>


        <AddEdit handleClose={handleClose} open={open} opertion={opertion} initialPost={initialPost} loadPost={loadPost} />
        <br />

        <Box>
            <Fab color="primary" aria-label="add"  >
                <AddIcon onClick={addPost} />
            </Fab>
        </Box>

        <MUIDataTable title="ToDo Task" columns={columns} data={posts} />


    </>);
}

export default PostList;


// import React, { useEffect, useState } from 'react';
// import MUIDataTable from "mui-datatables";
// import axios from "axios";
// import { Fab } from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from "@material-ui/icons/Delete";
// import EditIcon from "@material-ui/icons/Edit";
// import AddEdit from './AddEdit';
// import Swal from "sweetalert2";
// import Box from '@material-ui/core/Box';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         '& > * + *': {
//             marginTop: theme.spacing(2),
//         },
//     },
//     editIcon: {
//         color: "green",
//         cursor: "pointer",
//         marginRight: "12px"

//     },
//     deleteIcon: {
//         color: "red",
//         cursor: "pointer",
//     },
// }));



// const PostList = () => {
//     const [posts, setPost] = useState();
//     const [initialPost, setInitialPost] = useState({});
//     const [opertion, setOpertion] = useState();
//     const [open, setOpen] = useState(false);
//     const classes = useStyles()

//     const handleClose = () => {
//         setOpen(false)
//     }
//     const addPost = () => {
//         setInitialPost({
//             title: "",
//             author: "",
//             body: ""
//         });
//         setOpen(true);
//         setOpertion("add")

//     }
//     const onHandleEdit = (post) => {
//         setInitialPost(post);
//         setOpen(true);
//         setOpertion("edit")

//     }


//     const loadPost = () => {
//         axios.get("http://localhost:3001/posts").then((res) => {
//             setPost(res.data.reverse())

//         }).catch((err) => {
//         }
//         )
//     }

//     useEffect(() => {
//         loadPost()


//     }, [])

//     const onHandleDelete = (id) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You will not be able to recover this post!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Yes, delete it!",
//             cancelButtonText: "No, keep it",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axios
//                     .delete(`http://localhost:3001/posts/${id}`)
//                     .then((response) => {

//                         Swal.fire("Deleted!", "Your post has been deleted.", "success");
//                         loadPost()

//                     })
//                     .catch((err) => {
//                         Swal.fire("Error!", "Your post has not been deleted.", "error");
//                     });
//             }
//         });


//     }


//     const columns = [
//         {
//             label: "ID",
//             name: "id",
//             options: {
//                 customBodyRenderLite: (dataIndex) => {
//                     return <>
//                         {dataIndex + 1}
//                     </>
//                 }
//             }


//         },

//         {
//             label: "Title",
//             name: "title"
//         },
//         {
//             label: "Description",
//             name: "author"
//         },
//         {
//             label: "Stage",
//             name: "body",
//         },
//         {
//             label: "Action",
//             name: "Action",
//             options: {
//                 customBodyRenderLite: (dataIndex) => {
//                     return <>
//                         <span className={classes.editIcon} onClick={() => onHandleEdit(posts[dataIndex])}> <EditIcon /></span>
//                         <span className={classes.deleteIcon} onClick={() => onHandleDelete(posts[dataIndex].id)}> <DeleteIcon /></span>

//                     </>
//                 }
//             }
//         }

//     ]



//     return (<>


//         <AddEdit handleClose={handleClose} open={open} opertion={opertion} initialPost={initialPost} loadPost={loadPost} />
//         <br />

//         <Box>
//             <Fab color="primary" aria-label="add"  >
//                 <AddIcon onClick={addPost} />
//             </Fab>
//         </Box>

//         <MUIDataTable title="ToDo Task" columns={columns} data={posts} />


//     </>);
// }

// export default PostList;
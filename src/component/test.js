if (opertion == "edit") {
    //edit operation
    axios.put(`http://localhost:3001/posts/${post.id}`, post).then(res => {
        console.log("Submit");
        console.log(res.data);
        loadPost()
        successMsg("successfully post update", true, false);

        handleClose(false)
    })
    notify()

} else {


    if (post.title == "") {
        setErrorMessageTitle("Please Enter Title")

    } else if (post.title.length <= 3) {
        setErrorMessageTitle("Please Enter Title greter than 3")
    } else setErrorMessageTitle("")


    if (post.author == "") {
        SetErrorMessageAuthor("Please Enter Description")
    } else SetErrorMessageAuthor("")


    if (post.body == "") {
        setErrorMessageStage("Please Enter stage")

    }

    else {
        notify()

        axios.post("http://localhost:3001/posts", post).then((res) => {
            loadPost()

            successMsg("successfully post add", true, false);

            handleClose(false);
        })
    }
}


//============
const error = () => {
    if (post.title == "") {
        setErrorMessageTitle("Please Enter Title")

    } else if (post.title.length <= 3) {
        setErrorMessageTitle("Please Enter Title greter than 3")
    } else setErrorMessageTitle("")


    if (post.author == "") {
        SetErrorMessageAuthor("Please Enter Description")
    } else SetErrorMessageAuthor("")

    if (post.body == "") {
        setErrorMessageStage("Please Enter stage")

    } else {
        setErrorMessageStage("")
    }


}

//======================
 else {
    notify()

    axios.post("http://localhost:3001/posts", post).then((res) => {
        loadPost()

        successMsg("successfully post add", true, false);

        handleClose(false);
    })
}
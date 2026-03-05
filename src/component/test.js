

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
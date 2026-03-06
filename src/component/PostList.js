const handleEdit = useCallback((post) => { ... }, [posts]);
<span onClick={() => handleEdit(posts[dataIndex])}>
<span onClick={handleEdit}>

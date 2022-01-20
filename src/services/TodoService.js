import API from "../api/API";
import endpoint from "../api/endpoint.json";

class TodoService {
    static createTask(task) {
        return API.post(endpoint.api.todo.create, task);
    }
    static deleteTask(id) {
        return API.delete(endpoint.api.todo.delete + id)

    }
    static updateTask(id, task) {
        return API.put(endpoint.api.todo.update + id, task)

    }
    static fetchSingleTask(id) {
        return API.get(endpoint.api.todo.fetchOne + id)
    }
    static fetchAllTask() {
        return API.get(endpoint.api.todo.fetchAll)
    }
}

export default TodoService;
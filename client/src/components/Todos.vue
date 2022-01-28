<template>
    <div class="todos">
        <ul class="todo-list">
            <li v-for="todo in todos" v-bind:key="todo._id" v-bind:todo="todo">
                Title: {{ todo.title }}
                <br>
                Describe: {{ todo.describe }}
                <br>
                <button @click="deleteTodo(todo._id)">del</button>
                <hr>
            </li>
        </ul>
        <input v-model="newTodo.title" type="text" placeholder="title">
        <br>
        <input v-model="newTodo.describe" type="text" placeholder="describe">
        <br>
        <button @click="createTodo">add</button>
    </div>
</template>

<script>
    export default {
        name: 'Todos',
        data() {
            return {
                todos: [],
                newTodo: {
                    title: '',
                    describe: ''
                }
            }
        },
        // {"title":"asf","describe":"asd"}
        methods: {
            async getTodos() {
                const response = await fetch(`${process.env.VUE_APP_REST_API}/todo`,{
                    mode: 'cors'
                })
                this.todos = await response.json();
            },
            async createTodo() {
                if (this.newTodo.title && this.newTodo.describe) {
                    console.log(JSON.stringify(this.newTodo))
                    const response = await fetch(`${process.env.VUE_APP_REST_API}/todo`,{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(this.newTodo)
                    });
                    const result = await response;
                    if (result.status) {
                        await this.getTodos()
                    }
                }
            },
            async deleteTodo(id) {
                const response = await fetch(`${process.env.VUE_APP_REST_API}/todo/${id}`,{
                    method: 'DELETE',
                    mode: 'cors'
                })
                const result = await response;
                if (result.status) {
                    await this.getTodos()
                }
            }
        },
        beforeMount() {
            this.getTodos()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
    .todo-list {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
</style>

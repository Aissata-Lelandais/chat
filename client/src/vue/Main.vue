<template>
  <main class="wrapper">
    <h1>Logs in Vue.jss</h1>
    <button type="button" @click="getLogs">Get Logs</button>
        <button type="button" @click="getUsers">User</button>

    <br />
    <br />
    <div v-if="logs.length > 0">
      <p v-for="(log, i) in logs" :key="`log-${i}`" class="logs">
        {{ i + 1 }}. "{{ log.type }}" at {{ log.date }}
      </p>
      <p v-for="(user, i) in users" :key="`user-${i}`" class="user">
        {{ i + 1 }}. "{{ user.type }}
      </p>
    </div>
    <p v-else>No logs loaded!</p>
    <p v-else>No </p>
  </main>
</template>

<script>

import Socket from "Class/Socket";
export default {
  name: "Main",
  data() {
    return {
      logs: [],
      socket: new Socket().getSocket(),
      myUser:null
      myChat:null
      myMessage:null
    };
  },
  created() {
    if (!localStorage.getItem("username")) {
      localStorage.setItem(
        "username",
        `${process.env.IDENTITY}-${new Date().getTime()}`
      );
    }
    this.socket.emit("connection", localStorage.getItem("username"));
    this.socket.on("connected", (userId) => {
    this.myUser = userId
    this.myChat= userId
    this.myMessage= userId
    });
  },

  methods: {
    getLogs() {
      this.axios({
        method: "GET",
        url: `${process.env.NODE_URL}/logs`
      })
        .then(results => results.data)
        .then(results => {
          this.logs = results;
        });
    }
  }

  methods:{
    getMessage(currentId){
      this.axios({
        method:"GET",
        url:`${process.env.NODE_URL}/message`,
        params:{idUser:currentId}
      })
      
    }
  }

  methods:{
    getUsers(currentId){
      this.axios({
        method:"GET",
        url:`${process.env.NODE_URL}/users`,
        params:{idUser:currentId}
      })
      .then((results)=>results.data)
       .then(results => {
          this.logs = results;
        });
        this.currentUserId=currentId;
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: blue;

  animation: gyro alternate 0.3s infinite;
}

.logs {
  margin-bottom: 0;
  margin-top: 0;
}

@keyframes gyro {
  from {
    color: blue;
  }
  to {
    color: red;
  }
}
</style>

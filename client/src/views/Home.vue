<template>
  <div class="home">
    <div class="col-12">
      <form @submit.prevent="createBug">
        <div class>
          <input
            required
            type="text"
            v-model="newBug.title"
            placeholder="Title"
          />
          <input
            required
            type="text"
            v-model="newBug.reportedBy"
            placeholder="Name"
          />
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
        <textarea
          required
          name="desc"
          v-model="newBug.description"
          id="desc"
          cols="40"
          rows="10"
          placeholder="Description"
        ></textarea>
      </form>
    </div>
    <div class="d-flex justify-content-between">
      <h3>Current Bugs</h3>
      <div><input type="checkbox" v-model="hide" />Hide Closed</div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Reported By</th>
          <th scope="col">Status</th>
          <th scope="col">Last Modified</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bug in bugs" :key="bug.id" v-if="!(hide && bug.closed)">
          <th scope="row">{{ bug.title }}</th>
          <td>{{ bug.reportedBy }}</td>
          <td v-if="bug.closed" style="color: red">Closed</td>
          <td v-else style="color: green">Open</td>
          <td>{{ bug.updatedAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import BugComponent from "@/components/Bug";
export default {
  name: "home",
  data() {
    return {
      newBug: {
        description: "",
        title: "",
        reportedBy: ""
      },
      hide: false
    };
  },
  methods: {
    createBug() {
      let bug = { ...this.newBug };
      this.$store.dispatch("createBug", bug);
      this.newBug = {
        title: "",
        reportedBy: "",
        description: ""
      };
    }
  },
  mounted() {
    this.$store.dispatch("getAllBugs");
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    }
  },
  components: {
    BugComponent
  }
};
</script>

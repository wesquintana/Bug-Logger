<template>
  <div class="bug-details">
    <div class="row">
      <div class="col-12 d-flex justify-content-start">
        <h5>Title</h5>
      </div>
      <div class="col-12 d-flex justify-content-between">
        <h1>{{ bug.title }}</h1>
        <p>
          Status:
          <span v-if="bug.closed" style="color: red" class="status">Closed</span
          ><span v-else class="status">Open</span>
        </p>
      </div>
      <div class="col-12 d-flex justify-content-start align-content-center">
        <p class="mr-2 align-self-center">Reported By:</p>
        <h3 class="align-self-center">{{ bug.reportedBy }}</h3>
      </div>
      <div class="col-12">
        <div class="desc">
          <p v-if="!editing">{{ bug.description }}</p>
          <form v-else @submit="editDesc">
            <textarea
              required
              name="desc"
              v-model="bug.description"
              id="desc"
              cols="40"
              rows="10"
              >{{ bug.description }}</textarea
            ><button class="btn btn-success">Submit</button>
          </form>
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-warning" v-if="!editing" @click="edit">
            Edit</button
          ><button class="btn btn-danger mr-5" @click="closeBug">Close</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 d-flex justify-content-start"><h1>Notes</h1></div>
      <div class="col-12">
        <form @submit.prevent="createNote">
          <div class="d-flex flex-column">
            <input
              required
              type="text"
              v-model="newNote.reportedBy"
              placeholder="Name"
            />
            <textarea
              required
              name="desc"
              v-model="newNote.content"
              id="desc"
              cols="40"
              rows="10"
              placeholder="Description"
            ></textarea>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col" class="message-col">Message</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <note-component
              v-for="note in notes"
              :key="note.id"
              :noteData="note"
            />
          </tbody>
        </table>
      </div>
      <div class="col-12"></div>
    </div>
  </div>
</template>
<script>
import NoteComponent from "@/components/Note";
export default {
  name: "BugDetails",
  data() {
    return {
      newNote: {
        reportedBy: "",
        content: "",
        flagged: "pending",
        bug: this.$route.params.id
      },
      editing: false
    };
  },
  methods: {
    createNote() {
      let note = { ...this.newNote };
      console.log(note);
      this.$store.dispatch("createNote", note);
      this.newNote = {
        content: "",
        bug: this.$route.params.id,
        reportedBy: "",
        flagged: "pending"
      };
    },
    closeBug() {
      this.$store.dispatch("closeBug", this.$route.params.id);
    },
    edit() {
      this.editing = true;
    },
    editDesc() {
      this.$store.dispatch("editDescription", this.bug);
    }
  },
  mounted() {
    this.$store.dispatch("getBugById", this.$route.params.id);
    this.$store.dispatch("getNotesByBugId", this.$route.params.id);
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.activeNotes;
    }
  },
  components: {
    NoteComponent
  }
};
</script>
<style scoped>
h1 {
  font-family: inherit;
  color: inherit;
}
h1:hover {
  cursor: inherit;
}
.status {
  font-weight: bold;
}
.desc {
  border: solid black 1px;
  margin-left: 5%;
  margin-right: 5%;
  max-width: -webkit-fill-available;
}
.message-col {
  width: 60%;
}
textarea {
  resize: none;
}
</style>

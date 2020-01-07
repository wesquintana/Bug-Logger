<template>
  <tr>
    <th scope="row">{{ noteData.reportedBy }}</th>
    <td>{{ noteData.content }}</td>
    <td>
      <button @click="delNote" class="btn btn-danger"></button>
    </td>
  </tr>
</template>
<script>
export default {
  name: "Note",
  props: ["noteData"],
  data() {
    return {};
  },
  methods: {
    delNote() {
      if (!window.confirm("Are you sure you want to delete this note?")) return;
      this.$store.dispatch("deleteNote", this.noteData);
    }
  }
};
</script>
<style></style>

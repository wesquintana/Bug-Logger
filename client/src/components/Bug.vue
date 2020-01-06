<template>
  <tr v-if="!(hidden && bugData.closed)">
    <th scope="row">
      <router-link :to="{ name: 'bugDetails', params: { id: bugData.id } }">{{
        bugData.title
      }}</router-link>
    </th>
    <td>{{ bugData.reportedBy }}</td>
    <td v-if="bugData.closed" style="color: red" class="status">Closed</td>
    <td v-else style="color: green" class="status">Open</td>
    <td>{{ bugData.updatedAt }}</td>
  </tr>
</template>
<script>
export default {
  name: "Bug",
  props: ["bugData", "hidden"],
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
.status {
  font-weight: bold;
}
</style>

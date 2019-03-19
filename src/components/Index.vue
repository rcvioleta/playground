<template>
  <div id="receipes">
    <div class="card" v-for="receipe in receipes" :key="receipe.id">
      <div class="card-title">
        <span class="delete-receipe__wrapper" @click="deleteReceipe(receipe.id)">
          <p class="delete-receipe__btn">&#10006;</p>
        </span>
        <div class="receipe-name">{{ receipe.name }}</div>
      </div>
      <div class="card-body">
        <ul>
          <li v-for="(ingredient, index) in receipe.ingredients" :key="index">
            <span>{{ ingredient }}</span>
          </li>
        </ul>
        <div class="edit-receipe__btn">
          <router-link :to="{ name: 'edit receipe', params: { slug: receipe.slug } }">Edit &#9998;</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init.js";

export default {
  data() {
    return {
      receipes: []
    };
  },
  created() {
    db.collection("receipes")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const receipe = doc.data();
          receipe.id = doc.id;
          this.receipes.push(receipe);
        });
      });
  },
  methods: {
    deleteReceipe(id) {
      db.collection("receipes")
        .doc(id)
        .delete()
        .then(() => {
          this.receipes = this.receipes.filter(receipe => {
            return receipe.id !== id;
          });
        });
    }
  }
};
</script>

<style>
#receipes {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2em;
}

.card {
  font-family: inherit;
  border: 1px solid #ccc;
  width: 95%;
  margin: 0 auto;
  box-shadow: 0px 3px 0.5rem #807f7f;
  border-radius: 0.3em;
  overflow: hidden;
  grid-auto-rows: 200px auto;
}

.card:first-child {
  margin-top: 2em;
}

.card:last-child {
  margin-bottom: 2em;
}

.card-title {
  display: flex;
  flex-flow: column;
  font-weight: bold;
  padding: 0.5em;
  color: #eee;
  font-size: 1.2em;
}

.receipe-name {
  color: teal;
  font-size: 1.5em;
  align-self: center;
}

.delete-receipe__wrapper {
  align-self: flex-end;
}

.delete-receipe__wrapper p {
  margin: 0;
}

.delete-receipe__btn {
  background: linear-gradient(#ff7979, #eb4d4b);
  color: #d63031;
  text-shadow: 0 0 2px #ff7979;
  font-weight: bold;
  padding: 0.3em;
  font-size: 1em;
  width: 1.3em;
  text-align: center;
  border-radius: 5px;
}

.card-body {
  padding: 1rem;
  position: relative;
}

.card-body ul {
  list-style: none;
}

.card-body ul li {
  display: inline-block;
  margin: 0.5em;
  background-color: #ccc;
  border-radius: 10%;
  color: #3f3f3f;
  padding: 0.3em;
  font-weight: bold;
  border: 1px solid #bebebe;
}

.delete-receipe__btn {
  cursor: pointer;
}

.text-center {
  text-align: center;
}

.edit-receipe__btn {
  text-align: center;
  font-weight: bold;
}
</style>

<template>
  <div id="edit-receipe" v-if="receipe">
    <span class="form-title">
      <h1>Edit: {{ receipe.name }}</h1>
    </span>
    <form @submit.prevent="updateReceipe">
      <div class="form-group">
        <label for="receipe-name">Receipe Name</label>
        <input
          type="text"
          name="receipeName"
          id="receipe-name"
          class="form-control"
          v-model="receipe.name"
        >
      </div>
      <div class="form-group" v-for="(ingredient, index) in receipe.ingredients" :key="index">
        <label for="add-ing">Ingredient</label>
        <input
          type="text"
          name="ingredient"
          ingredient
          id="add-ing"
          class="form-control"
          v-model="receipe.ingredients[index]"
        >
        <span class="delete-ingredient__btn" @click="deleteIngredient(ingredient)">&#10006;</span>
      </div>
      <div class="form-group">
        <label for="add-ing">Press tab to add ingredient</label>
        <input
          type="text"
          name="ingredient"
          id="add-ing"
          class="form-control"
          @keydown.tab="addIngredient"
        >
      </div>
      <div class="form-group text-center">
        <span class="invalid-feedback">{{ error }}</span>
      </div>
      <div class="form-group">
        <button class="add-new-receipe_btn" type="submit">Update Receipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  data() {
    return {
      receipe: null,
      error: null
    };
  },
  created() {
    const receipe = db
      .collection("receipes")
      .where("slug", "==", this.$route.params.slug);
    receipe.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.receipe = doc.data();
        this.receipe.id = doc.id;
      });
    });
  },
  methods: {
    addIngredient(e) {
      const newIngredient = e.target.value;

      if (newIngredient) {
        this.receipe.ingredients.push(newIngredient);
        e.target.value = null;
        this.error = null;
      } else {
        this.error = "Ingredients cannot be empty!";
      }
    },
    deleteIngredient(ing) {
      this.receipe.ingredients = this.receipe.ingredients.filter(
        ingredient => ingredient !== ing
      );
    },
    updateReceipe() {
      let slug = this.receipe.name;
      const pattern = /[.~*&^$.,`!#';:/%@|]/g;
      slug = slug.replace(pattern, "");
      slug = slug.split(" ");
      slug = slug.filter(word => word !== "");
      slug = slug.join("-");
      db.collection("receipes")
        .doc(this.receipe.id)
        .update({
          name: this.receipe.name,
          ingredients: this.receipe.ingredients,
          slug: slug
        })
        .then(() => {
          this.$router.push({ name: "index" });
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
.form-title h1 {
  text-align: center;
  color: teal;
  margin-bottom: 1.5em;
}

.form-group {
  width: 90vw;
  margin: 1.5em auto;
  position: relative;
}

.form-group:last-child {
  text-align: center;
}

.form-group label {
  display: block;
  font-weight: bold;
  font-size: 1.3em;
  color: #636363;
}

.form-control {
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #636363;
  padding: 1rem 0;
  outline: none;
  font-family: inherit;
  font-size: inherit;
}

.add-new-receipe_btn {
  padding: 0.8em;
  font-size: 1.2em;
  background: linear-gradient(#55efc4, #00b894);
  color: #00775f;
  text-shadow: 0 0 1px #ccc;
  border: none;
  border: 1px solid #00b894;
  border-radius: 5px;
  outline: none;
}

.text-center {
  text-align: center;
}

.invalid-feedback {
  color: #e74c3c;
}

.delete-ingredient__btn {
  position: absolute;
  top: 50%;
  right: 0.5em;
  color: #e74c3c;
  font-size: 1.5em;
}
</style>

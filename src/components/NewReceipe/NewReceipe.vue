<template>
  <div id="new-receipe">
    <span class="form-title">
      <h1>New Tasty Receipe</h1>
    </span>
    <form @submit.prevent="saveReceipe">
      <div class="form-group">
        <label for="receipe-name">Receipe Name</label>
        <input type="text" name="receipeName" id="receipe-name" class="form-control" v-model="name">
      </div>
      <div class="form-group" v-for="(ing, index) in ingredients" :key="index">
        <label for="add-ing">Ingredient</label>
        <input
          type="text"
          name="ingredient"
          id="add-ing"
          class="form-control"
          v-model="ingredients[index]"
        >
        <span class="delete-ingredient__btn" @click="deleteIngredient(ing)">&#10006;</span>
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
        <button class="add-new-receipe_btn" type="submit">Add Receipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  data() {
    return {
      name: null,
      ingredients: [],
      error: null,
      slug: null
    };
  },
  methods: {
    addIngredient(e) {
      const newIngredient = e.target.value;

      if (newIngredient) {
        this.ingredients.push(newIngredient);
        e.target.value = null;
        this.error = null;
      } else {
        this.error = "Ingredients cannot be empty!";
      }
    },
    saveReceipe() {
      if (this.name && this.ingredients) {
        let slug = this.name;
        const pattern = /[.~*&^$.,`!#';:/%@|]/g;
        slug = slug.replace(pattern, "");
        slug = slug.split(" ");
        slug = slug.filter(word => word !== "");
        this.slug = slug.join("-");
        db.collection("receipes")
          .add({
            name: this.name,
            ingredients: this.ingredients,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.error =
          "You must provide the name of your receipe together with ingredients";
      }
    },
    deleteIngredient(ing) {
      this.ingredients = this.ingredients.filter(
        ingredient => ingredient !== ing
      );
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

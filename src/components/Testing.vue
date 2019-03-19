<template>
  <div id="forms">
    <div v-for="element in formElements" :key="element.id">
      <Input
        :elementType="element.config.elementType"
        :elementConfig="element.config.elementConfig"
        :label="element.label"
        :change="onChange"
        :tabEvent="addIngredient"
      />
    </div>
    <button @click="saveReceipe">Save Receipe</button>
  </div>
</template>

<script>
import Input from "@/components/Input/Input.vue";
export default {
  data() {
    return {
      formElements: [],
      formInputs: {
        receipeName: {
          elementType: "input",
          elementConfig: {
            type: "text",
            name: "receipeName",
            placeholder: "Receipe Name",
            className: ""
          },
          label: "Receipe Name",
          rules: {
            required: true,
            max: 6
          },
          value: ""
        },
        receipeNumber: {
          elementType: "input",
          elementConfig: {
            type: "text",
            name: "receipeNumber",
            placeholder: "Receipe Number",
            className: ""
          },
          label: "Receipe Number",
          rules: {
            required: true,
            max: 6
          },
          value: ""
        },
        receipeComments: {
          elementType: "textarea",
          elementConfig: {
            name: "receipeComments",
            placeholder: "Comments",
            className: ""
          },
          label: "Comments",
          rules: {
            required: true,
            max: 6
          },
          value: ""
        }
      }
    };
  },
  methods: {
    onChange(e) {
      const inputElement = e.srcElement.name;
      const targetVal = e.target.value;
      const currentElement = this.formInputs[inputElement];

      console.log(inputElement);
      console.log(targetVal);

      switch (inputElement) {
        case "receipeName":
          if (targetVal !== "") {
            currentElement.value = targetVal;
            currentElement.elementConfig.className = "";
          } else {
            currentElement.elementConfig.className = "invalid";
          }
          break;
        case "receipeNumber":
          if (targetVal === "") {
            currentElement.elementConfig.className = "invalid";
          } else if (isNaN(targetVal)) {
            currentElement.elementConfig.className = "invalid";
          } else {
            currentElement.value = targetVal;
            currentElement.elementConfig.className = "";
          }
          break;
        case "receipeComments":
          if (targetVal !== "") {
            currentElement.value = targetVal;
            currentElement.elementConfig.className = "";
          } else {
            currentElement.elementConfig.className = "invalid";
          }
          break;
      }
    },
    addIngredient(e) {
      if (e.srcElement.name === "receipeName") {
        alert("Congrats! You've made it!");
      }
    },
    saveReceipe() {
      console.log("Receipe Name:", this.formInputs.receipeName.value);
      console.log("Receipe Number:", this.formInputs.receipeNumber.value);
      console.log("Comment:", this.formInputs.receipeComments.value);
    }
  },
  components: {
    Input
  },
  beforeMount() {
    for (let key in this.formInputs) {
      this.formElements.push({
        id: key,
        config: this.formInputs[key],
        label: this.formInputs[key].label
      });
      // console.log(this.formInputs[key].elementConfig.className);
    }
  }
};
</script>

<style>
.invalid {
  border: 1px solid red;
}
</style>

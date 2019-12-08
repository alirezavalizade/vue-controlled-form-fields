<template>
  <c-form class="native-form" :submit="onSubmit">
    <div slot-scope="{ form, ...rest }">
      <div class="row">
        <div class="col-25">
          <label>First Name</label>
        </div>
        <div class="col-75">
          <field
            name="user.firstname"
            :validate="required"
            component="input"
            type="text"
            placeholder="Your name.."
          >
            <span
              slot-scope="{ meta }"
              v-if="meta.touched && meta.error"
              class="danger"
            >
              {{ meta.error }}
            </span>
          </field>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Last Name</label>
        </div>
        <div class="col-75">
          <field
            name="user.lastname"
            component="input"
            type="text"
            placeholder="Your last name.."
          />
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Country</label>
        </div>
        <div class="col-75">
          <field component="select" name="country">
            <option>select</option>
            <option value="australia">Australia</option>
            <option value="canada">Canada</option>
            <option value="usa">USA</option>
          </field>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Nationalities</label>
        </div>
        <div class="col-75">
          <field name="nationality" component="select" multiple>
            <option value="australian">Australian</option>
            <option value="canadians">Canadians</option>
            <option value="english">English</option>
            <option value="namibian">namibian</option>
            <option value="other">other</option>
          </field>
          <div><br /></div>
          <field
            v-if="
              rest.values.nationality &&
                rest.values.nationality.length === 1 &&
                rest.values.nationality.includes('other')
            "
            key="nationality_other"
            name="nationality_other"
            component="input"
            type="text"
            placeholder="Your nationality.."
          />
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Favourite hobbies</label>
        </div>
        <div class="col-75">
          <label>
            <Field
              name="hobbies"
              component="input"
              type="checkbox"
              value="football"
            />
            {{ ' ' }}
            Football ⚽️
          </label>
          <label>
            <Field
              name="hobbies"
              component="input"
              type="checkbox"
              value="basketball"
            />
            {{ ' ' }}
            Basketball 🏀
          </label>
          <label>
            <Field
              name="hobbies"
              component="input"
              type="checkbox"
              value="videogames"
            />
            {{ ' ' }}
            Video games 🎮
          </label>
          <label>
            <Field
              name="hobbies"
              component="input"
              type="checkbox"
              value="running"
            />
            {{ ' ' }}
            Running 🏃‍
          </label>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Best Stooge</label>
        </div>
        <div class="col-75">
          <label>
            <Field name="stooge" component="input" type="radio" value="larry" />
            {{ ' ' }}
            Larry
          </label>
          <label>
            <Field name="stooge" component="input" type="radio" value="moe" />
            {{ ' ' }}
            Moe
          </label>
          <label>
            <Field name="stooge" component="input" type="radio" value="curly" />
            {{ ' ' }}
            Curly
          </label>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Are you single?</label>
        </div>
        <div class="col-75">
          <label>
            <Field name="are_you_single" component="input" type="checkbox" />
            {{ ' ' }}
            check this if you are single
          </label>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Tell us about your self</label>
        </div>
        <div class="col-75">
          <field
            component="textarea"
            name="subject"
            placeholder="Write something.."
            style="height:200px"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-75">
          <button
            @click="form.handleSubmit"
            type="button"
            :disabled="rest.submitting || rest.pristine"
          >
            submit
          </button>
          <button
            @click="form.reset"
            type="button"
            :disabled="form.submitting || form.pristine"
          >
            reset
          </button>
        </div>
      </div>
      <br />
      <pre>
        {{ rest }}
      </pre>
    </div>
  </c-form>
</template>

<script>
import { Form as CForm, Field } from 'vue-controlled-form-fields';

export default {
  components: {
    CForm,
    Field
  },
  methods: {
    onSubmit(values) {
      console.log(values);
    },
    required(v) {
      if (v) {
        return;
      }
      return 'Required';
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
form {
  &.native-form {
    font-family: sans-serif;
    margin: 10px auto;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 3px;

    input,
    select,
    textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      resize: vertical;
      font-size: 16px;
      font-size: 12px;
    }

    input[type='checkbox'],
    input[type='radio'] {
      width: auto;
    }

    label {
      padding: 12px 12px 12px 0;
      display: inline-block;
      color: #333;
      font-weight: 800;
      font-size: 14px;
    }

    button {
      background-image: linear-gradient(#4f93ce, #285f8f);
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      float: right;
      margin-left: 15px;
      min-width: 100px;
      font-size: 16px;
      text-transform: capitalize;
    }

    button:hover {
      background-color: #45a049;
    }

    button[disabled] {
      cursor: not-allowed;
    }

    .col-25 {
      float: left;
      width: 25%;
      margin-top: 6px;
    }

    .col-75 {
      float: left;
      width: 75%;
      margin-top: 6px;
    }

    .row {
      border-bottom: 1px solid #f3f3f3;
      padding-bottom: 10px;
      margin-bottom: 5px;
    }

    .row:after {
      content: '';
      display: table;
      clear: both;
    }

    .danger {
      text-align: left;
      display: block;
      color: red;
      font-size: 12px;
    }
  }

  @media screen and (max-width: 600px) {
    .col-25,
    .col-75,
    input[type='submit'] {
      width: 100%;
      margin-top: 0;
    }
  }
}
</style>

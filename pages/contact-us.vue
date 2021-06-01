<template>
  <form>
    <label for="fname">Name and Surname:</label>
    <input type="text" id="fname" name="fname" /><br /><br />
    <label for="lname">E-mail:</label>
    <input type="text" id="lname" name="lname" /><br /><br />
    <input type="submit" value="Submit" />
  </form>
  <!--<form class="form">
	 <form v-on:submit.prevent="submitForm"> >
		<p v-bind:class="{ 'fld-error': $v.form.name.$error }">
			<label>Name and Surname</label><br>
			<input type="text" v-model.trim="form.name" @input="$v.form.name.$touch()">

			<span class="msg-error" v-if="!$v.form.name.required">
				<small>Field is required</small>
			</span>
			<span class="msg-error" v-if="!$v.form.name.minLength">
				<small>Name must have at least {{ $v.form.name.$params.minLength.min }} letters.</small>
			</span>
		</p>

		<p v-bind:class="{ 'fld-error': $v.form.company.$error }">
			<label>Company</label><br>
			<input type="text" v-model="form.company" @input="$v.form.job.$touch()">

			<span class="msg-error" v-if="!$v.form.company.required">
				<small>Field is required</small>
			</span>
		</p>

        <p v-bind:class="{ 'fld-error': $v.form.email.$error }">
			<label>E-mail</label><br>
			<input type="text" v-model.trim="form.email" @input="$v.form.name.$touch()">

			<span class="msg-error" v-if="!$v.form.email.required">
				<small>Field is required</small>
			</span>
			<span class="msg-error" v-if="!$v.form.email.minLength">
				<small>Name must have at least {{ $v.form.email.$params.minLength.min }} letters.</small>
			</span>
		</p>

		<p>
			<button type="submit" @click.prevent="submitForm" :disabled="$v.form.$invalid">Send</button>
		</p>
	</form-->
</template>

<script>
export default {
  head() {
    return {
      title: 'AMMS Contact Us',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'Contact Us description',
          name: 'About description',
          content: '',
        },
      ],
    }
  },
  created() {
    const breadcrumbs = [
      {
        name: 'contact us',
      },
    ]
    this.$store.commit('SET_BREADCRUMBS', breadcrumbs)
  },
}
</script>

<style type="text/css">
.fld-error .msg-error {
  display: block;
}
.msg-error {
  display: none;
}
</style>

<!--script type="text/javascript">
	import axios from 'axios'
	import { required, minLength } from 'vuelidate/lib/validators'
    
	export default {
		data() {
			return {
				form: {
					name: '',
					company: '',
                    email: ''
				}
			}
			
		},
		validations: {
			form: {
				name: {
					required,
					minLength: minLength( 4 )
				},
				company: {
					required
				},
                email: {
                    required 
                }
			}
		},
		methods: {
			submitForm() {
				let contactFormData = new FormData();
				contactFormData.set( 'name', this.form.name );
				contactFormData.set( 'company', this.form.company );
                contactFormData.set( 'email', this.form.email );
				console.log( 'submitting data...' );
				axios( {
					method: 'post',
					url: 'https://reqres.in/api/users',
					data: contactFormData
				} ).then( function ( response ) {
					// Handle success.
					
					console.log( response );
				} ).catch( function ( response ) {
					// Handle error.
					
					console.log( response );
				} );
			}
		}
	}
</script-->

<style scoped>
h2 {
  margin-bottom: 30px;
}
h4 {
  margin-bottom: 30px;
}
img {
  max-width: 600px;
}
p {
  text-align: left;
}
</style>

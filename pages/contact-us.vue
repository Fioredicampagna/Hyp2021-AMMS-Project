<template>
  <form>
    <h3>Contact us</h3>

    <label class="grey-text">Your name</label>
    <input type="text" class="form-control" />

    <br />

    <label class="grey-text">Your email</label>
    <input type="email" class="form-control" />

    <br />

    <label class="grey-text">Subject</label>
    <input type="text" class="form-control" />

    <br />

    <label class="grey-text">Your message</label>
    <textarea type="text" class="form-control" rows="3"></textarea>

    <div class="text-center mt-4">
      <button class="btn btn-outline-warning" type="submit">Send</button>
    </div>
  </form>
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
          content:
            'This page provides a way to get in touch with the AMMS company',
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
form {
  width: 80%;
  height: 350px;
  max-width: 400px;
  margin: auto;
  /* background-size: cover; */
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 20px;
  /* box-shadow: 0 4px 8px 0 rgba(8, 0, 0, 0.2); */
}
</style>

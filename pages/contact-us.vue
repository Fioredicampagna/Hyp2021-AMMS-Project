<template>
  <section>
    <p>
      Our team is always here to help.<br />
      You can contact us during business hours at: <br />
      Italy 0423 555 321 <br />
      Australia 1420 333 777 <br />
      USA 1987 431 6238 <br />Canada 1555 310 4720 <br />
    </p>
    <form>
      <h3>Contact us</h3>

      <label class="grey-text"
        >Your name
        <input type="text" class="form-control" />
      </label>

      <br />

      <label class="grey-text"
        >Your email <input type="email" class="form-control"
      /></label>

      <br />

      <label class="grey-text"
        >Subject <input type="text" class="form-control"
      /></label>

      <br />

      <label class="grey-text"
        >Your message
        <textarea type="text" class="form-control" rows="3"></textarea>
      </label>

      <div class="text-center mt-4">
        <button class="btn btn-outline-warning" type="submit">Send</button>
      </div>
    </form>
  </section>
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
p {
  text-align: center;
}
</style>
